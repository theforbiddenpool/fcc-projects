/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

const expect = require('chai').expect;
const MongoClient = require('mongodb').MongoClient;
const stockHandler = require('../controllers/stockHandler')

function formatData(req, res, next) {
  if(Array.isArray(req.query.stock)) {
    req.query.stock = req.query.stock.map(a => a.toUpperCase())
  } else {
    req.query.stock = req.query.stock.toUpperCase()
    req.query.stock = [req.query.stock]
  }

  next()
}

module.exports = function (app) {

  app.route('/api/stock-prices')
    .get(formatData, async function (req, res) {
      let liked = req.cookies.liked

      if(!liked) {
        liked = []
      }
      
      const response = await stockHandler.getStock(req.query, liked)
      
      if(req.query.like) {
        liked = Array.from(new Set([...liked, ...req.query.stock]))
      }

      res.cookie('liked', liked, { maxAge: 900000 })
      res.json(response)
    });
    
};
