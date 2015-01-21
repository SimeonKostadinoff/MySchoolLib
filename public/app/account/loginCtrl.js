app.controller('LoginCtrl',function($scope,$location, $http, notifier,identity, auth){
    $scope.identity=identity;
    $scope.login = function(user){
        auth.login(user).then(function(success){
            if(success){
                notifier.success("Successful login!");
            }
            else{
                notifier.error("Ussername/Password combination is not valid!");
            }
        })

        $scope.logout = function() {
            auth.logout().then(function(success){
                notifier.success('Successful logout!');
                $scope.user.username='';
                $scope.user.password='';
                $location.path('/');
            });
        }
    }
})