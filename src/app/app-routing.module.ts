import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CategoryComponent} from './shared/category/category.component';
import {LoginComponent} from './shared/login/login.component';
import {SignUpComponent} from './shared/sign-up/sign-up.component';
import {BasketComponent} from './shared/basket/basket.component';
import {NotFoundComponent} from './shared/not-found/not-found.component';
import {AuthGuard} from './guards/auth.guard';
import {CarComponent} from './shared/car/car.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: 'category',
    redirectTo: 'category/All cars',
    pathMatch: 'full',
  },
  {
    path: 'category/:cat',
    component: CategoryComponent,
  },
  {
    path: 'car/:id',
    component: CarComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
  },
  {
    path: 'basket',
    canActivate: [AuthGuard],
    component: BasketComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
