import {Component, OnInit} from '@angular/core';
import {CrudService} from '../../services/crud.service';
import {ActivatedRoute, Router} from '@angular/router';
import {pluck, switchMap, tap} from 'rxjs/operators';
import {Car} from '../../interfaces/car.interface';
import {QueryParams} from '../../interfaces/query-params';

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
    private route: ActivatedRoute,
    private router: Router,
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
}
