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
const ObjectId = require('mongodb').ObjectID;
let db;

MongoClient.connect(process.env.MONGO_URI)
  .then(client => db = client.db('issue-tracker'))
  .catch(error => console.error(err))

function sendBadRequest(res, message) {
  res.status(400)
    .type('text')
    .send(message)
}

function sendInternalError(res) {
  res.status(500)
    .type('text')
    .send('Database error')
}

module.exports = function (app) {

  app.route('/api/issues/:project')
  
    .get(function (req, res){
      var project = req.params.project;
      
    })
    
    .post(function (req, res){
      var project = req.params.project;
      
    })
    
    .put(function (req, res){
      var project = req.params.project;
      
    })
    
    .delete(function (req, res){
      var project = req.params.project;
      
    });
    
};
