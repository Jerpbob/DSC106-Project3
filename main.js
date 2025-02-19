// State management
let state = {
    femaleSamples: [],
    maleSamples: [],
    selectedFemaleSamples: new Set(),
    selectedMaleSamples: new Set(),
    timeRange: {
        start: "00:00",
        end: "23:59"
    },
    cycleFilter: "all",
    data: {
        female: [],
        male: []
    }
};

// Color scales - reduced to 3 colors each
const femaleColorScale = d3.scaleOrdinal()
    .range(["#FF69B4", "#FF1493", "#DB7093"]);

const maleColorScale = d3.scaleOrdinal()
    .range(["#4169E1", "#1E90FF", "#00BFFF"]);

// Utility functions
function parseTime(timeStr) {
    const [hours, minutes] = timeStr.split(":").map(Number);
    return hours * 60 + minutes;
}

function isInTimeRange(minute) {
    const timeOfDay = minute % 1440; // Convert to time of day (0-1439)
    const startMinute = parseTime(state.timeRange.start);
    const endMinute = parseTime(state.timeRange.end);
    return timeOfDay >= startMinute && timeOfDay <= endMinute;
}

function isEstrous(minute) {
    const day = Math.floor(minute / 1440) + 1;
    return [2, 6, 10, 14].includes(day);
}

function filterData(data) {
    return data.filter(d => {
        const inTimeRange = isInTimeRange(d.t);
        const matchesCycle = state.cycleFilter === "all" ||
            (state.cycleFilter === "estrous" && isEstrous(d.t)) ||
            (state.cycleFilter === "non-estrous" && !isEstrous(d.t));
        return inTimeRange && matchesCycle;
    });
}

// Data loading and processing
async function loadData() {
    try {
        // Load data
        const [femaleTemp, maleTemp] = await Promise.all([
            d3.csv('data/fem-temp-raw.csv', d3.autoType),
            d3.csv('data/male-temp-raw.csv', d3.autoType)
        ]);

        // Store data
        state.data.female = femaleTemp;
        state.data.male = maleTemp;

        // Extract only first 3 samples for each gender
        state.femaleSamples = Object.keys(femaleTemp[0])
            .filter(k => k.startsWith('f'))
            .slice(0, 3);
        state.maleSamples = Object.keys(maleTemp[0])
            .filter(k => k.startsWith('m'))
            .slice(0, 3);

        // Initialize all samples as selected
        state.selectedFemaleSamples = new Set(state.femaleSamples);
        state.selectedMaleSamples = new Set(state.maleSamples);

        // Create sample toggles
        createSampleToggles();

        // Initial render
        render();
    } catch (error) {
        console.error('Error loading data:', error);
    }
}

// UI setup
function createSampleToggles() {
    // Female samples
    const femaleContainer = d3.select('#female-samples');
    state.femaleSamples.forEach(sample => {
        const label = femaleContainer
            .append('label')
            .attr('class', 'sample-toggle');

        label.append('input')
            .attr('type', 'checkbox')
            .attr('value', sample)
            .property('checked', state.selectedFemaleSamples.has(sample))
            .on('change', function () {
                const checked = this.checked;
                if (checked) {
                    state.selectedFemaleSamples.add(sample);
                } else {
                    state.selectedFemaleSamples.delete(sample);
                }
                render();
            });

        label.append('span')
            .text(sample)
            .style('color', femaleColorScale(sample));
    });

    // Male samples
    const maleContainer = d3.select('#male-samples');
    state.maleSamples.forEach(sample => {
        const label = maleContainer
            .append('label')
            .attr('class', 'sample-toggle');

        label.append('input')
            .attr('type', 'checkbox')
            .attr('value', sample)
            .property('checked', state.selectedMaleSamples.has(sample))
            .on('change', function () {
                const checked = this.checked;
                if (checked) {
                    state.selectedMaleSamples.add(sample);
                } else {
                    state.selectedMaleSamples.delete(sample);
                }
                render();
            });

        label.append('span')
            .text(sample)
            .style('color', maleColorScale(sample));
    });

    // Time range inputs
    d3.select('#time-start').on('change', function () {
        state.timeRange.start = this.value;
        render();
    });

    d3.select('#time-end').on('change', function () {
        state.timeRange.end = this.value;
        render();
    });

    // Cycle filter buttons
    d3.selectAll('.cycle-toggles button').on('click', function () {
        const id = this.id;
        state.cycleFilter = id.replace('-days', '');
        d3.selectAll('.cycle-toggles button').classed('active', false);
        d3.select(this).classed('active', true);
        render();
    });
}

// Visualization rendering
function render() {
    // Clear existing plot
    d3.select('#plot').html('');

    // Setup dimensions
    const margin = { top: 40, right: 100, bottom: 60, left: 60 };
    const width = 1000 - margin.left - margin.right;
    const height = 600 - margin.top - margin.bottom;

    // Create SVG
    const svg = d3.select('#plot')
        .append('svg')
        .attr('viewBox', `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

    // Filter data
    const filteredFemaleData = filterData(state.data.female);
    const filteredMaleData = filterData(state.data.male);

    // Create scales
    const xScale = d3.scaleLinear()
        .domain([0, 20160]) // 14 days * 1440 minutes
        .range([0, width]);

    const yScale = d3.scaleLinear()
        .domain([33, 41])
        .range([height, 0]);

    // Add gridlines
    svg.append('g')
        .attr('class', 'gridlines')
        .call(d3.axisLeft(yScale)
            .tickSize(-width)
            .tickFormat(''));

    // Add axes
    const xAxis = d3.axisBottom(xScale)
        .tickFormat(d => `Day ${Math.floor(d / 1440) + 1}`)
        .ticks(14);

    svg.append('g')
        .attr('class', 'x-axis')
        .attr('transform', `translate(0,${height})`)
        .call(xAxis)
        .selectAll('text')
        .attr('transform', 'rotate(-45)')
        .style('text-anchor', 'end');

    svg.append('g')
        .attr('class', 'y-axis')
        .call(d3.axisLeft(yScale));

    // Add axis labels
    svg.append('text')
        .attr('class', 'axis-label')
        .attr('x', width / 2)
        .attr('y', height + margin.bottom - 10)
        .style('text-anchor', 'middle')
        .text('Time (Days)');

    svg.append('text')
        .attr('class', 'axis-label')
        .attr('transform', 'rotate(-90)')
        .attr('x', -height / 2)
        .attr('y', -margin.left + 15)
        .style('text-anchor', 'middle')
        .text('Temperature (°C)');

    // Add dark/light period shading
    for (let day = 0; day < 14; day++) {
        const startMinute = day * 1440;
        svg.append('rect')
            .attr('class', 'dark-period')
            .attr('x', xScale(startMinute))
            .attr('y', 0)
            .attr('width', xScale(720) - xScale(0))
            .attr('height', height);
    }

    // Add estrous period shading
    [2, 6, 10, 14].forEach(day => {
        const startMinute = (day - 1) * 1440;
        svg.append('rect')
            .attr('class', 'estrous-period')
            .attr('x', xScale(startMinute))
            .attr('y', 0)
            .attr('width', xScale(1440) - xScale(0))
            .attr('height', height);
    });

    // Create line generator
    const line = d3.line()
        .x(d => xScale(d.t))
        .y(d => yScale(d.value));

    // Plot female data
    state.selectedFemaleSamples.forEach(sample => {
        const data = filteredFemaleData.map(d => ({
            t: d.t,
            value: d[sample]
        }));

        svg.append('path')
            .datum(data)
            .attr('class', 'line female-line')
            .attr('stroke', femaleColorScale(sample))
            .attr('d', line)
            .transition()
            .duration(1000)
            .ease(d3.easeLinear)
            .on('start', function () {
                d3.select(this)
                    .attr('stroke-dasharray', this.getTotalLength() + ' ' + this.getTotalLength())
                    .attr('stroke-dashoffset', this.getTotalLength());
            })
            .attr('stroke-dashoffset', 0);
    });

    // Plot male data
    state.selectedMaleSamples.forEach(sample => {
        const data = filteredMaleData.map(d => ({
            t: d.t,
            value: d[sample]
        }));

        svg.append('path')
            .datum(data)
            .attr('class', 'line male-line')
            .attr('stroke', maleColorScale(sample))
            .attr('d', line);
    });

    // Add tooltip
    const tooltip = d3.select('#tooltip');
    const bisect = d3.bisector(d => d.t).left;

    svg.append('rect')
        .attr('class', 'overlay')
        .attr('width', width)
        .attr('height', height)
        .style('fill', 'none')
        .style('pointer-events', 'all')
        .on('mousemove', function (event) {
            const mouseX = d3.pointer(event)[0];
            const x0 = xScale.invert(mouseX);

            const day = Math.floor(x0 / 1440) + 1;
            const timeOfDay = Math.floor((x0 % 1440) / 60);
            const minutes = Math.floor(x0 % 60);

            let tooltipContent = `Day ${day}, ${timeOfDay}:${minutes.toString().padStart(2, '0')}<br>`;

            state.selectedFemaleSamples.forEach(sample => {
                const idx = bisect(filteredFemaleData, x0);
                if (idx < filteredFemaleData.length) {
                    tooltipContent += `${sample}: ${filteredFemaleData[idx][sample].toFixed(2)}°C<br>`;
                }
            });

            state.selectedMaleSamples.forEach(sample => {
                const idx = bisect(filteredMaleData, x0);
                if (idx < filteredMaleData.length) {
                    tooltipContent += `${sample}: ${filteredMaleData[idx][sample].toFixed(2)}°C<br>`;
                }
            });

            tooltip
                .style('display', 'block')
                .style('left', `${event.clientX}px`)
                .style('top', `${event.clientY}px`)
                .html(tooltipContent);
        })
        .on('mouseout', function () {
            tooltip.style('display', 'none');
        });
}

document.addEventListener('DOMContentLoaded', loadData);
