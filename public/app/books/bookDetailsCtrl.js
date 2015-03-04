app.controller('BookDetailsCtrl', function($scope, $routeParams, cachedBooks, currentBook, identity, bookFactory, notifier) {
    $scope.identity=identity;

    // Summary
    $(".show-summary").click(function(){
        $(".centered-img").hide();
        $(".hidden-book").show();
        $(".summary").slideDown();
        $(this).hide();
        $(".hide-summary").show();
    });
    $(".hide-summary").click(function(){
        $(".summary").fadeOut(200);
        $(".hidden-book").hide();
        $(".centered-img").fadeIn(1500);
        $(this).hide();
        $(".show-summary").show();
    });

    // end Summary
    // Books information
    $(".show-admin-book").click(function(){
        $(".book-information").slideDown();
        $(this).hide();
        $(".hide-admin-book").show();
    });
    $(".hide-admin-book").click(function(){
        $(".book-information ").slideUp();
        $(this).hide();
        $(".show-admin-book").show();
    });

    // end Books information
    $scope.book = cachedBooks.query().$promise.then(function(collection) {
        collection.forEach(function(book) {
            if (book._id === $routeParams.id) {
                $scope.book = book;
                $scope.book.canBeRequested = currentBook.canBeRequested(book);
                $scope.book.canRequestBeCanceled = currentBook.isBookRequestedByCurrentUser(book);
                if(currentBook.isBookTaken(book)){
                    $scope.status= 'дата на връщане ' + book.status.takenBy.dateToBeReturned;
                }
                else{
                    $scope.status= 'в наличност';
                }
            }
        })
    })

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