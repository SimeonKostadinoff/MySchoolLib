/**
 * Created by Nikolay Slavkov on 19.1.2015 г..
 */
var express = require('express');

var env = process.env.NODE_ENV || "development";

var app = express();
var config = require('./server/config/config')[env];

require('./server/config/express')(app,config);
require('./server/config/mongoose')(config);
require('./server/config/routes')(app);
require('./server/config/passport')();

app.listen(config.port);
console.log("Server running on port: "+config.port);