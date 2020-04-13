import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(shirts, value): any {
    if(!shirts) return [];
    return shirts.filter(shirt => {
      let search = '';
      for(let key in shirt) {
        search += shirt[key]
      }
      // console.log(search)
      return search.toLowerCase().includes(value.toLowerCase())
    });
  }

}
