app.controller('AddNewBookCtrl', function($scope,$location,notifier,bookFactory){
    $scope.addNewBook = function(book){
        bookFactory.addNewBook(book).then(function(){
            notifier.info('"' + book.title + '"' + ' е добавена.');
            book.title='';
            book.author='';
            book.tags='';
        })
    }
})