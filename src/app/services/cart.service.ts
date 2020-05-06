import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { TShirt, ICart, ICartResponse } from '../interfaces/car.interface';
import { BehaviorSubject, Observable } from 'rxjs';
// import { AuthService } from './auth.service';
// import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cart$ = new BehaviorSubject<ICart[]>([]);
  // private lsBasketKey: string = "basket";
  private lsUserKey: string = "user";
  public cartItemsCount: BehaviorSubject<number>;
  

  constructor(
    // private authService: AuthService,
    // private toastrService: ToastrService,
    public httpClient: HttpClient
    ) {
    this.cartItemsCount = new BehaviorSubject(0);  
    // const user = authService.user$.getValue();
    // this.init(user);
    // authService.user$.subscribe(user => {
    //   this.init(user);
    // })
  }

  // private init (user: User) {
  //   const cart  = JSON.parse(localStorage.getItem(this.lsBasketKey));
  //   this.reload(cart || []);
  // }

  public order(user: User) {
    user = JSON.parse(localStorage.getItem(this.lsUserKey))
    const body = {email: user.email, basket: user.basket}
    return this.httpClient.post('http://localhost:8080/orders', body)
    // .pipe(
    //   tap((basketResponse: ICartResponse) => this.cartItemsCount.next(this.getBasketItemCounter(basketResponse.basket)))
    // )
  }

  public add(cart: TShirt) {
    const user = JSON.parse(localStorage.getItem(this.lsUserKey))
    const body = {shirt: cart, email: user.email}
    return this.httpClient.post('http://localhost:8080/add-to-basket', body)
    .pipe(
      tap((basketResponse: ICartResponse) => this.cartItemsCount.next(this.getBasketItemCounter(basketResponse.basket)))
    )
  }
  
  public remove(id: number, quantity?: number) {
    const q: number = quantity ? quantity : 1;
    const user = JSON.parse(localStorage.getItem(this.lsUserKey))
    const body = {shirt_id: id, email: user.email, quantity: q}
    return this.httpClient.post('http://localhost:8080/remove-from-basket', body)
    .pipe(
      tap((basketResponse: ICartResponse) => this.cartItemsCount.next(this.getBasketItemCounter(basketResponse.basket)))
    )
  }

  public getBasket(): Observable<ICart[]> {
    const user = JSON.parse(localStorage.getItem(this.lsUserKey))
    return this.httpClient.get('http://localhost:8080/users')
    .pipe(
      map((users: User[]) => users.find((item: User) => item.email === user.email)),
      map((user: User) => user ? user.basket : null),
      tap((basket: any) => this.cartItemsCount.next(this.getBasketItemCounter(basket)) 
      )
    )
  }

  private getBasketItemCounter(basket: ICart[]): number {
    return basket.reduce((acc, item) => acc + item.quantity, 0)
  }
  
  // reload(cartList: ICart[]) {
  //   this.cart$.next(cartList);
  //   localStorage.setItem(this.lsBasketKey, JSON.stringify(this.cart$.getValue()));
  // }
  
  // clear() {
  //   this.cart$.next([]);
  //   localStorage.removeItem(this.lsBasketKey);
  // }

  // toastrMessage() {
  //   this.toastrService.info('T-shirt successfully added to the cart', 'Add T-shirt to Cart', {timeOut: 2000})
  // }
  
  
}
