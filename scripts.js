const cards = document.querySelectorAll('.galery .card')

cards.forEach(card => card.addEventListener('mouseenter', function(e) {
  for (const card of cards) {
    if(card == e.target) {
      card.classList.add('active')
    } else {
      card.classList.add('unactive')
    }
  }  
}))

cards.forEach(card => card.addEventListener('mouseleave', function(e) {
  for (const card of cards) {
    card.classList.remove('active', 'unactive')
  }
}))
