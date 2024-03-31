import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "../components/Spinner.jsx";
import BackButton from "../components/BackButton";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

const DeleteBook = () => {
    const [loading, setLoading] = useState(false);

    const { id } = useParams();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                await axios.get(`/api/books/${id}`);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    const handleDelete = async () => {
        try {
            setLoading(true);
            await axios.delete(`api/books/${id}`);
            enqueueSnackbar("Book deleted successfully", {variant : "success"});
            navigate("/");
        } catch (error) {
            console.log(error);
            enqueueSnackbar("Error Occured", {variant : "error"});
        } finally {
            setLoading(false);
        }
    }

    if (loading) return <Spinner />

    return (
        <div className="p-4">
            <BackButton />
            <div>
                <h1 className="text-black-600 text-2xl">Delete A Book</h1>
            </div>
            <div className="flex flex-col border-2 border-sky-600 w-[600px] mx-auto p-4 rounded-md">
                <div>
                    <p className="text-red-600 text-2xl p-4 my-2">Are you sure you want to delete this book?</p>
                </div>
                <div>
                    <button className="w-full my-2 bg-red-600 text-black-600 rounded-md" onClick={handleDelete}>Delete</button>
                </div>
            </div>
        </div>
    );
}

export default DeleteBook;
