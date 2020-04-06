import {Component} from '@angular/core';
import {Car} from '../../interfaces/car.interface';
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

  car: Car;


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
        (car: Car) => this.car = car,
  );
  
  }

addItemToCart(car: Car) {
  const user = JSON.parse(localStorage.getItem('user'));
    if (!!user && !!user.email) {
      return this.cartService.add({car, quantity: 1});
    }

    this.router.navigate(['login']);
    return false;
}

addToCart(car: Car) {
  this.crudService.cartChanged.emit(car);
}

  
}
