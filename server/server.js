const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const dbMySQL = require('./../db/dbMySQL.js');
const dbCassandra = require('./../db/dbCassandra.js');
// const db = require('./../db/db.js')
const url = require('url-parse');
const currentUrl = url();
const path = require('path');
// const pool = require('./../db/dbPool.js')

app.use(express.static('./client/dist'))

app.get('/:id', (req, res) => {
  res.sendFile(path.join(__dirname + './../client/dist/index.html'));
});

app.get('/highlights/:iterator', (req, res) => {
  // var iterator = req.params.iterator;
  // var query = `select sentence, keyword, count, photo_url, is_business_photo from highlight where iterator = ${iterator} order by count desc`;
  // dbMySQL.query(query, (err, rows, fields) => {
  //   if (err) throw err;
  //   res.send(rows);
  // })
  res.send('test')
});

// LOAD-TEST MySQL
app.get('/highlights/mySQL/:iterator', (req, res) => {
  var iterator = req.params.iterator;
  var query = `select sentence, keyword, count, photo_url, is_business_photo from highlight where iterator = ${iterator} order by count desc`;
  dbMySQL.query(query, (err, rows, fields) => {
    if (err) throw err;
    res.send(rows);
  })
});

// LOAD-TEST Cassandra
app.get('/highlights/Cassandra/:iterator', (req, res) => {
  var iterator = req.params.iterator;
  var query = `select sentence, keyword, count, photo_url, is_business_photo from highlight where iterator = ${iterator} order by count desc`;
  dbCassandra.execute(query, (err, result) => {
    if (err) throw err;
    res.send(result.rows);
  })
});

app.listen(3003, () => {
  console.log('Sever is currently running on port 3003!')
})
