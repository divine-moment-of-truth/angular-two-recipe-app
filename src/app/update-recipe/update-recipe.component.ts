import { Component, Output, Input, OnInit, EventEmitter, OnChanges, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { RecipeService } from '../services/recipe.service';
import { CategoryService } from '../services/category.service';
import { DifficultyService } from '../services/difficulty.service';
import { ImageService } from '../services/image.service';
import { IngredientService } from '../services/ingredient.service';
import { IngredientDetailService } from '../services/ingredient-detail.service';

import { Recipe } from '../recipe';
import { Category } from '../category';
import { Difficulty } from '../difficulty';
import { Image } from '../image';
import { Ingredient } from '../ingredient';
import { IngredientDetail } from '../ingredient-detail';
import { Healthy } from '../healthy';
import { Vegetarian } from '../vegetarian';

@Component({
  selector: 'app-update-recipe',
  templateUrl: './update-recipe.component.html',
  styleUrls: ['./update-recipe.component.css'],
  providers: [RecipeService, CategoryService, DifficultyService, ImageService, IngredientService, IngredientDetailService]
})
export class UpdateRecipeComponent implements OnInit {

  recipe_id: number;
  title: string = "Edit Recipe";
  sub: any;
  total_ingredients: number;
  update_recipe_form: FormGroup;

  categories: Category[];
  difficulties: Difficulty[];
  images: Image[];
  all_ingredients: Ingredient[];
  recipeIngredients: Ingredient[];
  selected_ingredients_previously: IngredientDetail[]; //Previously selected ingredientsbefore update recipe was clicked
  i_selected_ingredients_previously: Array<Ingredient>= [];
  previously_selected_now_deselected: Array<number> = []; //These are ingredients that were associated with the recipe, but have now been deselected
  selected_ingredients_newly: Array<Ingredient> = []; //These are newly selected ingredients that have been selected as part of the recipe update
  deselected_ingredients: Array<Ingredient> = [];
  newly_selected_ingredients_to_send_to_server: Array<Ingredient> = [];
  ingredient_obj: Ingredient;
  imageReturnedText: string;
  returnedObject: any;
  imageLength: number;
  errorUploading: boolean = false;
  imageId: number;

  healthyOptionsArray = [
    new Healthy(0, 'No'),
    new Healthy(1, 'Yes')
  ]
  vegetarianOptionArray = [
    new Vegetarian(0, 'No'),
    new Vegetarian(1, 'Yes')
  ]

  constructor(private _recipeService: RecipeService, 
              private _categoryService: CategoryService, 
              private _difficultyService: DifficultyService,
              private _imageService: ImageService,
              private _ingredientService: IngredientService,
              private _ingredientDetailService: IngredientDetailService,
              private formBuilder: FormBuilder,
              private elem: ElementRef,
              private router: Router,
              private route: ActivatedRoute
  )         
  { 
    // build angular form
    this.update_recipe_form = this.formBuilder.group({
      recipe_name: ["", Validators.required],
      recipe_id: '',
      recipe_description: ["", Validators.required],
      category_id: ["", Validators.required],
      ingredient_id: '',
      instruction_one: ["", Validators.required],
      instruction_two: '',
      instruction_three: '',
      instruction_four: '',
      instruction_five: '',
      instruction_six: '',
      difficulty_id: ["", Validators.required],
      isHealthy: ["", Validators.required],
      preperation: ["", Validators.required],
      isVegetarian: ["", Validators.required],
      image_id: ["", Validators.required]
    });
  }

ngOnInit(){
  this.sub = this.route.params.subscribe(params => {
    this.recipe_id = +params['recipe_id'];
  });

  this._categoryService.readCategories()
    .then( categories => { 
      this.categories=categories['records']
    });

  this._difficultyService.readDifficulties()
    .then( difficulties => {
      this.difficulties=difficulties['records']
    });

  this._imageService.readImages()
    .then( images => {
      this.images=images['records']
    });

  //Get ingredients from DB
  this._ingredientService.readIngredients()
    .then( ingredients => { 
      this.all_ingredients=ingredients['records']

      //Get ingredient details from DB
      this._ingredientDetailService.getRecipeIngredientDetails(this.recipe_id)
      .then( ingredients => {
        this.selected_ingredients_previously=ingredients['records']

        //Set ingredient checkbox states
        this.setIngredientCheckBoxState();

        this.readRecipeDetails();
      })
      .catch( err => {
        console.log('Error getting ingredient details' + err);
      });
    })
    .catch( err => {
      console.log('Error getting ingredients' + err);
    });
  }

  readRecipes(){
    this.router.navigate(['readRecipes']);
  }

  readRecipeDetails(){
    this._recipeService.readOneRecipeForUpdate(this.recipe_id)
      .subscribe(
        recipe => {
          console.log(recipe);
          this.update_recipe_form.patchValue({
            recipe_name: recipe.recipe_name,
            recipe_id: recipe.recipe_id,
            recipe_description: recipe.recipe_description,
            category_id: recipe.category_id,
            //category_name: recipe.category_name,
            //ingredient_id: recipe.ingredient_id,
            instruction_one: recipe.instruction_one,
            instruction_two: recipe.instruction_two,
            instruction_three: recipe.instruction_three,
            instruction_four: recipe.instruction_four,
            instruction_five: recipe.instruction_five,
            instruction_six: recipe.instruction_six,
            difficulty_id: recipe.difficulty_id,
            //difficulty_name: recipe.difficulty_name,
            isHealthy: recipe.healthy,
            preperation: recipe.prep_time,
            isVegetarian: recipe.vegetarian,
            image_id: recipe.image_id
            //image_name_path: recipe.image_name_path
          });
        }
      );
  }

  //Method looks through the all_ingredients object array for checked ingredients (from the selected_ingredients_previously array) and
  //sets the checked_status for these ingredients in the all_ingredients object array  
  setIngredientCheckBoxState(){
    for(let i:number=0; i<this.all_ingredients.length; i++){ 
      for(let x:number=0; x<this.selected_ingredients_previously.length; x++){
        if(this.all_ingredients[i].ingredient_id == this.selected_ingredients_previously[x].ingredient_id){
          this.all_ingredients[i].ingredient_checked = true;
          break;
        }
      }
    }
    console.log(this.all_ingredients);

    //Add previously selected ingredetients to newly added ingredient array - this is required because if a user unselects a previously selected item
    //the item needs removing from the newly selected ingredient array.
    this.addPreviouslySelectedIngredientsToNewlySelectedIngredientArray();
  }

  createUpdateRecipeIngredientsDetailsForm() {

    //this.update_recipe_form.value.id = this.recipe_id;

    //Remove previously selected ingredients from newly added ingredients array so that only newly added ingredients are sent to the server
    this.removePreviouslySelectedIngredientsFromNewlySelectedIngredientArray();

    //Call method used to populate an array (previously_selected_now_deselected[]) with ingredients that were de-selected from update form
    this.populateDeselectedIngredientsArray();

    //Delete ingredients from recipe
    if(this.previously_selected_now_deselected.length != 0){
      this._ingredientDetailService.deleteIngredientsFromRecipe(this.recipe_id, this.previously_selected_now_deselected)
      .subscribe(
        ingredientDetail => {
          console.log(ingredientDetail);
        },
        error => console.log(error)
      );
    }

    //Add newly selected ingredients to recipe
    if(this.selected_ingredients_newly.length != 0){
      //this._ingredientDetailService.addIngredientsToRecipe(this.recipe_id, this.selected_ingredients_newly)
      this._ingredientDetailService.addIngredientsToRecipe(this.recipe_id, this.newly_selected_ingredients_to_send_to_server)
      .then( ingredientDetail => {
          console.log(ingredientDetail);
        }
      )
    }

    //Update Recipe with newly added data from form
    this._recipeService.updateRecipe(this.update_recipe_form.value)
      .then( recipe => {

          console.log(recipe);

          this.router.navigate(['updateRecipeIngredientDetails', this.recipe_id]);
        },
        error => console.log(error)
      );
  }

  addPreviouslySelectedIngredientsToNewlySelectedIngredientArray(){
    for(let x:number=0; x < this.selected_ingredients_previously.length; x++){
      let ingredient_obj: Ingredient = new Ingredient(this.selected_ingredients_previously[x].ingredient_id, this.selected_ingredients_previously[x].ingredient, "");
      this.selected_ingredients_newly.push(ingredient_obj)
    }
  }

  removePreviouslySelectedIngredientsFromNewlySelectedIngredientArray(){
    for(let x:number=0; x < this.selected_ingredients_newly.length; x++){

      this.populateIngredientArrayWithIngredientDetails();

      let indexNum: number = this.searchArrayForObject(this.selected_ingredients_newly[x], this.i_selected_ingredients_previously);

      if(indexNum == -1){
        this.newly_selected_ingredients_to_send_to_server.push(this.selected_ingredients_newly[x]);
      }
      console.log(this.newly_selected_ingredients_to_send_to_server);
    }
  }
  
  //Coverts the selected_ingredients_previously arry (which is of type 'IngredientDetail') to an array of type 'Ingredient'
  populateIngredientArrayWithIngredientDetails(){
    if(this.selected_ingredients_previously.length != 0){
      for(let x:number=0; x < this.selected_ingredients_previously.length; x++){
        let ingredient_obj: Ingredient = new Ingredient(this.selected_ingredients_previously[x].ingredient_id, this.selected_ingredients_previously[x].ingredient, "");
        
        this.i_selected_ingredients_previously.push(ingredient_obj);
      }
    }
  }
  //Method used to workout if a previously selected ingredient has now been deselected. If it has then add this to the (previously_selected_now_deselected[]) array
  populateDeselectedIngredientsArray(): void {
    //Iterate through previously selected ingredients to see if they exist in the newly selected/deselected array
    //If they do then add it to the deselected array
    for(let i:number=0; i < this.selected_ingredients_previously.length; i++){
      for(let x:number=0; x < this.deselected_ingredients.length; x++){
        if(this.selected_ingredients_previously[i].ingredient_id == this.deselected_ingredients[x].ingredient_id){
          this.previously_selected_now_deselected.push(this.selected_ingredients_previously[i].ingredient_id)
        }
      }
    } 
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
    this.update_recipe_form.patchValue(
        { "image_id" : this.imageId }
    );
  }

  //Method for either added or deleted Ingredient from the 'selected ingredient' array, depending on whether checkbox was checked or unchecked
  ingredientSelected(e, ingredient)
  {
    //console.log(e.checked);
    console.log(ingredient);

    //Create a new ingredient object (send through properties from HTML)
    let ingredient_obj: Ingredient = new Ingredient(ingredient.ingredient_id, ingredient.ingredient_name, ingredient.ingredient_checked);
 
    //Check to whether ingredient already exists in array. If it does then remove it from the array, if it doesnt then add it
    //let indexNum: number = this.searchArrayForObject(ingredient_obj, this.selected_ingredients_newly);
    let indexNum: number = this.searchArrayForObject(ingredient_obj, this.selected_ingredients_newly);

    //If returned index is -1 then this means object was not found in array, therefore add the object to the array, if greater than -1
    //then remove the object from the array at the returned index number
    if(indexNum == -1){
      //If -1 then add the ingredient object to the 'ingredient_obj' array
      this.selected_ingredients_newly.push(ingredient_obj);
    }
    else{
      //Remove the object at the returned index from the array
      this.selected_ingredients_newly.splice(indexNum);

      this.deselected_ingredients.push(ingredient_obj);
    }

    //console.log(this.selected_ingredients_newly);
    console.log(this.selected_ingredients_newly);
  }

  searchArrayForObject(objectToFind: Ingredient, arrayToSearch: Array<Ingredient>): number {

    //searches through ingredient array to see if an ingredient object exists in there with the ingredient id of the ingredient clicked in the check box  
    let indexOfFoundObject = arrayToSearch.findIndex(i => i.ingredient_id === objectToFind.ingredient_id);

    return indexOfFoundObject;
  } 
}
