import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "../components/Spinner.jsx";
import BackButton from "../components/BackButton";
import { useNavigate, useLocation } from "react-router-dom";
import { useSnackbar } from "notistack";
import { getAuth } from "firebase/auth";

const CreateBook = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [publishedYear, setPublishedYear] = useState('');
    const [bookId, setBookId] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const location = useLocation();
    const auth = getAuth();
    const user = auth.currentUser;

    useEffect(() => {
        if (location.state && location.state.book) {
            const { book } = location.state;
            setTitle(book.title);
            setAuthor(book.author);
            setPublishedYear(book.publishedYear);
            setBookId(book._id);
        }
    }, [location.state]);

    const handleChange = async (event) => {
        event.preventDefault();
        try {
            const token = await user.getIdToken();
            setLoading(true);
            const data = {
                title,
                author,
                publishedYear
            };

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            if (bookId) {
                await axios.put(`/api/books/${bookId}`, data, config);
                enqueueSnackbar("Book Updated Successfully", { variant: "success" });
            } else {
                await axios.post("/api/books", data, config);
                enqueueSnackbar("Book Created Successfully", { variant: "success" });
            }
            navigate('/');
        } catch (error) {
            console.log("Error occured", error);
            enqueueSnackbar("Error Occured", { variant: "error" });
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Spinner />;

    return (
        <div className="p-4">
            <BackButton />
            <div>
                <h1 className="text-2xl text-black-600">Create New Book</h1>
            </div>
            <div className="border-2 border-sky-600 rounded-md flex flex-col w-full md:w-1/2 lg:w-1/3 p-4 mx-auto">
                <form onSubmit={handleChange}>
                    <div className="my-4">
                        <label htmlFor="title" className="mr-4 text-xl text-black-600">Title</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(event) => { setTitle(event.target.value) }}
                            className="border-2 border-black-600 rounded-md px-4 py-2 w-full"
                            required
                        />
                    </div>
                    <div className="my-4">
                        <label htmlFor="author" className="mr-4 text-xl text-black-600">Author</label>
                        <input
                            type="text"
                            id="author"
                            value={author}
                            onChange={(event) => { setAuthor(event.target.value) }}
                            className="px-4 py-2 w-full border-2 border-black-600 rounded-md"
                            required
                        />
                    </div>
                    <div className="my-4">
                        <label htmlFor="publishedYear" className="mr-4 text-xl text-black-600">Published Year</label>
                        <input
                            type="number"
                            id="publishedYear"
                            value={publishedYear}
                            onChange={(event) => { setPublishedYear(event.target.value) }}
                            className="px-4 py-2 w-full border-2 border-black-600 rounded-md"
                            required
                        />
                    </div>
                    <button className="px-4 py-2 w-full bg-sky-600 text-black-600 text-center rounded-md">
                        {bookId ? "Update" : "Create"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CreateBook;
