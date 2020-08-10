const express = require("express");
const router = express.Router();
const Books = require("../models/Books");
const {
    db
} = require("../models/Books");
const {
    Router
} = require("express");
//gettting all books
router.get("/", async (req, res) => {
    try {
        const books = await Books.find();
        res.json(books);
    } catch (err) {
        console.log(err);
        res.json({
            message: err
        });
    }
});
//posting the book
router.post('/', async (req, res) => {
    const books = new Books({
        isbn: req.body.isbn,
        title: req.body.title,
        subtitle: req.body.subtitle,
        author: req.body.author,
        published: req.body.published,
        publisher: req.body.publisher,
        pages: req.body.pages,
        description: req.body.description,
        website: req.body.website
    });
    try {
        //FOR POSTING MULTI BOOKS 
        //HAS TO HAVE THE WORK "book" BEFORE THE BULK OF BOOKS YOU WILL 
        //ADD TO THE DB
        if (req.body.book) {
            Books.create(req.body.book, function (err) {
                if (err)
                    res.send(err);

                else
                    res.json(req.body);
            });
        } else {
            //FOR ADDING ONE BOOK ONLY
            res.json(await books.save());
        }
    } catch (err) {
        console.log(err);
        res.json({
            message: err
        });
    }

});
// Get A SPECIFIC BOOK
router.get('/:booksId', async (req, res) => {
    try {
        const book = await Books.findById(req.params.booksId);
        res.json(book);
    } catch (err) {
        console.log(err);
    }
})

//DELETING THE BOOK
router.delete('/:booksId', async (req, res) => {
    try {
        const removedData = await Books.remove({
            _id: req.params.booksId
        });
        res.json(removedData);
    } catch (err) {
        res.json({
            message: err
        });
    }
})
//UPDATE A POST 
router.patch('/:booksId', async (req, res) => {
    try {
        const updatedData = await Books.updateOne({
            _id: req.params.booksId
        }, {
            $set: {
                isbn: req.body.isbn,
                title: req.body.title,
                subtitle: req.body.subtitle,
                author: req.body.author,
                published: req.body.published,
                publisher: req.body.publisher,
                pages: req.body.pages,
                description: req.body.description,
                website: req.body.website

            }
        });
        res.json(updatedData);
    } catch (err) {
        res.json({
            message: err
        });
    }
})
module.exports = router;