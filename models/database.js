var mysql = require('mysql');
var path = require("path");
const Sequelize = require('sequelize');
var pragma = "PRAGMA journal_mode = TRUNCATE; ";
var utils = require("./../utils/utils");
const nodeNum = 3;
const node3 = new Sequelize('wdi', 'root', 'password', {
  dialect: 'sqlite',
  port: 3306,
  host: "172.20.10.9",
  storage: 'C:/Users/Angel/Music/advandb/wdi.sqlite'
  
});

const node1 = new Sequelize('wdi', 'root', 'password', {
  dialect: 'mysql',
  port: 3306,
  host: "172.20.10.14",
  dialectOptions: {
    multipleStatements: true
  }
});

const node2 = new Sequelize('wdi', 'root', 'password', {
  dialect: 'mysql',
  port: 3306,
  host: "172.20.10.3",
  dialectOptions: {
    multipleStatements: true
  }
});
var dataOut;
exports.service = [];

exports.initialize = initialize;
function initialize() {
   console.log("hi");
}

exports.service.getData = getData;
function getData(callback){

  node3
  .query('SELECT * FROM all_countries', { raw: true, useMaster:true })
  .then(function(users) {
    callback(users);
    // We don't need spread here, since only the results will be returned for select queries
  });
}

exports.service.submitSelectQuery = submitSelectQuery;
function submitSelectQuery(newQuery, node, checked,callback) {
  if((nodeNum == 1 && (node == "all_countries" || node == "asia_africa")) ||
      (nodeNum == 3 && node == "all_countries")) {
    return node1.transaction(function (t) {

    return node1.query(newQuery,{raw: true,type: node3.QueryTypes.SELECT}).then(function(results) {
        if(checked == "yes")
          throw new Error("Crashed");
        callback(results);
    })

    }).then(function (result) {
        console.log(result);
    }).catch(function (err) {
      callback(err);
    });
  } else if((nodeNum == 2 && (node == "all_countries" || node == "europe_america")) ||
    (nodeNum == 1 && node == "europe_america")){
    return node2.transaction(function (t) {

    return node2.query(newQuery,{raw: true,type: node3.QueryTypes.SELECT}).then(function(results) {
      if(checked == "yes")
        throw new Error("Crashed");
      callback(results);
    })

    }).then(function (result) {
        console.log(result);
    }).catch(function (err) {
      callback(err);
    });
  } else if((nodeNum == 3 && (node == "asia_africa" || node == "europe_america")) ||
    (nodeNum == 2 && node == "asia_africa")){
    return node3.transaction(function (t) {

    return node3.query(newQuery,{raw: true,type: node3.QueryTypes.SELECT}).then(function(results) {
      if(checked == "yes")
        throw new Error("Crashed");
      callback(results);
    })

    }).then(function (result) {
        console.log(result);
    }).catch(function (err) {
      callback(err);
    });
  } //else callback("DATABASE NOT AVAILABLE ON THIS NODE");
}


exports.service.submitInsertQuery = submitInsertQuery;
function submitInsertQuery(allQuery, europeQuery, asiaQuery, node, checked,callback) {
  if(node == "all_countries") {
    return (node1.transaction(function (t) {

      return node1.query(allQuery + asiaQuery,{raw: true,type: node1.QueryTypes.INSERT}).then(function(results) {
        if(checked == "yes")
          throw new Error("Crashed");
          //callback(results);
      })

      }).then(function (result) {
          callback(result);
      }).catch(function (err) {
        callback(err);
      }) && 
    node2.transaction(function (t) {
      return node2.query(europeQuery + allQuery,{raw: true,type: node2.QueryTypes.INSERT}).then(function(results) {
        if(checked == "yes")
        throw new Error("Crashed");
        //callback(results);
        })
      }).then(function (result) {
          callback(result);
      }).catch(function (err) {
          callback(err);
      }) && 
      node3.transaction(function (t) {
        return node3.query(pragma + asiaQuery + europeQuery,{raw: true,type: node3.QueryTypes.INSERT}).then(function(results) {
          if(checked == "yes")
          throw new Error("Crashed");
          //callback(results);
          })
        }).then(function (result) {
            callback(result);
        }).catch(function (err) {
            callback(err);
        }));
  } else if(node == "europe_america"){
    return (node1.transaction(function (t) {
      
            return node1.query(allQuery,{raw: true,type: node1.QueryTypes.INSERT}).then(function(results) {
              if(checked == "yes")
              throw new Error("Crashed");
                //callback(results);
            })
      
            }).then(function (result) {
                callback(result);
            }).catch(function (err) {
              callback(err);
            }) && 
          node2.transaction(function (t) {
            return node2.query(europeQuery + allQuery,{raw: true,type: node2.QueryTypes.INSERT}).then(function(results) {
              if(checked == "yes")
                throw new Error("Crashed");
              //callback(results);
              })
            }).then(function (result) {
                callback(result);
            }).catch(function (err) {
                callback(err);
            }) && 
            node3.transaction(function (t) {
              return node3.query(pragma + europeQuery,{raw: true,type: node3.QueryTypes.INSERT}).then(function(results) {
                if(checked == "yes")
                throw new Error("Crashed");
                //callback(results);
                })
              }).then(function (result) {
                  callback(result);
              }).catch(function (err) {
                  callback(err);
              }));
  } else if(node == "asia_africa"){
    return (node1.transaction(function (t) {
      
            return node1.query(allQuery + asiaQuery,{raw: true,type: node1.QueryTypes.INSERT}).then(function(results) {
              if(checked == "yes")
              throw new Error("Crashed");
                //callback(results);
            })
      
            }).then(function (result) {
                callback(result);
            }).catch(function (err) {
              callback(err);
            }) && 
          node2.transaction(function (t) {
            return node2.query(allQuery,{raw: true,type: node2.QueryTypes.INSERT}).then(function(results) {
              if(checked == "yes")
              throw new Error("Crashed");
              //callback(results);
              })
            }).then(function (result) {
                callback(result);
            }).catch(function (err) {
                callback(err);
            }) && 
            node3.transaction(function (t) {
              return node3.query(pragma + asiaQuery,{raw: true,type: node3.QueryTypes.INSERT}).then(function(results) {
                if(checked == "yes")
                throw new Error("Crashed");
                //callback(results);
                })
              }).then(function (result) {
                  callback(result);
              }).catch(function (err) {
                  callback(err);
              }));
  } //else callback("DATABASE NOT AVAILABLE ON THIS NODE");
}

exports.service.submitUpdateQuery = submitUpdateQuery;
function submitUpdateQuery(allQuery, europeQuery, asiaQuery, node, checked,callback) {
  if(node == "all_countries") {
    return (node1.transaction(function (t) {

      return node1.query(allQuery + asiaQuery,{raw: true,type: node1.QueryTypes.UPDATE}).then(function(results) {
        if(checked == "yes")
        throw new Error("Crashed");
          //callback(results);
      })

      }).then(function (result) {
          callback(result);
      }).catch(function (err) {
        callback(err);
      }) && 
    node2.transaction(function (t) {
      return node2.query(europeQuery + allQuery,{raw: true,type: node2.QueryTypes.UPDATE}).then(function(results) {
        if(checked == "yes")
        throw new Error("Crashed");
        //callback(results);
        })
      }).then(function (result) {
          callback(result);
      }).catch(function (err) {
          callback(err);
      }) && 
      node3.transaction(function (t) {
        return node3.query(pragma + asiaQuery + europeQuery,{raw: true,type: node3.QueryTypes.UPDATE}).then(function(results) {
          if(checked == "yes")
          throw new Error("Crashed");
          //callback(results);
          })
        }).then(function (result) {
            callback(result);
        }).catch(function (err) {
            callback(err);
        }));
  } else if(node == "europe_america"){
    return (node1.transaction(function (t) {
      
            return node1.query(allQuery,{raw: true,type: node1.QueryTypes.UPDATE}).then(function(results) {
              if(checked == "yes")
              throw new Error("Crashed");
               // callback(results);
            })
      
            }).then(function (result) {
                callback(result);
            }).catch(function (err) {
              callback(err);
            }) && 
          node2.transaction(function (t) {
            return node2.query(europeQuery + allQuery,{raw: true,type: node2.QueryTypes.UPDATE}).then(function(results) {
              if(checked == "yes")
              throw new Error("Crashed");
              //callback(results);
              })
            }).then(function (result) {
                callback(result);
            }).catch(function (err) {
                callback(err);
            }) && 
            node3.transaction(function (t) {
              return node3.query(pragma + europeQuery,{raw: true,type: node3.QueryTypes.UPDATE}).then(function(results) {
                if(checked == "yes")
                throw new Error("Crashed");
               // callback(results);
                })
              }).then(function (result) {
                  callback(result);
              }).catch(function (err) {
                  callback(err);
              }));
  } else if(node == "asia_africa"){
    return (node1.transaction(function (t) {
      
            return node1.query(allQuery + asiaQuery,{raw: true,type: node1.QueryTypes.UPDATE}).then(function(results) {
              if(checked == "yes")
              throw new Error("Crashed");
               // callback(results);
            })
      
            }).then(function (result) {
               callback(result);
            }).catch(function (err) {
              callback(err);
            }) && 
          node2.transaction(function (t) {
            return node2.query(allQuery,{raw: true,type: node2.QueryTypes.UPDATE}).then(function(results) {
              if(checked == "yes")
              throw new Error("Crashed");
              //callback(results);
              })
            }).then(function (result) {
                callback(result);
            }).catch(function (err) {
                callback(err);
            }) && 
            node3.transaction(function (t) {
              return node3.query(pragma + asiaQuery,{raw: true,type: node3.QueryTypes.UPDATE}).then(function(results) {
                if(checked == "yes")
                throw new Error("Crashed");
                //callback(results);
                })
              }).then(function (result) {
                  callback(result);
              }).catch(function (err) {
                  callback(err);
              }));
  } //else callback("DATABASE NOT AVAILABLE ON THIS NODE");
}

exports.service.submitDeleteQuery = submitDeleteQuery;
function submitDeleteQuery(allQuery, europeQuery, asiaQuery, node, checked,callback) {
  if(node == "all_countries") {
    return (node1.transaction(function (t) {

      return node1.query(allQuery + asiaQuery,{raw: true,type: node1.QueryTypes.DELETE}).then(function(results) {
        if(checked == "yes")
        throw new Error("Crashed");
         // callback(results);
      })

      }).then(function (result) {
          callback(result);
      }).catch(function (err) {
        callback(err);
      }) && 
    node2.transaction(function (t) {
      return node2.query(europeQuery + allQuery,{raw: true,type: node2.QueryTypes.DELETE}).then(function(results) {
        if(checked == "yes")
        throw new Error("Crashed");
        //callback(results);
        })
      }).then(function (result) {
          callback(result);
      }).catch(function (err) {
          callback(err);
      }) && 
      node3.transaction(function (t) {
        return node3.query(pragma + asiaQuery + europeQuery,{raw: true,type: node3.QueryTypes.DELETE}).then(function(results) {
          if(checked == "yes")
          throw new Error("Crashed");
          //callback(results);
          })
        }).then(function (result) {
           callback(result);
        }).catch(function (err) {
            callback(err);
        }));
  } else if(node == "europe_america"){
    return (node1.transaction(function (t) {
      
            return node1.query(allQuery,{raw: true,type: node1.QueryTypes.DELETE}).then(function(results) {
              if(checked == "yes")
              throw new Error("Crashed");
                //callback(results);
            })
      
            }).then(function (result) {
                callback(result);
            }).catch(function (err) {
              callback(err);
            }) && 
          node2.transaction(function (t) {
            return node2.query(europeQuery + allQuery,{raw: true,type: node2.QueryTypes.DELETE}).then(function(results) {
              if(checked == "yes")
              throw new Error("Crashed");
              //callback(results);
              })
            }).then(function (result) {
                callback(result);
            }).catch(function (err) {
                callback(err);
            }) && 
            node3.transaction(function (t) {
              return node3.query(pragma + europeQuery,{raw: true,type: node3.QueryTypes.DELETE}).then(function(results) {
                if(checked == "yes")
                throw new Error("Crashed");
               // callback(results);
                })
              }).then(function (result) {
                  callback(result);
              }).catch(function (err) {
                  callback(err);
              }));
  } else if(node == "asia_africa"){
    return (node1.transaction(function (t) {
      
            return node1.query(allQuery + asiaQuery,{raw: true,type: node1.QueryTypes.DELETE}).then(function(results) {
              if(checked == "yes")
              throw new Error("Crashed");
               // callback(results);
            })
      
            }).then(function (result) {
                callback(result);
            }).catch(function (err) {
              callback(err);
            }) && 
          node2.transaction(function (t) {
            return node2.query(allQuery,{raw: true,type: node2.QueryTypes.DELETE}).then(function(results) {
              if(checked == "yes")
              throw new Error("Crashed");
             // callback(results);
              })
            }).then(function (result) {
                callback(result);
            }).catch(function (err) {
                callback(err);
            }) && 
            node3.transaction(function (t) {
              return node3.query(pragma + asiaQuery,{raw: true,type: node3.QueryTypes.DELETE}).then(function(results) {
                if(checked == "yes")
                throw new Error("Crashed");
                //callback(results);
                })
              }).then(function (result) {
                  callback(result);
              }).catch(function (err) {
                  callback(err);
              }));
  } //else callback("DATABASE NOT AVAILABLE ON THIS NODE");
}