import { Component, OnInit, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { providers } from 'ng2-toasty';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { forEach } from '@angular/router/src/utils/collection';
import { DomSanitizer } from '@angular/platform-browser';
import { AppComponent } from '../../app.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { dateFormatPipe } from 'app/notifications/notifications.datepipe';
import { drugviewService } from '../viewDrugmaster/viewDrugmaster.services';

@Component({
  selector: 'app-viewdrugmasterpaginate',
  templateUrl: './viewdrugmasterpaginate.component.html',
  styleUrls: ['./viewdrugmasterpaginate.component.css'],
  providers: [drugviewService, NotificationsComponent]
})

export class ViewdrugmasterpaginateComponent implements OnInit, AfterViewInit {

  @ViewChild('imageupload') imageupload: ElementRef;

  drugForm:FormGroup;
  bindvalue;
  drugsearch=true;
  genericsearch=false;
  
  i;
  genericid = [];
  public search: any = '';
  locked: any[] = [];
  //Search Pipe Declare 
  data: any;
  datacopy:any;
  column;
  @Input() searchText;
 

  //Pagination
  totalRec: number;
  page: number = 1;
  size: number = 10;
  sendpage: number;

  searchindex: any;
  searchvalue: any;
  datatable: boolean=true;
  searchdatatable: boolean=false;

  checkedvalues: any = [];
  public gifFail: boolean = true;
 // public indx;
  deviceObj: any;
  
 
  constructor(private viewdrug: drugviewService, private router: Router, private formBuilder: FormBuilder, 
    private sanitizer: DomSanitizer, private notificationsComponent: NotificationsComponent,
    private appComponent: AppComponent, private dateformat: dateFormatPipe ) { this.data = new Array<any>();
  
    
    this.drugForm = this.formBuilder.group({

      drugsearch:[,[]],
      genericsearch:[,[]]
    });
  
  }

  ngOnInit() {

    this.sendpage=this.page-1;
  
    this.drugForm.get('drugsearch').setValue(true);
    this.searchindex=1;
    //this.indx=0; 
    this.viewdrug.getdrugInfo(AppComponent.companyID,this.sendpage,this.size).subscribe(data =>{ this.data = data, this.totalRec=data.totalElements },
      err => { console.log('Error occured on getdrugInfo()');
      }); 
    // this.viewdrug.getAlldrugInfo(AppComponent.companyID,AppComponent.branchID,AppComponent.locRefName1,AppComponent.locrefID1).subscribe(data =>{ 
    //   this.data = data, this.datacopy=data },
    //   err => { console.log('Error occured on getdrugInfo()');
    //   });
    setTimeout(() => {
     
      this.gifFail = false;
     

      // this.devicedetails();           
      // this.deviceObj.apiname="api/viewDruginfo";
      // this.deviceObj.description="View Drug Details";
     
      // this.viewdrug.devicedetails(JSON.stringify(this.deviceObj)).subscribe(data => {});

    }, 3000);

  }

   pagechange(pageno:any){

      this.sendpage=pageno-1;
      this.viewdrug.getdrugInfo(AppComponent.companyID,this.sendpage,this.size).subscribe(data =>{ this.data = data,this.totalRec=data.totalElements},
        err => { console.log('Error occured on getdrugInfo()');
        });
        
   }

   countchange(count: any){

    this.size=count;

    this.viewdrug.getdrugInfo(AppComponent.companyID,this.sendpage,this.size).subscribe(data =>{ this.data = data,this.totalRec=data.totalElements},
      err => { console.log('Error occured on getdrugInfo()');
      });
      
  }


  devicedetails(){

    this.deviceObj = {

        userid: AppComponent.userID,
        companyrefid: AppComponent.companyID,
        branchrefid: AppComponent.branchID,
        locname: AppComponent.locRefName1,
        locrefid: AppComponent.locrefID1,
        clientcdate:this.dateformat.transform04(),
        ipaddress: this.appComponent.ipAddress, 
        browsertype: this.appComponent.browser,
        ostype: this.appComponent.os,
        osversion: this.appComponent.osversion,
        devicetype: this.appComponent.devicetype,
        description:'',
        apiname:''

      };
  
}


  check(event, id: number) {

    if (event.target.checked) {
      
    if (id == 0) {
      this.drugForm.get('genericsearch').setValue(false);
      this.drugsearch=true;
      this.genericsearch=false;
      //this.indx=0;
      this.searchText ="";
      this.searchvalue="";
      this.searchindex=1;
      this.sendpage=0;
      this.page=1;
      this.viewdrug.getdrugInfo(AppComponent.companyID,this.sendpage,this.size).subscribe(data => {this.data = data, this.totalRec=data.totalElements},
        errorCode => console.log(errorCode));  
    }

    else if( id == 1) {
      this.drugForm.get('drugsearch').setValue(false);
      this.genericsearch=true;
      this.drugsearch=false;
      //this.indx=1;
      this.searchText ="";
      this.searchvalue="";
      this.searchindex=2;
      this.sendpage=0;
      this.page=1;
      this.viewdrug.getdrugInfo(AppComponent.companyID,this.sendpage,this.size).subscribe(data => {this.data = data, this.totalRec=data.totalElements},
        errorCode => console.log(errorCode));  
    }

  }
    

  }


  deleteDrug(id: number) {
    
    var answer = confirm("Delete data?");
    if (answer) {

    this.viewdrug.deletedrug(id).subscribe(data => {
      if(data){

        // if(data==1){
        // this.devicedetails();
        // this.deviceObj.apiname="api/deleteDrugdetails";
        // this.deviceObj.description="Removed Drug Data"
        // this.viewdrug.devicedetails(JSON.stringify(this.deviceObj)).subscribe(data => {});
  
      this.notificationsComponent.addToast({ title: 'SUCESS MESSAGE', msg: 'DATA DELETED SUCESSFULLY.', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'success' });
      setTimeout(() => {
       this.ngOnInit();
        }, 1200);
  
      }
      else{

        this.notificationsComponent.addToast({ title: 'ERROR MESSAGE', msg: 'DATA NOT DELETED...', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'error' });
      }

    },
      errorCode => console.log(errorCode));
     
    }
  }
 
  getvalue(getval : any) {

  this.searchvalue="";
  this.bindvalue = getval.textContent;
  this.searchvalue =this.bindvalue;
  this.datatable=false;
  this.searchdatatable=true;
  this.page=1;
  this.size=10;
  this.data=[];
    //alert(this.searchindex + this.searchvalue);
  this.viewdrug.prodsearchrecord(AppComponent.companyID,this.searchindex,this.searchvalue,this.sendpage,this.size).subscribe(data => {this.data = data, this.totalRec=data.totalElements},
    errorCode => console.log(errorCode));

  }


  getsearchvalue(searchValue: any,searchIndex: any){

    if(searchValue.length>0){

      this.searchindex=searchIndex;
      this.searchvalue=searchValue;
      this.datatable=false;
      this.searchdatatable=true;
      this.page=1;
      this.size=10;
      this.sendpage=0;
      this.data=[];
      this.viewdrug.prodsearchrecord(AppComponent.companyID,this.searchindex,this.searchvalue,this.sendpage,this.size).subscribe(data => {this.data = data, this.totalRec=data.totalElements},
        errorCode => console.log(errorCode));

    }

    else{
      
      this.datatable=true;
      this.searchdatatable=false;
      this.page=1;
      this.size=10;
      this.sendpage=0;
      this.data=[];
      this.viewdrug.getdrugInfo(AppComponent.companyID,this.sendpage,this.size).subscribe(data => {this.data = data, this.totalRec=data.totalElements},
        errorCode => console.log(errorCode));  

    }


  }

  searchpagechange(pageno: any){

    this.sendpage=pageno-1;

    this.viewdrug.prodsearchrecord(AppComponent.companyID,this.searchindex,this.searchvalue,this.sendpage,this.size).subscribe(data =>{ this.data = data,this.totalRec=data.totalElements},
      err => { console.log('Error occured on getdrugInfo()');
      });
      
  }


  searchcountchange(count: any){

    this.size=count;

    this.viewdrug.prodsearchrecord(AppComponent.companyID,this.searchindex,this.searchvalue,this.sendpage,this.size).subscribe(data =>{ this.data = data,this.totalRec=data.totalElements},
      err => { console.log('Error occured on getdrugInfo()');
      });
      
  }

  drugimgURL: any ;
  noimage:any;
  saveimgprocess:any;
  drugdetails:any
  private readonly imageType: any = 'data:image/*;base64,';
  showImage(drugdetails) {
    
    this.saveimgprocess=false;
    this.viewdrug.getImage(drugdetails[0]).subscribe(data =>{
      if(data.content == "no image"){
        this.drugimgURL='';
        this.noimage="No Image to Preview";
      }else{
        this.noimage='';
        this.drugimgURL = this.sanitizer.bypassSecurityTrustUrl(this.imageType + data.content)
      }}, 
        error => {
          this.drugimgURL='';
          this.noimage="No Image to Preview";
          console.log('Error Occured on getImages  : ' + this.drugimgURL);
        });

        this.drugdetails = {
          id:drugdetails[0],
          generic_name:drugdetails[2],
          uniformproductcode:drugdetails[3],
          brandname: drugdetails[1],
          companyid: AppComponent.companyID,
          branchid: AppComponent.branchID,
          locname: AppComponent.locRefName1,
          locrefid: AppComponent.locrefID1,
    
        };
  }

  openfile(){
    this.imageupload.nativeElement.click();
  }

  errormessage:string;
  drugphoto: File;
  drugphotoChange(event: any) {

    this.errormessage="";
  // when the load event is fired and the file not empty
  if(event.target.files && event.target.files.length > 0) {

      //Check & Print Type Error Message
      var mimeType = event.target.files[0].type;
      if (mimeType.match(/image\/*/) == null) {
        this.imageupload.nativeElement.value="";
        this.drugimgURL = ''; 
        this.saveimgprocess=false;
        this.errormessage = "Only images are supported!..";
        return;
      }
    

    if (event.target.files[0].size < 500000) {

    this.noimage='';
    this.saveimgprocess=true;
    // Fill file variable with the file content
    this.drugphoto = event.target.files[0];

    // Instantiate an object to read the file content
    let reader = new FileReader();

      //To read Encrypted file and send url to display in html
      reader.readAsDataURL(this.drugphoto); 
      reader.onload = (_event) => { 
        this.drugimgURL = reader.result; 
      }

  }

  else{
    this.imageupload.nativeElement.value="";
    this.drugimgURL = ''; 
    this.saveimgprocess=false;
    this.errormessage = "Max Image Size 500KB Only & Check File Format..";
  }


  }

  }

  savedrugimage(){
    this.viewdrug.updateDrug(JSON.stringify(this.drugdetails)).subscribe(data => {
      if (data == true) {
        this.updatedrugimage();
        //this.notificationsComponent.addToast({ title: 'Success Message', msg: 'DATA UPDATED SUCCESSFULLY', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
      }  else{
        this.notificationsComponent.addToast({ title: 'Error Message', msg: 'DATA NOT UPDATED', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      }
    });
  }

  updatedrugimage(){

    // Instantiate a FormData to store form fields and encode the file
    let body = new FormData();
    // Add file content to prepare the request
    body.append("file", this.drugphoto);
   
    // Launch post request Service Call
    this.viewdrug.updatedrugimage(body).subscribe( (data) => {
    
      //Employee image  notification start
      if(data==true){
      this.saveimgprocess=false;
        this.notificationsComponent.addToast({ title: 'SUCESS MESSAGE', msg: 'DRUG IMAGE UPDATED SUUCCESSFULLY', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'success' });
        //this.myForm.reset();
        (<HTMLInputElement>document.getElementById("imagefile")).value = '';
      }
      else{

        this.notificationsComponent.addToast({ title: 'Warning Message', msg: 'DRUG IMAGE NOT UPDATED....', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
      }
     //Employee image  notification end
    
    });

    }

  ngAfterViewInit() {

  }

//field wise search
productsearch(searchval){
  if(searchval.length>0){
    //===0  starts with
    let srch = Object.assign([], this.datacopy).filter(
    item => ((item[1].toLowerCase()).indexOf(searchval.toLowerCase()) !== -1));
    this.data=srch;
  }else{
    this.data=this.datacopy;
  }
}

genericsearch1(searchval){
  if(searchval.length>0){
    //===0  starts with
    let srch = Object.assign([], this.datacopy).filter(
    item => ((item[2].toLowerCase()).indexOf(searchval.toLowerCase()) !== -1));
    this.data=srch;
  }else{
    this.data=this.datacopy;
  }
}

formulatesearch(searchval){
  if(searchval.length>0){
    //===0  starts with
    let srch = Object.assign([], this.datacopy).filter(
    item => ((item[7].toLowerCase()).indexOf(searchval.toLowerCase()) !== -1));
    this.data=srch;
  }else{
    this.data=this.datacopy;
  }
}

prodsortindex:any=1;
productsort(selval){
  // sort by name
  this.prodsortindex=selval;
  this.data.sort(function(a, b) {
    var nameA = a[1].toLowerCase(); // ignore upper and lowercase
    var nameB = b[1].toLowerCase(); // ignore upper and lowercase
    if(selval==1){
      return nameA>nameB?1:nameB>nameA?-1:0;
    }else if(selval==2){
      return nameA>nameB?-1:nameB>nameA?1:0;
    }
  });
 
}

gensortindex:any=1;
genericsort(selval){
  // sort by name
  this.gensortindex=selval;
  this.data.sort(function(a, b) {
    var nameA = a[2].toLowerCase(); // ignore upper and lowercase
    var nameB = b[2].toLowerCase(); // ignore upper and lowercase
    if(selval==1){
      return nameA>nameB?1:nameB>nameA?-1:0;
    }else if(selval==2){
      return nameA>nameB?-1:nameB>nameA?1:0;
    }
  });
  console.log("sort: "+this.data)
}


}
