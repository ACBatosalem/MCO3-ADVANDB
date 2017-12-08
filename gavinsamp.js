var mysql      = require('mysql');
var node1 = mysql.createConnection({
  host     : '172.20.10.14',
  localAddress: '172.20.10.14',
  user     : 'root',
  password : 'password',
  database : 'college_admissions'
  
});

var mysql      = require('mysql');
var node2 = mysql.createConnection({
  host     : '172.20.10.14',
  localAddress: '172.20.10.14',
  user     : 'root',
  password : 'password',
  database : 'college_admissions'
  
});

var mysql      = require('mysql');
var node3 = mysql.createConnection({
  host     : '172.20.10.14',
  localAddress: '172.20.10.14',
  user     : 'root',
  password : 'password',
  database : 'college_admissions'
  
});

/*
connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + connection.threadId);
});

connection.query('select * from student' , function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results);
  });

connection.query('UPDATE student set name = "Gavin" where studID = "stud1"' , function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results);
  });

  connection.query('select * from student' , function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results);
  });
  */
  
  // create
var poolCluster = mysql.createPoolCluster();

// add configurations (the config is a pool config object)
poolCluster.add(config); // add configuration with automatic name
poolCluster.add('MASTER', masterConfig); // add a named configuration
poolCluster.add('SLAVE1', slave1Config);
poolCluster.add('SLAVE2', slave2Config);