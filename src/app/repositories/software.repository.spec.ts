import { TestBed, inject } from '@angular/core/testing';

import { SoftwareRepository } from './software.repository';

describe('SoftwareRepository', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SoftwareRepository]
    });
  });

  it('should be created', inject([SoftwareRepository], (service: SoftwareRepository) => {
    expect(service).toBeTruthy();
  }));
});
