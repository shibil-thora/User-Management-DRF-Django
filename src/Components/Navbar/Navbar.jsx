import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { logOut, updateImageURL } from '../../Redux/AuthenticationSlice';
import { useNavigate } from 'react-router-dom';
import { host } from '../../Services/ApiServices';
import { useSelector } from 'react-redux';
import { postImage } from '../../Services/ApiServices';

function Navbar() {
    const [showProfile, setShowProfile] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const state = useSelector(state => state.auth)
    const [image, setImage] = useState(null)
    const [imageURL, setImageURL] = useState(null)

    function handleLogout(e) {
        e.preventDefault();
        dispatch(logOut());
        navigate('/login')
    }

    function handleImageUpload(e) {
      setImage(e.target.files[0]);
      setImageURL(URL.createObjectURL(e.target.files[0]))
      postImage(e.target.files[0]).then((res) => {
        dispatch(updateImageURL(res.data.new_image_url));
      })
    }

  return (
    <nav className="bg-gradient-to-r from-violet-800 to-red-600">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex items-center justify-between h-16">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <img className="h-8 w-8" src="https://cdn-icons-png.flaticon.com/512/25/25694.png" alt="" />
        </div>
        <div className="hidden md:block">
          <div className="ml-10 flex items-baseline space-x-4">
            <a href="#" 
            onClick={(e) => {
              e.preventDefault();
              navigate('/');
            }}
            className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Home</a>
            <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Groups</a>
            <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Projects</a>
            <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">About</a>
          </div>
        </div>
      </div>
      <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
      

        {/* Profile dropdown */}
        <div className="relative ml-3">
          <div>
            <button type="button" 
            onClick={() => setShowProfile(!showProfile)}
            className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
              <span className="absolute -inset-1.5"></span>
              <span className="sr-only">Open user menu</span>
              <img className="h-8 w-8 rounded-full" src={state.profileImage ? `${host}${state.profileImage}` : 'https://png.pngitem.com/pimgs/s/146-1468281_profile-icon-png-transparent-profile-picture-icon-png.png'} alt="" />
            </button>
          </div>

          {showProfile &&
        <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-lg bg-white shadow-md ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex="-1">
        <div className="flex flex-col items-center space-y-2 px-4 py-4">
          <img className="w-500 h-500 rounded-full object-cover mx-auto" src={state.profileImage ? `${host}${state.profileImage}` : 'https://png.pngitem.com/pimgs/s/146-1468281_profile-icon-png-transparent-profile-picture-icon.png'} alt="Profile Picture" />
          <div className="text-center">

            <div className="flex items-center space-x-2">
            <label htmlFor="image-upload" className="inline-block px-4 py-2 rounded-md text-center text-sm font-medium text-gray-700 bg-red-200 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer">
               <h1 style={{fontSize: '30px'}} className='mb-3'>📷</h1>
               <p> Upload Image </p>
            </label>
            <input type="file" id="image-upload" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e)} />
          </div>



          </div>
          <a href="#" onClick={(e) => handleLogout(e)} className="inline-flex items-center px-2.5 py-1.5 text-sm font-medium text-center text-red-600 rounded-full hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
             <p>⚓</p> &nbsp;
            Sign Out
          </a>
        </div>
      </div>
      
             }
        </div>
      </div>
    </div>
  </div>

  {/* Mobile menu */}
  <div className="sm:hidden" id="mobile-menu">
    <div className="space-y-1 px-2 pb-3 pt-2">
      {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
      <a href="#" className="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium" aria-current="page">Home</a>
      <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Group</a>
      <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Projects</a>
      <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">About</a>
    </div>
  </div>
</nav>

  )
}

export default Navbar