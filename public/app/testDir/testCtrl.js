app.controller('TestCtrl', function($scope, $q, $http) {

    var testFunc =  function(){
        var deferred = $q.defer();
        $http.post('/test', $scope.data).success(function(response) {
            if (response) {
                $scope.data=response;
                deferred.resolve(true);
            }
            else {
                deferred.resolve(false);
            }
        });
        return deferred.promise;
    };

    $(".test-btn").on("click", testFunc);


});