import { Addsubmodulevalues } from '../submodules';
import { DataSubmodules } from '../submodules.service';
import { Component, OnInit } from '@angular/core';

import { Router  } from '@angular/router';
import { NotificationsComponent } from 'app/notifications/notifications.component';

@Component({
  selector: 'app-viewsubmodule',
  templateUrl: './viewsubmodule.component.html',
  providers: [NotificationsComponent]
})
export class ViewsubmoduleComponent implements OnInit {

  public data: any; 
  public rowsOnPage: number =10;
  public filterQuery: string = ""; 
  public sortBy: string = "";
  public sortOrder: string = "desc";

  
  constructor(private datamodelService: DataSubmodules, private router: Router, private notificationsComponent:NotificationsComponent) { }

  ngOnInit() {

    this.datamodelService.getviewModules().subscribe(data => {this.data = data},
      err => {
          console.log('Error Occured On getdomain()');
        });
  
  }

  
  delsubmodule(submid){
    let answer = confirm("Delete data?");
    if (answer) {
      this.datamodelService.delsubmodules(submid).subscribe(data => {
        if(data){
          this.notificationsComponent.addToast({title:'Success', msg:'Data Deleted Sucessfully..', timeout: 5000, theme:'default', position:'top-right',type:'success'});
          this.ngOnInit();
        }else{
          this.notificationsComponent.addToast({title:'Error', msg:'Data Not Deleted', timeout: 5000, theme:'default', position:'top-right',type:'error'});
        }
      },err => {
          console.log('Error Occured On getdomain()'+err);
      });
    }   
    
  }
 


}
