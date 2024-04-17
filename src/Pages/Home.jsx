import React, { useEffect } from 'react'
import Navbar from '../Components/Navbar/Navbar'
import HomeContent from '../Components/HomeContent/HomeContent'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { isLoggedUser } from '../utils/isLoggedUser'
import { useDispatch } from 'react-redux'
import { logOut } from '../Redux/AuthenticationSlice'


function Home() {
    const navigate = useNavigate()
    const dispatch  = useDispatch()
    const state = useSelector(state => state.auth)

    useEffect(() => {
      if(!state.user || !state.user.is_authenticated) {
      navigate('/login')  
      } 
      (isLoggedUser().then((res) => {
        if (res !== 200) {
          dispatch(logOut())
          navigate('/login')
        }
      }))

    }, [])

  return (
    <>
    <Navbar />
    <HomeContent />
    </>

  )
}

export default Home