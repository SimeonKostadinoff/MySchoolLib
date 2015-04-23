app.controller('AdminBookCtrl', function($scope, $routeParams, $location, cachedBooks) {
    $scope.book = cachedBooks.query().$promise.then(function(collection) {
        collection.forEach(function(book) {
            if (book._id === $routeParams.id) {
                $scope.book = book;
            }
        })
        if($scope.book._id != $routeParams.id){
            $location.path('/404');
        }
    })
});