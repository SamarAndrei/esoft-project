import { $ } from '@wdio/globals';
import Page from './page.js';

class HomePage extends Page {
    get loginBtn() {
        return $('#login-button');
    }

    get inputEmail() {
        return $('#email');
    }

    get inputPassword() {
        return $('#pass');
    }

    get btnLoginConfirm() {
        return $('#login-confirm');
    }

    get btnAddItemToCart() {
        return $('#add-cart-item-2');
    }

    get btnAddItemToFavourite() {
        return $('#add-favourite-item-2');
    }

    async login(email, password) {
        await this.inputEmail.setValue(email);
        await this.inputPassword.setValue(password);
        await this.btnLoginConfirm.click();
    }

    open() {
        return super.open('');
    }
}

export default new HomePage();
