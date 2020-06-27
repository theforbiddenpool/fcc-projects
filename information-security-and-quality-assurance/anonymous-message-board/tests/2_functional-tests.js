/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       (if additional are added, keep them at the very end!)
*/

const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  
  suite('API ROUTING FOR /api/threads/:board', function() {
    
    test('POST', function(done) {
      chai.request(server)
        .post('/api/threads/test')
        .send({ text: 'This is a test thread', delete_password: '12345' })
        .end((err, res) => {
          assert.equal(res.status, 200)
          done()
        })
    });
    
    test('GET', function(done) {
      chai.request(server)
        .get('/api/threads/test')
        .end((err, res) => {
          assert.equal(res.status, 200)
          assert.isArray(res.body)
          assert.isAtMost(res.body.length, 10)
          assert.property(res.body[0], 'text')
          assert.property(res.body[0], 'replies')
          assert.isAtMost(res.body[0].replies.length, 3)
          assert.notProperty(res.body[0], 'reported')
          assert.notProperty(res.body[0], 'delete_passwords')
          done()
        })
    });
    
    test('DELETE', function(done) {
      chai.request(server)
        .delete('/api/threads/test')
        .send({ thread_id: '5ef75bb09234558e53285994', delete_password: '12345' })
        .end((err, res) => {
          assert.equal(res.status, 200)
          assert.equal(res.text, 'success')
          done()
        })
    });
    
    test('PUT', function(done) {
      chai.request(server)
        .put('/api/threads/test')
        .send({ thread_id: '5ef75c781351058e8821626a' })
        .end((err, res) => {
          assert.equal(res.status, 200)
          assert.equal(res.text, 'success')
          done()
        })
    });
    

  });
  
  suite('API ROUTING FOR /api/replies/:board', function() {
    
    test('POST', function(done) {
      chai.request(server)
        .post('/api/replies/test')
        .send({ thread_id: '5ef75b32a0d7ab8dff27b5d5', text: 'This is a test reply', delete_password: '12345' })
        .end((err, res) => {
          assert.equal(res.status, 200)
          done()
        })
      
    });
    
    test('GET', function(done) {
      chai.request(server)
        .get('/api/replies/test')
        .query({ thread_id: '5ef75b32a0d7ab8dff27b5d5' })
        .end((err, res) => {
          assert.equal(res.status, 200)
          assert.equal(res.body._id, '5ef75b32a0d7ab8dff27b5d5')
          assert.notProperty(res.body, 'delete_password')
          assert.notProperty(res.body, 'reported')
          done()
        })
    });
    
    test('PUT', function(done) {
      chai.request(server)
        .put('/api/replies/test')
        .send({ thread_id: '5ef75b32a0d7ab8dff27b5d5', reply_id: '5ef75b92a0c68e8e3249856d' })
        .end((err, res) => {
          assert.equal(res.status, 200)
          assert.equal(res.text, 'success')
          done()
        })
    });
    
    test('DELETE', function(done) {
      chai.request(server)
        .delete('/api/replies/test')
        .send({ thread_id: '5ef75b32a0d7ab8dff27b5d5', delete_password: '12345', reply_id: '5ef75b92a0c68e8e3249856d'})
        .end((err, res) => {
          assert.equal(res.status, 200)
          assert.equal(res.text, 'success')
          done()
        })
    });
    
  });

});
