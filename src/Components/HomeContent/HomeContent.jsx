import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logOut } from '../../Redux/AuthenticationSlice'
import { useNavigate } from 'react-router-dom'

function HomeContent(props) {
  const dispatch = useDispatch() 
  const navigate = useNavigate()
  const state = useSelector(state => state.auth)

  return (
    <div className="hero min-h-screen bg-gradient-to-r from-violet-800 to-red-600 flex flex-col justify-center items-center px-4">
    <h1 className="text-4xl font-bold text-white text-center pb-4">
      Hello {state.user.username}! 
    </h1>
    <p className="text-xl text-gray-100 text-center px-16">
      {!state.user.is_superuser ? 'Welcome to your amazing React application!' : 'Hey you are an admin proceed to dash board!'}
    </p>
    { !state.user.is_superuser &&
    <button
      onClick={() => {dispatch(logOut()); navigate('/login')}}
      className="mt-8 px-4 py-2 bg-white text-violet-800 font-bold rounded-md shadow-sm hover:bg-indigo-100 hover:text-pink-800"
    >
      Logout Now
    </button>
    }

{ state.user.is_superuser &&
    <button
      onClick={() => {navigate('/admin')}}
      className="mt-8 px-4 py-2 bg-white text-violet-800 font-bold rounded-md shadow-sm hover:bg-indigo-100 hover:text-pink-800"
    >
      DashBoard
    </button>
    }
  </div>
  )
}

export default HomeContent