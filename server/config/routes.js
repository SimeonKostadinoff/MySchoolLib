var auth = require('./auth'),
    controllers = require('../controllers');

module.exports = function(app) {
    app.get('/api/users', auth.isInRole('admin'), controllers.users.getAllUsers);

    app.post('/api/books',auth.isInRole('libAdmin'), controllers.books.addNewBook);
    app.get('/api/books', controllers.books.getAllBooks);
    app.get('/api/books/:id', controllers.books.getBookById);
    app.get('/api/notReturnedBooks', controllers.books.getNotReturnedBooks);
    app.put('/api/books', auth.isAuthenticated, controllers.books.addOrRemoveRequestOrTakeBook);

    app.get('/partials/:partialArea/:partialName', function(req, res) {
        res.render('../../public/app/' + req.params.partialArea + '/' + req.params.partialName)
    });

    app.post('/login', auth.login);
    app.post('/logout', auth.logout);

    app.get('/api/*', function(req, res) {
        res.status(404);
        res.redirect('/#/404');
        res.end();
    })

    app.get('*', function(req, res) {
        res.render('index', {currentUser: req.user});
    });
}