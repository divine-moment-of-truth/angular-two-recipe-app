import { Component, Input, Output, EventEmitter, OnInit, OnChanges, OnDestroy  } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { CategoryService } from '../services/category.service';
import { RecipeService } from '../services/recipe.service';
import { DifficultyService } from '../services/difficulty.service';
import { IngredientService } from '../services/ingredient.service';
import { ImageService } from '../services/image.service';
import { IngredientDetailService } from '../services/ingredient-detail.service';

import { Recipe } from '../recipe';
import { Category } from '../category';
import { Difficulty } from '../difficulty';
import { Ingredient } from '../ingredient';
import { IngredientDetail } from '../ingredient-detail';

@Component({
  selector: 'app-read-one-recipe',
  templateUrl: './read-one-recipe.component.html',
  styleUrls: ['./read-one-recipe.component.css'],
  providers: [RecipeService, CategoryService, DifficultyService, IngredientService, ImageService, IngredientDetailService]
})
export class ReadOneRecipeComponent implements OnInit  {

  //@Output()
  //outputTitleEvent: EventEmitter<string> = new EventEmitter<string>();

  title: string = "Read One Recipe";
  statusMessage: string;
  recipe: Recipe;
  private sub: any;

  recipe_ingredient_details: IngredientDetail[];

  constructor(private _recipeService: RecipeService, private _recipeIngredientDetailService: IngredientDetailService, private route: ActivatedRoute, private router: Router) { }

  recipe_id: number;

  ngOnInit(){
    //this.outputTitleEvent.emit("Read One Recipe");

    this.sub = this.route.params.subscribe(params => {
      this.recipe_id = +params['recipe_id'];

      this._recipeService.readOneRecipe(this.recipe_id)
      .then(recipe => { this.recipe = recipe
      })
      .catch(err => {
        console.log('Error ' + err);
      })

      this._recipeIngredientDetailService.getRecipeIngredientDetails(this.recipe_id)
        .then(ingredient => { 
          if(ingredient == null) {
            this.statusMessage = 'Recipe with specified id does not exist';
          } else {
            this.recipe_ingredient_details = ingredient['records']
          }
        })
        .catch( err => {
          console.log('Error ' + err);
        })
    });
  }

  readRecipes():void {
    this.router.navigate(['readRecipes']);
  }

}
