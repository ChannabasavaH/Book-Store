import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "../components/Spinner.jsx";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineDeleteOutline, MdOutlineEdit } from "react-icons/md";
import { IoAddSharp, IoInformation } from "react-icons/io5";
import { useSnackbar } from 'notistack';
import "../index.css";
import NavBar from "../components/NavBar.jsx";
import { getAuth } from "firebase/auth";

const Home = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const auth = getAuth();
    const user = auth.currentUser;

    const fetchBooks = async () => {
        try {
            const token = await user.getIdToken();
            const res = await axios.get("/api/books", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setBooks(res.data);
        } catch (error) {
            console.error("Error fetching books:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user) {
            fetchBooks();
        } else {
            setLoading(false);
        }
    }, [user]);

    const handleDelete = async (id) => {
        try {
            const token = await user.getIdToken();
            await axios.delete(`/api/books/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            enqueueSnackbar("Book Deleted Successfully", { variant: "success" });
            setBooks((prevBooks) => prevBooks.filter(book => book._id !== id));
        } catch (error) {
            console.log(error);
            enqueueSnackbar("Error Occurred", { variant: "error" });
        }
    };

    const handleEdit = (book) => {
        navigate('/api/books', { state: { book: book } });
    };

    if (loading) return <Spinner />;

    return (
        <div>
            <NavBar />
            {user ? (
                <>
                    <div className="flex justify-between items-center">
                        <h1 className="text-xl m-8 flex">Books Lists</h1>
                        <Link to={`/api/books`}>
                            <IoAddSharp className="mr-8" />
                        </Link>
                    </div>
                    <div className="">
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
                                {books.map((book, index) => (
                                    <tr key={book._id}>
                                        <td className="border border-slate-600 text-center rounded-md">
                                            {index + 1}
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
                                                {user && user.uid === book.createdBy && (
                                                    <>
                                                        <button onClick={() => handleEdit(book)}><MdOutlineEdit /></button>
                                                        <button onClick={() => handleDelete(book._id)}><MdOutlineDeleteOutline /></button>
                                                    </>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            ) : (
                <div className="flex justify-center items-center">
                    <h1 className="text-2xl text-black">You are not logged In</h1>
                </div>
            )}
        </div>
    );
};

export default Home;
