import { browser, by, element } from 'protractor';

export class UpdateRecipePage {
    navigateTo() {
        return browser.get('/');
    }

    getUpdateRecipesPageTitle() {
        return element(by.css('.page-header h2')).getText();
    }

    getRecipeNameText() {
        return element(by.name('recipe_name')).getAttribute('value');
    }

    getRecipeDescriptionText() {
        return element(by.name('recipe_description')).getAttribute('value');
    }

    getSelectedRecipeCategory() {
        return element(by.css('[name="category_id"] options:selected'))
    }

    clickCategoryDropDown() {
        element(by.name('category_id')).click();
    }

    changeRecipeCategory(categoryId: number){
        element(by.css('option[value="' + categoryId + '"]')).click();
    }

    clickUpdateButton() {
        element(by.id('update-btn')).click();
    }
}