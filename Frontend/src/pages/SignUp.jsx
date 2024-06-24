import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';
import NavBar from '../components/NavBar';
import { useSnackbar } from 'notistack'

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = getAuth();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await updateProfile(user, {
        displayName: displayName
      });
      const data = {
        displayName: user.displayName,
        email: user.email
      }
      await axios.post('/api/signup', data);
      enqueueSnackbar("Signed Up Successfully", {variant: "success"})
      navigate('/api/login');
    } catch (error) {
      setError(error.message);
      enqueueSnackbar("Error in signing up", {variant: "error"});
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Spinner />

  return (
    <div>
      <div>
        <NavBar />
      </div>
      <div className='my-4'>
        <h2 className="text-2xl text-black-600 text-center">Sign Up</h2>
      </div>
      <div className="border-2 border-sky-600 rounded-md flex flex-col w-full md:w-1/2 lg:w-1/3 p-4 mx-auto mb-4">
        <form onSubmit={handleSignup}>
          <div>
            <label htmlFor='username' className="mr-4 text-xl text-black-600">Username</label>
            <input type="text" placeholder='Enter username' id='username' value={displayName} onChange={(event) => { setDisplayName(event.target.value) }} className="px-4 py-2 w-full border-2 border-black-600 rounded-md" required />
          </div>
          <div>
            <label htmlFor='email' className="mr-4 text-xl text-black-600">Email</label>
            <input type="email" placeholder='Enter email' id='email' value={email} onChange={(event) => { setEmail(event.target.value) }} className="px-4 py-2 w-full border-2 border-black-600 rounded-md" required />
          </div>
          <div>
            <label htmlFor='password' className="mr-4 text-xl text-black-600">Password</label>
              <input type={"password"} placeholder='Enter password' id='password' value={password} onChange={(event) => { setPassword(event.target.value) }} className="px-4 py-2 w-full border-2 border-black-600 rounded-md" required />
          </div>
          <div className='my-4'>
            <button className="px-4 py-2 w-full bg-sky-600 text-black-600 text-center rounded-md">Sign-Up</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
