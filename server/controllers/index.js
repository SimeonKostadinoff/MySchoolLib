var usersController = require('../controllers/usersController');
var booksController = require('../controllers/booksController');
var testController = require('../controllers/testController');
module.exports = {
    users: usersController,
    books: booksController,
    test: testController
}

