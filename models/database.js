var mysql = require('mysql');
var path = require("path");
const Sequelize = require('sequelize');

var utils = require("./../utils/utils");

const node3 = new Sequelize('wdi', 'root', 'password', {
  dialect: 'sqlite',
  port: 3306,
  host: "172.20.10.9",
  storage: 'C:/advandb/wdi.sqlite/172.20.10.9'
});

const node1 = new Sequelize('wdi', 'root', 'password', {
  dialect: 'mysql',
  port: 3306,
  host: "172.20.10.14"
});

const node2 = new Sequelize('wdi', 'root', 'password', {
  dialect: 'mysql',
  port: 3306,
  host: "172.20.10.3"
});
var dataOut;
exports.service = [];

exports.initialize = initialize;
function initialize() {
   console.log("hi");
}

exports.service.getData = getData;
function getData(callback){
  /*poolCluster.getConnection('node3',function(err,connection){
    connection.beginTransaction(function(err) {
      if(err) {console.log("1");throw err;}
      //console.log("connect");
      connection.query('Select * from series_population'  , function (error, results, fields) {
        if (error) callback(err,null);
        //console.log('The solution is: ', results);
        //console.log(results);
        callback(null,results);
      });
    });
    //connection.release();
  }); */

  node3
  .query('SELECT * FROM all_countries', { raw: true, useMaster:true })
  .then(function(users) {
    callback(users);
    // We don't need spread here, since only the results will be returned for select queries
  });
}

exports.service.submitQuery = submitQuery;
function submitQuery(newQuery, callback) {
    /*poolCluster.getConnection('node3', function(err,connection) {
        connection.beginTransaction(function(err) {
            if(err) {throw err;}
            connection.query(newQuery, function (error, results, fields) {
                if (error) callback(error,null);
                callback(null,results);
            });
        });
    //connection.release();
    }); */
    node3
    .query(newQuery, { raw: true, type: node3.QueryTypes.SELECT})
    .then(function(users) {
      callback(users);
      // We don't need spread here, since only the results will be returned for select queries
    });
}