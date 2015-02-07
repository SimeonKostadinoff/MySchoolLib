var express = require('express'),
    stylus = require('stylus'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    passport = require('passport'),
    mongoose = require('mongoose'),
    MongoStore = require('connect-mongo')(session),
    favicon = require('serve-favicon');

module.exports = function(app, config) {
    app.use(favicon(__dirname + '../../../public/images/favicons.png'));
    app.set('view engine', 'jade');
    app.set('views', config.rootPath + '/server/views');
    app.use(cookieParser());
    app.use(bodyParser.json());


    var connection = mongoose.createConnection(config.db);

    app.use(session({
        secret:'the biggest secret ever',
        resave: false, // don't save session if unmodified
        saveUninitialized: false, // don't create session until something stored
        maxAge: new Date(Date.now() + 3600000),
        store: new MongoStore({ mongooseConnection: connection })
    }));



    app.use(stylus.middleware(
        {
            src: config.rootPath + '/public',
            compile: function(str, path) {
                return stylus(str).set('filename', path);
            }
        }
    ));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(express.static(config.rootPath + '/public'));
}