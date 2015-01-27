var mongoose = require('mongoose');

var booksSchema = mongoose.Schema({
    title: String,
    author: String,
    status: String,
    published: Date,
    tags: [String]
});

var Book = mongoose.model('Book', booksSchema);

module.exports.seedInitialCourses = function() {
    Book.find({}).exec(function(err, collection) {
        if (err) {
            console.log('Cannot find books: ' + err);
            return;
        }

        if (collection.length === 0) {
            Book.create({title: 'Бай Ганьо',author:'Алеко Константинов',status:'в наличност', published: new Date('10/10/1996'), tags: ['сатира']});
            Book.create({title: '10 малки негърчета',author:'Агата Кристи',status:'в наличност', published: new Date('10/5/2000'), tags: ['криминална']});

        }
    });
};
