app.factory('currentBook', function(identity){

    var isBookRequested = function(book){
        if(book.status.requestedBy == null
            || book.status.requestedBy == undefined
            || book.status.requestedBy == ''
            ||book.status.requestedBy == ""
            || book.status.requestedBy == []
            || book.status.takenBy == {}) return false;
        else return true;
        },

        isBookTaken = function(book){
            if(book.status.takenBy == null
                || book.status.takenBy == undefined
                || book.status.takenBy == ''
                ||book.status.takenBy == ""
                || book.status.takenBy == {}
                || book.status.takenBy == []) return false;
            else return true;
        },

        isBookRequestedByCurrentUser = function(book){
            if(identity.isAuthenticated()) {
                var isRequested = false;
                $.each(book.status.requestedBy, function(index, value) {
                    if (value.userID == identity.currentUser._id)    isRequested = true;
                });

                return isRequested;
            }
            else return false;
        },

        isBookTakenByCurrentUser = function(book){
            if(identity.isAuthenticated() && !!book.status.takenBy) {
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
        if(!isBookRequestedByCurrentUser(book)
            && !isBookTakenByCurrentUser(book)
            && identity.isAuthenticated()) return true;
        };


    return {
        isBookRequested: isBookRequested,
        isBookTaken: isBookTaken,
        isBookRequestedByCurrentUser: isBookRequestedByCurrentUser,
        isBookTakenByCurrentUser: isBookTakenByCurrentUser,
        canBeRequested:canBeRequested
    }
})