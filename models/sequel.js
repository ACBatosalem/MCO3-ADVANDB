const Sequelize = require('sequelize');
/*const sequelize = new Sequelize('wdi', 'root', 'password', {
    host: '192.168.254.104',
    dialect: 'mysql',
    pool: { // If you want to override the options used for the read/write pool you can do so here
        max: 20,
        idle: 60000,
        maxIdleTime: 60000,
        acquire: 60000
      }
    //storage: 'C:/advandb/wdi.sqlite'
});*/
const sequelize = new Sequelize('wdi', 'root', 'password', {
    dialect: 'mysql',
    port: 3306,
    host: '172.20.10.9'
    
  });

sequelize
.authenticate()
.then(() => {
  console.log('Connection has been established successfully.');
})
.catch(err => {
  console.error('Unable to connect to the database:', err);
});
var data;
/*sequelize
.query('SELECT * FROM all_countries', { raw: true, useMaster:true })
.then(projects => {
    data = projects;
  console.log(projects);
});*/


return sequelize.transaction(function (t) {
  
    // chain all your queries here. make sure you return them.
    return sequelize
    .query('SELECT * FROM all_countries', { raw: true}).spread(function(results, metadata) {
      // Results will be an empty array and metadata will contain the number of affected rows.
    })
  
  }).then(function (result) {
      console.log(result);
    // Transaction has been committed
    // result is whatever the result of the promise chain returned to the transaction callback
  }).catch(function (err) {
    // Transaction has been rolled back
    // err is whatever rejected the promise chain returned to the transaction callback
  });
