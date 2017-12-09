const Sequelize = require('sequelize');
const sequelize = new Sequelize('wdi', 'root', 'password', {
    host: '192.168.254.104',
    dialect: 'mysql',
    pool: { // If you want to override the options used for the read/write pool you can do so here
        max: 20,
        idle: 60000,
        maxIdleTime: 60000,
        acquire: 60000
      }
    //storage: 'C:/advandb/wdi.sqlite'
});
/*const sequelize = new Sequelize('wdi', 'root', 'password', {
    dialect: 'mysql',
    port: 3306,
    replication: {
      read: [
        { host: '192.168.254.104'}
      ],
      write: { host: '192.168.254.103'}
    }
    
  });*/

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
.query('SELECT * FROM sample', { raw: true })
.then(projects => {
    data = projects;
  console.log(projects);
});*/
