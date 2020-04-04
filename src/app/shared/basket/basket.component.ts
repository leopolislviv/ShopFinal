import { Component, OnInit } from '@angular/core';
import { ShoppingCart } from './shopping.cart';
import { CrudService } from 'src/app/services/crud.service';
import { ICart } from 'src/app/interfaces/car.interface';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent extends ShoppingCart {

  constructor(protected cartService: CartService) {
    super(cartService)
  }

  changeQuantity(cart: ICart, quantity: number) {
    cart.quantity = quantity;
    this.cartService.reload(this.cartList);
  }

}
