import {Routes} from '@angular/router';
import {drugpicturesComponent} from "./drugPictures.component";

export const drugpicRoutes: Routes = [{
  path: '',
  component: drugpicturesComponent,
  data: {
    breadcrumb: "Drud Picture"   
  }
}];



