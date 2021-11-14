import { TestBed } from '@angular/core/testing';

import { ViewResolver } from './view.resolver';

describe('ViewResolver', () => {
  let resolver: ViewResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ViewResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
