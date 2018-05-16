import { browser, by, element } from 'protractor';

export class CreateRecipePage {
    navigateTo() {
        return browser.get('/');
    }

    getCreateRecipePageTitle() {
        return element(by.css('H2')).getText();
    }
}