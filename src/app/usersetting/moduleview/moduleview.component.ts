import { Addmodule } from '../addmodule';
import { DataModules } from '../modules.service';
import { Component, OnInit } from '@angular/core';
import { Router  } from '@angular/router';
import { NotificationsComponent } from 'app/notifications/notifications.component';

@Component({
  selector: 'app-moduleview',
  templateUrl: './moduleview.component.html',
  providers: [NotificationsComponent]
 
})
export class ModuleviewComponent implements OnInit {
  public data: any; 
  public rowsOnPage: number =10;
  public filterQuery: string = ""; 
  public sortBy: string = "";
  public sortOrder: string = "desc";


  constructor(private datamodelService: DataModules , private router: Router,  private notificationsComponent:NotificationsComponent) { }


 ngOnInit(): void {
  this.datamodelService.getviewmodule().then(data => this.data = data);
  }

  delmodule(mid){
    let answer = confirm("Delete data?");
    if (answer) {
      this.datamodelService.delmodule(mid).then(data => {
        if(data){
          this.notificationsComponent.addToast({title:'Success', msg:'Data Deleted Sucessfully..', timeout: 5000, theme:'default', position:'top-right',type:'success'});
          this.ngOnInit();
        }else{
          this.notificationsComponent.addToast({title:'Error', msg:'Data Not Deleted', timeout: 5000, theme:'default', position:'top-right',type:'error'});
        }
      });
    }
   
  }
 
}
