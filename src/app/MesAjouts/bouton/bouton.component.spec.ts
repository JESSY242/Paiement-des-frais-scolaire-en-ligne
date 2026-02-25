import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoutonComponent } from './bouton.component';

describe('BoutonComponent', () => {
  let component: BoutonComponent;
  let fixture: ComponentFixture<BoutonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BoutonComponent]
    });
    fixture = TestBed.createComponent(BoutonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
