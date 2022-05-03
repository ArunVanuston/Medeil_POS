import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NotificationsComponent } from 'app/notifications/notifications.component';
import { ViewgroupserviceService } from './viewgroupservice.service';

@Component({
  selector: 'app-viewgroup',
  templateUrl: './viewgroup.component.html',
  providers: [ViewgroupserviceService, NotificationsComponent]
})
export class ViewgroupComponent implements OnInit {
  groupForm: FormGroup;
  pagesize: number = 10;
  verticallist=[];
  countrylist=[];
  maingroup=[];
  subgroup1=[];
  subgroup2=[];
  constructor( private fb: FormBuilder, private groupservice: ViewgroupserviceService,private notificationsComponent: NotificationsComponent) { }

  ngOnInit() {
    this.groupForm = this.fb.group({
      countryid:['opt1',[]],
      verticalid:['opt1',[]],
      maingroupflag:[false,[]],
      subgroup1flag:[false,[]],
      subgroup2flag:[false,[]],
      maingroupid:['opt1',[]],
      subgroupid1:['opt1',[]],
      groupname:['',[]],
      subgroupname1:['',[]],
      subgroupname2:['',[]],
      clientcdate: ['', []],
      companyrefid: ['', []],
      branchrefid: ['', []],
      locrefid: ['', []],
      locname: ['', []],
    });

    this.groupservice.getCountry().subscribe(data => this.countrylist = data,
      err => { console.log('Error Occured ') });
  }

  check(event, id: number) {

    if (event.target.checked) {
      let vertical=this.groupForm.get('verticalid').value;
      if(vertical=='opt1' || vertical==null || vertical==undefined){
        this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'Please Select Vertical', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
        this.groupForm.get('maingroupflag').setValue(false);
        this.groupForm.get('subgroup1flag').setValue(false);
        this.groupForm.get('subgroup2flag').setValue(false);
      }else{
        this.groupForm.get('maingroupid').setValue('opt1');
        this.groupForm.get('subgroupid1').setValue('opt1');
        this.subgroup1=[];
        this.subgroup2=[]; 
        //this.maingroupcall();
        if (id == 1) {
          this.groupForm.get('maingroupflag').setValue(true);
          this.groupForm.get('subgroup1flag').setValue(false);
          this.groupForm.get('subgroup2flag').setValue(false);  
        }else if( id == 2) {
          this.groupForm.get('maingroupflag').setValue(false);
          this.groupForm.get('subgroup1flag').setValue(true); 
          this.groupForm.get('subgroup2flag').setValue(false); 
        }else if( id == 3) {
          this.groupForm.get('maingroupflag').setValue(false); 
          this.groupForm.get('subgroup1flag').setValue(false);
          this.groupForm.get('subgroup2flag').setValue(true);
        }
      }
    }
    
  }


  verticalcall(){
    this.groupservice.getVerticals(this.groupForm.get('countryid').value).subscribe(data => { this.verticallist = data},
      err => { console.log('Error Occured On getATC()') });
  }

  maingroupcall(){
    this.groupservice.mainGroup(this.groupForm.get('verticalid').value).subscribe(data =>this.maingroup=data,
      err => { console.log('Error Occured MainGroup') });
  }

  maingroupname:any;
  getSubgroup1() {
    this.groupForm.get('subgroupid1').setValue('opt1');
    this.subgroup2=[]; 
    let subindx= this.maingroup.findIndex(p => p[0]==this.groupForm.get('maingroupid').value);
    this.maingroupname=this.maingroup[subindx][1];
    this.groupservice.subGroup1(this.groupForm.get('verticalid').value, this.groupForm.get('maingroupid').value).subscribe(data => 
      this.subgroup1=data,
      err => {
        console.log('Error Occured Get subgroup 1');
      });
  }

  subgroupname1:any;
  getSubgroup2() {
    let subindx= this.subgroup1.findIndex(p => p[0]==this.groupForm.get('subgroupid1').value);
    this.subgroupname1=this.subgroup1[subindx][1];
    this.groupservice.subGroup2(this.groupForm.get('verticalid').value, this.groupForm.get('subgroupid1').value).subscribe(data => { this.subgroup2 = data },
      err => {
        console.log('Error Occured Get subgroup 2');
      });
  }


  
  editdetails:boolean=false;
  editgroupid:any;
  editmaingroup(groupid:any,groupname:any){
    this.editdetails=true;
    this.editgroupid=groupid;
    this.groupForm.get('groupname').setValue(groupname);
  }

  updatemaingroup(){
    var frmdata = { groupid:this.editgroupid,groupname: this.groupForm.get('groupname').value};
    this.groupservice.UpdateMainGroup(JSON.stringify(frmdata)).subscribe(data => { 
      if(data){
        this.maingroupcall();
        this.notificationsComponent.addToast({ title: 'Success MSG', msg: 'Data Updated SucessFully', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
        this.editdetails=false;
      }else{
        this.notificationsComponent.addToast({ title: 'Error MSG', msg: 'Data not Updated', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      }
     },
      err => {
        this.notificationsComponent.addToast({ title: 'Error MSG', msg: 'Data not Updated', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
        console.log('Error Occured Get subgroup 2');
      });
  }

  editsubgroupid1:any;
  editsubgroup1(subgroupid1:any,subgroupname1:any){
    if(subgroupid1==0){
      this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'Data not to be Edited', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
    }else{
      this.editdetails=true;
    this.editsubgroupid1=subgroupid1;
    this.groupForm.get('subgroupname1').setValue(subgroupname1);
    }
  }

  updatesubgroup1(){
    var frmdata = { subgroupid1:this.editsubgroupid1,subgroupname1: this.groupForm.get('subgroupname1').value};
    this.groupservice.UpdateSubGroup1(JSON.stringify(frmdata)).subscribe(data => { 
      if(data){
        this.getSubgroup1();
        this.notificationsComponent.addToast({ title: 'Success MSG', msg: 'Data Updated SucessFully', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
        this.editdetails=false;
      }else{
        this.notificationsComponent.addToast({ title: 'Error MSG', msg: 'Data not Updated', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      }
     },
      err => {
        this.notificationsComponent.addToast({ title: 'Error MSG', msg: 'Data not Updated', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
        console.log('Error Occured Get subgroup 2');
      });
  }

  editsubgroupid2:any;
  editsubgroup2(subgroupid2:any,subgroupname2:any){
    if(subgroupid2==0){
      this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'Data not to be Edited', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
    }else{
    this.editdetails=true;
    this.editsubgroupid2=subgroupid2;
    this.groupForm.get('subgroupname2').setValue(subgroupname2);
    }
  }

  updatesubgroup2(){
    var frmdata = { subgroupid2:this.editsubgroupid2,subgroupname2: this.groupForm.get('subgroupname2').value};
    this.groupservice.UpdateSubGroup2(JSON.stringify(frmdata)).subscribe(data => { 
      if(data){
        this.getSubgroup2();
        this.notificationsComponent.addToast({ title: 'Success MSG', msg: 'Data Updated SucessFully', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
        this.editdetails=false;
      }else{
        this.notificationsComponent.addToast({ title: 'Error MSG', msg: 'Data not Updated', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      }
     },
      err => {
        this.notificationsComponent.addToast({ title: 'Error MSG', msg: 'Data not Updated', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
        console.log('Error Occured Get subgroup 2');
      });
  }

}
