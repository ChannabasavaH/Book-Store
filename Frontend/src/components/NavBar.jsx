import React, { useState, useEffect } from 'react';
import { HiLibrary } from "react-icons/hi";
import { Link } from 'react-router-dom';
import { auth } from '../utils/firebaseConfig';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
    const [user, setUser] = useState(null);
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                window.localStorage.setItem('user', JSON.stringify(currentUser));
            } else {
                window.localStorage.removeItem('user');
            }
        });
        return () => unsubscribe();
    }, []);

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            enqueueSnackbar("Logged Out Successfully",{ variant: "success" })
            console.log("User signed out successfully");
            navigate('/');
        } catch (error) {
            console.error('Error during sign-out:', error);
            enqueueSnackbar("Logged Out Failed",{ variant: "error" })
        }
    };

    return (
        <div className='bg-blue-500 w-full h-[70px] flex flex-row justify-between items-center sticky top-0 z-50'>
            <div className='ml-4'>
                <Link to={"/"}>
                    <HiLibrary className='text-white text-2xl' />
                </Link>
            </div>
            <div className='flex items-center mr-4'>
                <div className='flex gap-4'>
                    {user ? (
                        <button onClick={handleSignOut} className='text-white'>Logout</button>
                    ) : (
                        <>
                            <Link to={'/api/signup'} className='text-white'>Sign Up</Link>
                            <Link to={'/api/login'} className='text-white'>Login</Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NavBar;
