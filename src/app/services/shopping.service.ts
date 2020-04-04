import { Injectable } from '@angular/core';
import { ICart } from '../interfaces/car.interface';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {
  public cartList: ICart[];
  public totalQ: number;

  constructor(
    private cartService: CartService,
    ) {
    this.loadCart()
  }

  loadCart() {
    this.cartService.cart$.subscribe(res => {
        this.cartList = res;
        this.calculateQuantity()
        // console.log(this.totalQ)
    });
}


  private calculateQuantity() {
    let totalQuantity = 0;
    for (let cart of this.cartList) {
        totalQuantity += cart.quantity
    }
    this.totalQ = totalQuantity;
    // console.log(this.totalQ)
}


}
