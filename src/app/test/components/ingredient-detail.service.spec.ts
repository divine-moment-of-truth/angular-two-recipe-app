import { TestBed, inject } from '@angular/core/testing';

import { IngredientDetailService } from '../../services/ingredient-detail.service';

xdescribe('IngredientDetailService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IngredientDetailService]
    });
  });

  it('should be created', inject([IngredientDetailService], (service: IngredientDetailService) => {
    expect(service).toBeTruthy();
  }));
});
