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
  .style('padding', '30px')

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
    .domain([d3.max(d3.values(data)), 0])
    .range([0, height])
  xScale = d3.scaleLinear()
    .domain([0, data.length])
    .range([0, width])
  yAxis = d3.axisLeft(yScale)
  xAxis = d3.axisBottom(xScale).ticks(data.length, 's')
  svg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('x', (d, index) => {
      return xScale(index)
    })
    .attr('y', (d) => {
      return yScale(d)
    })
    .attr('width', (width / data.length) - 2)
    .attr('height', (d) => {
      return height - yScale(d)
    })
  svg.append('g')
    .attr('transform', 'rotate(0)')
    .call(yAxis)
  svg.append('g')
    .attr('transform', `translate(0, ${height})`)
    .call(xAxis)
}

reload()
