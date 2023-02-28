const router = require('express').Router();
const books = require('./books_dumb');
let bookDirectory = books;
router.get('/books', function (req, res) {
    res.send(bookDirectory);
})
router.get('/books/:id', function (req, res) {
    const { id } = req.params;
    const book = bookDirectory.find(b => b.isbn === id);
    if (!book) return res.status(404).send('book does not exist');
    res.send(book);
})
router.post('/books', function (req, res) {

});
router.put('/books/:id', function (req, res) {

})
router.post('/books/:id', function (req, res) {

})
router.delete('/books/:id', function (req, res) {

})
module.exports = router;