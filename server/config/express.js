var express=require('express'),
    bodyParser=require('body-parser'),
    cookieParser=require('cookie-parser'),
    session=require('express-session'),
    passport=require('passport');

module.exports=function(app,config){
    app.set('view engine','jade');
    app.set('views',config.rootPath + '/server/views');
    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(session({
        secret: 'pesho OP',
        resave: false,
        saveUninitialized: true
    }))

    app.use(passport.initialize());
    app.use(passport.session());

    app.use(express.static(config.rootPath + '/public'));
}