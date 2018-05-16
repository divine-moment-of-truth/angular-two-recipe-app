import { Component, Input, Output, EventEmitter, OnInit, ElementRef } from '@angular/core';
import { FormArray, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { Ingredient } from '../ingredient';
import { IngredientDetailService } from '../services/ingredient-detail.service';

import { IngredientDetail } from '../ingredient-detail';

@Component({
  selector: 'app-recipe-ingredients-details',
  templateUrl: './recipe-ingredients-details.component.html',
  styleUrls: ['./recipe-ingredients-details.component.css'],
  providers: [IngredientDetailService]
})

export class RecipeIngredientsDetailsComponent implements OnInit {

  title: string = "Create Recipe Ingredient Details";
  private sub: any;

  create_recipe_ingredient_detail_form: FormGroup;
  ingredients_arr: Ingredient[] = [];

  // @Output will tell the parent component (AppComponent) that an event happened in this component
  @Output() show_read_recipes_event = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private _ingredientDetailService: IngredientDetailService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {  }

  @Input()
  recipe_id: number;

  s_ingredients: Ingredient[];
  selectedIngredientDetails: IngredientDetail[];
  total_ingredients: number;
  
  ngOnInit() {

    this.sub = this.activatedRoute.params.subscribe(params => {
      this.recipe_id = params['recipe_id'];
    })

    //Get ingredient details for newly created recipe
    this._ingredientDetailService.getRecipeIngredientDetails(this.recipe_id)
      .then( ingredientDetail => {

        this.selectedIngredientDetails = ingredientDetail['records'];

        this.total_ingredients = this.selectedIngredientDetails.length;

        this.create_recipe_ingredient_detail_form = this.formBuilder.group({
          s_ingredientDetails: this.formBuilder.array(
            this.selectedIngredientDetails.map(x => this.formBuilder.group({
              ingredient_name: [x.ingredient, [Validators.required]],
              ingredient_id: [x.ingredient_id],
              ingredient_quantity: [''],
              ingredient_comment: [''],
            }))
          ),
          recipe_id: this.recipe_id,
          total_num_ingredients: this.total_ingredients
        })

      })
  }

  createRecipeIngredientDetails(): void {
    //Update recipe ingredient details
    this._ingredientDetailService.updateRecipeIngredients(this.create_recipe_ingredient_detail_form.value)
      .then( ingredient => {
        console.log(ingredient);

          this.readRecipes();
      })
  }

  readRecipes(): void {
    this.router.navigate(['readRecipes']);
  }

}
