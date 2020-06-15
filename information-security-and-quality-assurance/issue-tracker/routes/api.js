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
    
    .post(async function (req, res){
      const project = req.params.project;
      
      if(!req.body.issue_title || !req.body.issue_text || !req.body.created_by) {
        sendBadRequest(res, 'required fields missing')
        return
      }

      try {
        const doc = await db.collection('issues').insertOne({
          project,
          ...req.body,
          created_on: new Date(),
          updated_on: new Date(),
          open: true
        })
        
        res.json(doc.ops[0])
      } catch {
        sendInternalError(res)
      }
    })
    
    .put(function (req, res){
      var project = req.params.project;
      
    })
    
    .delete(function (req, res){
      var project = req.params.project;
      
    });
    
};
