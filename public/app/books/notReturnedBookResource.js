app.factory('NotReturnedBookResource', function($resource) {
    var NotReturnedBookResource = $resource('/api/notReturnedBooks', { update: {method: 'PUT', isArray: false}});

    return NotReturnedBookResource;
})