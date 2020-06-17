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
const ObjectId = require('mongodb').ObjectId;
let collection;

MongoClient.connect(process.env.MONGO_URI, { useUnifiedTopology: true })
  .then(client => {
    collection = client.db('personal-library').collection('books')
  })
  .catch(err => console.error(err))

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

  app.route('/api/books')
    .get(async function (req, res){
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
      try {
        const doc = await collection.find().toArray()

        doc.forEach(obj => {
          obj.commentcount = obj.comments.length
          delete obj.comments
        })

        res.json(doc)
      } catch (err) {
        sendInternalError(res)
      }
    })
    
    .post(async function (req, res){
      const title = req.body.title;
      //response will contain new book object including atleast _id and title

      if(!title) {
        sendBadRequest(res, 'no title given')
        return
      }

      try {
        const doc = await collection.insertOne({ title, comments: [] })

        res.json(doc.ops[0])
      } catch {
        sendInternalError(res)
      }
    })
    
    .delete(async function(req, res){
      //if successful response will be 'complete delete successful'
      try {
        const doc = await collection.deleteMany({})

        res.send('complete delete successful')
      } catch {
        sendInternalError(res)
      }
    });



  app.route('/api/books/:id')
    .get(async function (req, res){
      const bookid = new ObjectId(req.params.id);
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}

      try {
        const doc = await collection.findOne({ _id: bookid })

        if(!doc) {
          sendBadRequest(res, 'no book exists')
          return
        }

        res.send(doc)
      } catch (err) {
        sendInternalError(res)
      }
    })
    
    .post(async function(req, res){
      const bookid = req.params.id;
      const comment = req.body.comment;
      //json res format same as .get

      try {
        const doc = await collection.findOneAndUpdate({
            _id: new ObjectId(bookid)
          },
          { $push: {
            comments: comment
          }},
          { $new: true })

        if(doc.lastErrorObject.updatedExisting) {
          res.send(doc.value)
        } else {
          sendBadRequest(res, 'no book exists')
        }
      } catch (err) {
        sendInternalError(res)
      }
    })
    
    .delete(async function(req, res){
      const bookid = req.params.id;
      //if successful response will be 'delete successful'

      try {
        const doc = await collection.deleteOne({ _id: new ObjectId(bookid) })

        if(doc.deletedCount == 0) {
          sendBadRequest('no book exists')
        } else {
          res.send('delete successful')
        }
      } catch {
        sendInternalError(res)
      }
    });
  
};
