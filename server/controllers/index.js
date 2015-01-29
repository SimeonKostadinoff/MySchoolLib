var usersController = require('../controllers/usersController');
var coursesController = require('../controllers/coursesController');
var booksController = require('../controllers/booksController');

module.exports = {
    users: usersController,
    courses: coursesController,
    books: booksController
}