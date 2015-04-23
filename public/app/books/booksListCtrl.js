app.controller('BooksListCtrl', function($scope, cachedBooks, bookFactory, notifier, identity, currentBook) {
    $scope.books = cachedBooks.query();
    $scope.identity = identity;
    $scope.predicate = '-boughtDate';
    $scope.reverse=false;

// Advanced book search
    $(".show-advanced-search").click(function(){
        $scope.search="";
        $(".main-search").val("");
        $(".main-search").hide();
        $(".advanced-search").show();
        $(".advanced-search").val("");
        $(this).hide();
        $(".hide-advanced-search").show();

    });

    $(".hide-advanced-search").click(function(){
        $scope.search="";
        $(".advanced-search").val("");
        $(".advanced-search").hide();
        $(".main-search").show();
        $(".main-search").val("");
        $(this).hide();
        $(".show-advanced-search").show();
    });
        // end : advanced book search


    cachedBooks.query().$promise.then(function (collection) {
        collection.forEach(function (book) {
            book.canBeRequested = currentBook.canBeRequested(book);
            book.canRequestBeCanceled = currentBook.isBookRequestedByCurrentUser(book);
            book.canBeLiked = currentBook.canBeLiked(book);
            book.canLikeBeCanceled = currentBook.isBookLikedByCurrentUser(book);
            if(book.title.length > 35) {
                book.title=book.title.slice(0,35)+"...";
            }

        });
    });
    $scope.currentStatus = function(book){
        if(!currentBook.isBookRequested(book) && !currentBook.isBookTaken(book)) return 'в наличност';
        var userStatus = [];
        if(currentBook.isBookRequested(book)){
            $.each(book.status.requestedBy, function(index, value){
                userStatus.push(value.userFirstName + ' ' + value.userLastName);
            });
        }else if(!currentBook.isBookRequested(book)){
            $.each(book.status.requestedBy, function(index, value){
                userStatus.pop(value.userFirstName + ' ' + value.userLastName);
            });
        }
        return userStatus;
        if(currentBook.isBookTaken(book)){
            return 'Взета от: ' + book.status.takenBy.userFirstName + ' ' + book.status.takenBy.userLastName;
        }
    }

    $scope.addRequestToBookAndUser = function(book) {
        book.canBeRequested=false;
        bookFactory.addRequestToBookAndUser(book).then(function () {
            book.canRequestBeCanceled=true;
            notifier.success(book.title + " е заявена!");
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
            notifier.warning(book.title + " е отказана!");

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

    $scope.addLikeToBook = function(book) {
        book.canBeLiked=false;
        bookFactory.addLikeToBook(book).then(function () {
            book.canLikeBeCanceled=true;
            book.likesCount++;
            notifier.success(book.title + " е харесана");
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
            notifier.warning(book.title + " не е харесана");
            book.likesCount--;
            $.each(book.likes, function(i){
                if(book.likes[i].userID === identity.currentUser._id) {
                    book.likes.splice(i,1);
                    return false;
                }
            });

            ;
        })
    }
    $scope.currentLikes = function(book){
        var userLikes = [];
        if(currentBook.isBookLiked(book)){
            $.each(book.likes, function(index, value){
                userLikes.push(value.userFirstName + ' ' + value.userLastName);
            });
        }else{
            $.each(book.likes, function(index, value){
                userLikes.pop(value.userFirstName + ' ' + value.userLastName);
            });
        }
        return userLikes;
    }

    $scope.canBeLiked = function(book){
        return book.canBeLiked;
    }
    $scope.canLikeBeCanceled = function(book){
        return book.canLikeBeCanceled;
    }
    $(document).ready(function()
    {
        $(".book-cover").error(function(){
            $(this).attr('src', '../../images/no_book_cover_4.jpg');
        });

    });

});