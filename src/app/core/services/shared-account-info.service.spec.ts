import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SharedAccountInfoService } from './shared-account-info.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { RouterTestingModule } from '@angular/router/testing';

describe('SharedAccountInfoService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [{ provide: AngularFireStorage, useValue: {} }]
    })
  );

  it('should be created', () => {
    const service: SharedAccountInfoService = TestBed.get(SharedAccountInfoService);
    expect(service).toBeTruthy();
  });
});
