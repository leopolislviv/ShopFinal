import { Component, OnInit } from '@angular/core';
import { ShoppingCart } from './shopping.cart';
import { ICart, TShirt, ICartResponse } from 'src/app/interfaces/car.interface';
import { CartService } from 'src/app/services/cart.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent extends ShoppingCart {

// private mathRandom = Math.floor(Math.random() * Math.floor(10000));
public selectedSize: number;
public newSize: any;
public httpClient: HttpClient;
public cart: ICart;
public shirt: TShirt;

  constructor(protected cartService: CartService) {
    super(cartService)
    this.loadCart()
  }

  checkout() {
    this.addToOrders(this.cartList)
    this.cartService.newShowSuccess()
  }

  selectChange (cart: ICart, event: any) {
    let sizeNumber;
    this.selectedSize = event.target.selectedIndex - 1

      sizeNumber = cart.shirt.size
      this.newSize = sizeNumber[this.selectedSize]
      console.log(this.newSize)
    }

}
