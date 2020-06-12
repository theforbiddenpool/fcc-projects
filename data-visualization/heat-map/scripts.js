const SVG_MEASURES = {
  xPadding: 100,
  yTopPadding: 5,
  yBottomPadding: 30,
  width: 1300,
  height: 560,
  legendHeight: 100,
  availableWidth: function() { return this.width - this.xPadding },
  availableHeight: function() { return this.height - this.yTopPadding - this.yBottomPadding - this.legendHeight },
  graphYBottom: function() { return this.availableHeight() + this.yTopPadding }
}

const COLOR_CODES = [ '#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026' ]

let canvas, tooltip, dataset, colorScheme
let xScale, yScale

window.addEventListener('load', () => {
  canvas = d3.select('svg')
    .attr('height', SVG_MEASURES.height)
    .attr('width', SVG_MEASURES.width)
  tooltip = document.querySelector('#tooltip')

  d3.json('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json').then(data => {
    dataset = data

    document.querySelector('#baseTemperature').innerText = `${dataset.baseTemperature}ºC`
    dataset.monthlyVariance.forEach(d => d.month = d.month - 1)
    dataset = {...dataset, ...getMinMaxTemperatures()}

    setColorScheme()
    setGraphScales()
    displayData()
    displayGraphAxis()
    displayGraphLegend()
  })


})

function setColorScheme() {
  colorScheme = d3.scaleThreshold()
    .domain(function() {
      let domainArray = []
      const step = roundNumber((dataset.maxTemperature - dataset.minTemperature) / COLOR_CODES.length)

      for(let i = 1; i < COLOR_CODES.length; i++) {
        domainArray.push(dataset.minTemperature + i * step)
      }

      return domainArray
    }())
    .range(COLOR_CODES)
}

function getMinMaxTemperatures() {
  const variance = dataset.monthlyVariance.map(d => d.variance)

  const minTemperature = roundNumber(dataset.baseTemperature + Math.min.apply(null, variance))
  const maxTemperature = roundNumber(dataset.baseTemperature + Math.max.apply(null, variance))

  return { minTemperature, maxTemperature }
}
    
function setGraphScales() {
  xScale = d3.scaleBand()
      .domain(dataset.monthlyVariance.map(d => d.year))
      .range([0, SVG_MEASURES.availableWidth()])
    
  yScale = d3.scaleBand()
    .domain([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
    .range([0, SVG_MEASURES.availableHeight()])
  
  Object.freeze(xScale)
  Object.freeze(yScale)
}

function displayData() {
  const baseTemperature = 8.66

  canvas.append('g').attr('id', 'map').attr('transform', `translate(${SVG_MEASURES.xPadding}, ${SVG_MEASURES.yTopPadding})`).selectAll('rect')
    .data(dataset.monthlyVariance)
    .enter()
    .append('rect')
    .attr('x', d => xScale(d.year))
    .attr('y', d => yScale(d.month))
    .attr('width', d => xScale.step(d.year))
    .attr('height', d => yScale.step(d.month))
    .attr('fill', d => colorScheme(baseTemperature + d.variance))
    .attr('class', 'cell')
    .attr('data-month', d => d.month)
    .attr('data-year', d => d.year)
    .attr('data-temp', d => roundNumber(baseTemperature + d.variance))
    .on('mouseover', d => {
      tooltip.dataset.year = d.year
      tooltip.innerHTML = `
        ${d.year} - ${formatMonth(d.month)}<br>
        ${formatToOneDecimal(roundNumber(baseTemperature + d.variance))}ºC<br>
        ${formatToOneDecimal(d.variance)}ºC
      `

      const boxHeight = tooltip.offsetHeight
      const boxWidth = tooltip.offsetWidth
      const rectPosition = d3.event.target.getBoundingClientRect()
      tooltip.style.top = (rectPosition.top - boxHeight - 5) + 'px'
      tooltip.style.left = (rectPosition.left - boxWidth/2) + 'px'
      tooltip.classList.add('show')
    })
    .on('mouseout', () => tooltip.classList.remove('show'))
}

function displayGraphAxis() {
  const xAxis = d3.axisBottom(xScale)
    .tickValues(xScale.domain().filter(year => year % 10 === 0))

  canvas.append('g')
    .attr('transform', `translate(${SVG_MEASURES.xPadding}, ${SVG_MEASURES.graphYBottom()})`)
    .attr('id', 'x-axis')
    .call(xAxis)

  const yAxis = d3.axisLeft(yScale)
    .tickValues(yScale.domain())
    .tickFormat(month => formatMonth(month))

  canvas.append('g')
    .attr('transform', `translate(${SVG_MEASURES.xPadding}, ${SVG_MEASURES.yTopPadding})`)
    .attr('id', 'y-axis')
    .call(yAxis)

  setGraphLabels()

  function setGraphLabels() {
    canvas.append('text')
      .text('Months')
      .attr('transform', 'rotate(-90)')
      .attr('x', -(SVG_MEASURES.graphYBottom()) * 0.55)
      .attr('y', 20)
      .attr('class', 'axis-label')
  
    canvas.append('text')
      .text('Years')
      .attr('x', SVG_MEASURES.width * 0.5)
      .attr('y', SVG_MEASURES.graphYBottom() + 40)
      .attr('class', 'axis-label')  
  }
}

function displayGraphLegend() {
  const squareSize = 25

  const legend = canvas.append('g')
    .attr('id', 'legend')
    .attr('transform', `translate(${SVG_MEASURES.xPadding}, ${SVG_MEASURES.height - SVG_MEASURES.legendHeight + SVG_MEASURES.yBottomPadding})`)

  legend.selectAll('rect')
    .data(colorScheme.range())
    .enter()
    .append('rect')
    .attr('width', squareSize)
    .attr('height', squareSize)
    .attr('x', (d, i) => squareSize * i)
    .attr('y', 0)
    .attr('fill', d => d)

  const xLegendScale = d3.scaleLinear()
    .domain([dataset.minTemperature, dataset.maxTemperature])
    .range([0, squareSize * colorScheme.range().length])
  
  const xLegendAxis = d3.axisBottom(xLegendScale)
    .tickValues(colorScheme.domain())
    .tickFormat(formatToOneDecimal)
    .tickSizeOuter(0)
  
  legend.append('g')
    .attr('transform', `translate(0, ${squareSize})`)
    .call(xLegendAxis)
}

function roundNumber(num) {
  return Math.round((num+Number.EPSILON) * 1000) / 1000
}

function formatMonth(num) {
  return d3.timeFormat('%B')(new Date(1970, num))
}

function formatToOneDecimal(num) {
  return d3.format('.1f')(num)
}