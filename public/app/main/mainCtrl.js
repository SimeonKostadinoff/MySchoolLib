app.controller('MainCtrl', function($scope, cachedBooks, identity) {
    $scope.books = cachedBooks.query();
    $scope.identity = identity;


    $scope.bookTitle = function(book){
        var changedBookTitle=book.title;
        if(changedBookTitle.length>25){
            changedBookTitle=book.title.slice(0,25)+"...";
        }
        return changedBookTitle;
    }
});