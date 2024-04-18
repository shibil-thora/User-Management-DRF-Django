import React, { useState } from 'react';
import { SignUpUser } from '../Services/ApiServices';
import { useNavigate } from 'react-router-dom';

function SignUp() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [pass1, setPass1] = useState('')
    const [pass2, setPass2] = useState('')
    const [errorCommon, setErrorCommon] = useState('')
    const navigate = useNavigate()

    function handleSignup(e) {
        e.preventDefault()
        SignUpUser({username, email, pass1, pass2}).then((res) => {
            setErrorCommon('')
            window.alert('Account created')
            navigate('/login')
            
        }).catch((err) => {
            setErrorCommon(err.response.data.detail)
        })
        
    }

  return (
    <div className="login-container min-h-screen bg-gradient-to-r from-violet-800 to-red-600 flex flex-col justify-center items-center px-4">
      <div className="card bg-white rounded-lg shadow-md px-8 py-6 flex flex-col space-y-4">
        <h1 className="text-4xl font-bold text-violet-800 text-center pb-4">
        </h1>
        <form className="flex flex-col space-y-4" onSubmit={(e) => handleSignup(e)}>
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
            <p></p>
          </div>
          <div className="flex flex-col">
            <label htmlFor="username" className="text-sm text-violet-800 font-medium">
              Email:
            </label>
            <input
              type="email"
              id="email" 
             value={email}
             onChange={(e) => setEmail(e.target.value)}
              name="email"
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
              value={pass1}
              onChange={(e) => setPass1(e.target.value)}
              name="password"
              className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password1" className="text-sm text-violet-800 font-medium">
              Confirm Password:
            </label>
            <input
              type="password"
              id="password1"
                value={pass2}
                onChange={(e) => setPass2(e.target.value)}
              name="password1"
              className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              required
            />
          </div>

          <p className='text-red-500 mx-auto text-sm'>{errorCommon}</p>
          <button
            type="submit"
            className="mt-8 px-4 py-2 bg-violet-800 bg-gradient-to-r from-red-600 to-violet-800 text-white font-bold rounded-md shadow-sm hover:bg-indigo-100 hover:text-yellow-100"
          >
            Sign Up
          </button>
        </form>
        
      </div>
      
    </div>
  )
}

export default SignUp