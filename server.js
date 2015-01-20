/**
 * Created by Nikolay Slavkov on 19.1.2015 г..
 */
var express=require('express'),
    bodyParser=require('body-parser'),
    mongoose=require('mongoose');

var port=process.env.PORT || 3000;

var env=process.env.NODE_ENV || "development";

var app=express();

app.set('view engine','jade');
app.set('views',__dirname + '/server/views');
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));
if(env=='development') {
    mongoose.connect('mongodb://localhost/database');
    console.log("Conected to local DB");
}
else{
    mongoose.connect('mongodb://admin:admin@ds031551.mongolab.com:31551/my-school-lib-db');
    console.log("Conected to MongoLab");
}

var db = mongoose.connection;
db.once('open',function(err){
    if(err){
        console.log(err);
        return;
    }
    console.log('Database up and running...')
})
db.on('error', function(err){
    console.log(err);
})




app.get('/partials/:partialName',function(req, res){
    res.render('partials/' + req.params.partialName)
})
app.get('*',function(req,res){
    res.render('index');
});



app.listen(port);
console.log("Server running on port: "+port);