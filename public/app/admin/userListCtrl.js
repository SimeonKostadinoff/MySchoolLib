app.controller('UserListCtrl', function($scope, cachedUsers) {
    $scope.users = cachedUsers.query();

    $scope.pageSize=20;
    $scope.currentPage=1;

});