import React,{useState} from "react";
import axios from "axios";
import Spinner from "../components/Spinner.jsx";
import BackButton from "../components/BackButton";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const CreateBook = () => {
    const[title,setTitle] = useState('');
    const[author,setAuthor]  = useState('');
    const[publishedYear,setPublishedYear] = useState('');
    const[loading,setLoading] = useState(false);
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const handleChange = async(event) => {
        event.preventDefault();
        setLoading(true);
        const data = {
            title,
            author,
            publishedYear
        }
        try {
            await axios.post("/api/books",data);
            enqueueSnackbar("Book Created Successfully",{variant : "success"});
            navigate('/');
        } catch (error) {
            console.log("Error occured",error);
            enqueueSnackbar("Error Occured",{variant : "error"});
        } finally{
            setLoading(false);
        }    
    }

    if (loading) return <Spinner />;

    return(
        <div className="p-4">
            <BackButton />
            <div>
                <h1 className="text-2xl text-black-600">Create New Books</h1>
            </div>
                <div className="border-2 border-sky-600 rounded-md flex flex-col w-[600px] p-4 mx-auto">
                    <form onSubmit={handleChange} >
                        <div className="my-4">
                            <label htmlFor="title" className="mr-4 text-xl text-black-600">Title</label>
                            <input type="text" id="title" value={title} onChange={(event) => {setTitle(event.target.value)}} className="border-2 border-black-600 rounded-md px-4 py-2 w-full" required/>
                        </div>
                        <div className="my-4">
                            <label htmlFor="author" className="mr-4 text-xl text-black-600">Author</label>
                            <input type="text" id="author" value={author} onChange={(event) => {setAuthor(event.target.value)}} className="px-4 py-2 w-full border-2 border-black-600 rounded-md" required/>
                        </div>
                        <div className="my-4">
                            <label htmlFor="publishedYear" className="mr-4 text-xl text-black-600">Published Year</label>
                            <input type="number" id="publishedYear" value={publishedYear} onChange={(event) => {setPublishedYear(event.target.value)}} className="px-4 py-2 w-full border-2 border-black-600 rounded-md" required/>
                        </div>
                        <button className="px-4 py-2 w-full bg-sky-600 text-black-600 text-center rounded-md">Save</button>
                    </form>
                </div>
            </div>
    );
}

export default CreateBook;