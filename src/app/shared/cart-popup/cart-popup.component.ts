import { Component, OnInit } from '@angular/core';
import { ShoppingCart } from '../basket/shopping.cart';
import { CartService } from 'src/app/services/cart.service';
import { ICart, TShirt } from 'src/app/interfaces/car.interface';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
// import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-cart-popup',
  templateUrl: './cart-popup.component.html',
  styleUrls: ['./cart-popup.component.scss']
})
export class CartPopupComponent extends ShoppingCart implements OnInit {

  private mathRandom = Math.floor(Math.random() * Math.floor(10000));
  private router: Router;
  public shirt: TShirt;
  private user: User;

// myControl = new FormControl();
// options: string[] = ['One', 'Two', 'Three'];

  constructor(protected cartService: CartService) {
    super(cartService)
    // this.loadCart();
  }

  // changeQuantity(cart: ICart, quantity: number) {
  //   cart.quantity = quantity;
  //   this.cartService.reload(this.cartList);
  // }

  public redirectToCar(id: number): void {
    this.router.navigate(['shirt', id]);
  }

//   loadCart() {
//     this.cartService.getBasket().subscribe((res) => {
//             this.cartList = res; //res.basket
//             this.calculateTotal();
//             this.calculateQuantity();
//             console.log(this.cartList)
//         });
// }

  checkout() {
    let newTotalPrice = this.totalPrice * 0.8;
    let check;
    // console.log(newTotalPrice)
    if(this.totalPrice >= 1000) {
      check = confirm(`You have ordered ${this.totalQ} items with a total price UAH ${newTotalPrice.toFixed()}. Do you want to Checkout?`)
    } else {
      check = confirm(`You have ordered ${this.totalQ} items with a total price UAH ${this.totalPrice}. Do you want to Checkout?`)
    }
    if(check==true) {
      alert(`Thanks for the order. Your order number is ${this.mathRandom}`);
    } else {
      return false
    }

    this.addToOrders(this.cartList)
    
    // this.cartService.clear()
    // this.cartList.length = 0;
    // console.log(this.cartList)
  }

  ngOnInit() {
  }

}
