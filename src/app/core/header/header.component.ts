import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {BehaviorSubject} from 'rxjs';
import {Router} from '@angular/router';
import {User} from '../../interfaces/user';
import { ICart } from 'src/app/interfaces/car.interface';
import { CartService } from 'src/app/services/cart.service';

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
  public cartList: ICart[];
  public hideMatBadge: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    private cartService: CartService,
  ) {
    this.toggleSideNav = new EventEmitter<void>();
    this.isLogined$ = this.authService.isLogined$;
    this.user$ = this.authService.user$;
    this.hideMatBadge = false;
    // this.loadCart()
  }

  public logOut(): void {
    this.authService.logOut();
    this.router.navigate(['']);
    this.hideMatBadge = true;
  }

  public get cartItemsCount(): BehaviorSubject<number>{
    return this.cartService.cartItemsCount;
  } 

}
