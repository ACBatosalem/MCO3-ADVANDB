// USED MODULES
var path        = require("path");
var session     = require("express-session");

// PERSONAL MODULES

var database    = require("./../models/database");
var utils       = require("./../utils/utils");

// VARIABLES
var execute     = { };
var context     = "/ADVANDB_MCO3";
var service = database.service;

execute[context+"/home"] = home;
execute[context+"/getAll"] = getEntries;


database.initialize();

function home (request, response) { 
    response.render(path.join(__dirname, "./../web/index.ejs"), {
        context:context,
        subs:""
    });
}

var result;

function getEntries(request, response) {
    service.getData(function (err, data){
        if(err)
            throw err;
        else {
           // console.log(data);
            result = data;
           // console.log(result);
        }
    });
    console.log(result);
    response.render(path.join(__dirname, "./../web/index.ejs"), {
        context:context,
        subs: "result"
    });
}



exports.execute = execute;