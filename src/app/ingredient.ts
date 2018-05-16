export class Ingredient{
    ingredient_id: number;
    ingredient_name: string;
    ingredient_checked: boolean;

    constructor(ingredient_id, ingredient_name, ingredient_checked){
        this.ingredient_id = ingredient_id,
        this.ingredient_name = ingredient_name,
        this.ingredient_checked = ingredient_checked
    }
}
