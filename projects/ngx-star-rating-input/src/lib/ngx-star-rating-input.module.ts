import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { NgxStarRatingInputComponent } from './ngx-star-rating-input.component';
import {BrowserModule} from "@angular/platform-browser";
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    NgxStarRatingInputComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
  ],
  exports: [
    NgxStarRatingInputComponent
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class NgxStarRatingInputModule { }
