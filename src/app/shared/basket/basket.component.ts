import { Component, OnInit } from '@angular/core';
import { ShoppingCart } from './shopping.cart';
import { CrudService } from 'src/app/services/crud.service';
import { ICart } from 'src/app/interfaces/car.interface';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent extends ShoppingCart {

  constructor(protected crudService: CrudService) {
    super(crudService)
  }

  changeQuantity(cart: ICart, quantity: number) {
    cart.quantity = quantity;
    this.crudService.reloadCart(this.cartList);
  }

}
