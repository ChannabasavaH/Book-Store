import React from "react";
import {Routes,Route} from "react-router-dom";
import CreateBook from "./pages/CreateBook";
import ShowBook from "./pages/ShowBook";
import Home from "./pages/Home";
import Login from './pages/Login'
import SignUp from "./pages/SignUp";


const App = () => {
  return(
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/api/books" element={<CreateBook />} />
      <Route path="/api/books/:id" element={<ShowBook />} />
      <Route path="/api/login" element={<Login />} />
      <Route path="/api/signup" element={<SignUp />} />
      </Routes> 
  );
}

export default App;