app.controller('BookListCtrl', function($scope, BookResource, bookFactory, currentBook,$window, notifier){
    $scope.books = BookResource.query();

    $scope.removeBook = function(book){
       /* bookFactory.removeBook(book).then(function(){
            console.log("Book removed UserListCtrl here.");
        })*/
    }
    $scope.isBookAvailable= function(book){
        return !currentBook.isBookRequested(book) && !currentBook.isBookTaken(book);
    }
    $scope.isBookTaken = function(book){
        return !currentBook.isBookRequested(book) && currentBook.isBookTaken(book)
    }
    $scope.canBookBeTaken = function(book){
        return currentBook.isBookRequested(book) && !currentBook.isBookTaken(book);
    }

    $scope.giveBookToUser = function(book, userData){
        userData=JSON.parse(userData);
        bookFactory.addTakenToBookAndUser(book, userData).then(function(){
            $window.location.reload();
            notifier.success("Book given to " + userData.userFirstName + "!");
        })
    };

    $scope.returnBook = function(book){
        bookFactory.returnBook(book).then(function(){
            $window.location.reload();
            notifier.warning("Book returned!");
        })
    };
});