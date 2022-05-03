import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NotificationsComponent } from '../../notifications/notifications.component';
@Component({
  selector: 'app-addusermodules',
  templateUrl: './addusermodules.component.html',
  styleUrls: ['./addusermodules.component.css'],
  providers: [NotificationsComponent]
})
export class AddusermodulesComponent implements OnInit {
  alertmsgs:any;
  usermoduleForm: FormGroup;
  submoduleData = [];
  i;
  companylist = [];
  usermodulelist = [];
 
  userlist: any;
  mulSettings={};
  mulList = [];
  public flag: boolean = false;
  mulservList=[];
  submulList=[];
  submulservList=[];
  selectedItems=[];
  selectedItems1=[];
  g: number;
  constructor(private formBuilder: FormBuilder,private moduleService: UsersService, private notificationsComponent: NotificationsComponent, private router: Router) {
  //   const suserrefid = new FormControl();
  //   const moduleid = new FormControl();
  //   const submoduleid = new FormControl();
  //   const companyrefid = new FormControl();

  //   let is_approver = new FormControl();

  //   this.usermoduleForm = new FormGroup({
  //     companyrefid: companyrefid,
  //     is_approver: is_approver,
  //     suserrefid: suserrefid,
  //     moduleid: moduleid,
  //     submoduleid: submoduleid,
  //   });


this.usermoduleForm = this.formBuilder.group({

      companyrefid:  ['', []],
      is_approver:  ['', []],
      suserrefid:  ['', []],
      moduleid:  ['', []],
      submoduleid:  ['', []]
});

}

  ngOnInit() {

  
    this.mulSettings = {
      maxHeight: 200,
      singleSelection: false,
      text: "Select Types",
      badgeShowLimit: 1,
      classes: "myclass custom-class"
    };
    
    //DROP DOWN PLACE HOLDER
    this.usermoduleForm.get('companyrefid').setValue('opt1');
   // this.usermoduleForm.get('suserrefid').setValue('opt1');
    this.moduleService.getCompanylist().then(data => { this.companylist = data });
    this.usermoduleForm.get('is_approver').setValue(false);

    setTimeout(() => {
      let language='en';
      language=localStorage.getItem('language');
      this.moduleService.GetAlerts(language).subscribe(data => this.alertmsgs = data,
        errorCode => console.log(errorCode));
    }, 1800);

  }

  getUser() {
    this.moduleService.getUserlist(this.usermoduleForm.get('companyrefid').value).then(data => {
      this.userlist = data;
      if (data == null || data == '') {
        this.notificationsComponent.addToast({ title: 'Error Message', msg: this.alertmsgs.users.usernotavailable, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      }
    });
  }

 
  getUsermodule() {
    this.mulList = [];
    this.moduleService.getModule(this.usermoduleForm.get('suserrefid').value).subscribe(data => { this.getsetmodule(data); },
      err => {
        console.log('Error Occured On getModule()');
      });
      
  }

  

  getsetmodule(data : any) {
   
    for (this.i = 0; this.i < data.length; this.i++) {
      this.mulList.push({ id: data[this.i][0], itemName: data[this.i][1] });
      
    }

  }


  sess :any
  getuserSubmodule() {
     
    this.submulList=[];
   
    this.sess = this.usermoduleForm.get('moduleid').value;
    if (this.sess != "") {
    
      for (this.g = 0; this.g < this.sess.length; this.g++) {
        

    this.moduleService.getSubmodule(this.sess[this.g].id, this.usermoduleForm.get('suserrefid').value).then(data => { this.getsetsubmodule(data); },
       
          error => {
            console.log("Error Occured from getPurcSessiontable()");
          });

      }
    
     
    } else {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: this.alertmsgs.users.selectmodule, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    }

  
  }

  getsetsubmodule(data : any){
  
    for (this.i = 0; this.i < data.length; this.i++) {
      this.submulList.push({ id: data[this.i][0], itemName: data[this.i][1],moduleid:data[this.i][2] });
    }
    
  }

  moduleData=[];
  moduleidvalue=[];
  onSubmit() {
    this.flag = this.validation();
    if (this.flag == true) {
     let userid=this.usermoduleForm.get('suserrefid').value;
     let moduleid=this.usermoduleForm.get('moduleid').value;
     let approve= this.usermoduleForm.get('is_approver').value;
     let companyid=this.usermoduleForm.get('companyrefid').value
     
      for (this.i = 0; this.i < moduleid.length; this.i++) {
        this.moduleData.push({ suserrefid: userid, moduleid: moduleid[this.i].id,  is_approver: approve, companyrefid: companyid });
      }
    
     this.moduleService.addModule(this.moduleData).subscribe(data => {
        if (data == true) {
          this.saveSumnoduleData();
        }
      }, err => {
        console.log('Error Occured On addModule()')
      });

    }
  }
  

  saveSumnoduleData() {
    let sModuleID: any = this.usermoduleForm.get("submoduleid").value;
    let userid: any = this.usermoduleForm.get("suserrefid").value;
   // let newmoduleid: any = this.usermoduleForm.get("moduleid").value;
    let approver: any = this.usermoduleForm.get("is_approver").value;
    for (this.i = 0; this.i < sModuleID.length; this.i++) {
   //   alert("pattern"+newmoduleid[this.i].id);
      this.submoduleData.push({ suserrefid: userid, submoduleid: sModuleID[this.i].id, moduleid: sModuleID[this.i].moduleid,  is_approver: approver, companyrefid: this.usermoduleForm.get('companyrefid').value });
    }
    this.moduleService.addSubmodule(JSON.stringify(this.submoduleData)).subscribe(data => {
      if (data == true) {
        this.notificationsComponent.addToast({ title: 'Sucess Message', msg: this.alertmsgs.common.datasavedsuccessfully, timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
        this.submulList = [];
        this.mulList = [];
        this.userlist = [];
        this.usermoduleForm.reset();
        this.submoduleData = [];
        this.ngOnInit();
      }
    }, err => {
      console.log('Error Occured On addSubmodule()')
    });
  }


  validation(): boolean {
    if (this.usermoduleForm.get('companyrefid').value == 'opt1' || this.usermoduleForm.get('companyrefid').value == null) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: this.alertmsgs.users.pleaseselectyourcompany, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.usermoduleForm.get('suserrefid').value == 'opt1' || this.usermoduleForm.get('suserrefid').value == null) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: this.alertmsgs.users.pleaseselectyourusername, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.usermoduleForm.get('moduleid').value == null || this.usermoduleForm.get('moduleid').value == " ") {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: this.alertmsgs.users.pleaseselectyourmodule, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.usermoduleForm.get('submoduleid').value == null || this.usermoduleForm.get('submoduleid').value == '') {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: this.alertmsgs.users.pleaseselectyoursubmodule, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    return true;
  }

  viewUserModule() {
    this.router.navigate(['User/userviewmodule']);
  }


  isCheck(event: any) {

    if (event) {

      this.usermoduleForm.get('is_approver').setValue(event);

    }
    else {

      this.usermoduleForm.get('is_approver').setValue(event);

    }
  }
}