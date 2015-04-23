app.controller('UserListCtrl', function($scope, cachedUsers) {
    $scope.users = cachedUsers.query();
    $scope.currentPage = 0;
    $scope.pageSize = 30;
    $scope.numberOfPages=function(){
        return Math.ceil($scope.users.length/$scope.pageSize);
    }

});
app.filter('startFrom', function() {
    return function(input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
});