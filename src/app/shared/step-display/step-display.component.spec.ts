import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepDisplayComponent } from './step-display.component';

describe('StepDisplayComponent', () => {
  let component: StepDisplayComponent;
  let fixture: ComponentFixture<StepDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StepDisplayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StepDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
