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
          //Search only by second criteria index[0](in this case name)
          if(index == 1) {
            if(subCategory && subCategory.toString().toLowerCase().startsWith(filterQuery.toLowerCase()) == true) {
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
