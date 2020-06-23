const got = require('got')
const MongoClient = require('mongodb').MongoClient
let collection

MongoClient.connect(process.env.MONGO_URI, {useUnifiedTopology: true})
  .then(client => {
    collection = client.db('stock-price').collection('likes')
  })
  .catch(err => console.error(err))

async function getPrice(stocks) {
  let stockPrices

  try {
    stockPrices = await Promise.all(
      stocks.map(st => got('https://repeated-alpaca.glitch.me/v1/stock/'+st+'/quote'))
    )

    stockPrices = stockPrices.map(a => {
      const body = JSON.parse(a.body)
      return { stock: body.symbol, price: body.latestPrice }
    })

    return stockPrices
  } catch (err) {
    console.log(err)
  }
}

async function getLikes(stocks) {
  try {
    const doc = await collection.find({ 'stock': { $in: stocks } }).toArray()

    if(doc.length < stocks.length) {
      const a = doc.find(el => el.stock == stocks[0])

      if(a) {
        doc.push({ stock: stocks[1], likes: 0 })
      } else {
        doc.push({ stock: stocks[0], likes: 0 })
      }
    }

    if(doc.length > 1) {
      doc[0].rel_likes = doc[0].likes - doc[1].likes
      doc[1].rel_likes = doc[1].likes - doc[0].likes
      doc.forEach(st => delete st.likes)
    }

    doc.forEach(stock => delete stock._id)

    return doc
  } catch(err) {
    console.log(err)
  }
}

async function updateLikes(stock) {
  const doc = await collection.updateOne({ stock },
    { $inc: {
      likes: 1
    }},
    { upsert: true }
  )
}

async function setLikes(stocks, liked) {
  try {
    for(let stock of stocks) {
      if(liked.includes(stock))
        continue
      
      updateLikes(stock)
    }

    return await getLikes(stocks)
  } catch(err) {
    console.log(err)
  }
}

async function getStock(data, liked) {
  try {
    const stocks = await getPrice(data.stock)
    let likes

    if(data.like) {
      likes = await setLikes(data.stock, liked)
    } else {
      likes = await getLikes(data.stock)
    }


    stocks.forEach(a => {
      const obj = likes.find(el => el.stock == a.stock)
      if(obj.likes) {
        a.likes = obj.likes
      } else {
        a.rel_likes = obj.rel_likes
      }
      a.price = ""+a.price
    })

    stockData = { stockData: stocks }

    return stockData
  } catch(err) {
    console.log(err)
  }
}

module.exports = {
  getStock
}