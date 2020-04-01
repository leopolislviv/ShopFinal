import {Component, OnInit} from '@angular/core';
import {CrudService} from '../../services/crud.service';
import {ActivatedRoute, Router} from '@angular/router';
import {pluck, switchMap, tap} from 'rxjs/operators';
import {Car} from '../../interfaces/car.interface';
import {QueryParams} from '../../interfaces/query-params';

// import {PageEvent} from '@angular/material';
// import { Observable } from 'rxjs';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent {

  public cars: QueryParams[];
  // public cars$: Observable<Car[]>

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
//   {
//     this.cars$=this.route.queryParams
//       .pipe(
//         tap(p=>console.log(p)),
//         pluck('params', 'cat'),
//         switchMap((param: string) => {
//           if(param==='all') {
//             return this.crudService.getAllTshirts()
//           }
//           return this.crudService.getFilteredCars(param)
//         }
//         ),
//       )
//       // .subscribe(
//       //   (cars: Car[]) =>  this.cars = cars,
//       // );
// // console.log('category')
//       // this.activePageDataChunk = this.datasource.slice(0,this.pageSize);

//   }
  public redirectToCar(id: number): void {
    this.router.navigate(['car', id]);
  }
}
