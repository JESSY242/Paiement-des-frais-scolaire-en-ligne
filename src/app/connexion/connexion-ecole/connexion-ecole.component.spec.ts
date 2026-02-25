import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnexionEcoleComponent } from './connexion-ecole.component';

describe('ConnexionEcoleComponent', () => {
  let component: ConnexionEcoleComponent;
  let fixture: ComponentFixture<ConnexionEcoleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConnexionEcoleComponent]
    });
    fixture = TestBed.createComponent(ConnexionEcoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
