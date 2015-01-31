app.controller('BookListCtrl', function($scope, BookResource){
    $scope.books = BookResource.query();
})