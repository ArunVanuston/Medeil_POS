import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'app/app.component';
import { DomSanitizer } from '@angular/platform-browser';
import { profileService } from '../profileinfo.service';
import {fadeInOutTranslate} from '../../../shared/elements/animation';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NotificationsComponent } from 'app/notifications/notifications.component';
import { dateFormatPipe } from 'app/notifications/notifications.datepipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viewprofileinfo',
  templateUrl: './viewprofileinfo.component.html',
  styleUrls: ['./viewprofileinfo.component.css'],
  providers: [profileService,AppComponent],
  animations: [fadeInOutTranslate]
})
export class ViewprofileinfoComponent implements OnInit {

  profiledetails:any=[];
  empdetails:any;
  imgURL: any= "assets/images/user.png" ;
  edituserinfo:FormGroup;
  editFormShow:boolean=false;
  imageUpdateShow:boolean=false;
  shopflag:any=2;
  //Employee Phot declare
  updateimgURL: any;
  errormessage: string;
  ephoto: File;
  showimage: boolean=false;
  saveimgprocess:boolean=false;
  imageresponse: any;
  constructor(private profileservice:profileService,private app:AppComponent,private formBuilder: FormBuilder,private router: Router,
    private sanitizer: DomSanitizer,private notificationsComponent: NotificationsComponent,private dateformat: dateFormatPipe) { }

  ngOnInit() {
    this.edituserinfo = this.formBuilder.group({
      id:['',[]],
      clientmdate:[this.dateformat.transform06(),[]],
      empaddress1: ['', []],
      mobileno: ['', []],
      email: ['', []],
    });

    this.editFormShow=false;
    this.imageUpdateShow=false;
    this.profileservice.getuserinfo(sessionStorage.getItem('indvuserid')).subscribe(data => {this.profiledetails=data[0]});
    this.profileservice.receiveimage(sessionStorage.getItem('indvuserid')).subscribe(data => { this.viewimage(data) });

  }

  private readonly imageType: any = 'data:image/*;base64,';
  viewimage(data){
   this.shopflag=data.flag;
   this.imgURL = this.sanitizer.bypassSecurityTrustUrl(this.imageType + data.content)
  }  

  //Update Process

  setuserdataedit(){
    if(this.profiledetails[0]==1){
      this.editFormShow=true;
      this.edituserinfo.patchValue({
        id:this.profiledetails[1],
        mobileno:this.profiledetails[5],
        email:this.profiledetails[4],
        empaddress1:this.profiledetails[3]
      })
    }else{
      this.editFormShow=false;
      this.router.navigate(['/ShopRegistration/ViewShopDetails']);
      //this.notificationsComponent.addToast({title:'Alert MSG', msg:'Shop Profile Updated only View or Edit Shop Info', timeout: 5000, theme:'default', position:'top-right',type:'error'});  
      //this.notificationsComponent.addToast({title:'Alert MSG', msg:'Employee Profile Only Updated', timeout: 5000, theme:'default', position:'top-right',type:'error'});  
    }
  }

  updateinfo(){
    this.edituserinfo.get('clientmdate').setValue(AppComponent.date);
    //this.edituserinfo.get('id').setValue(this.empid);
    this.profileservice.updateinfo(this.edituserinfo.value).subscribe((data: any )=> {  
    let re = data.res;  
    if(re){
      this.notificationsComponent.addToast({title:'Success MSG', msg:'Data Updated Successfully', timeout: 5000, theme:'default', position:'top-right',type:'success'});  
      this.ngOnInit();
    }else{
      this.notificationsComponent.addToast({title:'Error MSG', msg:'Data Updated Failed', timeout: 5000, theme:'default', position:'top-right',type:'error'});
    }
   },errorCode => {console.log(errorCode);
    this.notificationsComponent.addToast({title:'Error MSG', msg:'Data Updated Failed', timeout: 5000, theme:'default', position:'top-right',type:'error'});
    });
  }

  openimagepop(){
    if(this.profiledetails[0]==1){
      this.imageUpdateShow=true;
    }else{
      this.imageUpdateShow=false;
      this.router.navigate(['/ShopRegistration/ViewShopDetails']);
      //this.notificationsComponent.addToast({title:'Alert MSG', msg:'Shop Profile Updated only View or Edit Shop Info', timeout: 5000, theme:'default', position:'top-right',type:'error'});  
    }
  }

  openfile(){
      this.saveimgprocess=false;
      this.showimage=false;
      this.errormessage="";
      $("#imagefile").click();
  }

  //Image Update
  empphotoChange(event: any) {

    this.errormessage="";
  
   // when the load event is fired and the file not empty
   if(event.target.files && event.target.files.length > 0) {
  
      //Check & Print Type Error Message
      var mimeType = event.target.files[0].type;
      if (mimeType.match(/image\/*/) == null) {
        this.showimage=false;
        this.errormessage = "Only images are supported.";
         return;
      }
     
  
     if (event.target.files[0].size < 500000) {
  
     // Fill file variable with the file content
     this.saveimgprocess=true;
     this.showimage=true;
     this.ephoto = event.target.files[0];
  
   
     // Instantiate an object to read the file content
     let reader = new FileReader();
  
       //To read Encrypted file and send url to display in html
       reader.readAsDataURL(this.ephoto); 
       reader.onload = (_event) => { 
         this.updateimgURL = reader.result; 
       }
  
   }
  
   else{
     this.showimage=false;
     this.errormessage = "Max Image Size 500KB Only & Check File Format";
   }
  
  
  }
  
  }

  setimagevalues(){
    this.empdetails = {
      id:this.profiledetails[1],
      empfirstname:this.profiledetails[2],
      employeecode:this.profiledetails[9],
      companyid: AppComponent.companyID,
      branchid: AppComponent.branchID,
      locname: AppComponent.locRefName1,
      locrefid: AppComponent.locrefID1,
    };
    this.profileservice.setimagevalues(JSON.stringify(this.empdetails)).subscribe(data => {
      if (data == true) {
        this.updateempimage();
        //this.notificationsComponent.addToast({ title: 'Success Message', msg: 'DATA UPDATED SUCCESSFULLY', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
      }  else{
        this.notificationsComponent.addToast({ title: 'Error Message', msg: 'DATA NOT UPDATED', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      }
    });
  }

  updateempimage(){
    // Instantiate a FormData to store form fields and encode the file
    let body = new FormData();
    // Add file content to prepare the request
    body.append("file", this.ephoto);
   
    // Launch post request Service Call
    this.profileservice.updateimage(body).subscribe( (data) => {
      //Employee image  notification start
      if(data==true){
        this.notificationsComponent.addToast({ title: 'SUCESS MESSAGE', msg: 'EMPLOYEE IMAGE SAVED SUUCCESSFULLY', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'success' });
        (<HTMLInputElement>document.getElementById("imagefile")).value = '';
        this.updateimgURL='';
        setTimeout(() => {
          this.ngOnInit();
          //this.router.navigate(['Employee/ViewEmployee']);
        },5000);    
      }
      else{
        this.notificationsComponent.addToast({ title: 'Warning Message', msg: 'EMPLOYEE IMAGE UNSAVED....', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
      }
     //Employee image  notification end
    });

  }

}
