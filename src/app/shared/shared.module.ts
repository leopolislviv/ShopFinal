import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CategoryComponent} from './category/category.component';
import {LoginComponent} from './login/login.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {BasketComponent} from './basket/basket.component';
import { NotFoundComponent } from './not-found/not-found.component';
import {RouterModule} from '@angular/router';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule, MatIconModule, MatInputModule, MatTooltipModule, MatSelectModule, MatAutocompleteModule} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import {PipeModule} from '../pipes/pipe.module';
import { CarComponent } from './car/car.component';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SearchPipe } from '../pipes/search.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { QualityControlComponent } from './quality-control/quality-control.component';
import { BrowserModule } from '@angular/platform-browser';
import { CartPopupComponent } from './cart-popup/cart-popup.component';

const comp: any = [
  CategoryComponent,
  LoginComponent,
  SignUpComponent,
  BasketComponent,
];


@NgModule({
  declarations: [...comp, NotFoundComponent, CarComponent, SearchPipe, QualityControlComponent],
  exports: [...comp],
  imports: [
    CommonModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatCardModule,
    MatChipsModule,
    PipeModule,
    FormsModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    BrowserModule,
    MatTooltipModule,
    MatSelectModule,
    MatFormFieldModule,
    MatAutocompleteModule,
  ]
})
export class SharedModule {
}
