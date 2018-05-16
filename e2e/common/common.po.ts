import { browser, by, element } from 'protractor';

export class CommonPage {
    navigateTo() {
        return browser.get('/');
    }

    getRecipeAppText(){
        return element(by.css('.page-header.text-center h1')).getText();
    }

    getPageHeaderText(){
        return element(by.css('.page-header h2')).getText();
    }

    //module.exports = CommonPage;
}