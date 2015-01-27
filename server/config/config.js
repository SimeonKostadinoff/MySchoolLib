var path = require('path');
var rootPath = path.normalize(__dirname + '/../../')

module.exports = {
    development: {
        rootPath: rootPath,
        db: 'mongodb://localhost/my-school-lib',
        port: process.env.PORT || 3030
    },
    production: {
        rootPath: rootPath,
        db: 'mongodb://admin:admin@ds031551.mongolab.com:31551/my-school-lib-db',
        port: process.env.PORT || 3030
    }
}