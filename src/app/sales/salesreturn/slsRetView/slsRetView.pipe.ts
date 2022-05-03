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
            if(subCategory.toString().toLowerCase().indexOf(filterQuery.toLowerCase()) != -1) {
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

  // transform(items: any[], filterQuery: string): any[] {
  //   if(!items) return [];

  //   if(!filterQuery) return items;

  //   return this.searchItems(items, filterQuery.toLowerCase());
  //  }

  //  private searchItems(items :any[], filterQuery): any[] {
  //    let results = [];
  //     items.forEach(it => {
  //       if (it.returnno.toLowerCase().includes(filterQuery)) {
  //           results.push(it);
  //       } else {
  //         let searchResults =  this.searchItems(it.items_containers, filterQuery);
  //         if (searchResults.length > 0) {
  //             results.push({
  //               title: it.returnno,
  //               items_containers: searchResults
  //             });
  //         }
  //       }
  //     });
  //     return results;
  //  }
  
}
