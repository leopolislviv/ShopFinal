import { Component, OnInit } from '@angular/core';
import { ShoppingCart } from './shopping.cart';
import { CrudService } from 'src/app/services/crud.service';
import { ICart, TShirt } from 'src/app/interfaces/car.interface';
import { CartService } from 'src/app/services/cart.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/interfaces/user';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

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
public selectedSize: number;
public newSize: any;
private lsUserKey: string = "user";
public httpClient: HttpClient;

  constructor(protected cartService: CartService) {
    super(cartService)
  }

  // changeQuantity(cart: ICart, quantity: number) {
  //   cart.quantity = quantity;
  //   this.cartService.reload(this.cartList);
  // }

  checkout() {
    
    let check = confirm(`You have ordered ${this.totalQ} items with a total price UAH ${this.totalPrice}. Do you want to Checkout?`)
    if(check==true) {
      alert(`Thanks for the order. Your order number is ${this.mathRandom}`);
    } else {
      return false
    }
    
    this.cartList = [];
    console.log(this.cartList)
    // return true;
  }

  // clear(cart: ICart) {
  //   const user = JSON.parse(localStorage.getItem(this.lsUserKey))
  //   const body = {shirt_all: cart.shirt, email: user.email, quantity: cart.quantity}
  //   console.log(cart)
  //   return this.httpClient.post('http://localhost:8080/remove-from-basket', body)
  // }

  // addItemToCart(shirt: TShirt) {
  //   this.cartService.add(shirt).subscribe(res => console.log(res))
  //   }

  selectChange (cart: ICart, event: any) {
    let sizeNumber;
    this.selectedSize = event.target.selectedIndex - 1

      sizeNumber = cart.shirt.size
      this.newSize = sizeNumber[this.selectedSize]
      console.log(this.newSize)
    }


}
