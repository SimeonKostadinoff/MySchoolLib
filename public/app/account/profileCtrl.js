app.controller('ProfileCtrl', function($scope, $location, auth, identity) {
    $scope.user = {
        firstName: identity.currentUser.firstName,
        lastName: identity.currentUser.lastName
    }

    $scope.requestedBooks = identity.currentUser.requestedBooks;
    $scope.takenBooks = identity.currentUser.takenBooks;


});