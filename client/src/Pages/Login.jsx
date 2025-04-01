import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../Context/UserContext';
import axios from 'axios';
import Loader from '../Components/Loader';
import ErrComponent from '../Components/ErrComponent';

const Login = () => {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
    role: "", 
  });
  const [isLoading,setIsLoading] = useState(false);
  const [err,setErr] = useState('');

  const navigate = useNavigate();
  const { currentUser , setCurrentUser } = useContext(UserContext);

  const changeInputHandler = (e) => {
    setUserData((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      setErr('')
      setIsLoading(true);
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/users/login`, userData);
      const user = await response.data;
      setCurrentUser(user);
      navigate('/');
      setIsLoading(false);
    } catch (error) { 
        console.log(error)
        setIsLoading(false)
        setErr(error?.response?.data?.message);
    }
  };

  useEffect(()=>{
    if(currentUser?.token){
      navigate('/') 
    }
  },[currentUser?.id])

  return (
    <section className='login-section mt-16'>
      <div className="login-wrapper p-1 flex flex-col justify-center items-center">
        <div className='wrapper w-full max-w-md rounded-2xl flex flex-col justify-center items-center py-5' style={{background: '#F8FDFE'}}>
          <h2 className='text-2xl mb-5'>Sign In <small>as</small></h2>
          <div className='flex justify-center gap-3 mb-1 w-full'>
            <button
              type='button'
              className={`p-2 w-32 border rounded-full`}
              onClick={() => setUserData((prevState) => ({ ...prevState, role: 'Influencer' }))}
              style={{
                backgroundColor: userData.role === 'Influencer' ? '#df84ec' : '#d3d3d3',
                color: userData.role === 'Influencer' ? '#fff' : '#333'
              }}
            >
              Influencer
            </button>
            <button
              type='button'
              className={`p-2 w-32 border rounded-full`}
              onClick={() => setUserData((prevState) => ({ ...prevState, role: 'Client' }))}
              style={{
                backgroundColor: userData.role === 'Client' ? '#df84ec' : '#d3d3d3',
                color: userData.role === 'Client' ? '#fff' : '#333'
              }}
            >
              Client
            </button>
          </div>

          <form onSubmit={loginUser} className="flex flex-col gap-10 items-center mt-5">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={userData.username}
              onChange={changeInputHandler}
              style={{border: '1.5px solid #efefef'}}
              className='bg-transparent px-5 py-3 rounded-2xl'
              required
              autoFocus
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={userData.password}
              onChange={changeInputHandler}
              style={{border: '1.5px solid #efefef'}}
              className='bg-transparent px-5 py-3 rounded-2xl'
              required
            />
            {err && <ErrComponent err={err} />}
            <button
              type="submit"
              className="login-button flex items-center justify-center px-5 py-3 w-full rounded-full mb-3" 
              style={
                isLoading ? {color: '#fff',backgroundColor: '#fff'} : {color: '#fff',backgroundColor: '#05061f'}
              }
              disabled={isLoading}
            >
              {isLoading ? <div className='w-fit h-fit px-5'><Loader/></div> : <p>Sign In</p>}
            </button>
          </form>
          <div className="text-center mt-4">
            <small className="text-gray-600">
              Don't have an account?{" "}
              <Link to="/signup" className="text-[#df84ec] hover:text-[#c75cd9]">
                Sign Up
              </Link>
            </small>
          </div>
          <div className="text-center mt-2">
            <small className="text-gray-600">
              <Link to="/forgot-password" className="text-[#df84ec] hover:text-[#c75cd9]">
                Forgot Password?
              </Link>
            </small>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
