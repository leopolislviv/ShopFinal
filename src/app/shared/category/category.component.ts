import {Component, OnInit} from '@angular/core';
import {CrudService} from '../../services/crud.service';
import {ActivatedRoute, Router} from '@angular/router';
import {pluck, switchMap, tap} from 'rxjs/operators';
import {TShirt} from '../../interfaces/car.interface';
import {QueryParams} from '../../interfaces/query-params';
import { ToastrService } from 'ngx-toastr';
import { EventEmitter } from 'events';
import { CartService } from 'src/app/services/cart.service';
import { AuthService } from 'src/app/services/auth.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent {

  public shirts: QueryParams[];
  public searchColor = '';
  public isLogined$: BehaviorSubject<boolean>;

  constructor(
    private crudService: CrudService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private router: Router,
    private toastrService: ToastrService,
    private authService: AuthService,
  ) 
  {
    this.route.queryParamMap
    .pipe(
      pluck('params'),
      switchMap((params: QueryParams) => this.crudService.getFilteredCars(params)),
    )
    .subscribe(
      (shirts: TShirt[]) => {
        this.shirts = shirts;
      },
    )

    this.isLogined$ = this.authService.isLogined$;
  }

  public redirectToCar(id: number): void {
    this.router.navigate(['shirt', id]);
  }

  addItemToCart(shirt: TShirt) {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!!user && !!user.email) {
      this.showSuccess()
      return this.cartService.add({shirt, quantity: 1});
    }

    this.router.navigate(['login']);
    return false;
    }

  addToCart(shirt: TShirt) {
    this.crudService.cartChanged.emit(shirt);
  }

  showSuccess() {
      const options = {
        "progressBar": true,
        "positionClass": "toast-bottom-center",
        "showDuration": "800",
        "hideDuration": "1000",
        "showEasing": "show",
        "hideEasing": "show",
        "showMethod": "show",
      };
    this.toastrService.success('T-shirt added to your cart!', 'Great!', options)
}
  
}

