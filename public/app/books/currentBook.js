app.factory('currentBook', function(identity){

    var isBookRequested = function(book){
        if(book.status.requestedBy == null
            || book.status.requestedBy == undefined
            || book.status.requestedBy == ''
            ||book.status.requestedBy == "") return false;
        else return true;
        },

        isBookTaken = function(book){
            if(book.status.takenBy == null
                || book.status.takenBy == undefined
                || book.status.takenBy == ''
                ||book.status.takenBy == "") return false;
            else return true;
        },

        isBookRequestedByCurrentUser = function(book){
            if(identity.isAuthenticated()) {
                var isRequested = false;
                book.status.requestedBy.forEach(function (request) {
                    if (request.userID == identity.currentUser._id) {
                        isRequested = true;
                    }
                })
                return isRequested;
            }
            else return false;
        },

        isBookTakenByCurrentUser = function(book){
            if(identity.isAuthenticated()) {
                if (book.status.takenBy.userID == identity.currentUser._id) {
                    return true;
                }
                else {
                    return false;
                }
            }
            else return false;

        },

        canBeRequested = function(book){
        if(!isBookTaken(book)
            && !isBookRequestedByCurrentUser(book)
            && identity.isAuthenticated()){
            return true;
            }
        };


    return {
        isBookRequested: isBookRequested,
        isBookTaken: isBookTaken,
        isBookRequestedByCurrentUser: isBookRequestedByCurrentUser,
        isBookTakenByCurrentUser: isBookTakenByCurrentUser,
        canBeRequested:canBeRequested
    }
})