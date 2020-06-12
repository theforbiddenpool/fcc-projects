const SVG_MEASURES = {
  width: 960,
  height: 570
}

const SVG_LEGEND_MEASURES = {
  width: 400,
  height: 100,
  rectSize: 15,
  textMargin: 3,
  xSpacing: 133,
  ySpacing: 10,
  elemsPerRow: function() { return Math.floor(this.width / this.xSpacing) }
}

let svg
const tooltip = document.querySelector('#tooltip')
const color = d3.scaleOrdinal(d3.schemeCategory10)

window.addEventListener('load', () => {
  svg = d3.select('svg')
    .attr('width', SVG_MEASURES.width)
    .attr('height', SVG_MEASURES.height)
  
  d3.json('https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json').then(dataset => {
    const root = buildTreemap(dataset)
    displayData(root)
    displayLegend()
  })
})

function buildTreemap(data) {
  return d3.treemap()
    .size([SVG_MEASURES.width, SVG_MEASURES.height])
    .padding(1)
    (d3.hierarchy(data)
      .sum(d => d.value)
      .sort((a, b) => b.value - a.value))
}

function displayData(root) {
  const leaf = svg.selectAll('g')
    .data(root.leaves())
    .join('g')
      .attr('transform', d => `translate(${d.x0},${d.y0})`)
    
  leaf.append('rect')
    .attr('fill', d => { while (d.depth > 1) d = d.parent; return color(d.data.name)})
    .attr('width', d => d.x1 - d.x0)
    .attr('height', d => d.y1 - d.y0)
    .attr('class', 'tile')
    .attr('id', (d, i) => d.leafUid = `leaf-${i}`)
    .attr('data-name', d => (d.data.name).trim())
    .attr('data-category', d => d.data.category)
    .attr('data-value', d => d.data.value)
    .on('mousemove', d => {
      tooltip.dataset.value = d.data.value
      tooltip.innerHTML = `
        Name: ${(d.data.name).trim()}<br>
        Category: ${d.data.category}<br>
        Value: $${d3.format(',d')(d.data.value)}
      `

      tooltip.style.top = d3.event.pageY-25 + 'px'
      tooltip.style.left = d3.event.pageX+15 + 'px'

      tooltip.classList.add('show')
    })
    .on('mouseout', () => tooltip.classList.remove('show'))

  leaf.append('clip-path')
      .attr('id', d => d.clipUid = `clip-${d.leafUid}`)
    .append('use')
      .attr('href', d => `#${d.leafUid}`)
  
  leaf.append('text')
      .attr('clip-path', d => `#${d.clipUid}`)
      .attr('class', 'tile-text')
    .selectAll('tspan')
    .data(d => d.data.name.split(/(?=[A-Z][a-z])/g))
    .join('tspan')
      .attr('x', 4)
      .attr('y', (d, i) => `${1.1 + i * 0.9}em`)
      .text(d => d)
}

function displayLegend() {
  const legend = d3.select('#legend')
    .attr('width', SVG_LEGEND_MEASURES.width)
    .attr('height', SVG_LEGEND_MEASURES.height)

  const elems = legend.selectAll('g')
    .data(color.domain())
    .join('g')
      .attr('transform', (d, i) => {
        const x = i % SVG_LEGEND_MEASURES.elemsPerRow() * SVG_LEGEND_MEASURES.xSpacing
        const y = Math.floor(i / SVG_LEGEND_MEASURES.elemsPerRow()) * (SVG_LEGEND_MEASURES.rectSize + SVG_LEGEND_MEASURES.ySpacing) 
        return `translate(${x}, ${y})`
      })
    
  elems.append('rect')
    .attr('width', SVG_LEGEND_MEASURES.rectSize)
    .attr('height', SVG_LEGEND_MEASURES.rectSize)
    .attr('class', 'legend-item')
    .attr('fill', d => color(d))

  elems.append('text')
    .attr('x', SVG_LEGEND_MEASURES.rectSize + SVG_LEGEND_MEASURES.textMargin)
    .attr('y', SVG_LEGEND_MEASURES.rectSize - 2)
    .text(d => d)
}