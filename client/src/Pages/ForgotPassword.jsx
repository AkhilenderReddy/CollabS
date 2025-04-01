import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Loader from '../Components/Loader';
import ErrComponent from '../Components/ErrComponent';

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setErr('');
      setSuccess('');
      setIsLoading(true);
      await axios.post(`${process.env.REACT_APP_BASE_URL}/users/forgot-password`, { email });
      setSuccess('Password reset instructions have been sent to your email.');
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setErr(error?.response?.data?.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <section className='login-section mt-16'>
      <div className="login-wrapper p-1 flex flex-col justify-center items-center">
        <div className='wrapper w-full max-w-md rounded-2xl flex flex-col justify-center items-center py-5' style={{background: '#F8FDFE'}}>
          <h2 className='text-2xl mb-5'>Reset Password</h2>
          <p className="text-gray-600 text-center mb-6 px-4">
            Enter your email address and we'll send you instructions to reset your password.
          </p>

          <form onSubmit={handleSubmit} className='w-full max-w-md flex flex-col gap-4 mt-4 px-8'>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='p-2 rounded-full border border-gray-300 focus:outline-none focus:border-[#df84ec]'
              required
            />
            {err && <ErrComponent message={err} />}
            {success && (
              <div className="text-green-500 text-sm text-center">{success}</div>
            )}
            <div className="flex items-center justify-center">
              <button
                type="submit"
                className='login-button flex items-center justify-center px-5 py-3 w-48 rounded-full mb-3' 
                style={
                  isLoading ? {color: '#fff',backgroundColor: '#fff'} : {color: '#fff',backgroundColor: '#05061f'}
                }
                disabled={isLoading}
              >
                {isLoading ? <div className='w-fit h-fit px-5'><Loader/></div> : <p>Send Instructions</p>}
              </button>
            </div>
          </form>
          <div className="text-center mt-4">
            <small className="text-gray-600">
              Remember your password?{" "}
              <Link to="/login" className="text-[#df84ec] hover:text-[#c75cd9]">
                Sign In
              </Link>
            </small>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword; 