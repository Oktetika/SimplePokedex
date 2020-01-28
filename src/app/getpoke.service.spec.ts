import { TestBed } from '@angular/core/testing';

import { GetpokeService } from './getpoke.service';

describe('GetpokeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetpokeService = TestBed.get(GetpokeService);
    expect(service).toBeTruthy();
  });
});
