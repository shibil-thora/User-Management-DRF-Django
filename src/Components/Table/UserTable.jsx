import React, {useState} from 'react'


function UserTable(props) {
  const [query, setQuery] = useState('')

    function handleEditClick(user) {
        props.setEditData({
            id: user.id, 
            username: user.username, 
            email: user.email,
        })
        props.setShowEditForm(true);
    }
  return (
    <>
    <div className="flex items-center rounded-md bg-gray-100/20 px-3 mx-10 py-2 focus:outline-none">   
    🔍
    <input type="text" 
    value={query}
    onChange={(e) => setQuery(e.target.value)}
    className="w-full bg-transparent text-gray-700 focus:outline-none focus:text-gray-900 placeholder-gray-400 focus:placeholder-transparent" placeholder="Search..." />
    </div>
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
        {props.users.filter((user => user.username.includes(query))).map((user) => (
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
  </>
  )
}

export default UserTable