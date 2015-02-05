app.controller('BooksListCtrl', function($scope, cachedBooks, bookFactory, notifier, $window, identity, UsersResource) {
    $scope.books = cachedBooks.query();
    $scope.identity = identity;

    cachedBooks.query().$promise.then(function (collection) {
        collection.forEach(function (book) {

            if ((book.status.requestedBy == null || book.status.requestedBy == '' || book.status.requestedBy == "")
                && (book.status.takenBy == null || book.status.takenBy == '' || book.status.takenBy == "")) {
                book.currentStatus = 'в наличност';
                book.isDisabled = false;
            }
            else if ((book.status.requestedBy != null || book.status.requestedBy != '' || book.status.requestedBy != "") && (book.status.takenBy == null || book.status.takenBy == '' || book.status.takenBy == "")) {
                book.currentStatus = book.status.requestedBy;
                book.isDisabled = false;
                if(identity.isAuthenticated()){
                    //TODO: if the user already have request to the book he have to be able to cancel it
                    if(true){

                    }
                }
            }
            else {
                book.currentStatus = book.status.takenBy;
                book.isDisabled = true;
            }

        });
    });


    $scope.addRequestToBookAndUser = function(book) {
        bookFactory.addRequestToBookAndUser(book).then(function () {
            $window.location.reload();
            notifier.success("Request done successfully!");

        });
    }
    $scope.addTakenToBookAndUser = function(book){
        bookFactory.addTakenToBookAndUser(book).then(function(){
            $window.location.reload();
            notifier.success("Book taken successfully!");
        })
    }




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