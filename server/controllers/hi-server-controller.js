'use strict';
/* global require,module*/
let q = require('q');
let config = require('../config/config.js');
let mysql = require('mysql');
let connInfo = config.sqlconn;
connInfo.multipleStatements = true;



let newHi = (req, res) => {

  // let data = req.body.data;

  console.log("-----",req.user);

  let connection = mysql.createConnection(connInfo);
  let query = "insert into messages(sent_by_user_id,sent_to_user_id,time) values(?,?,?)";
  let params = [req.user.user_id, req.body.sendTo,new Date()];
  connection.query(query, params, function (err) {

    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send();
    }

  });
  connection.end();

};


let getAllHi = (req, res) => {

  let userId = req.user.user_id;

  let params = [];

  let connection = mysql.createConnection(connInfo);
  let query = `select name as sender,time as sentOn from messages m 
               left join users u on m.sent_by_user_id = u.user_id 
               where m.sent_to_user_id = ? order by sentOn desc;`;
  params.push(userId);
  let sql = connection.query(query, params, function (err, results) {

    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(results);
    }

  });
  console.log(sql.sql);
  connection.end();

};

let getAllUsers = (req, res) => {

  let userId = req.user.user_id;

  let params = [];

  let connection = mysql.createConnection(connInfo);
  let query = "select user_id,email,name from users where user_id != ?;";
  params.push(userId);
  let sql = connection.query(query, params, function (err, results) {

    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(results);
    }

  });
  console.log(sql.sql);
  connection.end();

};



module.exports = {
  newHi,
  getAllHi,
  getAllUsers
};