app.controller('AdminBookCtrl', function($scope, $routeParams, cachedBooks) {
    //$scope.book = BookResource.get({id: $routeParams.id});
    $scope.book = cachedBooks.query().$promise.then(function(collection) {
        collection.forEach(function(book) {
            if (book._id === $routeParams.id) {
                $scope.book = book;
            }
        })
    })
});