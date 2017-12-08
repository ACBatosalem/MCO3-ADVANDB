var mysql      = require('mysql');
var connection = mysql.createConnection({
 // host     : 'localhost',
  //localAddress: '172.20.10.14',
  user     : 'root',
  password : 'root',
  database : 'wdi'
  
});

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + connection.threadId);
});

connection.query('select * from series_population' , function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results);
  });

