var app = angular.module('app', ['ngResource', 'ngRoute', 'angularUtils.directives.dirPagination']).value('toastr', toastr);

app.config(function($routeProvider) {

    var routeUserChecks = {
        adminRole: {
            authenticate: function(auth) {
                return auth.isAuthorizedForRole('admin');
            }
        },
        libAdminRole: {
            authenticate: function(auth) {
                return auth.isAuthorizedForRole('libAdmin');
            }
        },
        authenticated: {
            authenticate: function(auth) {
                return auth.isAuthenticated();
            }
        }
    };

    $routeProvider
        .when('/', {
            templateUrl: '/partials/main/home',
            controller: 'MainCtrl'
        })
        .when('/404',{
            templateUrl: 'partials/main/404'
        })
        .when('/books', {
            templateUrl: '/partials/books/books-list',
            controller: 'BooksListCtrl'
        })
        .when('/books/:id', {
            templateUrl: '/partials/books/book-details',
            controller: 'BookDetailsCtrl'
        })
        .when('/profile', {
            templateUrl: '/partials/account/profile',
            controller: 'ProfileCtrl',
            resolve: routeUserChecks.authenticated
        })
        .when('/admin/users', {
            templateUrl: '/partials/admin/users-list',
            controller: 'UserListCtrl',
            resolve: routeUserChecks.adminRole
        })
        .when('/admin/users/:id', {
            templateUrl: '/partials/admin/user-details',
            controller: 'UserDetailsCtrl',
            resolve: routeUserChecks.adminRole
        })
        .when('/libAdmin/books', {
            templateUrl: '/partials/libAdmin/books-list',
            controller: 'BookListCtrl',
            resolve:routeUserChecks.libAdminRole
        })
        .when('/libAdmin/add-new-book', {
            templateUrl: '/partials/libAdmin/add-new-book',
            resolve: routeUserChecks.libAdminRole
        })
        .when('/libAdmin/books/:id', {
            templateUrl: '/partials/libAdmin/admin-book',
            controller: 'AdminBookCtrl',
            resolve: routeUserChecks.libAdminRole
        })
        .when('/libAdmin/add-book-manual', {
            templateUrl: '/partials/libAdmin/add-book-manual',
            controller: 'AddNewBookCtrl',
            resolve: routeUserChecks.libAdminRole
        })
        .when('/libAdmin/add-book-by-isbn', {
            templateUrl: '/partials/libAdmin/add-book-by-isbn',
            controller: 'AddNewBookCtrl',
            resolve: routeUserChecks.libAdminRole
        })
        .when('/libAdmin/update-book/:id', {
            templateUrl: '/partials/libAdmin/update-book',
            controller: 'UpdateBookCtrl',
            resolve: routeUserChecks.libAdminRole
        })
        .when('/libAdmin/not-returned-books', {
            templateUrl: '/partials/libAdmin/not-returned-books',
            controller: 'NotReturnedBooksCtrl',
            resolve: routeUserChecks.libAdminRole
        })
        .otherwise({redirectTo: '/404'});



});

app.run(function($rootScope, $location) {
    $rootScope.$on('$routeChangeError', function(ev, current, previous, rejection) {
        if (rejection === 'not authorized') {
            $location.path('/');
        }
    })
});