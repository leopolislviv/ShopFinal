import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { Car, ICart } from '../interfaces/car.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  // public cartList: ICart[];
  // public totalQ: number;
  
  public cart$ = new BehaviorSubject<ICart[]>([]);
  private storageKey: string;

  constructor(private authService: AuthService) {
    const user = authService.user$.getValue();
    this.init(user);
    authService.user$.subscribe(user => {
      this.init(user);
    })
  }

  private init (user: User) {
    this.storageKey = 'cart-' + (user ? user.email : 'default');
    const cart  = JSON.parse(localStorage.getItem(this.storageKey));
    this.reload(cart || []);
  }

  public add(cart: ICart) {
    let current = this.cart$.getValue();
    let dup = current.find(c => c.car.id === cart.car.id);
    if (dup) dup.quantity += cart.quantity;
    else current.push(cart);
    this.cart$.next(current);
    localStorage.setItem(this.storageKey, JSON.stringify(this.cart$.getValue()));
  }

  remove(index: number) {
    let current = this.cart$.getValue();
    current.splice(index, 1);
    this.cart$.next(current);
    localStorage.setItem(this.storageKey, JSON.stringify(this.cart$.getValue()));
  }
  
  reload(cartList: ICart[]) {
    this.cart$.next(cartList);
    localStorage.setItem(this.storageKey, JSON.stringify(this.cart$.getValue()));
  }
  
  clear() {
    this.cart$.next([]);
    localStorage.removeItem(this.storageKey);
  }



//   loadCart() {
//     this.cart$.subscribe(res => {
//         this.cartList = res;
//         // this.calculateTotal();
//         this.calculateQuantity()
//     });
// }

//   private calculateQuantity() {
//     let totalQuantity = 0;
//     for (let cart of this.cartList) {
//         totalQuantity += cart.quantity
//     }
//     this.totalQ = totalQuantity;
//     // console.log(this.totalQ)
// }
  
}
