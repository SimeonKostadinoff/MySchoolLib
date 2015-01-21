app.factory('identity', function($window){
    var currentUser;
    return{
        currentUser: $window.bootstrappedUserObject,
        isAuthenticated: function(){
            return !!this.currentUser;
        }
    }
})