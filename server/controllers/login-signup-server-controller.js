'use strict';
/* global require,module, console*/
let q = require('q');
let config = require('../config/config.js');
let mysql = require('mysql');
let crypto = require('crypto');
let hasher = require('../lib/hasher.js');
let moment = require('moment');

let connInfo = config.sqlconn;
connInfo.multipleStatements = true;

function getHashedPassword(password) {
  var defer = q.defer();
  hasher.hash({
    password: password,
    salt: config.salt
  }, function (result) {
    defer.resolve(result.hash);
  });
  return defer.promise;
}

function checkIfEmailAvailable(email) {

  let deferred = q.defer();
  let connection = mysql.createConnection(connInfo);
  let query = "select count(*) as count from users where email = ?;";
  connection.query(query, [email], function (err, results) {
    if (err) {
      deferred.reject(err);
    } else {
      var count = results[0].count;
      if (count === 0) {
        deferred.resolve(true);
      } else {
        deferred.resolve(false);
      }
    }

  });
  connection.end();
  return deferred.promise;
}

function createUser(email, password, name, accessToken) {


  let deferred = q.defer();
  let connection = mysql.createConnection(connInfo);

  let query = "insert into users(email,password,name,accessToken) values(?,?,?,?);";
  connection.query(query, [email, password, name, accessToken], function (err) {
    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve();
    }

  });
  connection.end();
  return deferred.promise;

}

function generateAccessTokenAndCreateUser(email, password, name) {

  let deferred = q.defer();
  let token;
  generateAccesToken().then(function (accessToken) {
    token = accessToken;
    return getHashedPassword(password);
  }).then(function (hashedPassword) {

    return createUser(email, hashedPassword, name, token);

  }).then(function () {
    deferred.resolve(token);
  }, function (err) {
    deferred.reject(err);
  });
  return deferred.promise;
}

var signUp = (req, res) => {

  let email = req.body.email;
  let password = req.body.password;
  let name = req.body.name;

  checkIfEmailAvailable(email).then(function (isEmailAvailable) {

    if (!isEmailAvailable) {
      res.status(409).send();
    } else {
      return generateAccessTokenAndCreateUser(email, password, name);
    }
  }).then(function (token) {

    let userDetails = {
      user: {
        email: email,
        name: name
      },
      accessToken: token
    };
    res.send(userDetails);

  }, function (err) {
    console.log(err);
    winston.error("error in user sign up" + err);
    res.status(500).send();
  });

};

function generateAccesToken() {

  let deferred = q.defer();
  crypto.randomBytes(48, function (err, buffer) {
    if (err) {
      deferred.reject(err);
    } else {
      let token = buffer.toString('hex');
      deferred.resolve(token);
    }
  });
  return deferred.promise;

}

function modifyAccessTokenOfUser(email, newAccessToken) {

  let deferred = q.defer();
  let connection = mysql.createConnection(connInfo);
  let query = "update users set accesstoken = ? where email = ?;";
  connection.query(query, [newAccessToken, email], function (err) {
    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve();
    }
  });
  connection.end();
  return deferred.promise;

}

function getUserData(email) {

  let deferred = q.defer();
  let connection = mysql.createConnection(connInfo);
  let query = "select email,name,accesstoken from users where email = ?;";
  connection.query(query, [email], function (err, results) {
    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve(results[0]);
    }
  });
  connection.end();
  return deferred.promise;

}

function getUserDetailsWithNewAccessToken(email) {

  let deferred = q.defer();
  generateAccesToken().then(function (newAccessToken) {

    return modifyAccessTokenOfUser(email, newAccessToken);

  }).then(function () {

    return getUserData(email);

  }).then(function (userDetails) {

    deferred.resolve(userDetails);

  }, function (err) {
    deferred.reject(err);
  });

  return deferred.promise;

}

function checkLoginCredentials(email, password) {

  let deferred = q.defer();
  let connection = mysql.createConnection(connInfo);
  let query = "select email,name,accesstoken from users where email = ? and password = ?;";
  var sql = connection.query(query, [email, password], function (err, results) {
    if (err) {
      deferred.reject(err);
    } else {
      if (results[0]) {
        deferred.resolve(results[0]);
      } else {
        deferred.resolve();
      }
    }

  });
  console.log(sql.sql);
  connection.end();
  return deferred.promise;

}

function validateUser(email, password) {

  let deferred = q.defer();

  getHashedPassword(password).then(function (hashedPassword) {

    return checkLoginCredentials(email, hashedPassword);

  }).then(function (userDetails) {
    if (userDetails) {
      deferred.resolve(true);
    } else {
      deferred.resolve(false);
    }

  }, function (err) {

    deferred.reject(err);
  });

  return deferred.promise;

}


var logIn = (req, res) => {

  let email = req.body.email;
  let password = req.body.password;

  validateUser(email, password).then(function (isValid) {


    if (isValid) {
      return getUserDetailsWithNewAccessToken(email);
    } else {
      res.status(401).send();
    }

  }).then(function (userDetails) {


    let user = {
      user: {
        email: userDetails.email,
        name: userDetails.name
      },
      accessToken: userDetails.accesstoken
    };
    res.status(200).send(user);
  }, function (err) {
    console.log("------error", err);
    res.status(500).send(err);

  });

};


module.exports = {
  signUp,
  logIn
};