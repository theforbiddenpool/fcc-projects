'use strict';

const express = require('express');
const mongo = require('mongodb');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

const cors = require('cors');
const crypto = require('crypto')

const app = express();

// Basic Configuration 
const port = process.env.PORT || 3000;

/** this project needs a db !! **/ 
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());

/** this project needs to parse POST bodies **/
// you should mount the body-parser here'
app.use(bodyParser.urlencoded({ extend: false }))

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(req, res){
  res.sendFile(process.cwd() + '/views/index.html');
});

  
// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

const urlSchema = new mongoose.Schema({
  original: String,
  short: String
}, { collection: 'urls' })
const Url = mongoose.model('Url', urlSchema)
const shasum = crypto.createHash('sha1')

function saveUrl(url) {
  url.save()
}

app.post('/api/shorturl/new', (req, res) => {
  const urlRegex = /https?:\/\/www.\w+\.\w+((\/\w*)+)?/
  const original = req.body.url
  
  try {
    if(!urlRegex.test(original)) throw new Error('invalid URL')
    
    const short = shasum.update(original).digest('hex').substring(1,15)
  
    const url = new Url({original, short})
    url.save()
      .then(data => res.json({
        original_url: data.original,
        short_url: data.short
      }))
      .catch(err => { throw err })    
  } catch(err) {
    res.json({
      error: err.message
    })
  }
})

app.get('/api/shorturl/:hash', (req, res) => {
  const short = req.params.hash
  
  Url.findOne({ short })
    .then(data => res.redirect(data.original))
    .catch(err => res.json({ error: err.message }))
})

app.listen(port, function () {
  console.log('Node.js listening ...');
});