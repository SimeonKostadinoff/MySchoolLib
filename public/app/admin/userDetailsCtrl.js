app.controller('UserDetailsCtrl', function($scope, $routeParams, $location, cachedUsers, identity, notifier) {

    $scope.user = cachedUsers.query().$promise.then(function(collection) {
        collection.forEach(function(user) {
            if (user._id === $routeParams.id) {
                $scope.user = user;
            }
        })
        if($scope.user._id != $routeParams.id){
            $location.path('/404');
        }
    })






});