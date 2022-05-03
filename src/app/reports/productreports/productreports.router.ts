import {Routes} from '@angular/router';
import { ColdstorageprodlistComponent } from './coldstorageprodlist/coldstorageprodlist.component';
import { HazardousprodlistComponent } from './hazardousprodlist/hazardousprodlist.component';
import { NarcoticdruglistComponent } from './narcoticdruglist/narcoticdruglist.component';
import { SubgroupbaseddruglistComponent } from './subgroupbaseddruglist/subgroupbaseddruglist.component';


export const ProductsreportRoutes: Routes = [



  {
    path: '',


    children: [
     {
        path: 'ColdStorageProducts',

        component: ColdstorageprodlistComponent,
        data: {
          breadcrumb: 'Cold Storage Products'
        } 

      } ,
      {
        path: 'HazardousProducts',

        component: HazardousprodlistComponent,
        data: {
          breadcrumb: 'Hazardous Products'
        } 

      } ,
      {
        path: 'NarcoticDrugList',

        component: NarcoticdruglistComponent,
        data: {
          breadcrumb: 'Narcotic Drug List'
        } 

      } ,
      {
        path: 'SubgroupProduct',

        component: SubgroupbaseddruglistComponent,
        data: {
          breadcrumb: 'Vertical Based Product Reports'
        } 

      } 




    ]
  }
];


