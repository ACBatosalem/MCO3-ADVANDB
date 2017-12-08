var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : '172.20.10.9',
  localAddress: '172.20.10.9',
  user     : 'root',
  password : 'password',
  database : 'wdi'
  
});


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
