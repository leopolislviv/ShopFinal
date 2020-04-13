import {Component} from '@angular/core';
import {TShirt} from '../../interfaces/car.interface';
import {ActivatedRoute, Router} from '@angular/router';
import {pluck, switchMap} from 'rxjs/operators';
import {CrudService} from '../../services/crud.service';
import { CartService } from 'src/app/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.scss']
})
export class CarComponent {

  shirt: TShirt;


  constructor(
    private route: ActivatedRoute,
    private crudService: CrudService,
    private cartService: CartService,
    private toastrService: ToastrService,
    private router: Router,
  ) {
    this.route.paramMap
      .pipe(
        pluck('params', 'id'),
        switchMap((id: string) => this.crudService.getCarById(id)),
      )
      .subscribe(
        (shirt: TShirt) => this.shirt = shirt,
  );
  
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
};
  
}
