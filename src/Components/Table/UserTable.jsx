import React from 'react'

function UserTable(props) {

    function handleEditClick(user) {
        props.setEditData({
            id: user.id, 
            username: user.username, 
            email: user.email,
        })
        props.setShowEditForm(true);
    }
  return (
    <div className="overflow-x-auto rounded-lg border shadow-xl mt-4 mx-10">
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-gray-200 text-left text-xs font-medium">
          <th className="px-4 py-2">Username</th>
          <th className="px-4 py-2">Email</th>
          <th className="px-4 py-2 text-left">Edit</th>
          <th className="px-4 py-2 text-left">Delete</th>
        </tr>
      </thead>
      <tbody>
        {props.users.map((user) => (
          <tr key={user.id} className="border-b hover:bg-violet-800">
            <td className="px-4 py-4 text-sm">{user.username}</td>
            <td className="px-4 py-4 text-sm">{user.email}</td>
            <td className="px-4 py-4 text-sm text-left">
              <button
                className="px-3 py-2 text-sm font-medium bg-white hover:bg-red-700 rounded-md focus:outline-none focus:ring focus:ring-red-200"
                onClick={() => handleEditClick(user)}
              >
                ✏️ Edit
              </button>
            </td>
            <td className="px-4 py-4 text-sm text-left">
              <button
                className="px-3 py-2 text-sm font-medium  bg-white hover:bg-red-700 rounded-md focus:outline-none focus:ring focus:ring-red-200"
                onClick={() => props.handleDeleteUser(user.id)}
              >
                ❌ Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  )
}

export default UserTable