import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from '../components/Blog'
import { expect, vi } from 'vitest'
import * as blogHandlers from '../handlers/blogHandlers'
import BlogForm from '../components/BlogForm'
import blogService from '../services/blogs'

window.localStorage.setItem('loggedUserData', JSON.stringify({ username: 'testuser' }))

test ('renders just blog title and author', () => {
    const blog = {
        title: 'Test Blog',
        author: 'Test Author',
        url: 'http://testblog.com',
        likes: 42,
        user: { username: 'testuser' }
    }

    render(
        <Blog
            blog={blog}
            setBlogs={() => {}}
            blogs={[blog]}
            setErrorMessage={() => {}}
            setErrorState={() => {}}
        />
    )
    const element = screen.getByText('Test Blog by Test Author')
    expect(element).toBeDefined()


})

test ('URL and likes are shown when details are visible', async () => {
    const blog = {
        title: 'Test Blog',
        author: 'Test Author',
        url: 'http://testblog.com',
        likes: 42,
        user: { username: 'testuser' }
    }

    render(
        <Blog
            blog={blog}
            setBlogs={() => {}}
            blogs={[blog]}
            setErrorMessage={() => {}}
            setErrorState={() => {}}
        />
    )

const user = userEvent.setup()
const button = screen.getByText('Show details')
await user.click(button)
const urlElement = screen.getByText('URL: http://testblog.com')
const likesElement = screen.getByText('Likes: 42')
expect(urlElement).toBeDefined()
expect(likesElement).toBeDefined() 
})

test('When clicks on like button, event handler is called twice', async () => {
// to improve the App cleanliness, we have handlers for like and delete actions to a separate file
//so we mock the handleLike function manually.
    const mockhandler = vi.spyOn(blogHandlers, 'handleLike').mockImplementation(() => {})

     const blog = {
        title: 'Test Blog',
        author: 'Test Author',
        url: 'http://testblog.com',
        likes: 42,
        user: { username: 'testuser' }
    }

    render (
        <Blog
            blog={blog}
            setBlogs={() => {}}
            blogs={[blog]}
            setErrorMessage={() => {}}
            setErrorState={() => {}}
        />
    )
    const user = userEvent.setup()
    const button1 = screen.getByText('Show details')
    await user.click(button1)
    const button2 = screen.getByTestId('like-button')
    await user.click(button2)
    await user.click(button2)
    expect(mockhandler.mock.calls).toHaveLength(2)
})

test('When u create a new blog, the handler receives correct parameters (just input values)', async () => {
   const createMocked = vi.spyOn(blogService, 'create').mockImplementation(async (blog) => ({
        ...blog,
        likes: 0,
        user: { username: 'testuser' },
        id: '1233'
    }))
    const blog = {
        title: 'Test Blog',
        author: 'Test Author',
        url: 'http://testblog.com',
    }
    render (
        <BlogForm
          setErrorState={() => {}}
          setBlogs={() => {}}
          blogs={[]}
          setErrorMessage={() => {}}
          blogFormRef={{ current: { toggleVisibility: () => {} } }}
        />
    )

    const inputTitle = screen.getByPlaceholderText('Title')
    const inputAuthor = screen.getByPlaceholderText('Author')
    const inputUrl = screen.getByPlaceholderText('URL')

    const button = screen.getByText('Post blog')
    const user = userEvent.setup()
    await user.type(inputTitle, blog.title)
    await user.type(inputAuthor, blog.author)
    await user.type(inputUrl, blog.url)
    await user.click(button) 
    expect(createMocked).toHaveBeenCalledWith(blog)
    expect(createMocked).toHaveBeenCalledWith({
        title: blog.title,
        author: blog.author,
        url: blog.url
    })
})