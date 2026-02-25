import { TestBed } from '@angular/core/testing';

import { ServiceConnexionEcoleService } from './service-connexion-ecole.service';

describe('ServiceConnexionEcoleService', () => {
  let service: ServiceConnexionEcoleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceConnexionEcoleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
