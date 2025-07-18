import { test, expect, beforeEach, describe } from '@playwright/test';
import { loginWith, createBlog } from './helper.js';
import { TextEncoderStream } from 'stream/web';
import { log } from 'console';

describe ('Blog app', () => {
    beforeEach(async ({ page, request }) => {
        await request.post('http://localhost:3003/api/testing/reset')
        await request.post('http://localhost:3003/api/users', {
            data: {
                username: 'root',
                name: 'king',
                password: '1234'
            }
    })
        await request.post('http://localhost:3003/api/users', {
            data: {
                username: 'nocreatoruser',
                name: 'nocreator',
                password: '1234'
            }
    })
        await page.goto('http://localhost:5173')
})
    test('Login form is shown', async ({ page }) => {

        await page.getByRole('button', { name: 'Login' }).click()
        await expect(page.getByPlaceholder('Enter your username')).toBeVisible()
        await expect(page.getByPlaceholder('Enter your password')).toBeVisible()
    })
    test ('succesful login with correct credentials', async ({ page }) => {

        await loginWith(page, 'root', '1234')
        await expect(page.getByText('logged successfully')).toBeVisible()
    })

    test ('unsuccessful login with incorrect credentials', async ({ page }) => {

        await loginWith(page, 'root', '12074')
        await expect(page.getByText('wrong credentials')).toBeVisible()
    })
    describe('When logged in', () => {
        
        beforeEach(async ({ page }) => {
            await loginWith(page, 'root', '1234')
            await createBlog(page, 'Test Blog', 'Test Author', 'http://testblog.com')
        })

        test('a new blog can be created', async ({ page }) => {
           await expect(page.getByText('Test Blog')).toBeVisible()
        })

        test('a blog can be edited (liked)', async ({ page}) => {
           await page.getByRole('button', { name: 'Show details' }).click()
           await page.getByTestId('like-button').click()
           await expect(page.getByTestId('likes')).toHaveText('1')
        })

        test.only('a blog can be deleted', async ({ page }) => {
           await page.getByRole('button', { name: 'Show details' }).click()
           page.on('dialog', async dialog => {await dialog.accept()})
           await page.getByTestId('delete-button').click()
           await expect(page.getByText('Test Blog')).not.toBeVisible()
        })
        test('Only the creator can delete a blog', async ({ page, request }) => {
            await page.getByRole('button', { name: 'Show details' }).click()
            await expect(page.getByTestId('delete-button')).toBeVisible()
            await page.getByText('LogOut').click()
            await loginWith(page, 'nocreatoruser', '1234')
            await page.getByText('Test Blog by Test Author').waitFor()
            await expect(page.getByTestId('delete-button')).not.toBeVisible()
 })
})
})