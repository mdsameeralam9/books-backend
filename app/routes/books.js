const express = require("express");
const router = express.Router()
const Book = require('../models/book');
const middleware = require('../middlewares/jwt-auth');
const uploadFileToAWS = require('../middlewares/upload');


router.post("/add-book", middleware.token, uploadFileToAWS, function (req, res) {
  console.log(req.file)
  const newBook = new Book({
    ...req.body,
    thumbnailUrl: req.file.location
  });
  newBook
    .save()
    .then(function (book) {
      res.send(book)
    })
    .catch(function (error) {
      res.send(error);
    });
});

router.get("/book",  function (req, res) {
  Book.find()
    .then(function (books) {
      res.send(books);
    })
    .catch(function (error) {
      res.send(error);
    });
});

router.get("/book/:id", middleware.token, function (req, res) {
  Book.findById({ _id: req.params.id })
    .then(function (book) {
      console.log(book)
      res.send(book);
    })
    .catch(function (error) {
      res.send(error);
    });
});

router.put("/update/:id", middleware.token, function (req, res) {
  Book.findOneAndUpdate(
    { _id: req.params.id },
    { $set: req.body },
    { new: true }
  )
    .then(function (book) {
      res.send(book);
    })
    .catch(function (error) {
      res.send(error);
    });
});

router.delete("/delete/:id", middleware.token, function (req, res) {
  Book.findByIdAndRemove(req.params.id)
    .then(function (book) {
      res.send(book);
    })
    .catch(function (error) {
      res.send(error);
    });
});

module.exports = router
