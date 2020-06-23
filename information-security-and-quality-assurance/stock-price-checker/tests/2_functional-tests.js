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
    
    suite('GET /api/stock-prices => stockData object', function() {
      const stock1 = 'goog'
      const stock2 = 'MSFT'
      let like1;
      let like2
      
      test('1 stock', function(done) {
       chai.request(server)
        .get('/api/stock-prices')
        .query({stock: stock1})
        .end(function(err, res){
          assert.equal(res.status, 200)
          assert.isObject(res.body)
          assert.equal(res.body.stockData[0].stock, stock1.toUpperCase())
          assert.property(res.body.stockData[0], 'price')
          assert.property(res.body.stockData[0], 'likes')
          like1 = res.body.stockData[0].likes
          done();
        });
      });
      
      test('1 stock with like', function(done) {
        chai.request(server)
          .get('/api/stock-prices')
          .query({ stock: stock1, like: true })
          .end(function(err, res) {
            assert.equal(res.status, 200)
            assert.isObject(res.body)
            assert.equal(res.body.stockData[0].stock, stock1.toUpperCase())
            assert.property(res.body.stockData[0], 'price')
            assert.equal(res.body.stockData[0].likes, like1+1)
            like1 = res.body.stockData[0].likes
            done()
          })
      });
      
      test('1 stock with like again (ensure likes arent double counted)', function(done) {
        chai.request(server)
          .get('/api/stock-prices')
          .set('Cookie', 'liked=j%3A%5B%22GOOG%22%5D')
          .query({ stock: stock1, like: true })
          .end(function(err, res) {
            assert.equal(res.status, 200)
            assert.isObject(res.body)
            assert.equal(res.body.stockData[0].stock, stock1.toUpperCase())
            assert.property(res.body.stockData[0], 'price')
            assert.equal(res.body.stockData[0].likes, like1)
            done()
          })
      });
      
      test('2 stocks', function(done) {
        chai.request(server)
          .get('/api/stock-prices')
          .query({ stock: [stock1, stock2] })
          .end(function(err, res) {
            assert.equal(res.status, 200)
            assert.isObject(res.body)
            assert.isArray(res.body.stockData)
            assert.property(res.body.stockData[0], 'stock')
            assert.property(res.body.stockData[0], 'price')
            assert.property(res.body.stockData[0], 'rel_likes')
            like1 = res.body.stockData[0].rel_likes
            done()
          })
      });
      
      test('2 stocks with like', function(done) {
        chai.request(server)
          .get('/api/stock-prices')
          .set('Cookie', 'liked=j%3A%5B%22GOOG%22%5D')
          .query({ stock: [stock1, stock2], like: true })
          .end(function(err, res) {
            assert.equal(res.status, 200)
            assert.isObject(res.body)
            assert.isArray(res.body.stockData)
            assert.equal(res.body.stockData[0].rel_likes, like1)
            done()
          })
      });
      
    });

});
