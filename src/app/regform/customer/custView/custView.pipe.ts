import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'dataFilter' })

export class FilterPipe implements PipeTransform {
  transform(items: any[], filterQuery: string, filterQuery1: string): any {
      return items.filter(item => item[5].toLowerCase().indexOf(filterQuery) !== -1);   //singlesearch
      // return items.filter(item =>{
      //   if (filterQuery && item[5].toLowerCase().indexOf(filterQuery.toLowerCase()) === -1){
      //       return false;
      //   }
      //   if (filterQuery1 && item[18].toLowerCase().indexOf(filterQuery1.toLowerCase()) === -1){
      //       return false;
      //   }
      //   return true;
      // })
    //   if (items && items.length){
       
    // }
    // else{
    //     return items;
    // }
  }
}

// export class CategoryPipe implements PipeTransform {
//   debugger;
//   transform(categories: any, filterQuery: any): any {
//     if(filterQuery == null || filterQuery == '') {
//       return categories;
//     } else { 
//       let filteredCategories = [];
//       categories.filter(function(dataFilter){
//         dataFilter.filter(function(subCategory, index) {
//           //Search only by second criteria index[0](in this case name)
//           if(index == 5) {
//             if(subCategory && subCategory.toString().toLowerCase().startsWith(filterQuery.toLowerCase()) == true) {
//               if(filteredCategories.indexOf(subCategory) == -1) {
//                 filteredCategories.push(dataFilter);
//               }
//             }
//           }
//         }); 
//       });
//       return filteredCategories;
//     }
//   }
// }


