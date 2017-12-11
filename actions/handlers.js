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
execute[context+"/submitQuery"] = submitQuery;

database.initialize();

// HTML Replacement
var input_type = ["radio", "checkbox"];
var case1Transactions = ["SELECT "];
var case2Transactions = ["SELECT ", "INSERT INTO ", "UPDATE ", "DELETE FROM "];
var case3Transactions = ["INSERT INTO", "UPDATE ", "DELETE FROM "];
var transactions = [case1Transactions, case2Transactions, case3Transactions];
var areas = ["All Regions", "Europe and America", "Asia and Africa"];
var areas_tables = ["all_countries", "europe_america", "asia_africa"];
var columnNames = ["ID", "CountryName", "CountryRegion", "CountryIncome", "SeriesName", "Year", "Data"];
var operators = ["=", ">=", "<=", "!=", "LIKE"];
//var abcom = ["Commit", "Abort"];

// Functions
function home (request, response) { 
    response.render(path.join(__dirname, "./../web/index.ejs"), {
        context:context,
        results:"",
        input_type: input_type,
        transactions: transactions,
        areas: areas,
        areas_tables: areas_tables,
        columnNames: columnNames,
        operators: operators,
        status: ""
        //abcom: abcom
    });
}

function getEntries(request, response) {
    service.getData(function (data){
        
            response.render(path.join(__dirname, "./../web/index.ejs"), {
                context:context,
                subs: data,
                input_type: input_type,
                trans_choice: trans_choice,
                transactions: transactions,
                areas: areas,
                areas_tables: areas_tables,
                columnNames: columnNames,
                operators: operators
            });
        
    });
}

function submitQuery(request, response) {
    var newQuery = request.body.newQuery;
    var actionType = request.body.actionType;
    var node = request.body.node;
    var checked = request.body.abort;
    console.log(newQuery);
    console.log(actionType);
    console.log(node);
    if(actionType == "SELECT ") {
        service.submitSelectQuery(newQuery, node, checked, function(data) {
            
                console.log(data);
                console.log("hallo");
                response.render(path.join(__dirname, "./../web/index.ejs"), {
                    context:context,
                    results: data,
                    input_type: input_type,
                    transactions: transactions,
                    areas: areas,
                    areas_tables: areas_tables,
                    columnNames: columnNames,
                    operators: operators,
                    status: ""                
                });
            
        });
    } else if(actionType == "INSERT INTO ") {
        var querySplit = newQuery.split(" ");
        var allQuery = querySplit;
        allQuery[2] = "all_countries";
        allQuery = allQuery.join(" ");
        var europeQuery = querySplit;
        europeQuery[2] = "europe_america";
        europeQuery = europeQuery.join(" ");
        var asiaQuery = querySplit;
        asiaQuery[2] = "asia_africa";
        asiaQuery = asiaQuery.join(" ");

        service.submitInsertQuery(allQuery, europeQuery, asiaQuery, node, checked,function(data) {
            
                console.log(data);
                console.log("hallo");
                response.render(path.join(__dirname, "./../web/index.ejs"), {
                    context:context,
                    results: "",
                    input_type: input_type,
                    transactions: transactions,
                    areas: areas,
                    areas_tables: areas_tables,
                    columnNames: columnNames,
                    operators: operators,
                    status: data                
                });
            
        });
    } else if(actionType == "UPDATE ") {
        var querySplit = newQuery.split(" ");
        var allQuery = querySplit;
        allQuery[1] = "all_countries";
        allQuery = allQuery.join(" ");
        var europeQuery = querySplit;
        europeQuery[1] = "europe_america";
        europeQuery = europeQuery.join(" ");
        var asiaQuery = querySplit;
        asiaQuery[1] = "asia_africa";
        asiaQuery = asiaQuery.join(" ");

        service.submitUpdateQuery(allQuery, europeQuery, asiaQuery, node, checked,function(data) {
            
                console.log(data);
                console.log("hallo");
                response.render(path.join(__dirname, "./../web/index.ejs"), {
                    context:context,
                    results: "",
                    input_type: input_type,
                    transactions: transactions,
                    areas: areas,
                    areas_tables: areas_tables,
                    columnNames: columnNames,
                    operators: operators,
                    status: data                    
                });
            
        });
    } else if(actionType == "DELETE FROM ") {
        var querySplit = newQuery.split(" ");
        var allQuery = querySplit;
        allQuery[2] = "all_countries";
        allQuery = allQuery.join(" ");
        var europeQuery = querySplit;
        europeQuery[2] = "europe_america";
        europeQuery = europeQuery.join(" ");
        var asiaQuery = querySplit;
        asiaQuery[2] = "asia_africa";
        asiaQuery = asiaQuery.join(" ");

        service.submitDeleteQuery(allQuery, europeQuery, asiaQuery, node, checked,function(data) {
            
                console.log(data);
                console.log("hallo");
                response.render(path.join(__dirname, "./../web/index.ejs"), {
                    context:context,
                    results: "",
                    input_type: input_type,
                    transactions: transactions,
                    areas: areas,
                    areas_tables: areas_tables,
                    columnNames: columnNames,
                    operators: operators,
                    status: data                      
                });
            
        });
    }
}

exports.execute = execute;