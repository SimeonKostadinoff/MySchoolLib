app.factory('identity', function($window, UsersResource) {
    var user;
    if ($window.bootstrappedUserObject) {
        user = new UsersResource()
        /*var userObject= {
            _id: user._id,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            salt: user.salt,
            hashPass: user.hashPass,
            roles: user.roles
        }*/
        angular.extend(user, $window.bootstrappedUserObject);
    }
    return {
        currentUser: user,
        isAuthenticated: function() {
            return !!this.currentUser;
        },
        isAuthorizedForRole: function(role) {
            return !!this.currentUser && this.currentUser.roles.indexOf(role) > -1;
        }
    }
});