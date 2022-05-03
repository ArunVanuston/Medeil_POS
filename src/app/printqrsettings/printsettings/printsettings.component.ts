import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { PrintqrSettingService } from '../printqrsettings.service';
import { AppComponent } from 'app/app.component';
import { NotificationsComponent } from 'app/notifications/notifications.component';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser'; 
import { TranslateService } from 'ng2-translate'; 

@Component({
  selector: 'app-printsettings',
  templateUrl: './printsettings.component.html',
  styleUrls: ['./printsettings.component.css']
})
export class PrintsettingsComponent implements OnInit {
  printForm: FormGroup;
  printforms=[];
  printimages=[];
  printimagevalues=[];
  modelpage=1;

  printtypes=[
      [1,'Basic'],
      [2,'Advanced'],
      [3,'Custom'],
      [4,'POS'],
      [5,'Pre-Print']
  ]

  
  constructor(public translate: TranslateService,private formBuilder: FormBuilder, private printservice:PrintqrSettingService, private notificationsComponent: NotificationsComponent,
    private sanitizer: DomSanitizer,private router: Router) {translate.setDefaultLang('en'); }

  ngOnInit() {
    this.translate.use(localStorage.getItem('language'));
    this.printForm = this.formBuilder.group({ 
      formid:['opt1',[]],
      printtypeid:['opt1',[]],
      printarray: this.formBuilder.array([]),
    });

    this.printservice.viewprintsettings(AppComponent.companyID,AppComponent.branchID,AppComponent.locRefName1,AppComponent.locrefID1).subscribe(data => {
      this.printforms=data;
      this.bindprint(data);
    },err => { console.log(err)});
   
  }
 
  validatesearch(){
    let formval=this.printForm.get('formid').value;
    let ptypeval=this.printForm.get('printtypeid').value;
    if(formval=='opt1'||formval==null||formval==undefined){
      this.notificationsComponent.addToast({ title: 'Alert MESSAGE', msg: 'Select Form Name', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'warning' });
      return false;
    }else  if(ptypeval=='opt1'||ptypeval==null||ptypeval==undefined){
      this.notificationsComponent.addToast({ title: 'Alert MESSAGE', msg: 'Select Print Type', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'warning' });
      return false;
    }
    return true;
  }

  selectedform:any;
  imageshow:boolean=false;
  selectedtype:any;
  gifload:boolean;
  imageload(){
    let reflag=this.validatesearch();
    if(reflag){
      this.gifload = true;
      this.imageshow=false;
      let formval=this.printForm.get('formid').value;
      let ptypeval=this.printForm.get('printtypeid').value;
      this.selectedform=this.printforms[formval-1][2];
      this.selectedtype=this.printtypes[ptypeval-1][1];
      this.printservice.viewprintimage(formval,ptypeval).subscribe(data => {
        if(data){
          this.bindimages(data);
        }
      },err => { console.log(err)});

      setTimeout(() => {
        this.imageshow=true;
        this.gifload = false;
      }, 3500);
     
    }
   
  }


  imagelist=[];
  private readonly imageType: any = 'data:image/*;base64,';
  bindimages(data){
    this.imagelist=[];
    for(let i=0;i<data.length;i++){
      this.imagelist.push({ imageid: data[0].imagevalues[i][0], imagelabel: data[0].imagevalues[i][1],
        imageurl:this.sanitizer.bypassSecurityTrustUrl(this.imageType + data[i].imageurl)});
    }
  }

  classindex:any; 
  imageselect(selindex){
    this.classindex=selindex;  //for ngclass activate selected index
  }

  imagefullview:boolean=false;
  fullimageurl:any;
  viewfullimage(imgurl){
    this.imagefullview=true;
    this.fullimageurl=imgurl;
  }
 
  bindprint(data) {
    const control = <FormArray>this.printForm.controls['printarray'];
    control.controls = [];
    for (let i= data.length-1; i>=0; i--) {
      control.insert(0, this.formBuilder.group({
        printid:[data[i][0],[]],
        formid:[data[i][1],[]],
        formname: [data[i][2], []],
        printtypeid: [data[i][3], []],
        printtype: [data[i][4], []],
        printlabelid: [data[i][5], []],
        printlabel: [data[i][6], []],
        companyid: [AppComponent.companyID, []],
        branchid: [AppComponent.branchID, []],
        locname: [AppComponent.locRefName1, []],
        locrefid: [AppComponent.locrefID1, []], 
      }));
    }

  }

  //let ptypeindex = this.printtypes.findIndex(p => p[0] == this.selectedtype);
  
     
  changesettings(imgid,imglabel){
    let formval=this.printForm.get('formid').value;
    let typeval=this.printForm.get('printtypeid').value;
    if(formval=='opt1'||typeval=='opt1'){
      this.notificationsComponent.addToast({ title: 'Alert MESSAGE', msg: 'Select Values & Image Model', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'warning' });
    }else{
    let selectedformindex=formval-1;
    let ptype=this.printtypes[typeval-1][1];
    const control = <FormArray>this.printForm.controls['printarray'];
    let saveData=control.value;
    saveData[selectedformindex].printtypeid=typeval;  //this.selectedtype;
    saveData[selectedformindex].printtype=ptype;
    saveData[selectedformindex].printlabelid=imgid;  //imgid
    saveData[selectedformindex].printlabel=imglabel;  //imglabel
    this.savesettings();
    }
   
  }


  saveprocess:boolean=false;
  savesettings(){
    const control = <FormArray>this.printForm.controls['printarray'];
    let printvalues=control.value;
      if(control.length>0){
        this.saveprocess=true;
        this.printservice.saveprintsettings(JSON.stringify(printvalues)).subscribe(data => {
          if(data){
            this.saveprocess=false;
            this.notificationsComponent.addToast({ title: 'Success MSG', msg: 'Print Model Applied Successfully', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'success' });
            setTimeout(() => {
              this.router.navigate(['psettings/viewprintsettings']);
            }, 1200);
          }else{
            this.saveprocess=false;
            this.notificationsComponent.addToast({ title: 'Error MSG', msg: 'Model Not Applied', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'error' });
          }
        },err => { console.log(err);this.saveprocess=false;});
      }else{
        this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'No values to Update', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'warning' });
      }
    }

    paginatechange(pageno:any){
      this.modelpage=pageno;
    }

    pagebackchange(pageno:any){
      this.modelpage=pageno-1
    }

    pagefrontchange(pageno:any){
      this.modelpage=pageno+1
    }

    

}
