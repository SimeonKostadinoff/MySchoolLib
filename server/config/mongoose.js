var mongoose=require('mongoose'),
    crypto=require('crypto');

module.exports=function(config){
    mongoose.connect(config.db);


    var db = mongoose.connection;
    db.once('open',function(err){
        if(err){
            console.log(err);
            return;
        }
        console.log('Database up and running...')
    });
    db.on('error', function(err){
        console.log(err);
    });


    var userSchema = mongoose.Schema({
        username: String,
        firstName: String,
        lastName:String,
        salt: String,
        hashPass:String
    });

    userSchema.method({
        authenticate: function(password){
           if(generateHashedPassword(this.salt, password) === this.hashPass){
               return true;
           }
            else{
               return false;
           }
        }
    })

    var User = mongoose.model('User',userSchema);


User.find({}).exec(function(err,collection){
    if(err){
        console.log("Can't add users: " + err);
    }
    if(collection.length===0){
        var salt;
        var hashedPwd;


        salt=generateSalt();
        hashedPwd=generateHashedPassword(salt, '0885706544');

        User.create({username:'slavkov_96',firstName:'Nikolay',lastName:'Slavkov', salt:salt,hashPass:hashedPwd});
        salt=generateSalt();
        hashedPwd=generateHashedPassword(salt, 'pesho');
        User.create({username:'pesho69',firstName:'Pesho',lastName:'Peshev', salt:salt,hashPass:hashedPwd});
        salt=generateSalt();
        hashedPwd=generateHashedPassword(salt, 'stamat');
        User.create({username:'stamat14',firstName:'Stamat',lastName:'Stamatov', salt:salt,hashPass:hashedPwd});
        console.log("Users added to database...");
    }
});



};


function generateSalt(){
    return crypto.randomBytes(128).toString('base64');
}

function generateHashedPassword(salt, pwd){
    var hmac= crypto.createHmac('sha1',salt);
    return hmac.update(pwd).digest('hex');
}