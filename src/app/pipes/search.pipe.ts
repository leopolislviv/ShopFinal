import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(cars, value): any {
    if(!cars) return [];
    return cars.filter(car => {
      let search = '';
      for(let key in car) {
        search += car[key]
      }
      // console.log(search)
      return search.toLowerCase().includes(value.toLowerCase())
    });
  }

}
