var mongoose = require('mongoose');

var booksSchema = mongoose.Schema({
    title: String,
    author: String,
    boughtDate: Date,
    tags: [String],
    log:[{
        userID: String,
        takenDate: Date,
        returnDate: Date
    }],
    status: {
        requstedBy: [String],
        taken: Boolean,
        takenDate: Date,
        returned: Boolean,
        returnDate: Date
    }
});

var Book = mongoose.model('Book', booksSchema);



/*
module.exports.addNewBook = function(title,author,boughtDate,tags){
    Book.find({}).exec(function(err,collection){
        if(err){
            console.log('Cannot find books: ' + err);
            return;
        }
        else{
            Book.create({title: title,author: author, boughtDate:boughtDate,tags: tags});
        }
    })
}*/
