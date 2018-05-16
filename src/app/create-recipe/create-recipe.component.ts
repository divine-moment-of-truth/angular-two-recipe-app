import { Component, Input, Output, EventEmitter, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
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

@Component({
  selector: 'app-create-recipe',
  templateUrl: './create-recipe.component.html',
  styleUrls: ['./create-recipe.component.css'],
  providers: [RecipeService, CategoryService, DifficultyService, IngredientService, ImageService, IngredientDetailService]
})

export class CreateRecipeComponent implements OnInit {

  title: string = "Create Recipe";
  
  create_recipe_form: FormGroup;

  @Output() show_read_recipes_event = new EventEmitter();
  @Output() show_recipe_ingredients_details_event = new EventEmitter();

  //recipes: Recipe[];
  categories: Category[];
  difficulties: Difficulty[];
  ingredients: Ingredient[];
  //selected_ingredients: Ingredient[];
  selected_ingredients: Array<Ingredient> = [];
  ingredient_obj: Ingredient;
  ingredients_andrew: Ingredient[];
  returnedObject: any;
  imageReturnedText: string;
  errorUploading: boolean = false;
  imageLength: number;
  imageId: number;
  image_Id_value: string;
  checkBoxesSelected: boolean = false;
  recipe_id: number;
  total_ingredients: number;
  
  constructor(
    private _categoryService: CategoryService, 
    private _recipeService: RecipeService,
    private _difficultyService: DifficultyService,
    private _ingredientService: IngredientService,
    private _imageService: ImageService,
    private _ingredientDetailService: IngredientDetailService,
    formBuilder: FormBuilder,
    private elem: ElementRef,
    private router: Router
  ) { 
    this.create_recipe_form = formBuilder.group({

      name: ["", Validators.required],
      description: ["", Validators.required],
      category_id: ["", Validators.required],
      ingredient_id: '',
      //ingredient_id: ["", Validators.required],
      instruction_one: ["", Validators.required],
      instruction_two: '',
      instruction_three: '',
      instruction_four: '',
      instruction_five: '',
      instruction_six: '',
      difficulty_id: ["", Validators.required],
      healthy: ["", Validators.required],
      preperation: ["", Validators.required],
      vegetarian: ["", Validators.required],
      image_id: '6'
      //image_id: ["", Validators.required]
    });
  }

  ngOnInit() {

    //Get list of Categories from Server
    this._categoryService.readCategories()
      .then( categories => {
        this.categories = categories['records']
      })
      .catch( err => {
        console.log('Error ' + err);
      });

    //Get list of Ingredients from Server
    this._ingredientService.readIngredients()
      .then(ingredient => {
        this.ingredients = ingredient['records']
      })
      .catch( err => {
        console.log('Error ' + err);
      });

    //Get list of Difficulties from Server
    this._difficultyService.readDifficulties()
      .then(difficulties => {
        this.difficulties = difficulties['records']
      })
      .catch( err => {
        console.log('Error ' + err);
      });
  }

  createRecipe(): void {
    this._recipeService.createRecipe(this.create_recipe_form.value)
      .then( recipe => {
          console.log(recipe);

          //Set get the newly created recipe id (which is returned from the DB)
          this.recipe_id = recipe[0];

          console.log(this.selected_ingredients);

          this.total_ingredients = this.selected_ingredients.length;

          //Create receipe ingredients
          this._ingredientDetailService.createRecipeIngredientDetailsNew(this.selected_ingredients, this.recipe_id, this.total_ingredients)
            .then( ingredientDetail => {

              console.log(ingredientDetail);

              //Create the selected ingredient form so that the user can enter further ingredient details
              this.createRecipeIngredientsDetailsForm();
            })
            .catch( err => {
              console.log('Error create recipe ingredients - ' + err);
            });
        })
      .catch( err => {
        console.log('Error ' + err);
      });
  }
  
  checkAtLeastOneCheckBoxChecked(): void {
    if(this.selected_ingredients.length == 0){
      this.checkBoxesSelected = false;
    }
    else{
      this.checkBoxesSelected = true;
    }
  }

  createRecipeIngredientsDetailsForm(): void {
    this.router.navigate([ 'recipeIngredientsDetails', this.recipe_id ]);
  }

  readRecipes(): void {
    this.router.navigate(['readRecipes']);
  }

  uploadImage(e) {
    let files = this.elem.nativeElement.querySelector('#selectFile').files;
    let formData = new FormData();
    let file = files[0];
    this.imageReturnedText = "";

    formData.append('selectFile', file, file.name);
    
    this._imageService.uploadImage(formData)
      .then(
        image => {
          console.log(image);

          this.imageLength = image.length;

          if(this.imageLength == 2)
          {
            this.addImageIdToHtml(image)
          }
          else
          {
            this.returnedObject = image;
            this.imageReturnedText = this.returnedObject.message;
            this.errorUploading = true;
          }
          
          e.preventDefault();
          e.stopPropagation();
        },
        error => console.log(error)
      );
  }

  //Method to clear upload image file name already exists alert text
  chooseFileClicked() {
    this.errorUploading = false;
  }

  addImageIdToHtml(image){
    this.imageId = image[0];
    this.create_recipe_form.patchValue(
        { "image_id" : this.imageId }
    );
  }

  //Method for either adding or deleting Ingredient from the 'selected ingredient' array, depending on whether checkbox was checked or unchecked
  ingredientSelected(e, ingredient)
  {
    //console.log(e.checked);
    console.log(ingredient);

    //Create a new ingredient object (send through properties from HTML)
    let ingredient_obj: Ingredient = new Ingredient(ingredient.ingredient_id, ingredient.ingredient_name, ingredient.ingredient_checked);
 
    //Check to whether ingredient already exists in array. If it does then remove it from the array
    let indexNum: number = this.searchArrayForObject(ingredient_obj, this.selected_ingredients);

    //If returned index is -1 then this means object was not found in array, therefore add the object to the array, if greater than -1
    //then remove the object from the array at the returned index number
    if(indexNum == -1){
      //If -1 then add the ingredient object to the 'ingredient_obj' array
      this.selected_ingredients.push(ingredient_obj);
    }
    else{
      //Remove the object at the returned index from the array
      this.selected_ingredients.splice(indexNum);
    }

    console.log(this.selected_ingredients);

    //validate that at least one checkbox has been selected
    this.checkAtLeastOneCheckBoxChecked();
  }

  searchArrayForObject(objectToFind: Ingredient, arrayToSearch: Array<Ingredient>): number {

    //searches through ingredient array to see if an ingredient object exists in there with the ingredient id of the ingredient clicked in the check box  
    let indexOfFoundObject = arrayToSearch.findIndex(i => i.ingredient_id === objectToFind.ingredient_id);

    return indexOfFoundObject;
  } 

}
