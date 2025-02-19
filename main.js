
/*
TODO
- Confirm plot specs
    - axes - measures, scales, titles
    - lines - number, colors
    - legend 
- Implement interaction (filtering, toggle, search)
    - samples
    - times of day
    - estrus cycle
*/

// data arrays
let femaleTempData = [];
let maleTempData = [];
let femaleActData = [];
let maleActData = [];

// function to load in data from csvs
async function loadData() {
    const convertToNumber = (obj) => {
        return Object.keys(obj).reduce((acc, key) => {
            acc[key] = Number(obj[key]);
            return acc;
        }, {});
    };

    // get csvs
    femaleTempData = await d3.csv('data/fem-temp-raw.csv');
    maleTempData = await d3.csv('data/male-temp-raw.csv');
    femaleActData = await d3.csv('data/fem-act-raw.csv');
    maleActData = await d3.csv('data/male-act-raw.csv')

    // convert minutes from strings to numbers
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
}

// event listener to load data and generate plot on page load
document.addEventListener('DOMContentLoaded', async () => {
    await loadData();
    generatePlot();
});

// function to generate plot
function generatePlot() {
    // TODO - adjust width and height for svg
    const width = 500;
    const height = 200;

    // add svg element
    const svg = d3
        .select('#plot')
        .append('svg')
        .attr('viewBox', `0 0 ${width} ${height}`)
        .style('overflow', 'visible');

    //changed x-scale from minutes to days
    const xScale = d3
        .scaleLinear()
        .domain([0, femaleTempData.length / (720 * 2)])
        .range([0, width]);

    // y-scale based on temperature
    const yScale = d3
        .scaleLinear()
        .domain([33, 41])
        .range([height, 0]);

    // adding lines for each sample
    // svg.append('path')
    //     .attr('class', 'female')
    //     .datum(femaleTempData)
    //     .attr('fill', 'none')
    //     .attr('stroke', 'pink')
    //     .attr('stroke-width', 1.5)
    //     .attr('d', d3.line()
    //         .x((d) => xScale(d.t))
    //         .y((d) => yScale(d.f1))
    //     );   
    // svg.append('path')
    //     .attr('class', 'female')
    //     .datum(femaleTempData)
    //     .attr('fill', 'none')
    //     .attr('stroke', 'red')
    //     .attr('stroke-width', 1.5)
    //     .attr('d', d3.line()
    //         .x((d) => xScale(d.t))
    //         .y((d) => yScale(d.f2))
    //     );
    // svg.append('path')
    //     .attr('class', 'female')
    //     .datum(femaleTempData)
    //     .attr('fill', 'none')
    //     .attr('stroke', 'orange')
    //     .attr('stroke-width', 1.5)
    //     .attr('d', d3.line()
    //         .x((d) => xScale(d.t))
    //         .y((d) => yScale(d.f3))
    //     );
    // svg.append('path')
    //     .attr('class', 'female')
    //     .datum(femaleTempData)
    //     .attr('fill', 'none')
    //     .attr('stroke', 'pink')
    //     .attr('stroke-width', 1.5)
    //     .attr('d', d3.line()
    //         .x((d) => xScale(d.t))
    //         .y((d) => yScale(d.f4))
    //     );
    // svg.append('path')
    //     .attr('class', 'female')
    //     .datum(femaleTempData)
    //     .attr('fill', 'none')
    //     .attr('stroke', 'red')
    //     .attr('stroke-width', 1.5)
    //     .attr('d', d3.line()
    //         .x((d) => xScale(d.t))
    //         .y((d) => yScale(d.f5))
    //     );
    // svg.append('path')
    //     .attr('class', 'female')
    //     .datum(femaleTempData)
    //     .attr('fill', 'none')
    //     .attr('stroke', 'orange')
    //     .attr('stroke-width', 1.5)
    //     .attr('d', d3.line()
    //         .x((d) => xScale(d.t))
    //         .y((d) => yScale(d.f6))
    //     );
    // svg.append('path')
    //     .attr('class', 'female')
    //     .datum(femaleTempData)
    //     .attr('fill', 'none')
    //     .attr('stroke', 'pink')
    //     .attr('stroke-width', 1.5)
    //     .attr('d', d3.line()
    //         .x((d) => xScale(d.t))
    //         .y((d) => yScale(d.f7))
    //     );
    // svg.append('path')
    //     .attr('class', 'female')
    //     .datum(femaleTempData)
    //     .attr('fill', 'none')
    //     .attr('stroke', 'red')
    //     .attr('stroke-width', 1.5)
    //     .attr('d', d3.line()
    //         .x((d) => xScale(d.t))
    //         .y((d) => yScale(d.f8))
    //     );
    // svg.append('path')
    //     .attr('class', 'female')
    //     .datum(femaleTempData)
    //     .attr('fill', 'none')
    //     .attr('stroke', 'orange')
    //     .attr('stroke-width', 1.5)
    //     .attr('d', d3.line()
    //         .x((d) => xScale(d.t))
    //         .y((d) => yScale(d.f9))
    //     );
    // svg.append('path')
    //     .attr('class', 'female')
    //     .datum(femaleTempData)
    //     .attr('fill', 'none')
    //     .attr('stroke', 'pink')
    //     .attr('stroke-width', 1.5)
    //     .attr('d', d3.line()
    //         .x((d) => xScale(d.t))
    //         .y((d) => yScale(d.f10))
    //     );
    // svg.append('path')
    //     .attr('class', 'female')
    //     .datum(femaleTempData)
    //     .attr('fill', 'none')
    //     .attr('stroke', 'red')
    //     .attr('stroke-width', 1.5)
    //     .attr('d', d3.line()
    //         .x((d) => xScale(d.t))
    //         .y((d) => yScale(d.f11))
    //     );
    // svg.append('path')
    //     .attr('class', 'female')
    //     .datum(femaleTempData)
    //     .attr('fill', 'none')
    //     .attr('stroke', 'orange')
    //     .attr('stroke-width', 1.5)
    //     .attr('d', d3.line()
    //         .x((d) => xScale(d.t))
    //         .y((d) => yScale(d.f12))
    //     );
    // svg.append('path')
    //     .attr('class', 'female')
    //     .datum(femaleTempData)
    //     .attr('fill', 'none')
    //     .attr('stroke', 'orange')
    //     .attr('stroke-width', 1.5)
    //     .attr('d', d3.line()
    //         .x((d) => xScale(d.t))
    //         .y((d) => yScale(d.f13))
    //     );

    // svg.append('path')
    //     .attr('class', 'male')
    //     .datum(maleTempData)
    //     .attr('fill', 'none')
    //     .attr('stroke', 'blue')
    //     .attr('stroke-width', 1.5)
    //     .attr('d', d3.line()
    //         .x((d) => xScale(d.t))
    //         .y((d) => yScale(d.m1))
    //     );
    // svg.append('path')
    //     .attr('class', 'male')
    //     .datum(maleTempData)
    //     .attr('fill', 'none')
    //     .attr('stroke', 'green')
    //     .attr('stroke-width', 1.5)
    //     .attr('d', d3.line()
    //         .x((d) => xScale(d.t))
    //         .y((d) => yScale(d.m2))
    //     );
    // svg.append('path')
    //     .attr('class', 'male')
    //     .datum(maleTempData)
    //     .attr('fill', 'none')
    //     .attr('stroke', 'purple')
    //     .attr('stroke-width', 1.5)
    //     .attr('d', d3.line()
    //         .x((d) => xScale(d.t))
    //         .y((d) => yScale(d.m3))
    //     ); 
    // svg.append('path')
    //     .attr('class', 'male')
    //     .datum(maleTempData)
    //     .attr('fill', 'none')
    //     .attr('stroke', 'blue')
    //     .attr('stroke-width', 1.5)
    //     .attr('d', d3.line()
    //         .x((d) => xScale(d.t))
    //         .y((d) => yScale(d.m4))
    //     );
    // svg.append('path')
    //     .attr('class', 'male')
    //     .datum(maleTempData)
    //     .attr('fill', 'none')
    //     .attr('stroke', 'green')
    //     .attr('stroke-width', 1.5)
    //     .attr('d', d3.line()
    //         .x((d) => xScale(d.t))
    //         .y((d) => yScale(d.m5))
    //     );
    // svg.append('path')
    //     .attr('class', 'male')
    //     .datum(maleTempData)
    //     .attr('fill', 'none')
    //     .attr('stroke', 'purple')
    //     .attr('stroke-width', 1.5)
    //     .attr('d', d3.line()
    //         .x((d) => xScale(d.t))
    //         .y((d) => yScale(d.m6))
    //     ); 
    // svg.append('path')
    //     .attr('class', 'male')
    //     .datum(maleTempData)
    //     .attr('fill', 'none')
    //     .attr('stroke', 'blue')
    //     .attr('stroke-width', 1.5)
    //     .attr('d', d3.line()
    //         .x((d) => xScale(d.t))
    //         .y((d) => yScale(d.m7))
    //     );
    // svg.append('path')
    //     .attr('class', 'male')
    //     .datum(maleTempData)
    //     .attr('fill', 'none')
    //     .attr('stroke', 'green')
    //     .attr('stroke-width', 1.5)
    //     .attr('d', d3.line()
    //         .x((d) => xScale(d.t))
    //         .y((d) => yScale(d.m8))
    //     );
    // svg.append('path')
    //     .attr('class', 'male')
    //     .datum(maleTempData)
    //     .attr('fill', 'none')
    //     .attr('stroke', 'purple')
    //     .attr('stroke-width', 1.5)
    //     .attr('d', d3.line()
    //         .x((d) => xScale(d.t))
    //         .y((d) => yScale(d.m9))
    //     ); 
    // svg.append('path')
    //     .attr('class', 'male')
    //     .datum(maleTempData)
    //     .attr('fill', 'none')
    //     .attr('stroke', 'blue')
    //     .attr('stroke-width', 1.5)
    //     .attr('d', d3.line()
    //         .x((d) => xScale(d.t))
    //         .y((d) => yScale(d.m10))
    //     );
    // svg.append('path')
    //     .attr('class', 'male')
    //     .datum(maleTempData)
    //     .attr('fill', 'none')
    //     .attr('stroke', 'green')
    //     .attr('stroke-width', 1.5)
    //     .attr('d', d3.line()
    //         .x((d) => xScale(d.t))
    //         .y((d) => yScale(d.m11))
    //     );
    // svg.append('path')
    //     .attr('class', 'male')
    //     .datum(maleTempData)
    //     .attr('fill', 'none')
    //     .attr('stroke', 'purple')
    //     .attr('stroke-width', 1.5)
    //     .attr('d', d3.line()
    //         .x((d) => xScale(d.t))
    //         .y((d) => yScale(d.m12))
    //     ); 
    // svg.append('path')
    //     .attr('class', 'male')
    //     .datum(maleTempData)
    //     .attr('fill', 'none')
    //     .attr('stroke', 'purple')
    //     .attr('stroke-width', 1.5)
    //     .attr('d', d3.line()
    //         .x((d) => xScale(d.t))
    //         .y((d) => yScale(d.m13))
    //     ); 

    // code to add axes and grid lines
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
