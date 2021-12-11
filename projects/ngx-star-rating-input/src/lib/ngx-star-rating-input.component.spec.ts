import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxStarRatingInputComponent } from './ngx-star-rating-input.component';

describe('NgxStarRatingInputComponent', () => {
  let component: NgxStarRatingInputComponent;
  let fixture: ComponentFixture<NgxStarRatingInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxStarRatingInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxStarRatingInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
