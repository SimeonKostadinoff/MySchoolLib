app.controller('AddNewBookCtrl', function($scope,$location,notifier,bookFactory){
    $scope.book = [];
    $scope.getBookByISBN = function(isbn){
        if($scope.book) {
            $scope.book = [];
        }
        if($scope.items){
            $scope.items=[];
        }
        if(isbn) {
            isbn = isbn.replace("-", "");
            isbn = isbn.replace(" ", "");
        }
        $.getJSON("https://www.googleapis.com/books/v1/volumes?q=isbn:" + isbn, function( data ) {
            if(data.totalItems==0) {
                notifier.error("Не може да се намери тази книга");
            }

            $scope.searchByISBN.$setPristine();
            if(data.totalItems!=0) {
                var items=[];
                $.each(data.items, function( index, val ) {
                    items.push(val);
                    if(val.volumeInfo.imageLinks) {
                        $scope.book.push({
                            title: val.volumeInfo.title,
                            author: val.volumeInfo.authors,
                            publisher: val.volumeInfo.publisher,
                            publishedDate: parseInt(val.volumeInfo.publishedDate.substring(0, 4)),
                            summary: val.volumeInfo.description,
                            cover: val.volumeInfo.imageLinks.thumbnail
                        });
                    }
                    else{
                        $scope.book.push({
                            title: val.volumeInfo.title,
                            author: val.volumeInfo.authors,
                            publisher: val.volumeInfo.publisher,
                            publishedDate: parseInt(val.volumeInfo.publishedDate.substring(0, 4)),
                            summary: val.volumeInfo.description,
                            cover: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTAiv3W8rpjZDScrTNPbgry0KO9oumVc_I3mkjamGfMEfI_gRRO-WZgpQ"
                        });
                    }


                });
                $scope.items=items;
                $scope.$apply();
            }
        })
    }



    $scope.addNewBook = function(book, form){
        bookFactory.addNewBook(book).then(function(){
            notifier.info(book.title + ' е добавена.');
            $scope.book=[];
            if($scope.items){
                $scope.items=[];
            }
        })
    }
})