app.controller('NotReturnedBooksCtrl', function($scope, cachedNotReturnedBooks) {

    $scope.notReturnedBooks = cachedNotReturnedBooks.query();

});