var app = angular.module('app', ['ngResource', 'ngRoute']).value('toastr', toastr);

app.config(function($routeProvider, $locationProvider) {
    // $locationProvider.html5Mode(true);

    var routeUserChecks = {
        adminRole: {
            authenticate: function(auth) {
                return auth.isAuthorizedForRole('admin');
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
        .when('/books', {
            templateUrl: '/partials/books/books-list',
            controller: 'BooksListCtrl'
        })
        .when('/books/:id', {
            templateUrl: '/partials/books/book-details',
            controller: 'BookDetailsCtrl'
        })
        /*.when('/signup', {
            templateUrl: '/partials/account/signup',
            controller: 'SignUpCtrl'
        })*/
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
        .when('/admin/books', {
            templateUrl: '/partials/admin/books-list',
            controller: 'BookListCtrl',
            resolve: routeUserChecks.adminRole
        })
        .when('/admin/add-new-book', {
            templateUrl: '/partials/admin/add-new-book',
            controller: 'AddNewBookCtrl',
            resolve: routeUserChecks.adminRole
        })
        .when('/admin/books/:id', {
            templateUrl: '/partials/admin/admin-book',
            controller: 'AdminBookCtrl',
            resolve: routeUserChecks.adminRole
        })
});

app.run(function($rootScope, $location) {
    $rootScope.$on('$routeChangeError', function(ev, current, previous, rejection) {
        if (rejection === 'not authorized') {
            $location.path('/');
        }
    })
});