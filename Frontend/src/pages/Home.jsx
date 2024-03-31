import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "../components/Spinner.jsx";
import { Link } from "react-router-dom";
import { MdOutlineDeleteOutline,MdOutlineEdit } from "react-icons/md";
import { IoAddSharp,IoInformation } from "react-icons/io5";
import "../index.css"

const Home = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const res = await axios.get("/api/books");
                setBooks(res.data);
            } catch (error) {
                console.error("Error fetching books:", error);
                setError("An error occurred while fetching books.");
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

    if (loading) return <Spinner />;

    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <div className="flex justify-between items-center">
                <h1 className="text-xl m-8 flex justify-between">Books Lists</h1>
                <Link to={`/api/books`}>
                    <IoAddSharp />
                </Link>
            </div>
            <div>
                <table className="w-full border-separate border border-slate-500 border-spacing-2 rounded-md">
                    <thead>
                        <tr>
                            <th className="border border-slate-600 text-center rounded-md">No.</th>
                            <th className="border border-slate-600 text-center rounded-md">Title</th>
                            <th className="border border-slate-600 text-center rounded-md">Author</th>
                            <th className="border border-slate-600 text-center rounded-md">Published-Year</th>
                            <th className="border border-slate-600 text-center rounded-md">Operations</th>
                        </tr>
                    </thead>
                    <tbody>
                    {books.map((book,index) => (
                    <tr key={book._id}>
                        <td className="border border-slate-600 text-center rounded-md">
                            {index+1}
                        </td>
                        <td className="border border-slate-600 text-center rounded-md">
                            {book.title}
                        </td>
                        <td className="border border-slate-600 text-center rounded-md">
                            {book.author}
                        </td>
                        <td className="border border-slate-600 text-center rounded-md">
                            {book.publishedYear}
                        </td>
                        <td className="border border-slate-600 text-center rounded-md">
                            <div className="flex justify-center space-x-2">
                                <Link to={`/api/books/${book._id}`}> 
                                    <IoInformation />
                                </Link>
                                <Link to={`/api/books/edit/${book._id}`}>
                                    <MdOutlineEdit />
                                </Link>
                                <Link to={`/api/books/delete/${book._id}`}>
                                    <MdOutlineDeleteOutline />
                                </Link>
                            </div>
                        </td>
                     </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Home;
