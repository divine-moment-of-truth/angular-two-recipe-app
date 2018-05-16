import { Component } from '@angular/core';

import { Ingredient } from './ingredient';
import { IngredientDetail } from './ingredient-detail';
import { ReadOneRecipeComponent } from './read-one-recipe/read-one-recipe.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title: string = "Recipe App";
}
