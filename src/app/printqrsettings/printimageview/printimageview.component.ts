import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PrintqrSettingService } from '../printqrsettings.service';
import { NotificationsComponent } from 'app/notifications/notifications.component';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-printimageview',
  templateUrl: './printimageview.component.html',
  styleUrls: ['./printimageview.component.css']
})
export class PrintimageviewComponent implements OnInit {
  printForm: FormGroup;
  printforms=[];
  
  printtypes=[
    [1,'Basic'],
    [2,'Advanced'],
    [3,'Custom'],
    [4,'POS'],
    [5,'Pre-Print']
]

  constructor(private formBuilder: FormBuilder, private printservice:PrintqrSettingService, private notificationsComponent: NotificationsComponent,
    private sanitizer: DomSanitizer,private router: Router) { }

  ngOnInit() {
    this.printForm = this.formBuilder.group({ 
      formid:['opt1',[]],
      printtypeid:['opt1',[]],
    });

    this.printservice.viewdefaultforms().subscribe(data => {
      this.printforms=data;
    },err => { console.log(err)});
   
  }

  imageload(){
    let formval=this.printForm.get('formid').value;
    let ptypeval=this.printForm.get('printtypeid').value;
    this.printservice.viewprintimage(formval,ptypeval).subscribe(data => {
      if(data){
        this.bindimages(data);
      }
    },err => { console.log(err)});
  }

  imagelist=[];
  private readonly imageType: any = 'data:image/*;base64,';
  bindimages(data){
    this.imagelist=[];
    for(let i=0;i<data.length;i++){
      this.imagelist.push({ imageid: data[0].imagevalues[i][0], imagelabel: data[0].imagevalues[i][1],printurl: data[0].imagevalues[i][2],
        imageurl:this.sanitizer.bypassSecurityTrustUrl(this.imageType + data[i].imageurl)});
    }
  }

  typeselect(){
      this.printForm.get('printtypeid').setValue('opt1');
  }

  imagefullview:boolean=false;
  fullimageurl:any;
  viewfullimage(imgurl){
    this.imagefullview=true;
    this.fullimageurl=imgurl;
  }

  selectimageid:any;
  setimageid(imageid){
    this.selectimageid=imageid;
  }

  printimage: File;
  errormessage:any;
  showimage:boolean=false;
  imgURL:any;
  PrintImageChange(event: any) {
    this.errormessage="";
   // when the load event is fired and the file not empty
   if(event.target.files && event.target.files.length > 0) {
        //Check & Print Type Error Message
        var mimeType = event.target.files[0].type;
        if (mimeType.match(/image\/*/) == null) {
          this.showimage=false;
          (<HTMLInputElement>document.getElementById("imagefile")).value = '';
          this.errormessage = "Only images are supported.";
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
        this.errormessage = "Max Image Size 500KB Only & Check File Format";
      }
    }
  }

  //image reset
  reset(){
    (<HTMLInputElement>document.getElementById("imagefile")).value = '';
    this.imgURL = '';
    this.showimage=false;
    this.errormessage='';
  }

  Updateprintimage(){
    // Instantiate a FormData to store form fields and encode the file
    let body = new FormData();
    // Add file content to prepare the request
    body.append("file", this.printimage);
    // Launch post request Service Call
    this.printservice.updateprintimage(this.selectimageid,body).subscribe( (data) => {
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
