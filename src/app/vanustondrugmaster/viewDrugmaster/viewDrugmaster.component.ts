import { Component, OnInit, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { providers } from 'ng2-toasty';
import { drugviewService } from './viewDrugmaster.services';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { forEach } from '@angular/router/src/utils/collection';
import { DomSanitizer } from '@angular/platform-browser';
import { AppComponent } from '../../app.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { dateFormatPipe } from 'app/notifications/notifications.datepipe';
import { SortPipe } from './viewDrugmasterSort.pipe';

@Component({
  selector: 'app-viewDrugmaster',
  templateUrl: './viewDrugmaster.component.html',
  providers: [drugviewService, NotificationsComponent, SortPipe]
})

export class viewvanustondrugComponent implements OnInit, AfterViewInit {

  @ViewChild('imageupload') imageupload: ElementRef;

  locked: any[] = [];
  //Search Pipe Declare 
  data: any;
  datacopy:any;
  column;
  @Input() searchText;
 
  public filterQuery: string = '';
  public filterQuery1: string = '';
  public filterQuery2: string = '';
  //Pagination
  totalRec: number;
  page: number = 1;
 

  checkedvalues: any = [];
  public gifFail: boolean = true;
 // public indx;
  deviceObj: any;
  
 
  constructor(private viewdrug: drugviewService, private router: Router, private formBuilder: FormBuilder, 
    private sanitizer: DomSanitizer, private notificationsComponent: NotificationsComponent,
    private appComponent: AppComponent, private dateformat: dateFormatPipe, private sortPipe: SortPipe ) { }
 
    ngAfterViewInit(): void {
    throw new Error("Method not implemented.");
  }

  ngOnInit() {

    this.viewdrug.getVanustondrugInfo().subscribe(data =>{
      if(data.length==0){
        this.viewdrug.getVanustondrugInfo().subscribe(data =>{ this.data = data, this.datacopy=data },
          err => { console.log('Error occured on getdrugInfo()')});
      }else{
        this.data = data, this.datacopy=data;
      } 
    },err => { console.log('Error occured on getdrugInfo()')});
      
    setTimeout(() => {
     
      this.gifFail = false;

    }, 3800);

  }

  


  deleteDrug(id: number) {
    
    var answer = confirm("Delete data?");
    if (answer) {

    this.viewdrug.deletedrug(id).subscribe(data => {
      if(data==1){
      this.notificationsComponent.addToast({ title: 'SUCESS MESSAGE', msg: 'DATA DELETED SUCESSFULLY.', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'success' });
      setTimeout(() => {
       this.ngOnInit();
        }, 3000);
      }
      else{
        this.notificationsComponent.addToast({ title: 'ERROR MESSAGE', msg: 'DATA NOT DELETED...', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'error' });
      }

    },
      errorCode => console.log(errorCode));
     
    }
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
          console.log('Error Occured on getImages  : ');
        });

        this.drugdetails = {
          id:drugdetails[0],
          productdrugid:drugdetails[0],
          // genericid:drugdetails[9],
          uniformproductcode:drugdetails[3],
          brandname: drugdetails[1],
          // companyid: AppComponent.companyID,
          // branchid: AppComponent.branchID,
          // locname: AppComponent.locRefName1,
          // locrefid: AppComponent.locrefID1,
    
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
    this.viewdrug.SetDrugImageValues(JSON.stringify(this.drugdetails)).subscribe(data => {
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

    genericsearch(searchval){
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
      console.log("sort: "+this.data)
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



