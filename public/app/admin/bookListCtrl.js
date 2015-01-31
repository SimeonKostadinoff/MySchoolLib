app.controller('BookListCtrl', function($scope, BookResource){
    $scope.books = BookResource.query();

    /*foreach(book in $scope.books)
    {
        if (book) {
            $scope.status = 'Иска се от: ' + book.status.requstedBy;
        }
        else {
            $scope.status = 'в наличност';
        }
    }*/

});