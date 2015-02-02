app.controller('BooksListCtrl', function($scope, cachedBooks, addBook, notifier) {
    $scope.books = cachedBooks.query();
var isDisabled=false;



    cachedBooks.query().$promise.then(function(collection) {
        collection.forEach(function(book) {

            isDisabled=false;
            if((book.status.requestedBy==null || book.status.requestedBy=='' || book.status.requestedBy=="")
                && (book.status.takenBy == null || book.status.takenBy == '' || book.status.takenBy == "")){
                book.currentStatus='в наличност';
            }
            else if((book.status.requestedBy != null || book.status.requestedBy != '' || book.status.requestedBy != "") && (book.status.takenBy == null || book.status.takenBy == '' || book.status.takenBy == "")){
                book.currentStatus=book.status.requestedBy;
            }
            else {
                isDisabled=true;
                book.currentStatus=book.status.takenBy;
            }
        });
    });
    //(book.status.takenBy != null || book.status.takenBy != '' || book.status.takenBy != "")

    $scope.addUserRequestToBook = function(book) {
        addBook.addUserRequestToBook(book).then(function () {
            notifier.success("Request done successfully!")
        });
    }


});