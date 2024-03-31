import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";
import "../index.css"

const ShowBook = () => {
    const [book, setBook] = useState({});
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        if (!id) {
            setLoading(false);
            return;
        }

        const fetchBook = async () => {
            try {
                const res = await axios.get(`/api/books/${id}`);
                setBook(res.data);
            } catch (error) {
                console.log("Failed to fetch book", error);
            } finally {
                setLoading(false);
            }
        };
        fetchBook();
    }, [id]);

    if (loading) return <Spinner />;

    if (!book || Object.keys(book).length === 0) return <div>No book found</div>;

    return (
        <div>
            <BackButton />
            <div>
                <h1 className="text-2xl text-bold">Details of a Book</h1>
            </div>
            <div className="w-1/2 h-1/2 border border-2 border-sky-600 m-4 rounded-md">
                <div className="px-4 my-4">
                    <span className="text-inherit text-md">Title : </span>
                    <span className="text-slate-500 text-xl">{book.title}</span>
                </div>
                <div className="px-4 my-4">
                    <span className="text-inherit text-md">Author : </span>
                    <span className="text-slate-500 text-xl">{book.author}</span>
                </div>
                <div className="px-4 my-4">
                    <span className="text-inherit text-md">Published Year : </span>
                    <span className="text-slate-500 text-xl">{book.publishedYear}</span>
                </div>
                <div className="px-4 my-4">
                    <span className="text-inherit text-md">Created At : </span>
                    <span className="text-slate-500 text-xl">{new Date(book.createdAt).toString()}</span>
                </div>
                <div className="px-4 my-4">
                    <span className="text-inherit text-md">Updated At : </span>
                    <span className="text-slate-500 text-xl">{new Date(book.updatedAt).toString()}</span>
                </div>
            </div>   
        </div>
    );
};

export default ShowBook;
