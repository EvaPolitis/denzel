const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const {PORT} = require('./constants');
const assert = require('assert');
const BodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;

const fs = require('fs');
const imdb = require('./imdb');
const DENZEL_IMDB_ID = 'nm0000243';
const app = express();

const CONNECTION_URL = "mongodb+srv://dbEva:<Kill:Bill1>@clusterdenzel-fjizr.gcp.mongodb.net/test?retryWrites=true&w=majority";
const DATABASE_NAME = "imdb";

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

var database, collection;

app.listen(PORT, () => {
  console.log(`📡 Running on port ${PORT}`)
  MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
    if(error) {
      throw error;
    }
    database = client.db(DATABASE_NAME);
    collection = database.collection("people");
    console.log("Connected to `" + DATABASE_NAME + "`!");
  });
});


module.exports = app;

app.use(require('body-parser').json());
app.use(cors());
app.use(helmet());

app.options('*', cors());

app.get('/', (request, response) => {
  response.send({'ack': true});
});
