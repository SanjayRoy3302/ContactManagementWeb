import { TestBed } from '@angular/core/testing';

import { ContactRespositoryService } from './contact-respository.service';

describe('ContactRespositoryService', () => {
  let service: ContactRespositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactRespositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
