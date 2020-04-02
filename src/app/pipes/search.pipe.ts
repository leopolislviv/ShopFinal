import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(cars, value): any {
    return cars.filter(car => {
      return car.color.includes(value)
    });
  }

}
