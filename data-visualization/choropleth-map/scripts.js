const SVG_MEASURES = {
  width: 975,
  height: 610
}

let svg
const tooltip = document.querySelector('#tooltip')
const path = d3.geoPath()
const color = d3.scaleThreshold(d3.range(2.6, 75.1, (75.1 - 2.6) / 8), d3.schemeBlues[9])

window.addEventListener('load', () => {
  svg = d3.select('svg')
    .attr('width', SVG_MEASURES.width)
    .attr('height', SVG_MEASURES.height)
  

  Promise.all([
    d3.json('https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json'),
    d3.json('https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json')
  ]).then(([educationData, us]) => {
    const education = new Map(educationData.map(obj => [obj.fips, obj.bachelorsOrHigher]))

    svg.append('g')
      .selectAll('path')
      .data(topojson.feature(us, us.objects.counties).features)
      .join('path')
        .attr('fill', d => color(education.get(d.id)))
        .attr('d', path)
        .attr('class', 'county')
        .attr('data-fips', d => d.id)
        .attr('data-education', d => education.get(d.id))
      .on('mouseover', d => {
        const countyData = educationData.find(obj => obj.fips === d.id)
        tooltip.dataset.education = countyData.bachelorsOrHigher
        tooltip.innerText = `${countyData.area_name}, ${countyData.state}: ${countyData.bachelorsOrHigher}%`

        tooltip.style.top = d3.event.pageY-25 + 'px'
        tooltip.style.left = d3.event.pageX+15 + 'px'

        tooltip.classList.add('show')
      })
      .on('mouseleave', () => tooltip.classList.remove('show'))
  
    svg.append("path")
      .datum(topojson.mesh(us, us.objects.states), (a, b) => a !== b)
      .attr("fill", "none")
      .attr("stroke", "white")
      .attr("stroke-linejoin", "round")
      .attr("d", path)
    
    displayGraphLegend()

    console.log(educationData)
  })


})

function displayGraphLegend() {
  const rectWidth = 25
  const rectHeight = 13

  const legend = svg.append('g')
    .attr('id', 'legend')
    .attr('transform', `translate(${SVG_MEASURES.width * 0.66}, 10)`)

  const xLegendScale = d3.scaleLinear()
    .domain([2.6, 75.1])
    .rangeRound([0, rectWidth * color.range().length])

  legend.selectAll('rect')
    .data(color.range().map(d => {
      d = color.invertExtent(d)
      if(d[0] == null) d[0] = xLegendScale.domain()[0]
      if(d[1] == null) d[1] = xLegendScale.domain()[1]
      return d
    }))
    .enter()
    .append('rect')
    .attr('width', d => xLegendScale(d[1]) - xLegendScale(d[0]))
    .attr('height', rectHeight)
    .attr('x', (d, i) => xLegendScale(d[0]))
    .attr('y', 0)
    .attr('fill', d => color(d[0]))
  
  const xLegendAxis = d3.axisBottom(xLegendScale)
    .tickSize(rectHeight + 5)
    .tickValues(color.domain())
    .tickFormat(x => Math.round(x) + '%')
  
  legend.append('g')
    .call(xLegendAxis)
    .select('.domain').remove()
  
  console.log(rectWidth * color.range().length)
}