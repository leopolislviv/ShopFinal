import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {filter, map } from 'rxjs/operators';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Car} from '../interfaces/car.interface';
import {QueryParams} from '../interfaces/query-params';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  private readonly URL: string = environment.apiUrl;
  
  constructor(private http: HttpClient) {}

  public get cars(): Observable<Car[]> {
    return this.http.get(`${this.URL}/cars`).pipe(
      map((cars: Car[]) => cars),
    );
  }

  public getCarById(id: string): Observable<Car> {
    return this.http.get(`${this.URL}/cars/${id}`).pipe(
      filter(Boolean),
      map((car: Car) => car),
    );
  }


  public get navList(): Observable<string[]> {
    return this.http.get(`${this.URL}/cars`)
      .pipe(
        map((cars: Car[]) => cars.map((car: Car) => car.brand)),
        map((brands: string[]) => [...new Set(brands)]),
        map((brands: string[]) => brands.sort((a: string, b: string) => a > b ? 1 : -1)),
      );
  }


  public getFilteredCars(params: QueryParams): Observable<Car[]> {
    return this.http.get(`${this.URL}/cars`)
      .pipe(
        map((cars: Car[]) => {
          if (params.hasOwnProperty('available')) {
            return cars.filter((car: Car) => params.available ? car.available : !car.available);
          }

          if (params.hasOwnProperty('brand')) {
            return cars.filter((car: Car) => car.brand === params.brand);
          }

          

          return cars;
        }) 
      )
  }

  // public getAllTshirts(): Observable<Car[]> {
  //   return this.http.get(`${this.URL}/cars`)
  //     .pipe(
  //       map((cars: Car[]) => cars
  //       )
  //     )
     
  // }
  


  public modifyCar(car: Car): void {
    this.http.put(`${this.URL}/cars/${car.id}`, car)
      .subscribe((res) => console.log(res));
  }


}
