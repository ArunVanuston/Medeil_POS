import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PrintqrSettingService } from '../printqrsettings.service';
import { NotificationsComponent } from 'app/notifications/notifications.component';

@Component({
  selector: 'app-printimagesave',
  templateUrl: './printimagesave.component.html',
  styleUrls: ['./printimagesave.component.css']
})
export class PrintimagesaveComponent implements OnInit {
  printimageForm:FormGroup;
  printforms=[];

  constructor(private formBuilder: FormBuilder, private printimageservice:PrintqrSettingService, private notificationsComponent: NotificationsComponent,) { }

  ngOnInit() {
    this.printimageForm = this.formBuilder.group({ 
      imageid:[0,[]],
      formid:['opt1',[]],
      printtype:['opt1',[]],
      printlabel: [, []],
      printimage: [, []],  
      printurl:[,[]],
    });

    this.printimageservice.viewdefaultforms().subscribe(data => {
      this.printforms=data;
    },err => { console.log(err)});
  }

  printimage: File;
  message:any;
  showimage:boolean=false;
  imgURL:any;
  PrintImageChange(event: any) {
    this.message="";
   // when the load event is fired and the file not empty
   if(event.target.files && event.target.files.length > 0) {
        //Check & Print Type Error Message
        var mimeType = event.target.files[0].type;
        if (mimeType.match(/image\/*/) == null) {
          this.showimage=false;
          (<HTMLInputElement>document.getElementById("imagefile")).value = '';
          this.message = "Only images are supported.";
          return;
        }
    
      if (event.target.files[0].size < 500000) {
      // Fill file variable with the file content
      this.printimage = event.target.files[0];
    
      // Instantiate an object to read the file content
      let reader = new FileReader();
    
        //To read Encrypted file and send url to display in html
        reader.readAsDataURL(this.printimage); 
        reader.onload = (_event) => { 
          this.imgURL = reader.result; 
        }
    
      }else{
        (<HTMLInputElement>document.getElementById("imagefile")).value = '';
        this.message = "Max Image Size 500KB Only & Check File Format";
      }
    
    }
  
  }

  //image reset
  reset(){
    (<HTMLInputElement>document.getElementById("imagefile")).value = '';
    this.imgURL = '';
    this.showimage=false;
    this.message='';
  }

  validate(){
    let formval=this.printimageForm.get('formid').value;
    let printtypeval=this.printimageForm.get('printtype').value;
    let printlabelval=this.printimageForm.get('printlabel').value;
    let printimageval=this.printimageForm.get('printimage').value;
    let printurl=this.printimageForm.get('printurl').value;
    if(formval=='opt1'|| formval==null){
      this.notificationsComponent.addToast({ title: 'Alert MSG', msg:'Select Form Value', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
      return false;
    }else if(printtypeval=='opt1'|| formval==null){
      this.notificationsComponent.addToast({ title: 'Alert MSG', msg:'Select Print Type Value', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
      return false;
    }else if(printlabelval==''|| printlabelval== null || printlabelval==undefined){
      this.notificationsComponent.addToast({ title: 'Alert MSG', msg:'Enter Print Label Value', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
      return false;
    }else  if(printimageval==''|| printimageval== null || printimageval==undefined){
      this.notificationsComponent.addToast({ title: 'Alert MSG', msg:'Select Image', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
      return false;
    }else  if(printurl==''|| printurl== null || printurl==undefined){
      this.notificationsComponent.addToast({ title: 'Alert MSG', msg:'Enter URL', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
      return false;
    }
    return true;
  }

  SaveImageRecord(){
    let reflag=this.validate();
    if(reflag){
      this.printimageservice.saveimagerecord(JSON.stringify(this.printimageForm.value)).subscribe(data => {
        if(data){
          this.saveprintimage();
        }},err => {
          if (err.status == 400) {
            this.notificationsComponent.addToast({ title: 'Alert MSG', msg:'Label Already Exists in this type', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
          }});
       }
        
    }

    saveprintimage(){
      // Instantiate a FormData to store form fields and encode the file
      let body = new FormData();
      // Add file content to prepare the request
      body.append("file", this.printimage);
     
      // Launch post request Service Call
      this.printimageservice.saveimage(body).subscribe( (data) => {
        //Print image  notification start
        if(data==true){
          this.notificationsComponent.addToast({ title: 'SUCESS MESSAGE', msg: 'DATA & PRINT IMAGE SAVED SUUCCESSFULLY', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'success' });
          this.imgURL='';
          this.ngOnInit();
        }
        else{
          this.notificationsComponent.addToast({ title: 'Warning Message', msg: 'DATA ONLY SAVED & PRINT IMAGE UNSAVED....', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
          this.ngOnInit();
          this.imgURL='';
        }
       //Print image  notification end
      
      });
  
    }
  



}
