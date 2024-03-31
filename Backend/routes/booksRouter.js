import express from "express";
import Book from "../models/bookSchema.js";

const router = express.Router();

//Route for creating new books
router.post("/", async(req,res) => {
    let {title,author,publishedYear} = req.body;
    try{
      const newBooks = new Book({
        title: title,
        author : author,
        publishedYear: publishedYear,
      });
      await newBooks.save();
      res.status(201).json(newBooks);
    }catch(err){
      console.log(err);
    }  
  });
  
  
//Route for getting all books
router.get("/", async(req,res) => {
    try {
      let books = await Book.find({}); 
      if (books.length === 0) {
        return res.status(404).json({ message: "Books not found" });
      }
      res.json(books);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
});
  
//Route for getting books by id
router.get("/:id", async (req, res) => {
    try {
      let {id} = req.params;
      id = id.trim();
      let book = await Book.findById(id);
      if (!book) {
        return res.status(404).json({ message: "Book not found" });
      }
      console.log(book);
      res.json(book);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
});
  
//Route for updating book by Id
router.put("/:id", async (req, res) => {
    try {
      let {id} = req.params;
      id = id.trim();
      let book = await Book.findByIdAndUpdate(id,req.body);
      if (!book) {
        return res.status(404).json({ message: "Book not found" });
      }
      console.log(book);
      res.json(book);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
});
  
//Route for deleting from db
router.delete("/:id", async (req, res) => {
    try {
      let {id} = req.params;
      id = id.trim();
      let book = await Book.findByIdAndDelete(id);
      if (!book) {
        return res.status(404).json({ message: "Book not found" });
      }
      console.log(book);
      res.json(book);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
});

export default router;