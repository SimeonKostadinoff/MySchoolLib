/**
 * Created by Nikolay Slavkov on 23.4.2015 г..
 */
app.factory('cachedUsers', function(UsersResource) {
    var cachedUsers;

    return {
        query: function() {
            if (!cachedUsers) {
                cachedUsers = UsersResource.query();
            }

            return cachedUsers;
        }
    }
});