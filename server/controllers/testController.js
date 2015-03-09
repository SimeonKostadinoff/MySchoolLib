var encryption = require('../utilities/encryption');
if (!Array.prototype.forEach){
    Array.prototype.forEach = function(fun /*, thisp */)
    {
        "use strict";

        if (this === void 0 || this === null)
            throw new TypeError();

        var t = Object(this);
        var len = t.length >>> 0;
        if (typeof fun !== "function")
            throw new TypeError();

        var thisp = arguments[1];
        for (var i = 0; i < len; i++)
        {
            if (i in t)
                fun.call(thisp, t[i], i, t);
        }
    };
}
module.exports = {
    remakeThePass: function(req, res, next){
        var data=req.body;
        var splitedData;
        for(var i in data){
            if(data[i].name) {
                splitedData = data[i].name.split(" ");
                data[i].firstName = splitedData[0];
                data[i].surName = splitedData[1];
                data[i].lastName = splitedData[2];
                data[i].name=undefined;
            }
            data[i].salt=encryption.generateSalt();;
            data[i].hashPass= encryption.generateHashedPassword(data[i].salt, data[i].password);
            data[i].password=undefined;
        }
        res.send(data);
    }
}
