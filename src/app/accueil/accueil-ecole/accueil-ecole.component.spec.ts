import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccueilEcoleComponent } from './accueil-ecole.component';

describe('AccueilEcoleComponent', () => {
  let component: AccueilEcoleComponent;
  let fixture: ComponentFixture<AccueilEcoleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccueilEcoleComponent]
    });
    fixture = TestBed.createComponent(AccueilEcoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
