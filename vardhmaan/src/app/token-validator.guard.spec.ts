import { TestBed } from '@angular/core/testing';

import { TokenValidatorGuard } from './token-validator.guard';

describe('TokenValidatorGuard', () => {
  let guard: TokenValidatorGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(TokenValidatorGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
