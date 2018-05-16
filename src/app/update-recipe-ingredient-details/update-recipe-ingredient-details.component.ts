import { Component, Input, Output, EventEmitter, OnInit, ElementRef } from '@angular/core';
import { FormArray, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { Ingredient } from '../ingredient';
import { IngredientDetailService } from '../services/ingredient-detail.service';

import { IngredientDetail } from '../ingredient-detail';

@Component({
  selector: 'app-update-recipe-ingredient-details',
  templateUrl: './update-recipe-ingredient-details.component.html',
  styleUrls: ['./update-recipe-ingredient-details.component.css'],
  providers: [IngredientDetailService]
})
export class UpdateRecipeIngredientDetailsComponent implements OnInit {

  title: string = "Edit Recipe Ingredient Details";
  recipe_id: number;
  private sub: any;
  create_update_recipe_ingredient_detail_form: FormGroup;

  constructor(
    private _ingredientDetailService: IngredientDetailService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute, 
    private router: Router
  ) { }

  total_ingredients: number;
  ingredients_from_db: IngredientDetail[];

  ngOnInit() {

    this.sub = this.route.params.subscribe( params => {
      this.recipe_id = +params['recipe_id'];
    })

    //Get ingredients and ingredient details from DB
    this._ingredientDetailService.getRecipeIngredientDetails(this.recipe_id)
      .then( ingredientDetails => {

        this.ingredients_from_db = ingredientDetails['records'];

        this.total_ingredients = this.ingredients_from_db.length;

        //Create Ingredient detail form
        this.create_update_recipe_ingredient_detail_form = this.formBuilder.group({
          s_ingredientDetails: this.formBuilder.array(
            this.ingredients_from_db.map(x => this.formBuilder.group({
              ingredient_name: [x.ingredient, [Validators.required]],
              ingredient_id: [x.ingredient_id],
              ingredient_quantity: [x.quantity],
              ingredient_comment: [x.comments],
            }))
          ),
          recipe_id: this.recipe_id,
          total_num_ingredients: this.total_ingredients
        })

      }
    )
  }

  ngOnChange(){

  }
  
  upateRecipeIngredientDetails(){
    this._ingredientDetailService.updateRecipeIngredients(this.create_update_recipe_ingredient_detail_form.value)
      .then( ingredientDetail => {
          console.log(ingredientDetail);

          this.readRecipes();
        }
      )
  }

  readRecipes(): void {
    this.router.navigate(['readRecipes']);
  }
}
