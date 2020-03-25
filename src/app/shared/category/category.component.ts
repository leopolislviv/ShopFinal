import {Component, OnInit} from '@angular/core';
import {CrudService} from '../../services/crud.service';
import {ActivatedRoute, Router} from '@angular/router';
import {pluck, switchMap} from 'rxjs/operators';
import {Car} from '../../interfaces/car.interface';

import {PageEvent} from '@angular/material';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent {

  public cars: Car[];

   // MatPaginator Inputs
  //  length = 1000;
  //  pageSize = 10;
  //  pageSizeOptions: number[] = [5, 10, 25];
 
   // MatPaginator Output
  //  pageEvent: PageEvent;
  //  datasource = [];
  //  activePageDataChunk = []

  constructor(
    private crudService: CrudService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.route.paramMap
      .pipe(
        pluck('params', 'cat'),
        switchMap((param) => this.crudService.getFilteredCars(param, param)),
        //switchMap((param) => this.crudService.getFilteredGenderMale(param)),
      )
      .subscribe(
        (cars: Car[]) =>  this.cars = cars,
      );

      // this.activePageDataChunk = this.datasource.slice(0,this.pageSize);

  }



  // setPageSizeOptions(setPageSizeOptionsInput: string) {
  //   this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  // }

  // onPageChanged(e) {
  //   let firstCut = e.pageIndex * e.pageSize;
  //   let secondCut = firstCut + e.pageSize;
  //   this.activePageDataChunk = this.datasource.slice(firstCut, secondCut);
  // }




  public redirectToCar(id: number): void {
    this.router.navigate(['car', id]);
  }
}
