app.controller('BooksListCtrl', function($scope, cachedBooks, bookFactory, notifier, $window, identity, UsersResource, currentBook) {
    $scope.books = cachedBooks.query();
    $scope.identity = identity;

    cachedBooks.query().$promise.then(function (collection) {
        collection.forEach(function (book) {

            if (!currentBook.isBookRequested(book) && !currentBook.isBookTaken(book)){
                book.currentStatus = 'в наличност';
            }

            //TODO: maybe needs optimization
            if (currentBook.isBookRequested(book)) {
                book.currentStatus = 'Requested by: ';
                book.status.requestedBy.forEach(function(request){
                    if(book.currentStatus != 'Requested by: ') {
                        book.currentStatus += ', ';
                    }
                    book.currentStatus += request.userFirstName + ' ' + request.userLastName;
                })
            }
            if(currentBook.isBookTaken(book)) {
                book.currentStatus = 'Taken by: ' + book.status.takenBy.userFirstName + ' ' + book.status.takenBy.userLastName;
                book.isDisabled = false;
            }
            book.canBeRequested = currentBook.canBeRequested(book);
            book.canRequestBeCanceled = currentBook.isBookRequestedByCurrentUser(book);

        });
    });


    $scope.addRequestToBookAndUser = function(book) {
        bookFactory.addRequestToBookAndUser(book).then(function () {
            $window.location.reload();
            notifier.success(book.title + " requested!");

        });
    };
    $scope.removeRequestFromBookAndUser = function(book){
        bookFactory.removeRequestFromBookAndUser(book).then(function(){
            $window.location.reload();
            notifier.warning(book.title + " request canceled!");
        })
    }
    $scope.addTakenToBookAndUser = function(book){
        bookFactory.addTakenToBookAndUser(book).then(function(){
            $window.location.reload();
            notifier.success("Book taken " + book.title + "!");
        })
    };




    $scope.getUserById = function(id){
        var user=UsersResource(user._id);
                if(user._id === id){
                    return user.firstName + ' ' + user.lastName;
                }
                else{
                    return "I cant find user with this ID";
                }
    }







});