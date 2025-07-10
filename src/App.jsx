import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notifications from './components/Notifications'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [errorState, setErrorState] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUserData')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  return (
  <div>
    {user === null ? (
      <div>
        <Notifications 
        errorMessage={errorMessage} 
        errorState={errorState}
        />

      <LoginForm
      username={username}
      password={password}
      setUsername={setUsername}
      setPassword={setPassword}
      setUser={setUser}
      setErrorMessage={setErrorMessage}
      setErrorState={setErrorState}
      user={user}
      errorMessage={errorMessage}
       />
       </div>
    ) 
    : (
      <div>
        <div>
          Logged as: {user.name}
          </div>
          <div>
            <h2>New blog form</h2>
            <BlogForm/>
          </div>
        <h2>Blogs</h2>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )}
  </div>
  )
}

export default App