import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { TShirt, ICart, ICartResponse } from '../interfaces/car.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cart$ = new BehaviorSubject<ICart[]>([]);
  private lsUserKey: string = "user";
  public cartItemsCount: BehaviorSubject<number>;
  

  constructor(
    public httpClient: HttpClient
    ) {
    this.cartItemsCount = new BehaviorSubject(0);  
  }

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
  
}
