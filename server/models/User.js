var mongoose = require('mongoose'),
    encryption = require('../utilities/encryption');

var userSchema = mongoose.Schema({
    username: { type: String, require: '{PATH} is required', unique: true },
    firstName: { type: String, require: '{PATH} is required' },
    lastName: { type: String, require: '{PATH} is required' },
    salt: String,
    hashPass: String,
    roles: [String],
    requestedBooks:[{
        bookID: String,
        bookTitle: String,
        bookAuthor: String
    }],
    takenBooks:[{
        bookID: String,
        bookTitle: String,
        bookAuthor: String
    }]
});

userSchema.method({
    authenticate: function(password) {
        if (encryption.generateHashedPassword(this.salt, password) === this.hashPass) {
            return true;
        }
        else {
            return false;
        }
    }
})

var User = mongoose.model('User', userSchema);

module.exports.seedInitialUsers = function() {
   /* User.find({}).remove({},function(err,msg){
     if(err){
     console.log("Couldnt remove the users.")
     }
     console.log("Users removed");
     });*/

    User.find({}).exec(function(err, collection) {
        if (err) {
            console.log('Cannot find users: ' + err);
            return;
        }

        if (collection.length <=1) {
            var salt;
            var hashedPwd;

            salt = encryption.generateSalt();
            hashedPwd = encryption.generateHashedPassword(salt, '123456');
            User.create({username: 'slavkov_96', firstName: 'Nikolay', lastName: 'Slavkov', salt: salt, hashPass: hashedPwd, roles: ['admin'], requestedBooks:[],takenBooks: []});
            salt = encryption.generateSalt();
            hashedPwd = encryption.generateHashedPassword(salt, '123456');
            User.create({username: 'pesho69', firstName: 'Pesho', lastName: 'Peshev', salt: salt, hashPass: hashedPwd, roles: ['standard'], requestedBooks:[],takenBooks: []});
            salt = encryption.generateSalt();
            hashedPwd = encryption.generateHashedPassword(salt, '123456');
            User.create({username: 'gosho', firstName: 'Gosho', lastName: 'Gosho', salt: salt, hashPass: hashedPwd, requestedBooks:[],takenBooks: []});
            console.log('Users added to database...');
        }
    });
};