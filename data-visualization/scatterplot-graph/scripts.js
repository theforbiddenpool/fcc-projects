let data
const svg = d3.select('svg')
const tooltip = document.querySelector('.tooltip')

const SVG_PADDING = 60
const SVG_WIDTH = 900
const SVG_HEIGHT = 560
const SVG_AVAILABLE_WITDH = SVG_WIDTH - SVG_PADDING
const SVG_AVAILABLE_HEIGHT = SVG_HEIGHT - SVG_PADDING
const DOT_SIZE = 6
const LEGEND_SQUARE_SIZE = 18

const colorScheme = d3.scaleOrdinal(d3.schemeDark2)
const timeFormat = d3.timeFormat('%M:%S')
let xScale, yScale

window.addEventListener('load', () => {
  d3.json('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json').then(dataset => {
    data = dataset

    setChartDimentions()
    data = convertTimeToDateObject()
    setChartScales()
    setChartAxis()

    displayData()
  })
})

function setChartDimentions() {
  svg
    .attr('width', SVG_WIDTH)
    .attr('height', SVG_HEIGHT)
}

function convertTimeToDateObject() {
  return data.map(d => {
    const timeSplit = d.Time.split(':')
    d.Time = new Date(1970, 0, 1, 0, timeSplit[0], timeSplit[1])
    return d
  })
}

function setChartScales() {
  xScale = d3.scaleLinear()
    .domain([d3.min(data, d => d.Year - 1), d3.max(data, d => d.Year + 1)])
    .range([SVG_PADDING, SVG_AVAILABLE_WITDH])

  yScale = d3.scaleTime()
    .domain(d3.extent(data, d => d.Time))
    .range([SVG_PADDING, SVG_AVAILABLE_HEIGHT])
}

function setChartAxis() {
  const xAxis = d3.axisBottom(xScale).tickFormat(d3.format('d'))
  svg.append('g')
    .attr('transform', `translate(0, ${SVG_AVAILABLE_HEIGHT})`)
    .attr('id', 'x-axis')
    .call(xAxis)
  
  const yAxis = d3.axisLeft(yScale).tickFormat(timeFormat)
  svg.append('g')
    .attr('transform', `translate(${SVG_PADDING}, 0)`)
    .attr('id', 'y-axis')
    .call(yAxis)
  
  svg.append('text')
    .text('Time in minutes')
    .attr('transform', 'rotate(-90)')
    .attr('x', -(SVG_HEIGHT+SVG_PADDING) * 0.33)
    .attr('y', 10)
    .attr('class', 'axis-label')
}

function displayData() {
  svg.selectAll('.dot')
    .data(data)
    .enter()
    .append('circle')
    .attr('class', 'dot')
    .attr('cx', d => xScale(d.Year))
    .attr('cy', d => yScale(d.Time))
    .attr('r', DOT_SIZE)
    .attr('data-xvalue', d => d.Year)
    .attr('data-yvalue', d => d.Time.toISOString())
    .attr('fill', d => colorScheme(d.Doping !== ''))
    .on('mouseover', d => {
      tooltip.classList.add('show')
      tooltip.style.top = d3.event.pageY + 'px'
      tooltip.style.left = d3.event.pageX+15 + 'px'
      tooltip.dataset.year = d.Year
      tooltip.innerHTML = `
        ${d.Name}: ${d.Nationality}<br>
        Year: ${d.Year}, Time: ${timeFormat(d.Time)}
        ${(d.Doping) ? `<br><br>${d.Doping}`: ''}
      `      
    })
    .on('mouseout', () => tooltip.classList.remove('show'))

  displayLegend()
}

function displayLegend() {
  const legend = svg.selectAll('.graph-legend')
    .data(colorScheme.domain())
    .enter()
    .append('g')
    .attr('class', 'graph-legend')
    .attr('id', 'legend')
    .attr('transform', (d, i) => `translate(0, ${SVG_HEIGHT * 0.25 + i * (LEGEND_SQUARE_SIZE+2)})`)

  legend.append('rect')
    .attr('x', SVG_AVAILABLE_WITDH - LEGEND_SQUARE_SIZE)
    .attr('width', LEGEND_SQUARE_SIZE)
    .attr('height', LEGEND_SQUARE_SIZE)
    .style('fill', colorScheme)
    
  legend.append('text')
    .attr('x', SVG_AVAILABLE_WITDH - (LEGEND_SQUARE_SIZE+5))
    .attr('y', 13)
    .attr('text-anchor', 'end')
    .style('font-size', '0.8rem')
    .text(d => (d) ? 'Riders with doping allengations' : 'No doping allegations' )
}