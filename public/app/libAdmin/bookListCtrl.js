
app.controller('BookListCtrl', function($scope, BookResource, bookFactory, currentBook, notifier){
    $scope.books = BookResource.query();
    $scope.predicate = '-boughtDate';
    $scope.reverse=false;

    $scope.removeBook = function(book){

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
                notifier.success("Книгата е дадена на: " + userData.userFirstName + "!");
                var dateToBeReturned = new Date();
                dateToBeReturned.setDate(dateToBeReturned.getDate() + 5);
                book.status.takenBy = {
                    userID: userData.userID,
                    userFirstName: userData.userFirstName,
                    userLastName: userData.userLastName,
                    takenDate: new Date(),
                    dateToBeReturned: dateToBeReturned
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
            notifier.warning("Книгата е върната");
            book.status.takenBy=null;
            book.status.requestedBy=null;
        })
    };
});