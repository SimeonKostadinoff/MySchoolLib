app.factory('bookFactory', function($http, $q, BookResource, identity){
    var __entityMap = {
        "<": "&lt;",
        ">": "&gt;"
    };

    String.prototype.escapeHTML = function() {
        return String(this).replace(/[<>]/g, function (s) {
            return __entityMap[s];
        });
    }
    return {
        addNewBook:function(book) {
            var deferred = $q.defer();
            var book = new BookResource(book);
            if(book.title) book.title=book.title.escapeHTML();
            if(book.author) book.author=book.author.toString().escapeHTML();
            if(book.summary) book.summary=book.summary.escapeHTML();
            if(book.publisher) book.publisher=book.publisher.escapeHTML();
            if(book.tags) book.tags=book.tags.escapeHTML();
            book.$save().then(function() {
                deferred.resolve();
            }, function(response) {
                deferred.reject(response);
            });
            return deferred.promise;
        },
        // Adding and removing requests from the books
        addRequestToBookAndUser: function(book) {
            var deferred = $q.defer();
            var updatedUserRequestToBook = new BookResource(book);
                updatedUserRequestToBook.requestedBy= {
                    userID: identity.currentUser._id,
                    userFirstName: identity.currentUser.firstName,
                    userLastName: identity.currentUser.lastName
                };
            updatedUserRequestToBook.type='addUserRequestToBook';
            updatedUserRequestToBook.$update().then(function() {

                deferred.resolve();
            }, function(response) {
                deferred.reject(response);
            });

            return deferred.promise;
        },
        removeRequestFromBookAndUser: function(book) {
            var deferred = $q.defer();
            var userRequestToRemove = new BookResource(book);
            userRequestToRemove.requestedBy= {
                userID: identity.currentUser._id,
                userFirstName: identity.currentUser.firstName,
                userLastName: identity.currentUser.lastName
            };
            userRequestToRemove.type='removeUserRequestFromBook';
            userRequestToRemove.$update().then(function() {
                deferred.resolve();
            }, function(response) {
                deferred.reject(response);
            });

            return deferred.promise;
        },

        // Giving and returning book from users
        addTakenToBookAndUser: function(book, user){
            var deferred = $q.defer();
            var updatedUserRequestToBook = new BookResource(book);
            updatedUserRequestToBook.requestedBy= {
                userID: user.userID,
                userFirstName: user.userFirstName,
                userLastName: user.userLastName
            };
            var dateToBeReturned = new Date();
            dateToBeReturned.setDate(dateToBeReturned.getDate() + 5);
            updatedUserRequestToBook.status.takenBy= {
                userID: user.userID,
                userFirstName: user.userFirstName,
                userLastName: user.userLastName,
                takenDate: new Date(),
                dateToBeReturned: dateToBeReturned
            };
            updatedUserRequestToBook.type='addTakenByToBookAndUser';
            updatedUserRequestToBook.$update().then(function() {

                deferred.resolve();
            }, function(response) {
                deferred.reject(response);
            });

            return deferred.promise;
        },
        returnBook: function(book, user){
            var deferred = $q.defer();
            var takenBookToRemove = new BookResource(book);
            takenBookToRemove.userID = takenBookToRemove.status.takenBy.userID;
            takenBookToRemove.type='removeTakenByFromBook';
            takenBookToRemove.$update().then(function() {
                deferred.resolve();
            }, function(response) {
                deferred.reject(response);
            });

            return deferred.promise;
        },

        // Updating books from the libAdmin role
        updateBook: function(book) {
            var deferred = $q.defer();
            var updatedBook = new BookResource(book);
            if(updatedBook.title) book.title=book.title.escapeHTML();
            if(updatedBook.author) book.author=book.author.toString().escapeHTML();
            if(updatedBook.summary) book.summary=book.summary.escapeHTML();
            if(updatedBook.publisher) book.publisher=book.publisher.escapeHTML();
            if(updatedBook.tags) book.tags=book.tags.escapeHTML();
            updatedBook.type='updateBook';
            updatedBook.$update().then(function() {
                deferred.resolve();
            }, function(response) {
                deferred.reject(response);
            });

            return deferred.promise;
        },

        // Adding and removing likes from the books
        addLikeToBook: function(book) {

            var deferred = $q.defer();
            var updatedUserLikeToBook = new BookResource(book);
            updatedUserLikeToBook.likedBy= {
                userID: identity.currentUser._id,
                userFirstName: identity.currentUser.firstName,
                userLastName: identity.currentUser.lastName
            };
            updatedUserLikeToBook.type='addUserLikeToBook';
            updatedUserLikeToBook.$update().then(function() {
                deferred.resolve();
            }, function(response) {
                deferred.reject(response);

            });

            return deferred.promise;
        },
        removeLikeFromBook: function(book) {
            var deferred = $q.defer();
            var updatedUserLikeToBook = new BookResource(book);
            updatedUserLikeToBook.likedBy= {
                userID: identity.currentUser._id,
                userFirstName: identity.currentUser.firstName,
                userLastName: identity.currentUser.lastName
            };
            updatedUserLikeToBook.type='removeUserLikeFromBook';
            updatedUserLikeToBook.$update().then(function() {
                deferred.resolve();
            }, function(response) {
                deferred.reject(response);
            });

            return deferred.promise;
        }


    }
})