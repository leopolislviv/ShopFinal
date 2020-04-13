import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { TShirt, ICart } from '../interfaces/car.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  // public cartList: ICart[];
  // public totalQ: number;
  
  public cart$ = new BehaviorSubject<ICart[]>([]);
  private storageKey: string;
  

  constructor(private authService: AuthService,
    private toastrService: ToastrService) {
    const user = authService.user$.getValue();
    this.init(user);
    authService.user$.subscribe(user => {
      this.init(user);
    })
  }

  showSuccess(){
    this.toastrService.success('Hello world!', 'Toastr fun!',{
      disableTimeOut:true
    })};


  private init (user: User) {
    this.storageKey = 'cart-' + (user ? user.email : 'default');
    const cart  = JSON.parse(localStorage.getItem(this.storageKey));
    this.reload(cart || []);
  }

  public add(cart: ICart) {
    let current = this.cart$.getValue();
    let dup = current.find(c => c.shirt.id === cart.shirt.id);
    if (dup) dup.quantity += cart.quantity; 
    else current.push(cart);
    this.cart$.next(current);
    localStorage.setItem(this.storageKey, JSON.stringify(this.cart$.getValue()));
    // this.toastrMessage();
    // додавати на сервер - зробити перевірку isLogined$, якщо залогінений, то і на сервері
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

  toastrMessage() {
    this.toastrService.info('T-shirt successfully added to the cart', 'Add T-shirt to Cart', {timeOut: 2000})
  }  
}
