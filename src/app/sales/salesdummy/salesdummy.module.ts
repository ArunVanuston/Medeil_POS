import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';





import {SharedModule} from '../../shared/shared.module';
import { salesdummyRoutes } from './salesdummy.routing';



import { sdummySaveComponent } from './sdummySave/sdummySave.component'  ;

import { sdummyEditComponent } from './sdummyEdit/sdummyEdit.component'  ;


import { sdummyViewComponent } from './sdummyView/sdummyView.component'  ;


   import { CategoryPipe } from   './sdummyView/sdummyView.pipe'; 

import { ImageViewerModule } from "ngx-image-viewer";




import { DxDataGridModule,
  DxSparklineModule,
  DxTemplateModule } from 'devextreme-angular';


@NgModule({
  imports: [
    CommonModule,


    ImageViewerModule.forRoot({
      btnClass: 'default', // The CSS class(es) that will apply to the buttons
      zoomFactor: 0.1, // The amount that the scale will be increased by
      containerBackgroundColor: 'transparent', // The color to use for the background. This can provided in hex, or rgb(a).
      wheelZoom: false , // If true, the mouse wheel can be used to zoom in
      allowFullscreen: true, // If true, the fullscreen button will be shown, allowing the user to entr fullscreen mode
      allowKeyboardNavigation: true, // If true, the left / right arrow keys can be used for navigation
      btnIcons: { // The icon classes that will apply to the buttons. By default, font-awesome is used.
        zoomIn: 'fa fa-plus',
        zoomOut: 'fa fa-minus',
        rotateClockwise: 'fa fa-repeat',
        rotateCounterClockwise: 'fa fa-undo',
        next: 'fa fa-arrow-right',
        prev: 'fa fa-arrow-left',
        fullscreen: 'fa fa-arrows-alt',
      },
      btnShow: {
        zoomIn: true,
        zoomOut: true,
        rotateClockwise: true,
        rotateCounterClockwise: true,
        next: true,
        prev: true
      }
    })
 
    ,
    
    DxDataGridModule,
    DxTemplateModule,
    DxSparklineModule,

    
    RouterModule.forChild(salesdummyRoutes),
   SharedModule
  ],
  declarations: [ sdummySaveComponent  , sdummyEditComponent  ,  sdummyViewComponent ,CategoryPipe]
})

export class salesdummyModule {}
