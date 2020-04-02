import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CurrencyPipe} from './currency.pipe';
import {YearPipe} from './year.pipe';
// import { SearchPipe } from './search.pipe';



@NgModule({
  declarations: [
    CurrencyPipe,
    YearPipe,
    // SearchPipe,
  ],
  exports: [
    CurrencyPipe,
    YearPipe,
  ],
  imports: [
    CommonModule
  ]
})
export class PipeModule { }
