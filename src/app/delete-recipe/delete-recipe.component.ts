import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { RecipeService } from '../services/recipe.service';
import { Recipe } from '../recipe';

import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-recipe',
  templateUrl: './delete-recipe.component.html',
  styleUrls: ['./delete-recipe.component.css'],
  providers: [RecipeService]
})
export class DeleteRecipeComponent {

  title: string = "Delete Recipe";
  recipe_id: number;
  sub: any;

  constructor(private _recipeService: RecipeService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(){
    this.sub = this.route.params.subscribe(params => {
      this.recipe_id = +params['recipe_id'];
    });
  }

  deleteRecipe(){
    this._recipeService.deleteRecipe(this.recipe_id)
      .then( recipe => {
 
          // show an alert to tell the user if recipe was deleted or not
          console.log(recipe);

          // go back to list of products
          this.readRecipes();
       })
      .catch( err => {
        console.log('Error ' + err);
      })
  }

  readRecipes(){
    this.router.navigate(['readRecipes']);
  }
}
