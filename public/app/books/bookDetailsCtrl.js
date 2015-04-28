app.controller('BookDetailsCtrl', function($scope, $routeParams, $location, cachedBooks, currentBook, identity, bookFactory, notifier) {
    $scope.identity=identity;
    $scope.currentBook=currentBook;

    // Summary
        $(".show-summary").click(function(){
            $(".summary").slideDown();
            $(this).hide();
            $(".hide-summary").show();
        });
        $(".hide-summary").click(function(){
            $(".summary").slideUp();
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

    // Like and Request buttons
        $(".number-requests").hover(function(){
            $(".show-requests-when-hover").show();
        }, function(){
            $(".show-requests-when-hover").hide();
        });
        $(".number-likes").hover(function(){
            $(".show-likes-when-hover").show();
        }, function(){
            $(".show-likes-when-hover").hide();
        });
    // end Like and Request buttons


    $scope.book = cachedBooks.query().$promise.then(function(collection) {
        collection.forEach(function(book) {
            if (book._id === $routeParams.id) {
                $scope.book = book;
                $scope.book.canBeRequested = currentBook.canBeRequested(book);
                $scope.book.canRequestBeCanceled = currentBook.isBookRequestedByCurrentUser(book);
                $scope.book.canBeLiked = currentBook.canBeLiked(book);
                $scope.book.canLikeBeCanceled = currentBook.isBookLikedByCurrentUser(book);
                $scope.book.likesCount= book.likes.length;
                $scope.book.requestsCount = book.status.requestedBy.length;
                if(currentBook.isBookTaken(book)){
                    $scope.status= 'дата на връщане ' + book.status.takenBy.dateToBeReturned;
                }
                else{
                    $scope.status= 'в наличност';
                }
            }
        })
        if($scope.book._id != $routeParams.id){
            $location.path('/404');
        }
    })
    $scope.currentStatus = function(book){

            if (!currentBook.isBookRequested(book) && !currentBook.isBookTaken(book)) return 'в наличност';
            var userStatus = [];
            if (currentBook.isBookRequested(book)) {
                $.each(book.status.requestedBy, function (index, value) {
                    userStatus.push(value.userFirstName + ' ' + value.userLastName);
                });
            } else if (!currentBook.isBookRequested(book)) {
                $.each(book.status.requestedBy, function (index, value) {
                    userStatus.pop(value.userFirstName + ' ' + value.userLastName);
                });
            }
            if (currentBook.isBookTaken(book)) {
                return 'Взета от: ' + book.status.takenBy.userFirstName + ' ' + book.status.takenBy.userLastName;
            }
        return userStatus;
    }
    $scope.addRequestToBookAndUser = function(book) {
        if(book) {
            book.canBeRequested = false;
            bookFactory.addRequestToBookAndUser(book).then(function () {
                book.canRequestBeCanceled = true;
                book.requestsCount++;
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
        }
    };
    $scope.removeRequestFromBookAndUser = function(book){
        if(book) {
            book.canRequestBeCanceled = false;
            bookFactory.removeRequestFromBookAndUser(book).then(function () {
                book.canBeRequested = true;
                book.requestsCount--;
                notifier.warning("Заявката е отказана");

                $.each(book.status.requestedBy, function (i) {
                    if (book.status.requestedBy[i].userID === identity.currentUser._id) {
                        book.status.requestedBy.splice(i, 1);
                    }
                });

                $.each(identity.currentUser.requestedBooks, function (i) {
                    if (identity.currentUser.requestedBooks[i].bookID === book._id) {
                        identity.currentUser.requestedBooks.splice(i, 1);
                    }
                });
            })
        }
    };

    $scope.addLikeToBook = function(book) {
        book.canBeLiked=false;
        bookFactory.addLikeToBook(book).then(function () {
            book.canLikeBeCanceled=true;
            book.likesCount++;
            //notifier.success(book.title + " е харесана");
            book.likes.push({
                userID: identity.currentUser._id,
                userFirstName: identity.currentUser.firstName,
                userLastName: identity.currentUser.lastName
            });
        });
    };

    $scope.removeLikeFromBook = function(book){
        book.canLikeBeCanceled=false;
        bookFactory.removeLikeFromBook(book).then(function(){
            book.canBeLiked=true;
            //notifier.warning(book.title + " не е харесана");
            book.likesCount--;
            $.each(book.likes, function(i){
                if(book.likes[i].userID === identity.currentUser._id) {
                    book.likes.splice(i,1);
                    return false;
                }
            });
        })
    };

    $(document).ready(function()
    {
        $(".book-cover").error(function(){
            $(this).attr('src', '../../images/no_book_cover_4.jpg');
        });
    });



});