
let femaleTempData = [];
let maleTempData = [];
let femaleActData = [];
let maleActData = [];
let dataArray = [];

async function loadData() {
	const convertToNumber = (obj) => {
        return Object.keys(obj).reduce((acc, key) => {
            acc[key] = Number(obj[key]);
            return acc;
        }, {});
    };
    
    femaleTempData = await d3.csv('data/fem-temp-raw.csv');
    maleTempData = await d3.csv('data/male-temp-raw.csv');
    femaleActData = await d3.csv('data/fem-act-raw.csv');
    maleActData = await d3.csv('data/male-act-raw.csv')
    
    for (let row in femaleTempData) {
        femaleTempData[row] = convertToNumber(femaleTempData[row]);
    }
    for (let row in maleTempData) {
        maleTempData[row] = convertToNumber(maleTempData[row]);
    }
    for (let row in femaleActData) {
        femaleActData[row] = convertToNumber(femaleActData[row]);
    }
    for (let row in maleActData) {
        maleActData[row] = convertToNumber(maleActData[row]);
    }

    dataArray = [femaleTempData, maleTempData];
}

document.addEventListener('DOMContentLoaded', async () => {
	await loadData();
    generatePlot();
});

function updateTooltipContent(samp) {
    const sex = document.getElementById('samp-sex');

    // sex.textContent = samp.
}
function updateTooltipVisibility(isVisible) {
    const tooltip = document.getElementById('commit-tooltip');
    tooltip.hidden = !isVisible;
}
updateTooltipVisibility(false);
function updateTooltipPosition(event) {
    const tooltip = document.getElementById('commit-tooltip');
    tooltip.style.left =   `${event.clientX + 13}px`;
    tooltip.style.top =   `${event.clientY + 13}px`;
}

function generatePlot() {
    const width = 300;
    const height = 300;

    const svg = d3
        .select('#plot')
        .append('svg')
        .attr('viewBox', `0 0 ${width} ${height}`)
        .style('overflow', 'visible');

    const xScale = d3
        .scaleLinear()
        .domain([0, femaleTempData.length])
        .range([0, width]);

    const yScale = d3
        .scaleLinear()
        .domain([32, 44])
        .range([height, 0]);
    
    svg.append('path')
        .attr('class', 'female')
        .datum(femaleTempData)
        .attr('fill', 'none')
        .attr('stroke', 'pink')
        .attr('stroke-width', 1.5)
        .attr('d', d3.line()
            .x((d) => xScale(d.t))
            .y((d) => yScale(d.f1))
        );
        // .on('mouseenter', function (event, samp) {
        //     d3.select(event.currentTarget).style('fill-opacity', 1);
        //     updateTooltipContent(samp);
        //     updateTooltipVisibility(true);
        //     updateTooltipPosition(event);
        // })
        // .on('mouseleave', function (event) {
        //     d3.select(event.currentTarget).style('fill-opacity', 0.7);
        //     updateTooltipContent({});
        //     updateTooltipVisibility(false);
        // });
    svg.append('path')
        .attr('class', 'female')
        .datum(femaleTempData)
        .attr('fill', 'none')
        .attr('stroke', 'red')
        .attr('stroke-width', 1.5)
        .attr('d', d3.line()
            .x((d) => xScale(d.t))
            .y((d) => yScale(d.f2))
        );
    svg.append('path')
        .attr('class', 'female')
        .datum(femaleTempData)
        .attr('fill', 'none')
        .attr('stroke', 'orange')
        .attr('stroke-width', 1.5)
        .attr('d', d3.line()
            .x((d) => xScale(d.t))
            .y((d) => yScale(d.f3))
        );
    svg.append('path')
        .attr('class', 'female')
        .datum(femaleTempData)
        .attr('fill', 'none')
        .attr('stroke', 'pink')
        .attr('stroke-width', 1.5)
        .attr('d', d3.line()
            .x((d) => xScale(d.t))
            .y((d) => yScale(d.f4))
        );
    svg.append('path')
        .attr('class', 'female')
        .datum(femaleTempData)
        .attr('fill', 'none')
        .attr('stroke', 'red')
        .attr('stroke-width', 1.5)
        .attr('d', d3.line()
            .x((d) => xScale(d.t))
            .y((d) => yScale(d.f5))
        );
    svg.append('path')
        .attr('class', 'female')
        .datum(femaleTempData)
        .attr('fill', 'none')
        .attr('stroke', 'orange')
        .attr('stroke-width', 1.5)
        .attr('d', d3.line()
            .x((d) => xScale(d.t))
            .y((d) => yScale(d.f6))
        );
    svg.append('path')
        .attr('class', 'female')
        .datum(femaleTempData)
        .attr('fill', 'none')
        .attr('stroke', 'pink')
        .attr('stroke-width', 1.5)
        .attr('d', d3.line()
            .x((d) => xScale(d.t))
            .y((d) => yScale(d.f7))
        );
    svg.append('path')
        .attr('class', 'female')
        .datum(femaleTempData)
        .attr('fill', 'none')
        .attr('stroke', 'red')
        .attr('stroke-width', 1.5)
        .attr('d', d3.line()
            .x((d) => xScale(d.t))
            .y((d) => yScale(d.f8))
        );
    svg.append('path')
        .attr('class', 'female')
        .datum(femaleTempData)
        .attr('fill', 'none')
        .attr('stroke', 'orange')
        .attr('stroke-width', 1.5)
        .attr('d', d3.line()
            .x((d) => xScale(d.t))
            .y((d) => yScale(d.f9))
        );
    svg.append('path')
        .attr('class', 'female')
        .datum(femaleTempData)
        .attr('fill', 'none')
        .attr('stroke', 'pink')
        .attr('stroke-width', 1.5)
        .attr('d', d3.line()
            .x((d) => xScale(d.t))
            .y((d) => yScale(d.f10))
        );
    svg.append('path')
        .attr('class', 'female')
        .datum(femaleTempData)
        .attr('fill', 'none')
        .attr('stroke', 'red')
        .attr('stroke-width', 1.5)
        .attr('d', d3.line()
            .x((d) => xScale(d.t))
            .y((d) => yScale(d.f11))
        );
    svg.append('path')
        .attr('class', 'female')
        .datum(femaleTempData)
        .attr('fill', 'none')
        .attr('stroke', 'orange')
        .attr('stroke-width', 1.5)
        .attr('d', d3.line()
            .x((d) => xScale(d.t))
            .y((d) => yScale(d.f12))
        );
    svg.append('path')
        .attr('class', 'female')
        .datum(femaleTempData)
        .attr('fill', 'none')
        .attr('stroke', 'orange')
        .attr('stroke-width', 1.5)
        .attr('d', d3.line()
            .x((d) => xScale(d.t))
            .y((d) => yScale(d.f13))
        );
    
    svg.append('path')
        .attr('class', 'male')
        .datum(maleTempData)
        .attr('fill', 'none')
        .attr('stroke', 'blue')
        .attr('stroke-width', 1.5)
        .attr('d', d3.line()
            .x((d) => xScale(d.t))
            .y((d) => yScale(d.m1))
        );
    svg.append('path')
        .attr('class', 'male')
        .datum(maleTempData)
        .attr('fill', 'none')
        .attr('stroke', 'green')
        .attr('stroke-width', 1.5)
        .attr('d', d3.line()
            .x((d) => xScale(d.t))
            .y((d) => yScale(d.m2))
        );
    svg.append('path')
        .attr('class', 'male')
        .datum(maleTempData)
        .attr('fill', 'none')
        .attr('stroke', 'purple')
        .attr('stroke-width', 1.5)
        .attr('d', d3.line()
            .x((d) => xScale(d.t))
            .y((d) => yScale(d.m3))
        ); 
    svg.append('path')
        .attr('class', 'male')
        .datum(maleTempData)
        .attr('fill', 'none')
        .attr('stroke', 'blue')
        .attr('stroke-width', 1.5)
        .attr('d', d3.line()
            .x((d) => xScale(d.t))
            .y((d) => yScale(d.m4))
        );
    svg.append('path')
        .attr('class', 'male')
        .datum(maleTempData)
        .attr('fill', 'none')
        .attr('stroke', 'green')
        .attr('stroke-width', 1.5)
        .attr('d', d3.line()
            .x((d) => xScale(d.t))
            .y((d) => yScale(d.m5))
        );
    svg.append('path')
        .attr('class', 'male')
        .datum(maleTempData)
        .attr('fill', 'none')
        .attr('stroke', 'purple')
        .attr('stroke-width', 1.5)
        .attr('d', d3.line()
            .x((d) => xScale(d.t))
            .y((d) => yScale(d.m6))
        ); 
    svg.append('path')
        .attr('class', 'male')
        .datum(maleTempData)
        .attr('fill', 'none')
        .attr('stroke', 'blue')
        .attr('stroke-width', 1.5)
        .attr('d', d3.line()
            .x((d) => xScale(d.t))
            .y((d) => yScale(d.m7))
        );
    svg.append('path')
        .attr('class', 'male')
        .datum(maleTempData)
        .attr('fill', 'none')
        .attr('stroke', 'green')
        .attr('stroke-width', 1.5)
        .attr('d', d3.line()
            .x((d) => xScale(d.t))
            .y((d) => yScale(d.m8))
        );
    svg.append('path')
        .attr('class', 'male')
        .datum(maleTempData)
        .attr('fill', 'none')
        .attr('stroke', 'purple')
        .attr('stroke-width', 1.5)
        .attr('d', d3.line()
            .x((d) => xScale(d.t))
            .y((d) => yScale(d.m9))
        ); 
    svg.append('path')
        .attr('class', 'male')
        .datum(maleTempData)
        .attr('fill', 'none')
        .attr('stroke', 'blue')
        .attr('stroke-width', 1.5)
        .attr('d', d3.line()
            .x((d) => xScale(d.t))
            .y((d) => yScale(d.m10))
        );
    svg.append('path')
        .attr('class', 'male')
        .datum(maleTempData)
        .attr('fill', 'none')
        .attr('stroke', 'green')
        .attr('stroke-width', 1.5)
        .attr('d', d3.line()
            .x((d) => xScale(d.t))
            .y((d) => yScale(d.m11))
        );
    svg.append('path')
        .attr('class', 'male')
        .datum(maleTempData)
        .attr('fill', 'none')
        .attr('stroke', 'purple')
        .attr('stroke-width', 1.5)
        .attr('d', d3.line()
            .x((d) => xScale(d.t))
            .y((d) => yScale(d.m12))
        ); 
    svg.append('path')
        .attr('class', 'male')
        .datum(maleTempData)
        .attr('fill', 'none')
        .attr('stroke', 'purple')
        .attr('stroke-width', 1.5)
        .attr('d', d3.line()
            .x((d) => xScale(d.t))
            .y((d) => yScale(d.m13))
        ); 
    
    const margin = { top: 10, right: 10, bottom: 30, left: 20 };

    const usableArea = {
        top: margin.top,
        right: width - margin.right,
        bottom: height - margin.bottom,
        left: margin.left,
        width: width - margin.left - margin.right,
        height: height - margin.top - margin.bottom,
    };

    xScale.range([usableArea.left, usableArea.right]);
    yScale.range([usableArea.bottom, usableArea.top]);

    const gridlines = svg
        .append('g')
        .attr('class', 'gridlines')
        .attr('transform', `translate(${usableArea.left}, 0)`);
    
    gridlines.call(d3.axisLeft(yScale).tickFormat('').tickSize(-usableArea.width));

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    svg
        .append('g')
        .attr('transform', `translate(0, ${usableArea.bottom})`)
        .call(xAxis);
    
    svg
        .append('g')
        .attr('transform', `translate(${usableArea.left}, 0)`)
        .call(yAxis);
}
