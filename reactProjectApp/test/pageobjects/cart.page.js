import { $ } from '@wdio/globals';
import Page from './page.js';

class CartPage extends Page {
    get btnDeleteItem() {
        return $('#delete-btn-2');
    }

    open() {
        return super.open('cart');
    }
}

export default new CartPage();
