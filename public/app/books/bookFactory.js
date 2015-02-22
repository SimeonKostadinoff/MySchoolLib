app.factory('bookFactory', function($http, $q, BookResource, identity){
    var __entityMap = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "/": '&#x2F;'
    };

    String.prototype.escapeHTML = function() {
        return String(this).replace(/[&<>\/]/g, function (s) {
            return __entityMap[s];
        });
    }
    return {
        addNewBook:function(book) {
            var deferred = $q.defer();

            var book = new BookResource(book);
            book.title=book.title.escapeHTML();
            book.author=book.author.toString().escapeHTML();
            book.summary=book.summary.escapeHTML();
            book.publisher=book.publisher.escapeHTML();
            //TODO: book.tags need to be done correctly
            if(book.tags) book.tags=book.tags.escapeHTML();

            book.$save().then(function() {
                deferred.resolve();
            }, function(response) {
                deferred.reject(response);
            });
            return deferred.promise;
        },
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
        }


        /*,
//TODO!!
        removeBook: function(book){
            var deferred = $q.defer();
            book.$update().then(function() {
                console.log("bookFactory inner");
                deferred.resolve();
            }, function(response) {
                deferred.reject(response);
            });
            return deferred.promise;
        }*/
    }
})