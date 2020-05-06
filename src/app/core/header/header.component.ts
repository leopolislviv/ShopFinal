import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {BehaviorSubject} from 'rxjs';
import {Router} from '@angular/router';
import {User} from '../../interfaces/user';
import { ICart } from 'src/app/interfaces/car.interface';
import { CartService } from 'src/app/services/cart.service';
// import { ShoppingService } from 'src/app/services/shopping.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Output()
  public toggleSideNav: EventEmitter<void>;

  public isLogined$: BehaviorSubject<boolean>;
  public user$: BehaviorSubject<User>;

  // public totalQ: number;
  public cartList: ICart[]; // or cartList: any
  public hideMatBadge: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    private cartService: CartService,
    // private shoppingService: ShoppingService,
  ) {
    this.toggleSideNav = new EventEmitter<void>();
    this.isLogined$ = this.authService.isLogined$;
    this.user$ = this.authService.user$;
    // this.loadCart();
    // this.totalQ = this.shoppingService.totalQ;
    this.hideMatBadge = false;
    // this.loadCart()
  }

  public logOut(): void {
    this.authService.logOut();
    this.router.navigate(['']);
    this.hideMatBadge = true;
  }

//   loadCart() {
//     this.cartService.getBasket()
//     // .subscribe((res) => {
//     //         this.cartList = res; //res.basket
//     //         // this.calculateTotal();
//     //         // this.calculateQuantity();
//     //         console.log(this.cartList)
//     //     });
// }

  

//   loadCart() {
//     // this.cartService.cart$.subscribe(res => {
//       this.cartService.getBasket().subscribe(res => {    
//       this.cartList = res;
//       this.calculateQuantity()
//     });
// }

//   private calculateQuantity() {
//     let totalQuantity = 0;
//     for (let cart of this.cartList) {
//         totalQuantity += cart.quantity
//     }
//     this.totalQ = totalQuantity;
//     if (this.totalQ > 0) {
//       this.hideMatBadge = false;
//     } 
//     else {this.hideMatBadge = true}
// }

  public get cartItemsCount(): BehaviorSubject<number>{
    return this.cartService.cartItemsCount;
  } 

}
