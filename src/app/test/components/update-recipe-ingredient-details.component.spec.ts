import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRecipeIngredientDetailsComponent } from '../../update-recipe-ingredient-details/update-recipe-ingredient-details.component';

xdescribe('UpdateRecipeIngredientDetailsComponent', () => {
  let component: UpdateRecipeIngredientDetailsComponent;
  let fixture: ComponentFixture<UpdateRecipeIngredientDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateRecipeIngredientDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateRecipeIngredientDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
