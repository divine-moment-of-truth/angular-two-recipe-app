import { browser, by, element } from 'protractor';

export class ReadOneRecipePage {
    navigateTo() {
        return browser.get('/');
    }

    getPageTitle() {
        return element(by.css('H2')).getText();
    }

    getRecipeTitle() {
        return element(by.css('.header-section-title h2')).getText();
    }

    getReadRecipesBtn(){
        return element(by.css('#read-recipes-btn'));
    }
}