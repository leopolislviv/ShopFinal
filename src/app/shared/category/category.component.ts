import {Component, OnInit} from '@angular/core';
import {CrudService} from '../../services/crud.service';
import {ActivatedRoute, Router} from '@angular/router';
import {pluck, switchMap, tap} from 'rxjs/operators';
import {Car} from '../../interfaces/car.interface';
import {QueryParams} from '../../interfaces/query-params';
import { ToastrService } from 'ngx-toastr';
import { EventEmitter } from 'events';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent {

  public cars: QueryParams[];
  public searchColor = '';

  constructor(
    private crudService: CrudService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private router: Router,
    private toastrService: ToastrService,
  ) 
  {
    this.route.queryParamMap
    .pipe(
      pluck('params'),
      switchMap((params: QueryParams) => this.crudService.getFilteredCars(params)),
    )
    .subscribe(
      (cars: Car[]) => {
        this.cars = cars;
      },
    )
  }

  public redirectToCar(id: number): void {
    this.router.navigate(['car', id]);
  }


// 
  addItemToCart(car: Car) {
    this.cartService.add({car, quantity: 1})
    // alert('T-shirt successfully added to cart')
  }

  addToCart(car: Car) {
    this.crudService.cartChanged.emit(car);
    this.toastrService.show('T-shirt successfully added to the cart', 'Add T-shirt to Cart')
  }

  toastrMessage() {
    this.toastrService.warning('T-shirt successfully added to the cart', 'Add T-shirt to Cart', {timeOut: 2000})
  }

// 

}
