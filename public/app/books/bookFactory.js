app.factory('bookFactory', function($http, $q, BookResource, identity){
    return {
        addNewBook:function(book) {
            var deferred = $q.defer();

            var book = new BookResource(book);
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
                updatedUserRequestToBook.status.requestedBy= {
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
            var updatedUserRequestToBook = new BookResource(book);
            updatedUserRequestToBook.status.requestedBy= {
                userID: identity.currentUser._id,
                userFirstName: identity.currentUser.firstName,
                userLastName: identity.currentUser.lastName
            };
            updatedUserRequestToBook.type='removeUserRequestToBook';
            updatedUserRequestToBook.$update().then(function() {
                deferred.resolve();
            }, function(response) {
                deferred.reject(response);
            });

            return deferred.promise;
        },
        addTakenToBookAndUser: function(book){
            var deferred = $q.defer();
            var updatedUserRequestToBook = new BookResource(book);
            updatedUserRequestToBook.status.takenBy= {
                userID: identity.currentUser._id,
                userFirstName: identity.currentUser.firstName,
                userLastName: identity.currentUser.lastName,
                takenDate: new Date()
            };
            updatedUserRequestToBook.type='addTakenByToBook';
            updatedUserRequestToBook.$update().then(function() {

                deferred.resolve();
            }, function(response) {
                deferred.reject(response);
            });

            return deferred.promise;
        }
    }
})