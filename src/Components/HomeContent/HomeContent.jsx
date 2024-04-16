import React from 'react'

function HomeContent(props) {
  return (
    <div className="hero min-h-screen bg-gradient-to-r from-violet-800 to-red-600 flex flex-col justify-center items-center px-4">
    <h1 className="text-4xl font-bold text-white text-center pb-4">
      Hello {props.wishee}! 
    </h1>
    <p className="text-xl text-gray-100 text-center px-16">
      Welcome to your amazing React application!
    </p>
    <a
      href="#"
      className="mt-8 px-4 py-2 bg-white text-indigo-600 font-bold rounded-md shadow-sm hover:bg-indigo-100 hover:text-indigo-700"
    >
      Logout Now
    </a>
  </div>
  )
}

export default HomeContent