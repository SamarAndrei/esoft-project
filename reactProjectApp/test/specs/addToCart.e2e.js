import { expect } from '@wdio/globals';
import HomePage from '../pageobjects/home.page.js';
import { $ } from '@wdio/globals';
import { browser } from '@wdio/globals';

describe('Add item to cart', () => {
    it('just adding item', async () => {
        await HomePage.open();
        await HomePage.loginBtn.click();
        await HomePage.login('Admiral@mail.ru', 'Admiral123123123123');
        await expect(HomePage.loginBtn).not.toBeExisting();

        await browser.pause(2000);

        await HomePage.btnAddItemToCart.click();

        await browser.pause(1000);

        const badgeElement = await $('#cart-badge');
        await expect(badgeElement).toBeDisplayed();
        const badgeContent = await badgeElement.getText();

        expect(badgeContent).not.toBe('0');
    });
});
