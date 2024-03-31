import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const BackButton = () => {
    return(
        <div className="flex">
            <Link to={"/"} className="w-fit bg-sky-400  rounded-md text-center font-bold p-4">
                <FaArrowLeft />
            </Link>
        </div>
    );
}

export default BackButton;