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
    const {
        title,
        isbn,
        pageCount,
        publishedDate,
        thumbnailUrl,
        shortDescription,
        longDescription,
        status,
        authors,
        categories
    } = req.body;
    const bookExist = bookDirectory.find(b => b.isbn === isbn);
    if (bookExist) return res.send('book already exist');
    const book = {
        title,
        isbn,
        pageCount,
        publishedDate,
        thumbnailUrl,
        shortDescription,
        longDescription,
        status,
        authors,
        categories
    }
    bookDirectory.push(book);
    res.send(book);
});
router.put('/books/:id', function (req, res) {
    const { id } = req.params;
    const {
        title,
        isbn,
        pageCount,
        publishedDate,
        thumbnailUrl,
        shortDescription,
        longDescription,
        status,
        authors,
        categories
    } = req.body;
    const book = bookDirectory.find(b => b.isbn === id);
    if (!book) return res.send('book does not exist');

    const updatedField = (val, prev) => !val ? prev : val;
    const updatedBook = {
        ...book,
        title: updatedField(title, book.title),
        isbn: updatedField(isbn, book.isbn),
        pageCount: updatedField(pageCount, book.pageCount),
        publishedDate: updatedField(publishedDate, book.publishedDate),
        thumbnailUrl: updatedField(thumbnailUrl, book.thumbnailUrl),
        status: updatedField(status, book.status),
        authors: updatedField(authors, book.authors),
        categories: updatedField(categories, book.categories)
    }
    const bookIndex = bookDirectory.findIndex(b => b.isbn === id);
    bookDirectory.splice(bookIndex, 1, updatedBook);
    res.send(updatedBook);
})

router.delete('/books/:id', function (req, res) {
    const { id } = req.params;
    let bookexist = bookDirectory.find(b => b.isbn === id);
    if (!bookexist) return res.status(404).send('Book does not exist');
    bookDirectory = bookDirectory.filter(b => b.isbn !== id);
    res.send('success');
});
module.exports = router;
