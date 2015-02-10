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
        return currentBook.isBookTaken(book)
    }
    $scope.canBookBeTaken = function(book){
        return currentBook.isBookRequested(book) && !currentBook.isBookTaken(book);
    }

    $scope.giveBookToUser = function(book, userData){
        if(userData!=undefined) {
            userData = JSON.parse(userData);
            bookFactory.addTakenToBookAndUser(book, userData).then(function () {
                notifier.success("Book given to " + userData.userFirstName + "!");
                book.status.takenBy = {
                    userID: userData.userID,
                    userFirstName: userData.userFirstName,
                    userLastName: userData.userLastName,
                    takenDate: new Date()
                }
                book.status.requestedBy = [];
            })
        }
        else{
            notifier.error("Не е избран потребител!")
        }
    };

    $scope.returnBook = function(book){
        bookFactory.returnBook(book).then(function(){
            notifier.warning("Book returned!");
            book.status.takenBy=null;
            book.status.requestedBy=null;
        })
    };
});