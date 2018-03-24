"use strict";
var fs = require('fs');
var ConnectDB = require('../support/database');
var dbConnect = new ConnectDB();
var { defineSupportCode } = require("cucumber");

defineSupportCode(function({ Given, When, Then }) {

  Given('case data exists', function (next) {
    var sql = fs.readFileSync('test/sql/insert_cases.sql').toString();
    this.query = dbConnect.client.query(sql);
    this.query.on('end', function (result) { next();})
  });

  Given('there is no case data', function (next) {
    var sql = fs.readFileSync('test/sql/delete_cases.sql').toString();
    this.query = dbConnect.client.query(sql);
    this.query.on('end', function (result) { next();})
  });

});
