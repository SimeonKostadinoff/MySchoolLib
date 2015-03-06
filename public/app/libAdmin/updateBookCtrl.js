app.controller('UpdateBookCtrl', function($scope, $location, notifier, bookFactory, cachedBooks, $routeParams) {

    $scope.book = cachedBooks.query().$promise.then(function(collection) {
        collection.forEach(function(book) {
            if (book._id === $routeParams.id) {
                $scope.book = book;
            }
        })
    })

    $scope.updateBook = function(book) {
        if (!book.cover) {
            book.cover = '../../images/no_book_cover_4.jpg';
        }
        bookFactory.updateBook(book).then(function () {
            notifier.info('Книгата е обновена.');
        })
    }
});