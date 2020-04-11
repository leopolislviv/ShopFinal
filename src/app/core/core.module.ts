import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LayoutComponent} from './layout/layout.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { HeaderComponent } from './header/header.component';
import {MatButtonModule} from '@angular/material/button';
import { NavListComponent } from './nav-list/nav-list.component';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {MatMenuModule} from '@angular/material/menu';
import {MatBadgeModule} from '@angular/material/badge';
import {MatTooltipModule} from '@angular/material/tooltip';
import { CartPopupComponent } from '../shared/cart-popup/cart-popup.component';


const COMPONENTS: any = [
  LayoutComponent,
  HeaderComponent,
  NavListComponent,
  CartPopupComponent,
]


@NgModule({
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    RouterModule,
    SharedModule,
    MatMenuModule,
    MatBadgeModule,
    MatTooltipModule,
  ]
})
export class CoreModule { }
