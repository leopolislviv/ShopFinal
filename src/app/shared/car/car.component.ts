import {Component} from '@angular/core';
import {Car} from '../../interfaces/car.interface';
import {ActivatedRoute} from '@angular/router';
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
  this.cartService.add({car, quantity: 1})
  this.toastrService.info('T-shirt successfully added to the cart', 'Add T-shirt to Cart', {
    timeOut: 2000
  })
}

addToCart(car: Car) {
  this.crudService.cartChanged.emit(car);
}

  
}
