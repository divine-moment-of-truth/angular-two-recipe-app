import { browser, by, element } from 'protractor';

export class UpdateRecipeDetailsPage {
    navigateTo() {
        return browser.get('/');
    }

    getUpdateRecipesPageTitle() {
        return element(by.css('.page-header h2')).getText();
    }

    getUpdateRecipeIngredientDetailsButton() {
        return element(by.id('update-ingredients-btn'));
    }

}