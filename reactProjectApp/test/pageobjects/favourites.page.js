import { $ } from '@wdio/globals';
import Page from './page.js';

class FavouritesPage extends Page {
    get btnDeleteItem() {
        return $('#delete-btn-2');
    }

    open() {
        return super.open('favourite');
    }
}

export default new FavouritesPage();
