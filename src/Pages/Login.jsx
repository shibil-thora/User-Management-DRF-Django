import React, { useEffect } from 'react';
import { useState } from 'react';
import { LoginUser } from '../Services/ApiServices';
import { useDispatch, useSelector } from 'react-redux';
import { changeAuthMode } from '../Redux/AuthenticationSlice';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const state = useSelector(state => state.auth) ;
    const dispatch = useDispatch()
    const navigate = useNavigate()


    function handleLogin(e) {
        e.preventDefault()
        LoginUser({username: username, password: password}).then((res) => {
            if(res.status === 200) {
                localStorage.setItem('access', res.data.access_token)
                localStorage.setItem('refresh', res.data.refresh_token)
                dispatch(changeAuthMode({
                    user: res.data.user,
                }))
                navigate('/');
            }
        })
        
    }

  return (
    <div className="login-container min-h-screen bg-gradient-to-r from-violet-800 to-red-600 flex flex-col justify-center items-center px-4">
      <div className="card bg-white rounded-lg shadow-md px-8 py-6 flex flex-col space-y-4">
        <h1 className="text-4xl font-bold text-violet-800 text-center pb-4">
        </h1>
        <form className="flex flex-col space-y-4" onSubmit={(e) => handleLogin(e)}>
          <div className="flex flex-col">
            <label htmlFor="username" className="text-sm text-violet-800 font-medium">
              Username:
            </label>
            <input
              type="text"
              id="username" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              name="username"
              className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="text-sm text-violet-800 font-medium">
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              required
            />
          </div>
          <button
            type="submit"
            className="mt-8 px-4 py-2 bg-violet-800 bg-gradient-to-r from-red-600 to-violet-800 text-white font-bold rounded-md shadow-sm hover:bg-indigo-100 hover:text-yellow-100"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
