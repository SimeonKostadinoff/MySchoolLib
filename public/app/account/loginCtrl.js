app.controller('LoginCtrl', function($scope, $location, notifier, identity, auth) {
    $scope.identity = identity;

    $scope.login = function(user) {
        auth.login(user).then(function(success) {
            if (success) {
                notifier.success('Успешен вход!');
            }
            else {
                notifier.error('Username/Password комбинацията не е валидна!');
            }
        });
    }

    $scope.logout = function() {
        auth.logout().then(function() {
            notifier.success('Успешен изход!');
            if ($scope.user) {
                $scope.user.username = '';
                $scope.user.password = '';
            }
            $location.path('/');
        })
    }
})