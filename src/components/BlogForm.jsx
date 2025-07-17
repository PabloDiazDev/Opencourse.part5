import { useState } from 'react'
import blogService from '../services/blogs'

const BlogForm = ({setErrorState, setBlogs, blogs, setErrorMessage, blogFormRef} ) => {
    const [title, setTitle] = useState ('')
    const [author, setAuthor] = useState ('')
    const [url, setUrl] = useState ('')
const blogPostHandler = async (event) => {
    event.preventDefault()


try {
    const newBlog = await blogService.create ({ title, author, url})
    setErrorState(false)
    setErrorMessage('Blog created succesfully')
    setTimeout(() => {
        setErrorMessage(null)
    }, 5000)
    blogFormRef.current.toggleVisibility()
    setBlogs(blogs.concat(newBlog))
    setAuthor('')
    setUrl('')
    setTitle('')
   
} catch (excepcion) {
    setErrorState(true)
    setErrorMessage('something went wrong')
    setTimeout(() => {
        setErrorMessage(null)
    }, 5000)
}
    }
    return (
        <div>
            <form onSubmit={blogPostHandler} >
                <div>
                    Title
                    <input type="text" value={title} placeholder='Title' onChange={({target}) => setTitle(target.value)}/>
                </div>
                <div>
                    Author
                    <input type="text" value={author} placeholder="Author" onChange={({target}) => setAuthor(target.value)}/>
                </div>
                <div>
                    URL
                    <input type="text" value={url} placeholder="URL" onChange={({target}) => setUrl(target.value)}/>
                </div>
                <div>
                    <button type="submit"> Post blog </button>
                </div>
            </form>
        </div>
    )
}

export default BlogForm