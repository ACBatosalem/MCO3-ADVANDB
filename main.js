// USED MODULES
var express     = require('express');
var session     = require('express-session');
var bodyParser  = require("body-parser");
var path        = require("path");
var ejs         = require('ejs');

// PERSONAL MODULES
var handlers = require('./actions/handlers');
var utils = require('./utils/utils');

// VARIABLES
var app     = express();
var port    = 8082;
var context = "/ADVANDB_MCO3";

// APP CONFIGURATIONS
app.set('view engine', 'ejs');
app.use(context, express.static(path.join(__dirname, "/web")));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({resave:false, saveUninitialized: false, secret:"secret_key"}));
app.use(function(request, response, next) {
    response.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    next();
});

// MAIN CONTROLLER
app.use ('*', function  (request, response) {
    console.log("[" + utils.toUTC(new Date()) + "] " + request.originalUrl);
    if(handlers.execute[request.originalUrl] != null) {
        handlers.execute[request.originalUrl](request, response);
    } else {
        response.redirect(context+'/home');
    }
});                                                                                                                                                                                                                                                     

// SERVER LISTEN
app.listen(port);
console.log('[' + utils.toUTC(new Date()) + '] ' + 'Server has started');
console.log('[' + utils.toUTC(new Date()) + '] ' + 'Server running at http://localhost:' + port + context);