const express = require('express');
const app = express();
path = require("path");
const db_template = require("db-template");
const mysql = require('mysql');
const authRouter = require('./routes/auth');
const dotenv = require('dotenv');
fs = require("fs");
parser = require("xml-js");
const apiRouter = require('./routes/api');


CMS_POOL = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root@123',
  port: '3306',
  database: 'proqmax',
  connectionLimit: '5000',
  connectTimeout: 50000
});


app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With,Content-Type,Authorization,x-access-token, CSRF-TOKEN"
  );
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
executeQuery = db_template(CMS_POOL);
CMS_POOL.on('connection', function (connection) {
  console.log('Connection Acquired');

});
CMS_POOL.on('acquire', function (connection) {
  console.log('Connection %d acquired', connection.threadId);
});

CMS_POOL.on('enqueue', function () {
  console.log('Waiting for available connection slot');
});

CMS_POOL.on('release', function (connection) {
  console.log('Connection %d released', connection.threadId);
});

const content = fs.readFileSync(__dirname + "/sql-queries.xml");

const json = parser.xml2json(content, {
  sanitize: false
});


const sqlQueries = JSON.parse(json)["elements"][1].elements;
sqlQueryMap = {};

for (var i = 0; i < sqlQueries.length; i++) {
  if (sqlQueries[i]["attributes"]) {
    sqlQueryMap[sqlQueries[i]["attributes"]["id"]] =
      sqlQueries[i]["elements"][0]["cdata"];
  }
}


app.use('/api', apiRouter);
app.use('/api/auth', authRouter);





//Health and Logger

app.listen(3000, () => {
  console.log(`app listening on port ` + 3000)
});
