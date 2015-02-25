app.controller('BooksListCtrl', function($scope, cachedBooks, bookFactory, notifier, identity, currentBook) {
    $scope.books = cachedBooks.query();
    $scope.identity = identity;
    $scope.predicate = '-boughtDate';
    $scope.reverse=false;

    cachedBooks.query().$promise.then(function (collection) {
        collection.forEach(function (book) {
            book.canBeRequested = currentBook.canBeRequested(book);
            book.canRequestBeCanceled = currentBook.isBookRequestedByCurrentUser(book);
        });
    });
    $scope.currentStatus = function(book){
        if(!currentBook.isBookRequested(book) && !currentBook.isBookTaken(book)) return 'в наличност';

        if(currentBook.isBookRequested(book) && !currentBook.isBookTaken(book)){
            var status= 'заявена от: ';
            $.each(book.status.requestedBy, function(index, value){
                status += value.userFirstName + ' ' + value.userLastName + ', ';
            });
            return status;
        }
        if(currentBook.isBookTaken(book)){
            return 'в ' + book.status.takenBy.userFirstName + ' ' + book.status.takenBy.userLastName;
        }
    }

    $scope.addRequestToBookAndUser = function(book) {
        book.canBeRequested=false;
        bookFactory.addRequestToBookAndUser(book).then(function () {
            book.canRequestBeCanceled=true;
            notifier.success("Книгата е заявена");
            book.status.requestedBy.push({
                userID: identity.currentUser._id,
                userFirstName: identity.currentUser.firstName,
                userLastName: identity.currentUser.lastName
            });

            identity.currentUser.requestedBooks.push({
                bookID: book._id,
                bookTitle: book.title,
                bookAuthor: book.author
            })
        });
    };
    $scope.removeRequestFromBookAndUser = function(book){
        book.canRequestBeCanceled=false;
        bookFactory.removeRequestFromBookAndUser(book).then(function(){
            book.canBeRequested=true;
            notifier.warning("Заявката е отказана");

            $.each(book.status.requestedBy, function(i){
                if(book.status.requestedBy[i].userID === identity.currentUser._id) {
                    book.status.requestedBy.splice(i,1);
                    return false;
                }
            });

            $.each(identity.currentUser.requestedBooks, function(i){
                if(identity.currentUser.requestedBooks[i].bookID === book._id) {
                    identity.currentUser.requestedBooks.splice(i,1);
                    return false;
                }
            });
        })
    }


    $scope.canBeRequested = function(book){
        return book.canBeRequested;
    }
    $scope.canRequestBeCanceled = function(book){
        return book.canRequestBeCanceled;
    }


});