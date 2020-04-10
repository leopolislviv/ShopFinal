import { Component, OnInit } from '@angular/core';
import { ShoppingCart } from './shopping.cart';
import { CrudService } from 'src/app/services/crud.service';
import { ICart } from 'src/app/interfaces/car.interface';
import { CartService } from 'src/app/services/cart.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/interfaces/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent extends ShoppingCart {

private authService: AuthService;
private mathRandom = Math.floor(Math.random() * Math.floor(10000));
private router: Router;
// private userEmail: any;

  constructor(protected cartService: CartService) {
    super(cartService)
  }

  changeQuantity(cart: ICart, quantity: number) {
    cart.quantity = quantity;
    this.cartService.reload(this.cartList);
  }

  checkout() {
    
    let check = confirm(`You have ordered ${this.totalQ} items with a total price UAH${this.totalPrice}. Do you want to Checkout?`)
    if(check==true) {
      alert(`Thanks for the order. Your order number is ${this.mathRandom}`);
    } else {
      return false
    }
    
    this.cartService.clear();
    return true;
  }


}
