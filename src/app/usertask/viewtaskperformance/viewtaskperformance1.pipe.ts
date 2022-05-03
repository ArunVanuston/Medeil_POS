import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'dataFilter1' })
export class viewIndividualTasksPipe1 implements PipeTransform {
  transform(categories: any, filterQuery1: any): any {
    if (filterQuery1 == null || filterQuery1 == '') {
      return categories;
    } else {
      let filteredCategories = [];
      categories.filter(function (dataFilter) {
        dataFilter.filter(function (subCategory, index) {
          //Search only by second criteria index[0](in this case name)
          if (index == 2) {
            if (subCategory.toString().toLowerCase().indexOf(filterQuery1.toLowerCase()) != -1) {
              if (filteredCategories.indexOf(subCategory) == -1) {
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
