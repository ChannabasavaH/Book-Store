import React from "react";
import {Routes,Route} from "react-router-dom";
import CreateBook from "./pages/CreateBook";
import ShowBook from "./pages/ShowBook";
import EditBook from "./pages/EditBook";
import DeleteBook from "./pages/DeleteBook";
import Home from "./pages/Home";


const App = () => {
  return(
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/api/books" element={<CreateBook />} />
      <Route path="/api/books/:id" element={<ShowBook />} />
      <Route path="/api/books/edit/:id" element={<EditBook />} />
      <Route path="/api/books/delete/:id" element={<DeleteBook />} />
      </Routes> 
  );
}

export default App;