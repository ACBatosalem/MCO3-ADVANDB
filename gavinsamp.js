var mysql      = require('mysql');
var node1 = mysql.createPool({
  host     : '172.20.10.14',
  localAddress: '172.20.10.14',
  user     : 'root',
  password : 'password',
  database : 'wdi'
});

/*node1.getConnection(function(err, connection){
  connection.query('select * from series_population' , function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results);
    connection.release();
  });
});*/
var node2 = mysql.createPool({
  host     : '172.20.10.3',
  localAddress: '172.20.10.3',
  user     : 'root',
  password : 'password',
  database : 'wdi'
});

/*node2.getConnection(function(err, connection){
  connection.query('select * from series_population' , function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results);
    connection.release();
  });
});*/

var poolCluster = mysql.createPoolCluster();

// add configurations (the config is a pool config object)
poolCluster.add('node1', {
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
});

//for(i = 1; i <4; i++) {
  /*
  poolCluster.getConnection('node1',function(err,connection){
    if(err) {console.log("1");throw err;}
    console.log("connect");
    connection.query('Select * from data_by_year_population'  
      , function (error, results, fields) {
      if (error) throw error;
      console.log(connection.threadId);
      console.log('The solution is: ', results);
      connection.release();
    });
  }); 
*/

 poolCluster.getConnection('node1',function(err,connection){
  connection.beginTransaction(function(err) {
    if(err) {console.log("1");throw err;}
    console.log("connect");
    connection.query('Select * from data_by_year_population'  
      , function (error, results, fields) {
      if (error) throw error;
      console.log(connection.threadId);
      console.log('The solution is: ', results);
      connection.release();
    });
  });
  }); 
//}

/*var pool = poolCluster.of('node*','ORDER');
pool.getConnection(function (err,connection){
  if(err) {console.log("2");throw err;}
  console.log("connect2");
});
pool.getConnection(function (err,connection){
  if(err) {console.log("3");throw err;}
  console.log("connect3");
});
pool.query('select * from series_population', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', fields);
  });

/*poolCluster.getConnection(function(err, connection){
  connection.query('select * from series_population' , function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results);
  });
});*/