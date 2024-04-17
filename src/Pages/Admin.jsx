import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar/Navbar'
import HomeContent from '../Components/HomeContent/HomeContent'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import UserTable from '../Components/Table/UserTable'
import { getUserSet, deleteUser } from '../Services/ApiServices'
import { editUser } from '../Services/ApiServices'
import EditForm from '../Components/EditForm/EditForm'

function Admin() {
  const state = useSelector(state => state.auth)
  const navigate = useNavigate() 
  const [users, setUsers] = useState([])
  const [editData, setEditData] = useState({id: null, username: '', email: ''})
  const [showEditForm, setShowEditForm] = useState(false)

  useEffect(() => {
    if (!state.user || !state.user.is_superuser){
      console.log('not super user')
      navigate('/')
    }
  }, [])

  useEffect(() => {
    getUserSet().then((res) => {
      setUsers(res.data.users)
    })
  }, [])

  function handleDeleteUser(id) {
    deleteUser(id).then((res) => {
      if(res.status == 200) {
        setUsers(users.filter((user) => user.id != id))
      }
    })
  }

  function handleEditSubmit() {
    setShowEditForm(false)
    editUser(editData).then((res) => {
      if(res.status == 200) {
        const new_users = [...users] ;
        const edit_index = new_users.findIndex(user => user.id === editData.id) ;
        new_users[edit_index] = editData ;
        setUsers(new_users);
      }
    })
  }

  return (
    <>
    <Navbar />
    <UserTable 
    users={users} 
    setEditData={setEditData}
    setShowEditForm={setShowEditForm}
    handleDeleteUser={handleDeleteUser}/>
    
    { showEditForm &&
    <EditForm 
    editData={editData}
    handleEditSubmit={handleEditSubmit}
    setEditData={setEditData} />}
    </>
  )
}

export default Admin