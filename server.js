// Loading necessary modules
var express = require('express');
var bodyParser = require('body-parser');
var clientSessions = require("client-sessions");


// Instantiate express server
var app = express();

// Using modules for app
app.use(express.static(__dirname+'/dist'));
app.use(bodyParser.json()); // Body parser to get the data from ajax calls & form data
app.use(bodyParser.urlencoded({
    extended: true
})); // Body parser to get the URL GET method data
app.use(clientSessions({
	secret: '0GBlJZ9EKBt2Zbi2flRPvztczCewBxXK' // Secret Key
}));


app.use((req,res,next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Accept");
    next();
});

// Routes to define the call backs
var routes = {};
routes.sms = require('./routes/sms.js');
routes.database = require('./database-config/mongodb.js');

// Restful API to get the home page
app.get('/', function(req, res){
	res.sendfile('../www/index.html');
});


// Restful API for user sms
app.post('/saveSms', routes.sms.save);

// Restfull API to get the my sms list
app.get('/getSms', routes.sms.get);

var server = app.listen((process.env.PORT || 3000));
console.log("SMS Analytics Server is Up running on port 3000");
