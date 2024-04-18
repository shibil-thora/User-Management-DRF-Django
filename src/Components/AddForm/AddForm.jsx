import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'

function AddForm(props) {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [pass1, setPass1] = useState('')
    const [pass2, setPass2] = useState('')
    const [errorCommon, setErrorCommon] = useState('')
    const navigate = useNavigate()

    function handleAddSubmit(e) {
        e.preventDefault()
        props.handleAddSubmit({username, email, pass1, pass2}, setErrorCommon)
    }

  return (
    <div className="overflow-hidden rounded-lg border mx-20 mb-10 p-10 shadow-xl mt-4 mx-10">
      <form onSubmit={(e) => handleAddSubmit(e)} className="p-4">
        <div className="flex flex-col space-y-2">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}

            className="px-3 py-2 rounded-md border focus:outline-none focus:ring focus:ring-violet-500"
          />
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}

            className="px-3 py-2 rounded-md border focus:outline-none focus:ring focus:ring-violet-500"
          />
          <label htmlFor="pass1">Password:</label>
          <input
            type="password"
            id="pass1"
            name="pass1"
            value={pass1}
            onChange={(e) => setPass1(e.target.value)}
            className="px-3 py-2 rounded-md border focus:outline-none focus:ring focus:ring-violet-500"
          />
          <label htmlFor="pass2">Confirm Password:</label>
          <input
            type="password"
            id="pass2"
            name="pass2"
            value={pass2}
            onChange={(e) => setPass2(e.target.value)}
            className="px-3 py-2 rounded-md border focus:outline-none focus:ring focus:ring-violet-500"
          />
        </div>
        <p className='text-red-500 my-3 mb-0 mx-auto text-sm'>{errorCommon}</p>
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

export default AddForm