var Book = require('mongoose').model('Book'),
    User = require('mongoose').model('User');


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
    getNotReturnedBooks: function(req,res,next){
        Book.find({"status.returned": false}).exec(function(err, collection){
            if(err){
                console.log("Not returned books could not be loaded: " + err);
            }

            res.send(collection);
        })
    },
    addNewBook: function(req, res, next) {
        var newBookData = req.body;
        newBookData.boughtDate=new Date();
        newBookData.status = {
            requestedBy: [],
            takenBy:{},
            returned: true,
            returnDate: null
        };
        newBookData.log=[];
        Book.create(newBookData, function(err, book) {
            if (err) {
                console.log('Failed to add new book: ' + err);
                return;
            }
            res.send(book);
        });
    },
    addOrRemoveRequestOrTakeBook: function(req,res,next){
        var newBookData = req.body;
        //Add user request to book
        if(newBookData.type == 'addUserRequestToBook'){
            Book.findByIdAndUpdate(
                req.body._id,
                {$push: {"status.requestedBy": {
                    userID: newBookData.requestedBy.userID,
                    userFirstName: newBookData.requestedBy.userFirstName,
                    userLastName: newBookData.requestedBy.userLastName
                }}},
                {safe: true, upsert: true},
                function(err, model) {
                    if(err){
                        console.log("Can't find book and add request: "+ err);
                    }
                });

            User.findByIdAndUpdate(
                req.user._id,
                {$push: {"requestedBooks": {
                    bookID: newBookData._id,
                    bookTitle: newBookData.title,
                    bookAuthor: newBookData.author
                }}},
                {safe: true, upsert: true},
                function(err, model) {
                    if(err){
                        console.log("Can't find user and add requested book: "+ err);
                    }
                    res.end();
                })
            }
        // Remove request from the book
        if(newBookData.type == 'removeUserRequestFromBook'){
            Book.findByIdAndUpdate(
                req.body._id,
                {$pull: {"status.requestedBy": {
                    userID: newBookData.requestedBy.userID,
                    userFirstName: newBookData.requestedBy.userFirstName,
                    userLastName: newBookData.requestedBy.userLastName
                }}},
                {safe: true, upsert: true},
                function(err, model) {
                    if(err){
                        console.log("Can't find book and remove request: "+ err);
                    }
                });

            User.findByIdAndUpdate(
                req.user._id,
                {$pull: {"requestedBooks": {
                    bookID: newBookData._id,
                    bookTitle: newBookData.title,
                    bookAuthor: newBookData.author
                }}},
                {safe: true, upsert: true},
                function(err, model) {
                    if(err){
                        console.log("Can't find user and remove requested book: "+ err);
                    }
                    res.end();
                })
        }

        //Add user like to book
        if(newBookData.type == 'addUserLikeToBook'){
            Book.findByIdAndUpdate(
                req.body._id,
                {$push: {"likes": {
                    userID: newBookData.likedBy.userID,
                    userFirstName: newBookData.likedBy.userFirstName,
                    userLastName: newBookData.likedBy.userLastName
                }}},
                {safe: true, upsert: true},
                function(err, model) {
                    if(err){
                        console.log("Can't find book and add like: "+ err);
                    }
                    res.end();
                });
        }
        // Remove like from the book
        if(newBookData.type == 'removeUserLikeFromBook'){
            Book.findByIdAndUpdate(
                req.body._id,
                {$pull: {"likes": {
                    userID: newBookData.likedBy.userID,
                    userFirstName: newBookData.likedBy.userFirstName,
                    userLastName: newBookData.likedBy.userLastName
                }}},
                {safe: true, upsert: true},
                function(err, model) {
                    if(err){
                        console.log("Can't find book and remove like: "+ err);
                    }
                    res.end();
                });

        }

        //Add takenBy to book and user
        if(newBookData.type == 'addTakenByToBookAndUser'){

            Book.findByIdAndUpdate(
                req.body._id,
                {"status.returned":false,
                    $pull: {"status.requestedBy": {
                        userID: newBookData.requestedBy.userID,
                        userFirstName: newBookData.requestedBy.userFirstName,
                        userLastName: newBookData.requestedBy.userLastName
                    }},
                    "status.takenBy":{
                        userID: newBookData.status.takenBy.userID,
                        userFirstName: newBookData.status.takenBy.userFirstName,
                        userLastName: newBookData.status.takenBy.userLastName,
                        takenDate: newBookData.status.takenBy.takenDate,
                        dateToBeReturned: newBookData.status.takenBy.dateToBeReturned
                    }},
                {safe: true, upsert: true},
                function(err, model) {
                    if(err){
                        console.log("Can't find book and remove requests and add takenBy: "+ err);
                    }
                    res.end();
                });

            User.findByIdAndUpdate(
                newBookData.status.takenBy.userID,
                {$push: {"takenBooks": {
                    bookID: newBookData._id,
                    bookTitle: newBookData.title,
                    bookAuthor: newBookData.author,
                    dateToBeReturned: newBookData.status.takenBy.dateToBeReturned
                }},
                    $pull: {"requestedBooks": {
                        bookID: newBookData._id,
                        bookTitle: newBookData.title,
                        bookAuthor: newBookData.author
                    }}},
                {safe: true, upsert: true},
                function(err, model) {
                    if(err){
                        console.log("Can't find user and add taken books: "+ err);
                    }
                    res.end();
                })


        }
        // Remove takenBy from book and user
        if(newBookData.type == 'removeTakenByFromBook'){
            Book.findByIdAndUpdate(
                req.body._id,
                {$push: {"log": {
                        takenBy:{
                            userID: newBookData.status.takenBy.userID,
                            userFirstName: newBookData.status.takenBy.userFirstName,
                            userLastName: newBookData.status.takenBy.userLastName
                        },
                        takenDate: newBookData.status.takenBy.takenDate,
                        returnDate: new Date()
                    }},
                    "status.takenBy": {},
                    "status.returned":true

                },
                {safe: true, upsert: true},
                function(err, model) {
                    if(err){
                        console.log("Can't find book and remove takenBy: "+ err);
                    }
                });

            User.findByIdAndUpdate(
                newBookData.userID,
                {$pull: {"takenBooks": {
                    bookID: newBookData._id,
                    bookTitle: newBookData.title,
                    bookAuthor: newBookData.author
                }}},
                {safe: true, upsert: true},
                function(err, model) {
                    if(err){
                        console.log("Can't find user and remove taken book: "+ err);
                    }
                    res.end();
                })
        }
        // Update book
        if(newBookData.type == 'updateBook'){
            if(req.user.roles.indexOf('libAdmin') > -1) {
                Book.findByIdAndUpdate(
                    req.body._id,
                    {
                        "title": newBookData.title,
                        "author": newBookData.author,
                        "isbn": newBookData.isbn,
                        "summary": newBookData.summary,
                        "publisher": newBookData.publisher,
                        "publishedDate": newBookData.publishedDate,
                        "cover": newBookData.cover,
                        "genre": newBookData.genre
                    },
                    {safe: true, upsert: true},
                    function (err, model) {
                        if (err) {
                            console.log("Can't find book and update it: " + err);
                        }
                        res.end();
                    });
            }
            else{
                console.log("You dont have permison to update books");
            }

        }
    }

};
