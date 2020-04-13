import { Component, OnInit } from '@angular/core';
import { ShoppingCart } from '../basket/shopping.cart';
import { CartService } from 'src/app/services/cart.service';
import { ICart, Car } from 'src/app/interfaces/car.interface';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-cart-popup',
  templateUrl: './cart-popup.component.html',
  styleUrls: ['./cart-popup.component.scss']
})
export class CartPopupComponent extends ShoppingCart implements OnInit {

  private mathRandom = Math.floor(Math.random() * Math.floor(10000));
  private router: Router;
  public car: Car;

myControl = new FormControl();
options: string[] = ['One', 'Two', 'Three'];

  constructor(protected cartService: CartService) {
    super(cartService)
  }

  // changeQuantity(cart: ICart, quantity: number) {
  //   cart.quantity = quantity;
  //   this.cartService.reload(this.cartList);
  // }

  public redirectToCar(id: number): void {
    this.router.navigate(['car', id]);
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

  ngOnInit() {
  }

}
