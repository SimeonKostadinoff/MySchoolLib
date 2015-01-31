var Book = require('mongoose').model('Book');

module.exports = {
    getAllBooks: function(req, res, next) {
        Book.find({}).exec(function(err, collection) {
            if (err) {
                console.log('Books could not be loaded: ' + err);
            }

            res.send(collection);
        })
    },
    getBookById: function(req, res, next) {
        Book.findOne({_id: req.params.id}).exec(function(err, book) {
            if (err) {
                console.log('Book could not be loaded: ' + err);
            }

            res.send(book);
        })
    },
    addNewBook: function(req, res, next) {
        var newBookData = req.body;
        newBookData.boughtDate=new Date();
        Book.create(newBookData, function(err, book) {
            if (err) {
                console.log('Failed to add new book: ' + err);
                return;
            }
            res.send(book);
        });
    }
};
