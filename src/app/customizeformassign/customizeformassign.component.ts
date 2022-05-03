import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EditionService } from 'app/edition/edition.service';
import { NotificationsComponent } from 'app/notifications/notifications.component';
import { CustomizeformassignService } from './customizeformassign.service';

@Component({
  selector: 'app-customizeformassign',
  templateUrl: './customizeformassign.component.html',
  providers:[NotificationsComponent,CustomizeformassignService,EditionService]
})
export class CustomizeformassignComponent implements OnInit {
  customizeForm:FormGroup;
  customerlist=[];
  saveprocess:boolean=false;
  constructor(private fb: FormBuilder,private notificationsComponent: NotificationsComponent, private routers: Router,
    private customservice: CustomizeformassignService,private editionService: EditionService) { }

  ngOnInit() {
    this.customizeForm = this.fb.group({
      customerrefid:['',[]],
      editionid:['',[]],
      roleid:['',[]],
      lableallcheck:[false,[]],
      moduleallcheck:[false,[]],
      submoduleallcheck:[false,[]],
      lablearray: this.fb.array([]),
      modulearray: this.fb.array([]),
      submodulearray: this.fb.array([]),
    });

    this.customservice.getcustomers().subscribe(data=>{this.pushallcustomers(data);
    },err=>{console.log(err);});
    const control1 = <FormArray>this.customizeForm.controls['lablearray'];
    const control2 = <FormArray>this.customizeForm.controls['modulearray'];
    const control3 = <FormArray>this.customizeForm.controls['submodulearray'];
    control1.controls=[]; control2.controls=[]; control3.controls=[]; this.labelnames=[]; this.modulenames=[];
  }

  pushallcustomers(data) {
    this.customerlist = [];
    for (let i = 0; i < data.length; i++) {
      this.customerlist.push({ value: data[i].suserrefid, label:data[i].customername+' - '+data[i].username+' - '+data[i].phoneno,  
      editionid:data[i].editionrefid, roleid:data[i].rolerefid, planid:data[i].planid, verticalid:data[i].verticalid});
    }
  }

  getcustomizelabel(){
    let customerid=this.customizeForm.get('customerrefid').value;
    let subindx= this.customerlist.findIndex(p => p.value==customerid);
    this.customizeForm.get('editionid').setValue(this.customerlist[subindx].editionid);
    this.customizeForm.get('roleid').setValue(this.customerlist[subindx].roleid);
    this.labelnames=[]; this.modulenames=[];
    const control1 = <FormArray>this.customizeForm.controls['lablearray'];
    const control2 = <FormArray>this.customizeForm.controls['modulearray'];
    const control3 = <FormArray>this.customizeForm.controls['submodulearray'];
    control1.controls=[]; control2.controls=[]; control3.controls=[]; 
    setTimeout(() => {
      this.customservice.getcustomizelabels().subscribe(data=>{this.setLableList(data);
      },err=>{console.log(err);});  
    }, 500);
  }

  setLableList(data){
    const control = <FormArray>this.customizeForm.controls['lablearray'];
    control.controls=[];
    for (let i = 0; i < data.length; i++) {
      control.insert(0, this.fb.group({
        lablecheck:[false,[]],
        lablename: [data[i], []],
      }));
    }
  }

  /** Get MODULE Info**/
  labelnames=[];
  modulenames=[];
  loadModules(lindex){
    const control1 = <FormArray>this.customizeForm.controls['modulearray'];
    const control2 = <FormArray>this.customizeForm.controls['submodulearray'];
    control1.controls=[]; control2.controls=[]; this.labelnames=[]; this.modulenames=[];
    this.customizeForm.get('moduleallcheck').setValue(false);this.customizeForm.get('submoduleallcheck').setValue(false);
    const control = <FormArray>this.customizeForm.controls['lablearray'];
    control.value[lindex].lablecheck=!control.value[lindex].lablecheck;
    let lablevalue=control.value;
      for(let i=0; i< control.length; i++){
        if(lablevalue[i].lablecheck){
          this.editionService.getModulelist(this.customizeForm.get('editionid').value,lablevalue[i].lablename).subscribe(data => { this.setModuleList(data); },
          error => {
            console.log('Error Occured On getsubModulelist()')
          });
        }else{
          this.customizeForm.get('lableallcheck').setValue(false);
        }
      }
  }


  setModuleList(data: any) {
    const control = <FormArray>this.customizeForm.controls['modulearray'];
    for (let i = 0; i < data.length; i++) {
      control.push(this.fb.group({
        modulecheck:[false,[]],
        moduleid:[data[i][0],[]],
        modulename: [data[i][1], []],
      }));
      if(i==0){
        this.labelnames.push({ lindex:1, lname: data[0][2] });
        }else{
        this.labelnames.push({ lindex:0, lname: data[0][2] });
      } 
    }
  }

  //Get Submodules Info
  loadsubmodules(moduleindex){
    const control1 = <FormArray>this.customizeForm.controls['submodulearray'];
    control1.controls=[]; this.modulenames=[]; this.customizeForm.get('submoduleallcheck').setValue(false);
    const control = <FormArray>this.customizeForm.controls['modulearray'];
    control.value[moduleindex].modulecheck=!control.value[moduleindex].modulecheck;
    let modulevalue=control.value;
    for(let i=0; i< control.length; i++){
      if(modulevalue[i].modulecheck==true){
        this.editionService.getsubModulelist(this.customizeForm.get('editionid').value,modulevalue[i].moduleid).subscribe(data => { 
          this.setsubModuleList(data) },error => { console.log('Error Occured On getsubModulelist()')
          });
      }else{
        this.customizeForm.get('moduleallcheck').setValue(false);
      }
    }
  }


  setsubModuleList(data: any) {
    const control = <FormArray>this.customizeForm.controls['submodulearray'];
    for (let i = 0; i < data.length; i++) {
      control.push(this.fb.group({
        submodulecheck:[false,[]],
        submoduleid:[data[i][0],[]],
        submodulename: [data[i][1],[]],
        moduleid:[data[i][2],[]],
        disablevalue:[1,[]]
      }));
      if(i==0){
        this.modulenames.push({ mindex:1, mname: data[0][3] });
        }else{
          this.modulenames.push({ mindex:0, mname: data[0][3] });
      } 
    }
  }

  finallists=[];
  checkedsubmodules=[];
  savemodules(){
    // this.sendlists=[];
    this.checkedsubmodules=[];
    this.finallists=[];
    const control = <FormArray>this.customizeForm.controls['submodulearray'];
    let submodulevalues= control.value;
    let eID = this.customizeForm.get("editionid").value;
    let rID = this.customizeForm.get("roleid").value;
    let sID = this.customizeForm.get("customerrefid").value;
    if(control.length>0){
      for (let i = 0; i < control.length; i++) {
        if(submodulevalues[i].submodulecheck==true){
              this.checkedsubmodules.push({moduleid:submodulevalues[i].moduleid,submoduleid:submodulevalues[i].submoduleid,
                submodulename:submodulevalues[i].submodulename,editionid:eID,roleid:rID,suserid:sID});
          //this.finallists.push({submoduleid:array3[m],moduleid:moduleid,editionid:eID,roleid:this.roleid})
        }
      }
      if(this.checkedsubmodules.length>0){
        this.customservice.SaveCustomizeForms(JSON.stringify(this.checkedsubmodules)).subscribe(data => {
          if(data){
            this.saveprocess=false;
            this.notificationsComponent.addToast({ title: 'Sucess Message', msg: 'Module Assign Sucessfully..', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
            setTimeout(() => {  this.ngOnInit(); },1300);  
          }
          else{
            this.saveprocess=false;
            this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Module not Assigned', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
          }
        },err => {
          this.saveprocess=false;
          let splitmsg=err._body.split("[");
          if(splitmsg[2].split("]")[0]=='userrefid,submoduleid,moduleid'){
          this.notificationsComponent.addToast({ title: 'Alert Message', msg: 'Module already Assigned', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
          setTimeout(() => {  this.ngOnInit(); },1300);   
          }else{
            this.saveprocess=false;
            this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Module not Assigned', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
            //setTimeout(() => { this.router.navigate(['/Role/ViewRole']) },1000);
          }
        });   
        
        }else{
          this.notificationsComponent.addToast({ title: 'Alert Message', msg: 'Submodules not Selected', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
        }
      
      }else{
        this.notificationsComponent.addToast({ title: 'Alert Message', msg: 'Submodules not Listed', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
      }
  }




}
