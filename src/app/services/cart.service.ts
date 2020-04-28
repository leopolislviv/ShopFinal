import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { TShirt, ICart, ICartResponse } from '../interfaces/car.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
// import { url } from 'inspector';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  // public cartList: ICart[];
  // public totalQ: number;
  
  public cart$ = new BehaviorSubject<ICart[]>([]);
  private lsBasketKey: string = "basket";
  private lsUserKey: string = "user";
  public cartItemsCount: BehaviorSubject<number>;
  

  constructor(private authService: AuthService,
    private toastrService: ToastrService,
    public httpClient: HttpClient
    ) {
    this.cartItemsCount = new BehaviorSubject(0);  
    const user = authService.user$.getValue();
    this.init(user);
    authService.user$.subscribe(user => {
      this.init(user);
    })
  }

  // showSuccess(){
  //   this.toastrService.success('Hello world!', 'Toastr fun!',{
  //     disableTimeOut:true
  //   })};


  private init (user: User) {
    // this.storageKey = 'cart-' + (user ? user.email : 'default');
    const cart  = JSON.parse(localStorage.getItem(this.lsBasketKey));
    this.reload(cart || []);
  }

  public add(cart: TShirt) {
    const user = JSON.parse(localStorage.getItem(this.lsUserKey))
    const body = {shirt: cart, email: user.email}
    return this.httpClient.post('http://localhost:8080/add-to-basket', body)
    .pipe(
      tap((basketResponse: ICartResponse) => this.cartItemsCount.next(basketResponse.basket.length))
    )
    // let current = this.cart$.getValue();
    // let dup = current.find(c => c.shirt.id === cart.shirt.id);
    // if (dup) dup.quantity += cart.quantity; 
    // else current.push(cart);
    // this.cart$.next(current);
    // localStorage.setItem(this.storageKey, JSON.stringify(this.cart$.getValue()));
  }
  
  public remove(id: number, quantity?: number) {
    // let current = this.cart$.getValue();
    // current.splice(index, 1);
    // this.cart$.next(current);
    // localStorage.setItem(this.lsBasketKey, JSON.stringify(this.cart$.getValue()));
    const q: number = quantity ? quantity : 1;
    const user = JSON.parse(localStorage.getItem(this.lsUserKey))
    const body = {shirt_id: id, email: user.email, quantity: q}
    // console.log(cart)
    return this.httpClient.post('http://localhost:8080/remove-from-basket', body)
    .pipe(
      tap((basketResponse: ICartResponse) => this.cartItemsCount.next(basketResponse.basket.length))
    )
  }

  public getBasket(): Observable<ICart[]> {
    const user = JSON.parse(localStorage.getItem(this.lsUserKey))
    return this.httpClient.get('http://localhost:8080/users')
    .pipe(
      map((users: User[]) => users.find((item: User) => item.email === user.email)),
      map((user: User) => user ? user.basket : null),
      tap((basket: any) => this.cartItemsCount.next(basket.reduce((acc, item) => acc + item.quantity, 0))) 
      )
  }

  
  reload(cartList: ICart[]) {
    this.cart$.next(cartList);
    localStorage.setItem(this.lsBasketKey, JSON.stringify(this.cart$.getValue()));
  }
  
  clear() {
    this.cart$.next([]);
    localStorage.removeItem(this.lsBasketKey);
  }

  toastrMessage() {
    this.toastrService.info('T-shirt successfully added to the cart', 'Add T-shirt to Cart', {timeOut: 2000})
  }  
}
