import express from "express";
import mongoose from 'mongoose';
import booksRouter from "./routes/booksRouter.js";

const app = express();

// MiddleWares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/books", booksRouter);

mongoose.connect("mongodb://127.0.0.1:27017/bookstore")
  .then(() => {
    console.log("Connected to database");
    app.listen(8080, () => {
      console.log(`App is listening on port 8080`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

app.get('/', (req, res) => {
  res.send('Hello World');
});
