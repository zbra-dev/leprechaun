import { TestBed, inject } from '@angular/core/testing';

import { LicenseRepository } from './license.repository';

describe('LicenseRepository', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LicenseRepository]
    });
  });

  it('should be created', inject([LicenseRepository], (service: LicenseRepository) => {
    expect(service).toBeTruthy();
  }));
});
