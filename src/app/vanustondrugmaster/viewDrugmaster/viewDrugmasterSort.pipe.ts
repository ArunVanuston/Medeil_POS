import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'dataSort' })

export class SortPipe implements PipeTransform {
  // transform(array: Array<string>, args: string): Array<string> {
  //   array.sort((a: any, b: any) => {
  //     if (a < b) {
  //       return -1;
  //     } else if (a > b) {
  //       return 1;
  //     } else {
  //       return 0;
  //     }
  //   });
  //   return array;
  // }
  transform(items: any[]): any {
      //return items.filter(item => item[1].toLowerCase().indexOf(filterQuery) !== -1);   //singlesearch
      items.sort(function(a, b) {
        var nameA = a[1].toLowerCase(); // ignore upper and lowercase
        var nameB = b[1].toLowerCase(); // ignore upper and lowercase
        return nameA>nameB?1:nameB>nameA?-1:0;
      });
  }

  transform1(items: any[]): any {
    alert(items);
    //return items.filter(item => item[1].toLowerCase().indexOf(filterQuery) !== -1);   //singlesearch
    items.sort(function(a, b) {
      var nameA = a[1].toLowerCase(); // ignore upper and lowercase
      var nameB = b[1].toLowerCase(); // ignore upper and lowercase
      return nameA>nameB?-1:nameB>nameA?1:0;
    });
  }
}



