app.controller('UpdateBookCtrl', function($scope, $location, notifier, bookFactory, cachedBooks, $routeParams) {

    $scope.book = cachedBooks.query().$promise.then(function(collection) {
        collection.forEach(function(book) {
            if (book._id === $routeParams.id) {
                $scope.book = book;
            }
        })
        if($scope.book._id != $routeParams.id){
            $location.path('/404');
        }
    })

    $scope.updateBook = function(book) {
        if (!book.cover) {
            book.cover = '../../images/no_book_cover_4.jpg';
        }
        bookFactory.updateBook(book).then(function () {
            notifier.info('Книгата е обновена.');
        })
    }
    $(document).ready(function()
    {
        $(".book-cover").error(function(){
            $(this).attr('src', '../../images/no_book_cover_4.jpg');
        });
    });
});