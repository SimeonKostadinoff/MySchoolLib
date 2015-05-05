app.factory('cachedNotReturnedBooks', function(NotReturnedBookResource) {
    var cachedNotReturnedBooks;

    return {
        query: function() {
            if (!cachedNotReturnedBooks) {
                cachedNotReturnedBooks = NotReturnedBookResource.query();
            }

            return cachedNotReturnedBooks;
        }
    }
});