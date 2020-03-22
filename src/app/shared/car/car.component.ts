import {Component} from '@angular/core';
import {Car} from '../../interfaces/car.interface';
import {ActivatedRoute} from '@angular/router';
import {pluck, switchMap} from 'rxjs/operators';
import {CrudService} from '../../services/crud.service';

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
}
