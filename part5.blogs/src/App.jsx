import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notifications from './components/Notifications'
import CloseLogin from './components/CloseLogin'
import Togglable from './components/Toggable'
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [errorState, setErrorState] = useState(false)
  const [user, setUser] = useState(null)
  const blogFormRef = useRef() 
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
          
        <Notifications 
          errorMessage={errorMessage} 
          errorState={errorState}
        />
    {user === null ? (
      <>
        <Togglable buttonLabel="Login">
          <LoginForm
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            setUser={setUser}
            setErrorMessage={setErrorMessage}
            setErrorState={setErrorState}
            user={user}
            errorMessage={errorMessage}
          />
        </Togglable>
      </>
    ) : (
      <>
        <div>
          Logged as: {user.name}
          <CloseLogin 
            setUser={setUser}
            setErrorMessage={setErrorMessage}
            setErrorState={setErrorState}
          />
        </div>
        <h2>New blog form</h2>
        <Togglable buttonLabel="Create new blog" ref={blogFormRef}>
        <BlogForm
          setErrorState={setErrorState}
          setBlogs={setBlogs}
          blogs={blogs}
          setErrorMessage={setErrorMessage}
          blogFormRef={blogFormRef}
          />
        </Togglable>
      </>
    )}
    <h2>Blogs</h2>
    {[...blogs]
    .sort((a, b) => b.likes - a.likes)
    .map(blog =>
    <div key={blog.id}>
      <Blog 
      blog={blog}
      setBlogs={setBlogs}
      blogs={blogs}
      setErrorMessage={setErrorMessage}
      setErrorState={setErrorState}
       />
    </div>
    )}
  </div>
)}

export default App