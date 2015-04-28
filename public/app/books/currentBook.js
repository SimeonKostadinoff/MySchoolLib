app.factory('currentBook', function(identity){

    var isBookRequested = function(book){
        if(book.status.requestedBy == null
            || book.status.requestedBy == undefined
            || book.status.requestedBy == ''
            ||book.status.requestedBy == ""
            || book.status.requestedBy == []
            || book.status.takenBy == {}){
            return false;
        }
        else{
            return true;
        }
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
        },

        isBookLiked = function(book){
            if(book.likes == null
                || book.likes == undefined
                || book.likes == ''
                || book.likes == ""
                || book.likes == []) return false;
            else return true;
        },

        isBookLikedByCurrentUser = function(book){
            if(identity.isAuthenticated()) {
                var isLiked = false;
                $.each(book.likes, function(index, value) {
                    if (value.userID == identity.currentUser._id)    isLiked = true;
                });

                return isLiked;
            }
            else return false;
        },

        canBeLiked = function(book){
            if(!isBookLikedByCurrentUser(book)
                && identity.isAuthenticated()) return true;
        }




    return {
        isBookRequested: isBookRequested,
        isBookLiked: isBookLiked,
        isBookTaken: isBookTaken,
        isBookRequestedByCurrentUser: isBookRequestedByCurrentUser,
        isBookLikedByCurrentUser: isBookLikedByCurrentUser,
        isBookTakenByCurrentUser: isBookTakenByCurrentUser,
        canBeRequested:canBeRequested,
        canBeLiked:canBeLiked
    }
})