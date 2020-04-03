import {Component, OnInit} from '@angular/core';
import {CrudService} from '../../services/crud.service';
import {ActivatedRoute, Router} from '@angular/router';
import {pluck, switchMap, tap} from 'rxjs/operators';
import {Car} from '../../interfaces/car.interface';
import {QueryParams} from '../../interfaces/query-params';
import { ToastrService } from 'ngx-toastr';
import { EventEmitter } from 'events';

// import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent {

  public cars: QueryParams[];
  public searchColor = '';

  //
// public cartChanged: EventEmitter<> = new EventEmitter<Car>()
  //

  constructor(
    private crudService: CrudService,
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
    this.crudService.addToCart({car, quantity: 1})
    this.toastrService.info('T-shirt successfully added to the cart', 'Add T-shirt to Cart', {
      timeOut: 2000
    })
  }

  addToCart(car: Car) {
    this.crudService.cartChanged.emit(car);
  }
// 

}
