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

    return (
        <div>
            <div className="m-8">
                <BackButton />
            </div>
            <div>
                <h1 className="text-2xl text-bold text-center">Details of a Book</h1>
            </div>
            <div className="flex flex-col justify-center items-center">
                <div className="w-1/2 h-1/2 border border-2 border-sky-600 m-4 rounded-md w-full md:w-1/2 lg:w-1/3">
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
                        <span className="text-slate-500 text-xl">{new Date(book.createdAt).toLocaleString()}</span>
                    </div>
                    <div className="px-4 my-4">
                        <span className="text-inherit text-md">Updated At : </span>
                        <span className="text-slate-500 text-xl">{new Date(book.updatedAt).toLocaleString()}</span>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ShowBook;
