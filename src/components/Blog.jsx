import {handleLike, handleDelete} from '../handlers/blogHandlers'
import { useState } from 'react'

const Blog = ({ blog, setBlogs, blogs, setErrorState, setErrorMessage }) => {
  const [showDetails, setShowDetails] = useState(false)
  
const loggedUserData = window.localStorage.getItem('loggedUserData')
const isUserBlogCreator =
  blog.user &&
  loggedUserData &&
  blog.user.username === JSON.parse(loggedUserData).username

  return (
    <div>
      {blog.title} by {blog.author}
      <button onClick={() => setShowDetails(!showDetails)}>
        {showDetails ? 'Hide details' : 'Show details'}
      </button>
      {showDetails && (
        <>
          <div>URL: {blog.url}</div>
          <div>Likes: {blog.likes}</div>
          <button data-testid="like-button" onClick={() => handleLike(blog.id, setBlogs, blogs)}>Like</button>
          {isUserBlogCreator && (
            <button onClick={() => handleDelete(blog.id, blogs, setBlogs, setErrorState, setErrorMessage)}>Delete blog</button>
          )}
        </>
      )}
    </div>
  )
}

export default Blog