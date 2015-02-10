app.factory('notifier', function(toastr) {
    toastr.options.showMethod = 'slideDown';
    toastr.options.hideMethod = 'slideUp';
    toastr.options.timeOut = 1000;
    toastr.options.extendedTimeOut = 0;
    return {
        success: function(msg) {
            toastr.success(msg);
        },
        error: function(msg) {
            toastr.error(msg);
        },
        info: function(msg) {
            toastr.info(msg);
        },
        warning: function(msg) {
            toastr.warning(msg);
        }
    }
})