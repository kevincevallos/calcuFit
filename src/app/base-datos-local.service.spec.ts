import { TestBed } from '@angular/core/testing';

import { BaseDatosLocalService } from './base-datos-local.service';

describe('BaseDatosLocalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BaseDatosLocalService = TestBed.get(BaseDatosLocalService);
    expect(service).toBeTruthy();
  });
});
