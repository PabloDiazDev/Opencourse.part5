const loginWith = async (page, username, password) => {
        await page.getByRole('button', { name: 'Login' }).click()
        await page.getByPlaceholder('Enter your username').fill(username)
        await page.getByPlaceholder('Enter your password').fill(password)
        await page.getByRole('button', { name: 'Log in' }).click()
}

const createBlog = async (page, title, author, url) => {
         await page.getByRole('button', { name: 'Create new blog' }).click()
         await page.getByPlaceholder('Title').fill(title)
         await page.getByPlaceholder('Author').fill(author)
         await page.getByPlaceholder('URL').fill(url)
         await page.getByRole('button', { name: 'Post blog' }).click()
}

export { loginWith, createBlog }