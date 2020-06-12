let dates, gdp
const svg = d3.select('svg')

const SVG_WIDTH = 900
const SVG_HEIGHT = 400
const PADDING = 50
const DEFAULT_BAR_WIDTH = 2

const tooltip = document.querySelector('#tooltip')

d3.json('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json').then(dataset => {
  dataset = dataset.data
  dates = dataset.map(d => new Date(d[0]))
  gdp = dataset.map(d => d[1])

  const {xScale, yScale, yAxisScale} = getChartScales()
  setChartDimensions()
  setAxis(xScale, yAxisScale)
  createGraphBars(dataset, xScale, yScale)
})

function setChartDimensions() {
  svg
    .attr('width', SVG_WIDTH)
    .attr('height', SVG_HEIGHT + PADDING)
}

function getChartScales() {
  let maxMonth = new Date(d3.max(dates))
  maxMonth.setMonth(maxMonth.getMonth() + 3)

  const xScale = d3.scaleTime()
      .domain([d3.min(dates), maxMonth])
      .range([PADDING, SVG_WIDTH - PADDING])

  const yScale = d3.scaleLinear()
      .domain([0, d3.max(gdp)])
      .range([0, SVG_HEIGHT])

  const yAxisScale = d3.scaleLinear()
    .domain([0, d3.max(gdp)])
    .range([SVG_HEIGHT, 0])
  
  return { xScale, yScale, yAxisScale }
}

function setAxis(xScale, yScale) {
  const xAxis = d3.axisBottom(xScale)
  svg.append('g')
    .attr('transform', `translate(0, ${SVG_HEIGHT})`)
    .attr('id', 'x-axis')
    .call(xAxis)

  const yAxis = d3.axisLeft(yScale)
  svg.append('g')
    .attr('transform', `translate(${PADDING}, 0)`)
    .attr('id', 'y-axis')
    .call(yAxis)
}

function createGraphBars(dataset, xScale, yScale) {
  const scaledGdp = gdp.map(d => yScale(d))
  let barWidth = SVG_WIDTH / dates.length - 0.5

  svg.selectAll('rect')
    .data(scaledGdp)
    .enter()
    .append('rect')
    .attr('x', (d, i) => xScale(dates[i]))
    .attr('y', d => SVG_HEIGHT - d)
    .attr('width', (barWidth ? barWidth : DEFAULT_BAR_WIDTH))
    .attr('height', d => d)
    .attr('class', 'bar')
    .attr('data-date', (d, i) => dataset[i][0])
    .attr('data-gdp', (d, i) => dataset[i][1])
}

function showTooltip(e) {
  if(!e.target.classList.contains('bar')) {
    handleMouseLeave()
    return
  }

  tooltip.classList.add('show')
  
  const date = tooltip.dataset.date = e.target.dataset.date
  const gdp = e.target.dataset.gdp

  tooltip.innerHTML = 
    `${formatDate(date)}<br>
    ${gdp} Billions`
  
  tooltip.style.left = `${e.pageX + 15}px`
  tooltip.style.top = `${e.pageY}px`
    
  function formatDate(date) {
    date = date.split('-')
    const year = date[0]
    let quarter = 'Q'

    switch (date[1]) {
      case '01': case '02': case '03':
        quarter += '1'            
        break
      case '04': case '05': case '06':
        quarter += '2'
        break
      case '07': case '08': case '09':
        quarter += '3'
        break
      case '10': case '11': case '12':
        quarter += '4'
        break        
      default:
        quarter = ''
    }

    return `${year} ${quarter}`
  }
}

function handleMouseLeave(e) {
  tooltip.innerHTML = ''
  tooltip.classList.remove('show')
}

document.querySelector('#bar-chart').addEventListener('mouseover', showTooltip)
document.querySelector('#bar-chart').addEventListener('mouseout', handleMouseLeave)