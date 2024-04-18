import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar/Navbar'
import HomeContent from '../Components/HomeContent/HomeContent'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import UserTable from '../Components/Table/UserTable'
import { getUserSet, deleteUser } from '../Services/ApiServices'
import { editUser, AddUser } from '../Services/ApiServices'
import EditForm from '../Components/EditForm/EditForm'
import AddForm from '../Components/AddForm/AddForm'

function Admin() {
  const state = useSelector(state => state.auth)
  const navigate = useNavigate() 
  const [users, setUsers] = useState([])
  const [editData, setEditData] = useState({id: null, username: '', email: ''})
  const [showEditForm, setShowEditForm] = useState(false)
  const [showAddForm, setShowAddForm] = useState(false)

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

  function handleAddSubmit(user, setErrorCommon) {
    AddUser(user).then((res) => {
      if (res.status == 200){
        setErrorCommon('')
        setShowAddForm(false) 
        setUsers([...users, {id: res.data.created_id, ...user}])
      }
      
    }).catch((err) => {
      setErrorCommon(err.response.data.detail);
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

    <button 
    onClick={() => setShowAddForm(!showAddForm)}
    className='mx-10 my-3 px-4 py-2 font-medium text-center text-violet-800 bg-white rounded-md hover:bg-red-900 hover:text-white focus:outline-none focus:ring focus:ring-offset-2 focus:ring-blue-500">'>
      {showAddForm ? 'Close X' : 'Add +'}</button>
    
    {showAddForm && <AddForm handleAddSubmit={handleAddSubmit}/>}
    </>

    
  )
}

export default Admin