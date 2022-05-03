import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'dataFilter' })
export class CategoryPipe implements PipeTransform {
  transform(categories: any, filterQuery: any): any {
    if(filterQuery == null || filterQuery == '') {
      return categories;
    } else { 
      let filteredCategories = [];
      categories.filter(function(dataFilter){
        dataFilter.filter(function(subCategory, index) {          
          if(index == 1 || index == 2) {
            if(subCategory.toString().toLowerCase().startsWith(filterQuery.toLowerCase()) == true) {
              if(filteredCategories.indexOf(subCategory) == -1) {
                filteredCategories.push(dataFilter);
              }
            }
          }
        });
      });
      return filteredCategories;
    }
  }
}
