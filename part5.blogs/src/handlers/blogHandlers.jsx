import blogService from "../services/blogs"
 
 export const handleLike = async (id, setBlogs, blogs) => {
    const blogToUpdate = blogs.find(blog => blog.id === id)
    const updatedBlog = {
      ...blogToUpdate,
      likes: blogToUpdate.likes + 1
    }
    const returnedBlog = await blogService.update(id, updatedBlog)
    setBlogs(blogs.map(blog =>
      blog.id === id ? returnedBlog : blog
    ))
  }

  export const handleDelete = async (id, blogs, setBlogs, setErrorState, setErrorMessage) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) {
      return
    }
    try {
      await blogService.supr(id)
      setErrorState(false)
      setErrorMessage('Blog deleted successfully')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      setBlogs(blogs.filter(blog => blog.id !== id))
    } catch (error) {
      setErrorState(true)
      setErrorMessage(error.response.data.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  
