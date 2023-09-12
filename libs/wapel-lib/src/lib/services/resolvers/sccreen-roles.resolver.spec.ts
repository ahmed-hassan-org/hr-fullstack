import { TestBed } from '@angular/core/testing';

import { SccreenRolesResolver } from './sccreen-roles.resolver';

describe('SccreenRolesResolver', () => {
  let resolver: SccreenRolesResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(SccreenRolesResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
