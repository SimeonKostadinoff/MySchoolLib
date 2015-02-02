app.factory('addBook', function($http, $q, BookResource, identity){
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
        addUserRequestToBook: function(book) {
            var deferred = $q.defer();
            var updatedUserRequestToBook = new BookResource(book);
            updatedUserRequestToBook.status = {
                requestedBy: identity.currentUser._id ,
                takenBy: null,
                takenDate: null,
                returned: true,
                returnDate: null
            };
            updatedUserRequestToBook.$update().then(function() {
                //identity.currentUser.firstName = updatedUser.firstName;
                //identity.currentUser.lastName = updatedUser.lastName;
                deferred.resolve();
            }, function(response) {
                deferred.reject(response);
            });

            return deferred.promise;
        }
    }
})