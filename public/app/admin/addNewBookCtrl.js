app.controller('AddNewBookCtrl', function($scope,$location,notifier,addBook){
    $scope.addNewBook = function(book){
        addBook.addNewBook(book).then(function(){
            notifier.info('"' + book.title + '"' + ' е добавена.');
            book.title='';
            book.author='';
            book.tags='';
        })
    }
})