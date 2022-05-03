import { Component, OnInit } from '@angular/core';
import { RoleService } from '../role.service';
import { Router } from '@angular/router';
import { NotificationsComponent } from 'app/notifications/notifications.component';
import { TranslateService } from 'ng2-translate';
declare var webkitSpeechRecognition:any;
@Component({
  selector: 'app-viewrole',
  templateUrl: './viewrole.component.html'
})
export class ViewroleComponent implements OnInit {
  parentMessage="sales"
  public data = [];
  datacopy=[];
  totalRec: number;
  page: number = 1;
  rowsOnPage: number = 10;
  sendpage: number;
  modulelist=[];
  submodulelist=[];

  constructor(public translate: TranslateService,private rollService: RoleService, private router: Router,private notificationsComponent: NotificationsComponent) { translate.setDefaultLang('en');}


  ngOnInit(): void {
    this.translate.use(localStorage.getItem('language'));
    this.sendpage = this.page - 1; 

    this.rollService.getRole(sessionStorage.getItem('indvuserid')).subscribe(data => {this.data = data;this.datacopy=data;
      },err => { console.log('Error Occured On getRole()') });
  }

  view(): void {
    this.router.navigate(['Role/AddRole'], { skipLocationChange: true });
  }

  AssignRoleModules(id: any,indx:any) {
    this.router.navigate(['Role/assingModule', id, indx], { skipLocationChange: true });
  }

  showmodules:boolean;
  editionid:any;
  selroleid:any;
  GetRoleModules(roleid:any,rindex:any){
    this.showmodules=true;
    this.selroleid=roleid;
    this.rollService.getSelectedModuleList(roleid).then(data => { this.modulelist=data });
    this.rollService.getRoleEditionID(roleid,rindex).subscribe(data => { 
      this.editionid=data[0][0];
    }, err => { console.log('Error Occured On getRoleName()')});

  }

  addRole() {
    this.router.navigate(['Role/AddRole']);
  }

  StatusChange(roleid,statusid){
    var answer = confirm("Change Status?");
    if (answer) {
      this.rollService.RoleStatusChange(roleid,statusid).subscribe(data => {
        if(data){
          this.notificationsComponent.addToast({ title: 'Success Message', msg: 'Status Changed SuccessFully', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
          this.ngOnInit();
        }else{
          this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Status not Changed', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
        }
      }, err => { console.log('Error Occured On getRoleName()')});
  
    }
  }

  DeleteRoleModules(mid){
    this.rollService.DeleteRoleModules(this.editionid,this.selroleid,mid).subscribe(data => { 
      if(data){
        this.notificationsComponent.addToast({ title: 'Success Message', msg: 'Module Succesfully Deleted', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
        this.showmodules=false;
      }else{
        this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Module not Delete', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      }
    }, err => { console.log('Error Occured On getRoleName()')});

  }

  //search customers
  searchroles(event:any){
    if(event.length>0){
      //===0  starts with
      let srch = Object.assign([], this.datacopy).filter(
      item => ((item[4].toLowerCase()).indexOf(event.toLowerCase()) !== -1 || (item[3].toLowerCase()).indexOf(event.toLowerCase()) !== -1));
      this.data=srch;
    }else{
      this.data=this.datacopy;
    }
  }

}
