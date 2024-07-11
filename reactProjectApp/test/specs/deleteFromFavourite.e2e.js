import { expect } from '@wdio/globals';
import HomePage from '../pageobjects/home.page.js';
import FavouritesPage from '../pageobjects/favourites.page.js';
import { browser } from '@wdio/globals';

describe('Delete item from favourites', () => {
    it('just deleting item', async () => {
        await HomePage.open();
        await HomePage.loginBtn.click();
        await HomePage.login('Admiral@mail.ru', 'Admiral123123123123');
        await expect(HomePage.loginBtn).not.toBeExisting();

        await browser.pause(2000);

        await HomePage.btnAddItemToFavourite.click();

        await FavouritesPage.open();

        await browser.pause(1000);

        await FavouritesPage.btnDeleteItem.click();

        await expect(FavouritesPage.btnDeleteItem).not.toBeExisting();
    });
});
