/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

const expect = require('chai').expect;
const threadHandler = require('../controllers/threadHandler')

module.exports = function (app) {
  
  app.route('/api/threads/:board')
    .post(async (req, res) => {
      try {
        await threadHandler.newThread({ ...req.body, board: req.params.board })
        res.redirect(301, '/b/'+req.params.board)
      } catch(err) {
        console.error(err)
        res.status(500)
          .type('text')
          .send('Interal Error')
      }
    })

    .get(async (req, res) => {
      try {
        const threads = await threadHandler.getAllTheards(req.params.board)
        res.json(threads)
      } catch(err) {
        console.error(err)
      }
    })

    .delete(async (req, res) => {
      try {
        const result = await threadHandler.deleteThread(req.body)

        console.log(result)

        if(result) {
          res.send('success')
        } else {
          res.send('incorrect password')
        }
      } catch(err) {
        console.error(err)
      }
    })

    .put(async (req, res) => {
      try {
        const result = await threadHandler.reportThread(req.body.thread_id)
        
        if(result) {
          res.send('success')
        }
      } catch(err) {
        console.error(err)
      }
    })
    
  app.route('/api/replies/:board')
    .post(async (req, res) => {
      try {
        await threadHandler.newReply({ ...req.body })
        res.redirect(301, '/b/'+req.params.board+'/'+req.body.thread_id)
      } catch(err) {
        console.error(err)
      }
    })

    .get(async (req, res) => {
      try {
        const thread = await threadHandler.getThread(req.query.thread_id)
        res.json(thread)
      } catch(err) {
        console.error(err)
      }
    })

    .delete(async (req, res) => {
      try {
        const result = await threadHandler.deleteReply(req.body)

        if(result) {
          res.send('success')
        } else {
          res.send('incorrect password')
        }
      } catch(err) {
        console.error(err)
      }
    })

    .put(async (req, res) => {
      try {
        const result = threadHandler.reportReply(req.body)

        if(result) {
          res.send('success')
        }
      } catch(err) {
        console.error(err)
      }
    })
};
