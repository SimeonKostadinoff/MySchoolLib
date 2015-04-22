var encryption = require('../utilities/encryption');
var User = require('mongoose').model('User');

module.exports = {
    getAllUsers: function(req, res) {
        User.find({}).exec(function(err, collection) {
            if (err) {
                console.log('Users could not be loaded: ' + err);
            }

            res.send(collection);
        })
    },
    getUserById: function(req, res, next) {
        User.findOne({_id: req.params.id}).exec(function(err, user) {
            if (err) {
                console.log('User could not be loaded: ' + err);
            }
            res.send(user);
        })
    }
}
