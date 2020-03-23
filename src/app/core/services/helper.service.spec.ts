import { TestBed } from '@angular/core/testing';

import { HelperService } from './helper.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('HelperService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    })
  );

  it('should be created', () => {
    const service: HelperService = TestBed.get(HelperService);
    expect(service).toBeTruthy();
  });
});
