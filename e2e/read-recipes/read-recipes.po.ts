import { browser, by, element } from 'protractor';

export class ReadRecipesPage {
    navigateTo() {
        return browser.get('/');
    }

    getReadRecipesPageTitle() {
        return element(by.css('.page-header h2')).getText();
    }

    getCreateRecipeButton() {
        return element(by.css('.btn.btn-primary.pull-right'));
    }

    getFirstTableRowRecipeName() {
        return element(by.xpath('//td[2]')).getText();
    }

    getRecipeNameByRow(rowNum:number) {
        return element(by.xpath('//tr[' + rowNum + ']/td[4]')).getText();
    }

    getReadRecipeButton(rowNum: number) {
        return element(by.xpath('//tr[' + rowNum + ']/td[9]/a'));
    }

    getEditRecipeButton(rowNum: number) {
        return element(by.xpath('//tr[' + rowNum + ']/td[10]/a'));
    }

    getCategoryTextForRow(rowNum: number) {
        return element(by.xpath('//tr[' + rowNum + ']/td[4]')).getText();
    }
}