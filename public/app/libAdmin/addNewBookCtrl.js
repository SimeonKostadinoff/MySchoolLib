app.controller('AddNewBookCtrl', function($scope,$location,notifier,bookFactory){
    $scope.book = [];
    $scope.book.cover = '../../images/no_book_cover_4.jpg';

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
                            isbn: val.volumeInfo.industryIdentifiers[0].identifier,
                            cover: val.volumeInfo.imageLinks.thumbnail
                        });
                    }
                    else{
                        $scope.book.push({
                            title: val.volumeInfo.title,
                            author: val.volumeInfo.authors,
                            publisher: val.volumeInfo.publisher,
                            publishedDate: parseInt(val.volumeInfo.publishedDate.substring(0, 4)),
                            isbn: val.volumeInfo.industryIdentifiers[0].identifier,
                            summary: val.volumeInfo.description,
                            cover: '../../images/no_book_cover_4.jpg'
                        });
                    }

                });
                $scope.items=items;
                $scope.$apply();
            }
        })
    }

    $scope.addNewBook = function(book){
        if(!book.cover) {
            book.cover = '../../images/no_book_cover_4.jpg';
        }
        bookFactory.addNewBook(book).then(function(){
            notifier.info('Книгата е добавена.');
            $scope.book=[];
            if($scope.items){
                $scope.items=[];
            }
        })
    }


}).directive("fileread", function () {
        return {
            scope: {
                fileread: "="
            },
            link: function (scope, element, attributes) {
                element.bind("change", function (changeEvent) {
                    var reader = new FileReader();
                    reader.onload = function (loadEvent) {
                        scope.$apply(function () {
                            scope.fileread = loadEvent.target.result;
                        });
                    }
                    reader.readAsDataURL(changeEvent.target.files[0]);
                });
            }
        }
    });