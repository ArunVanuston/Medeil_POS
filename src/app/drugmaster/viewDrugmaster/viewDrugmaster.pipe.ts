import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'category' })
export class CategoryPipe implements PipeTransform {

  transform(categories: any, searchText: any, indx: any): any {


    if (searchText == null || searchText == '') {
      return categories;
    }
    else {
      let filteredCategories = [];
      categories.filter(function (category) {

        category.filter(function (subCategory, index) {
          //Search only by second criteria index[0](in this case name)
          //console.log(subCategory);
          if (index == indx) {
            if (subCategory && subCategory.toString().toLowerCase().startsWith(searchText.toLowerCase()) == true) {
              if (filteredCategories.indexOf(subCategory) == -1) {
                filteredCategories.push(category);
              }
            }
          }

        });
      });
      return filteredCategories;
    }
  }


}

