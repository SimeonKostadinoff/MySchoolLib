app.controller('MainCtrl', function($scope, cachedBooks, identity) {
    $scope.books = cachedBooks.query();
    $scope.identity = identity;


});