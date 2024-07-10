import { expect } from '@wdio/globals';
import HomePage from '../pageobjects/home.page.js';
import CartPage from '../pageobjects/cart.page.js';
import { browser } from '@wdio/globals';

describe('Delete item from cart', () => {
    it('just deleting item', async () => {
        await HomePage.open();
        await HomePage.loginBtn.click();
        await HomePage.login('Admiral@mail.ru', 'Admiral123123123123');
        await expect(HomePage.loginBtn).not.toBeExisting();

        await browser.pause(2000);

        await HomePage.btnAddItemToCart.click();

        await CartPage.open();

        await browser.pause(1000);

        await CartPage.btnDeleteItem.click();

        await expect(CartPage.btnDeleteItem).not.toBeExisting();
    });
});
