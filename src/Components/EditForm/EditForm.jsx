import React from 'react'

function EditForm(props) {

    function handleEditSubmit(e) {
        e.preventDefault()
        props.handleEditSubmit()
    }

  return (
    <div className="overflow-hidden rounded-lg border mx-20 mb-10 p-10 shadow-xl mt-4 mx-10">
      <form onSubmit={(e) => handleEditSubmit(e)} className="p-4">
        <div className="flex flex-col space-y-2">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username" 
            value={props.editData.username}
            onChange={(e) => props.setEditData({...props.editData, username: e.target.value})}
            className="px-3 py-2 rounded-md border focus:outline-none focus:ring focus:ring-violet-500"
          />
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={props.editData.email}
            onChange={(e) => props.setEditData({...props.editData, email: e.target.value})}
            className="px-3 py-2 rounded-md border focus:outline-none focus:ring focus:ring-violet-500"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 my-6 text-sm bg-white font-medium text-violet-800 hover:bg-violet-700 hover:text-white rounded-md focus:outline-none focus:ring focus:ring-violet-300"
        >
          Save
        </button>
      </form>
    </div>
  )
}

export default EditForm