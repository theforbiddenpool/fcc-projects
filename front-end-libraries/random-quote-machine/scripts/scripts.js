let quote = null
const quoteSymbol = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M13 14.725c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275zm-13 0c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275z"/></svg>`
let hue = 0;

async function newQuote(e) {
  const {textEl, authorEl} = e.currentTarget.args

  try {
    quote = await fetchQuote()

    document.documentElement.style.setProperty('--main-color', `hsl(${hue = (hue + 15) % 360}, 70%, 70%)`)
    textEl.innerHTML = `${quoteSymbol} ${quote.content}`
    authorEl.textContent = `- ${quote.author}`

  } catch(err) {
    console.error(err)
    textEl.textContent = `It wasn't possible to load the quote. Try again later.`
    authorEl.textContent = ''
  }
}

function fetchQuote() {
  return fetch('https://api.quotable.io/random?maxlength=200')
    .then(response => handleResponse(response))
    .then(data => (quote && data._id == quote._id) ? fetchQuote() : data)
    .catch(error => { throw error })
}

function handleResponse(response) {
  if(!response.ok)
    throw new Error(`${response.statusText} (${response.status})`)
  
  return response.json()
}

document.addEventListener('DOMContentLoaded', () => {
  const quoteText = document.querySelector('#text')
  const quoteAuthor = document.querySelector('#author')
  const twitterShare = document.querySelector('#tweet-quote')
  const newQuoteButton = document.querySelector('#new-quote')

  newQuoteButton.args = {
    textEl: quoteText,
    authorEl: quoteAuthor
  }

  newQuoteButton.addEventListener('click', newQuote)

  newQuoteButton.click()
})