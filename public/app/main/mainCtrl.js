app.controller('MainCtrl', function($scope, cachedBooks, identity) {
    $scope.books = cachedBooks.query();
    $scope.identity = identity;

    $scope.bookTitle = function(book){
        if(book.title.length>25){
            book.title=book.title.slice(0,22);
            book.title+="...";
        }
        return book.title;

    }
});