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

function sendInternalError(res, message = 'Database error') {
  res.status(500)
    .type('text')
    .send(message)
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
    
    .put(async function (req, res){
      const project = req.params.project;
      
      if(!req.body._id || Object.keys(req.body).length <= 1) {
        sendBadRequest(res, 'no updated field sent')
        return
      }

      const { _id, ...toUpdateFields } = req.body
      for(const key in toUpdateFields) {
        if(!toUpdateFields[key]) {
          delete toUpdateFields[key]
        }
      }

      try {
        const doc = await db.collection('issues').findAndModify(
          { _id: new ObjectId(_id) },
          {},
          { $set: {
            updated_on: new Date(),
            ...toUpdateFields
          }}
        )

        res.send('successfully updated')
      } catch (err) {
        console.error(err)
        sendInternalError(res, 'could not update '+_id)
      }
    })
    
    .delete(function (req, res){
      var project = req.params.project;
      
    });
    
};
