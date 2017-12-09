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
    replication: {
      read: [
        { host: '/*ip nung other comp*/', username:'root', password:'password', database:'wdi'}
      ],
      write: { host: '/*ip nung comp mo*/'}
    }
    
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
sequelize
.query('UPDATE all_countries set data = 22 where ID = 1', { raw: true, useMaster:true })
.then(projects => {
    data = projects;
  console.log(projects);
});
