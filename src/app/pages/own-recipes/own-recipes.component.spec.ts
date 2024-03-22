import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnRecipesComponent } from './own-recipes.component';

describe('OwnRecipesComponent', () => {
  let component: OwnRecipesComponent;
  let fixture: ComponentFixture<OwnRecipesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OwnRecipesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OwnRecipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
