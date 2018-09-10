import { TestBed, inject } from '@angular/core/testing';

import { UserRepository } from './user.repository';

describe('SoftwareRepository', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserRepository]
    });
  });

  it('should be created', inject([UserRepository], (service: UserRepository) => {
    expect(service).toBeTruthy();
  }));
});
