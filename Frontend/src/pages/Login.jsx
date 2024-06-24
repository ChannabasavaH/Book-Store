import React, { useState, useEffect } from 'react';
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import Loader from '../components/Spinner';
import { auth } from '../utils/firebaseConfig';
import { useNavigate, Link } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import NavBar from '../components/NavBar'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

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

    const handleGoogleSignIn = async () => {
        setLoading(true);
        const provider = new GoogleAuthProvider();
        try {
            const res = await signInWithPopup(auth, provider);
            setUser(res.user);
            const data = {
                displayName: res.user.displayName,
                email: res.user.email,
            }
            await axios.post('/api/google/login', data)
            enqueueSnackbar("LoggedIn Successfully", { variant: "success" })
            navigate("/");
        } catch (error) {
            console.error('Error during sign-in:', error);
            enqueueSnackbar("LoggedIn Failed", { variant: "error" });
        } finally {
            setLoading(false);
        }
    };

    const handleSignin = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await axios.post('/api/login', null);
            enqueueSnackbar("Logged In Successfully", { variant: "success" })
            navigate('/');
        } catch (error) {
            if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
                setError("Invalid email or password");
                enqueueSnackbar("Error in logging in!!", { variant: "error" })
            } else {
                console.error("Failed to sign in:", error.message);
                setError("An unexpected error occurred. Please try again later.", error);
                enqueueSnackbar("Error in logging in!!", { variant: "error" })
            }
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loader />;

    return (
        <div>
            <div>
                <NavBar />
            </div>
            <div className='my-4'>
                <h1 className="text-2xl text-black-600 text-center">Login</h1>
            </div>
            <div className="border-2 border-sky-600 rounded-md flex flex-col w-full md:w-1/2 lg:w-1/3 p-4 mx-auto mb-4">
                <form onSubmit={handleSignin}>
                    <div>
                        <label htmlFor='email' className="mr-4 text-xl text-black-600">Email</label>
                        <input type="email" placeholder='Enter email' id='email' value={email} onChange={(event) => { setEmail(event.target.value) }} className="px-4 py-2 w-full border-2 border-black-600 rounded-md" required />
                    </div>
                    <div>
                        <label htmlFor='password' className="mr-4 text-xl text-black-600">Password</label>
                        <input type={"password"} placeholder='Enter password' id='password' value={password} onChange={(event) => { setPassword(event.target.value) }} className="px-4 py-2 w-full border-2 border-black-600 rounded-md" required />
                    </div>
                    <div className='my-4'>
                        <button className="px-4 py-2 w-full bg-sky-600 text-black-600 text-center rounded-md">Login</button>
                    </div>
                </form>
                <div className='flex justify-center items-center m-4'>
                    <button onClick={handleGoogleSignIn} className='h-12 w-40 text-white text-center bg-black rounded-lg'>Login with Google</button>
                </div>
                <div className='flex justify-center items-center'>
                    <Link to={'/api/signup'}>
                        Don't have an accout? SignUp
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
