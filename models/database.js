var mysql = require('mysql');
var path = require("path");

var utils       = require("./../utils/utils");

var poolCluster;
var dataOut;
exports.service = [];

exports.initialize = initialize;
function initialize() {
    poolCluster = mysql.createPoolCluster();
    console.log("eyyy");
    // add configurations (the config is a pool config object)
 /*   poolCluster.add('node1', {
      host     : '172.20.10.14',
      localAddress: '172.20.10.14',
      user     : 'root',
      password : 'password',
      database : 'wdi'
    }); // add a named configuration
    poolCluster.add('node2', {
      host     : '172.20.10.3',
      localAddress: '172.20.10.3',
      user     : 'root',
      password : 'password',
      database : 'wdi'
    });
    
    poolCluster.add('node3', {
      host     : '172.20.10.9',
      localAddress: '172.20.10.9',
      user     : 'root',
      password : 'password',
      database : 'wdi'
    });*/
    poolCluster.add('node3', {
      //host     : 'localhost',
      //localAddress: '172.20.10.9',
      user     : 'root',
      password : 'root',
      database : 'wdi'
    });
}

exports.service.getData = getData;

function getData(callback){
  poolCluster.getConnection('node3',function(err,connection){
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
  }); 
  
}
