/* global d3 */

// Our canvas
const width = 750,
  height = 300,
  margin = 20,
  marginLeft = 40

// Drawing area
let svg = d3.select('#results')
  .append('svg')
  .attr('width', width)
  .attr('height', height)
  .style('background', '#cacaca')
  .attr('fill', 'green')

// Data reloading
let reload = () => {
  // Your data parsing here...
  let data = []
  d3.tsv('afcw-results.tsv', (rows) => {
    rows.forEach(function (score) {
      data.push(score.GoalsScored)
    })
    redraw(data)
  })
}

// redraw function
let redraw = (data) => {
  // Your data to graph here
  yScale = d3.scaleLinear()
    .domain([0, d3.max(d3.values(data))])
    .range([0, height])
  xScale = d3.scaleLinear()
    .domain([0, data.length])
    .range([0, width])
  svg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('x', (d, index) => {
      return xScale(index)
    })
    .attr('y', (d) => {
      return height - yScale(d)
    })
    .attr('width', (width / data.length) - 2)
    .attr('height', (d) => {
      return yScale(d)
    })
}

reload()
