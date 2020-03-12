const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
  title: String,
  isbn: String,
  pageCount: Number,
  publishedDate: String,
  thumbnailUrl: String,
  shortDescription: String,
  longDescription: String,
  status: String,
  authors: String,
  categories: String,
  price: String
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
