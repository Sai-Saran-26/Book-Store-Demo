import { test,expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { user,Books} from '../test-data/ui-testdata'
import fs from 'fs';

test('Book Store Assignment', async ({ page }) => {

    const home = new HomePage(page);

    await home.navigate();
    await home.openBookStore();
    await home.login(user.username, user.password);
    await expect(home.validateUserName).toBeVisible()
    await expect(home.validateUserName).toHaveText(user.username);
    await expect(home.logOut).toBeVisible()
    await home.clickBookstore()
    await home.searchBook()    
    await expect(home.search).toHaveValue(Books.bookName);
    await expect(home.page.getByRole('link', { name: Books.bookName })).toBeVisible();
    await expect(home.bookTitle).toBeVisible();
    await expect(home.bookTitle).toHaveText(Books.bookName);
    // await expect(home.bookTitle).toHaveText(Books.bookName)
    const book = await home.getBookDetails();
    const content = [
        `Title      : ${book.title}`,
        `Author     : ${book.author}`,
        `Publisher  : ${book.publisher}`
    ].join('\n');
    fs.writeFileSync('bookDetails.txt', content);
    await home.clickLogout()
});