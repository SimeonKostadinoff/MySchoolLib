app.controller('BookDetailsCtrl', function($scope, $routeParams, cachedBooks, currentBook) {
    //$scope.book = BookResource.get({id: $routeParams.id});
    $scope.book = cachedBooks.query().$promise.then(function(collection) {
        collection.forEach(function(book) {
            if (book._id === $routeParams.id) {
                $scope.book = book;
                if(currentBook.isBookTaken(book)){
                    $scope.status= 'дата на връщане ' + book.status.takenBy.dateToBeReturned;
                }
                else{
                    $scope.status= 'в наличност';
                }
            }
        })
    })



});