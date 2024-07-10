import { expect } from '@wdio/globals';
import HomePage from '../pageobjects/home.page.js';

describe('My Login application', () => {
    it('should login with valid credentials', async () => {
        await HomePage.open();
        await HomePage.loginBtn.click();
        await HomePage.login('Admiral@mail.ru', 'Admiral123123123123');

        await expect(HomePage.loginBtn).not.toBeExisting();
    });
});
