import express from "express";
import Book from "../models/bookSchema.js";
import verifyToken from '../utils/routesAuthentication.js'
import checkOwner from "../utils/userAuthorization.js";

const router = express.Router();

//Route for creating new books
router.post("/", verifyToken, async (req, res) => {
  const { title, author, publishedYear } = req.body;
  try {
      const newBook = new Book({
          title,
          author,
          publishedYear,
          createdBy: req.user.uid
      });
      await newBook.save();
      res.status(201).json(newBook);
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
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
router.get("/:id", async(req, res) => {
    try {
      let { id } = req.params;
      id = id.trim();
      let book = await Book.findById(id);
      if (!book) {
        return res.status(404).json({ message: "Book not found" });
      }
      res.json(book);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
});
  
//Route for updating book by Id
router.put("/:id", verifyToken,checkOwner,async (req, res) => {
    try {
      let {id} = req.params;
      id = id.trim();
      let book = await Book.findByIdAndUpdate(id,req.body);
      if (!book) {
        return res.status(404).json({ message: "Book not found" });
      }
      res.json(book);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
});
  
//Route for deleting from db
router.delete("/:id", verifyToken,checkOwner,async (req, res) => {
    try {
      let {id} = req.params;
      id = id.trim();
      let book = await Book.findByIdAndDelete(id);
      if (!book) {
        return res.status(404).json({ message: "Book not found" });
      }
      res.json(book);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
});

export default router;