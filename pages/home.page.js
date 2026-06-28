import { expect } from '@playwright/test';
import { Books } from '../test-data/ui-testdata';

export class HomePage {

    constructor(page) {
        this.page = page;

        // Locators
        this.homeScreen = page.locator('.body-height');
        this.bookStoreCard = page.getByText('Book Store Application');
        this.loginButton = page.getByRole('button').filter({ hasText: "Login" });
        this.userName = page.getByPlaceholder('UserName');
        this.password = page.getByPlaceholder('Password');
        this.validateUserName = page.locator('.form-label').nth(2);
        this.logOut = page.getByRole('button').filter({ hasText: "Logout" });
        this.bookStorelogout = page.getByRole('button').filter({ hasText: "Log out" });
        this.bookStoreButton = page.getByRole('button').filter({ hasText: "Go To Book Store" });
        this.search = page.getByPlaceholder('Type to search');
        this.bookTitle = page.locator('tbody tr td:nth-child(2) a');    
        this.bookAuthor = page.locator('tbody tr td:nth-child(3)');
        this.bookPublisher = page.locator('tbody tr td:nth-child(4)');
    }

    async navigate() {
        await this.page.goto("https://demoqa.com");
    }

    async openBookStore() {
        await this.bookStoreCard.click();
    }

    async login(username, password) {
        await this.loginButton.click();
        await this.userName.fill(username);
        await this.password.fill(password);
        await this.loginButton.click();
    }

    async clickBookstore() {
        await this.bookStoreButton.click();
    }

    async searchBook(){
        await this.search.waitFor({ state: 'visible' });
        await this.search.click();
        await this.search.fill(Books.bookName);
        await this.page.getByRole('link', { name: Books.bookName }).waitFor({ state: 'visible' });
    }

    async getBookDetails() {
    return {
        title: await this.bookTitle.textContent(),
        author: await this.bookAuthor.textContent(),
        publisher: await this.bookPublisher.textContent()
        };
    }

    async clickLogout() {
        await this.bookStorelogout.click();
    }

}