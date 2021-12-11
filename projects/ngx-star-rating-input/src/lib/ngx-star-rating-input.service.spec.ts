import { TestBed } from '@angular/core/testing';

import { NgxStarRatingInputService } from './ngx-star-rating-input.service';

describe('NgxStarRatingInputService', () => {
  let service: NgxStarRatingInputService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxStarRatingInputService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
