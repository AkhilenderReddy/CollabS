import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../Context/UserContext';
import axios from 'axios';
import Loader from '../Components/Loader';
import ErrComponent from '../Components/ErrComponent';

const Signup = () => {
    const [userData, setUserData] = useState({
        email: '',
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
          const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/users/register`, userData);
          const user = await response?.data;
          setCurrentUser(user);
          navigate('/');
          setIsLoading(false);
        } catch (error) { 
            console.log(error)
            setIsLoading(false);
            setErr(error?.response?.data?.message);
            console.log(err && err)
        }
      };
    
      if(currentUser){
        navigate('/')
      }
    
    
      return (
        <section className='login-section mt-16'>
          <div className="login-wrapper p-1 flex flex-col justify-center items-center">
            <div className='wrapper w-full max-w-md rounded-2xl flex flex-col justify-center items-center py-5' style={{background: '#F8FDFE'}}>
              <h2 className='text-2xl mb-5'>Sign Up <small>as</small></h2>
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
              <form className="flex flex-col gap-10 items-center mt-5" onSubmit={loginUser}>
                {/* {error && <ErrorCompo err={error} />} */}
                <input
                style={{border: '1.5px solid #efefef'}}
                  className='bg-transparent px-5 py-3 rounded-2xl'
                  type="text"
                  placeholder="Username"
                  name="username"
                  value={userData.username}
                  onChange={changeInputHandler}
                  autoFocus
                />
                <input
                style={{border: '1.5px solid #efefef'}}
                  className='bg-transparent px-5 py-3 rounded-2xl'
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={userData.email}
                  onChange={changeInputHandler}
                />
                <input
                style={{border: '1.5px solid #efefef'}}
                  className='bg-transparent px-5 py-3 rounded-2xl'
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={userData.password}
                  onChange={changeInputHandler}
                />
                {err && <ErrComponent err={err}/>}
                <button
                  type="submit"
                  className="login-button flex items-center justify-center px-5 py-3 w-full rounded-full mb-3" 
                  style={
                    isLoading ? {color: '#fff',backgroundColor: '#fff'} : {color: '#fff',backgroundColor: '#05061f'}
                  }
                >
                  {isLoading ? <div className='w-fit h-fit px-5'><Loader/></div> : <p>Sign Up</p> }
                </button>
              </form>
              <small>
                Already have an account? <Link className='underline' to="/login">Sign In</Link>
              </small>
            </div>
          </div>
        </section>
      ); 
}

export default Signup