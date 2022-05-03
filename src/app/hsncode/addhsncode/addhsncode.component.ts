import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NotificationsComponent } from 'app/notifications/notifications.component';
import { Router } from '@angular/router';
import { HsncodeService } from '../hsncode.service';
import { AppComponent } from 'app/app.component';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer } from '@angular/platform-browser';
import { stringify } from '@angular/core/src/util';
import { TranslateService } from 'ng2-translate'

@Component({
  selector: 'app-addhsncode',
  templateUrl: './addhsncode.component.html',
  styleUrls: ['./addhsncode.component.css'],
  providers: [NotificationsComponent]
})
export class AddhsncodeComponent implements OnInit {
  parentMessage = "sales";
  HsnaddForm: FormGroup;
  country: any;
  savemd = [];
  mdescription: any;
  closeResult: string;
  mds: any;
  maindes: any;
  alertmsgs:any;
  constructor(public translate: TranslateService,private formbuilder: FormBuilder,
    private notification: NotificationsComponent,
    private router: Router,
    private hsnservice: HsncodeService,
    private appcomponent: AppComponent,
    private modalService: NgbModal,
    private sanitizer: DomSanitizer) {
    translate.setDefaultLang('en');
    this.HsnaddForm = this.formbuilder.group({
      // hsn_id:['',[]], 
      mdescid: ['', []],
      hsndescription: ['', []],
      main_description: ['', []],
      hsncode: ['', []],
      country_id: ['', []],
      year: ['', []],
      gst: ['', []],
      // business_type:['',[]], 
      // Amendment:['',[]], 
      companyrefid: ['', []],
      // branchrefid:['',[]], 
      // locname:['',[]], 
      // locrefid:['',[]]


    })
  }

  ngOnInit() {
    this.translate.use(localStorage.getItem('language'));
    this.HsnaddForm.get('companyrefid').setValue(AppComponent.companyID);
    // this.HsnaddForm.get('branchrefid').setValue(AppComponent.branchID);
    // this.HsnaddForm.get('locname').setValue(AppComponent.locRefName1);
    // this.HsnaddForm.get('locrefid').setValue(AppComponent.locrefID1);


    this.hsnservice.getcoutry().subscribe(data => {
      this.country = data;
      if (data == null || data == '') {
        this.notification.addToast({ title: 'Error Message', msg: this.alertmsgs.common.countrynotlisted, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      }
    });

    this.hsnservice.getmdesc().subscribe(data => {
      this.mdescription = data,this.maindes=data[0];
      if (data == null || data == '') {
        this.notification.addToast({ title: 'Error Message', msg: this.alertmsgs.common.maindescriptionnotlisted, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      }
    });

    setTimeout(() => {
      let language='en';
      language=localStorage.getItem('language');
      this.hsnservice.GetAlerts(language).subscribe(data => this.alertmsgs = data,
        errorCode => console.log(errorCode));
    }, 1800);

  }
  i;
  flag :boolean=false;
  onSubmit() {
    this.flag = this.validation();
    // this.HsnaddForm.get('main_description').setValue();
    if(this.flag){
    this.savemd = [];
    // let mdescription = this.HsnaddForm.get('main_description').value;
   let mdid :number = parseInt(this.HsnaddForm.get('mdescid').value);
    let country:number = parseInt(this.HsnaddForm.get('country_id').value);
    let itemdesc = this.HsnaddForm.get('hsndescription').value;
    let hsncode = this.HsnaddForm.get('hsncode').value;
    let year = this.HsnaddForm.get('year').value;
    let gst = parseFloat(this.HsnaddForm.get('gst').value);
    let comid = parseInt(AppComponent.companyID);
    //   this.savemd.push({main_description:mdescription,country_id:country,companyrefid:this.HsnaddForm.get('companyrefid').value})

    // this.hsnservice.savemddata(JSON.stringify(this.savemd)).subscribe(data =>{
    let hsnadd = this.HsnaddForm.value;
    this.savemd.push({ mdescid: mdid, country_id: country, hsndescription: itemdesc, hsncode: hsncode, year: year, gst: gst,companyrefid:comid})
alert(JSON.stringify(this.savemd))
    this.hsnservice.saveid(JSON.stringify(this.savemd)).subscribe(data => {
      alert(data)
      if (data == true) {
        this.notification.addToast({ title: 'Sucess Message', msg: this.alertmsgs.common.datasavedsuccessfully, timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
        this.HsnaddForm.reset();
        this.ngOnInit();
      }
      else {
        this.notification.addToast({ title: 'Error Message', msg: this.alertmsgs.common.datanotsaved, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      }
    });
  }

  }
  //   onSubmit(){
  //     this.savemd = [];
  //     let mdescription:any = this.HsnaddForm.get('main_description').value;
  //     let country:any = this.HsnaddForm.get('country_id').value;


  //     this.savemd.push({main_description:mdescription,country_id:country)

  //   this.hsnservice.savemddata(JSON.stringify(this.savemd)).subscribe(data =>{
  //     if(data == true){

  //       this.hsnservice.saveid(JSON.stringify(this.HsnaddForm.value)).subscribe(data =>{
  //         alert(data)
  //         if(data == true){
  //           this.notification.addToast({ title: 'Sucess Message', msg: 'Data Saved Sucessfully..', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
  //           this.HsnaddForm.reset();
  //           this.ngOnInit();
  //         }
  //         else{
  //           this.notification.addToast({ title: 'Error Message', msg: 'Data Not Save', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
  //         }
  //       });
  //     }
  //     else{
  //       this.notification.addToast({ title: 'Error Message', msg: 'Enter Main Description...', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
  //     }

  //   });
  // }
  // isExisthsn(){
  //   this.hsnservice.isexist(this.HsnaddForm.get('hsncode').value).subscribe(data =>{
  //     data
  //   })
  // }

  //======================================Add Chapter=======
  searchwithchapter(event, contenetchapter) {
    // this.HsnaddForm.get('main_description').setValue('');
    if (event == 'nonechapter') {
      this.openchapter(contenetchapter);
    }
    else {
      return;
    }

  }

  openchapter(contenetchapter) {
    this.modalService.open(contenetchapter).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );


  }


  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


  saveChapter(c) {
    // this.mds = c;
    // alert(this.mds);
    if (this.HsnaddForm.get('main_description').value == null || this.HsnaddForm.get('main_description').value == '') {
      this.notification.addToast({ title: 'Error Message', msg: this.alertmsgs.hsn.enterthechapter, timeout: 7000, theme: 'default', position: 'top-right', type: 'error' });

    }
    else {
      var mdescrip = { main_description: this.HsnaddForm.get('main_description').value, country_id: AppComponent.countryID, companyrefid:AppComponent.companyID};
      alert(JSON.stringify(mdescrip));
      this.hsnservice.savechapter(JSON.stringify(mdescrip)).subscribe(data => {

        if (data) {
          c('Close click');
          this.HsnaddForm.get('main_description').setValue(0);
          this.notification.addToast({ title: 'Success Message', msg: this.alertmsgs.hsn.chaptersavedsuccessfully, timeout: 7000, theme: 'default', position: 'top-right', type: 'success' });
          this.ngOnInit();
        }
        else {
          this.notification.addToast({ title: 'Error Message', msg: this.alertmsgs.hsn.chapternotsaved, timeout: 7000, theme: 'default', position: 'top-right', type: 'error' });

        }
      })

    }
  }


  validation(): boolean {

    if (this.HsnaddForm.get('mdescid').value == '' || this.HsnaddForm.get('mdescid').value == null) {
      this.notification.addToast({ title: 'Error Message', msg: this.alertmsgs.hsn.selectchapter, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.HsnaddForm.get('hsndescription').value == '' || this.HsnaddForm.get('hsndescription').value == null) {
      this.notification.addToast({ title: 'Error Message', msg: this.alertmsgs.hsn.enterhsndescription, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.HsnaddForm.get('hsncode').value == null || this.HsnaddForm.get('hsncode').value == '') {
      this.notification.addToast({ title: 'Error Message', msg: this.alertmsgs.hsn.enterhsncode, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.HsnaddForm.get('gst').value == null || this.HsnaddForm.get('gst').value == '') {
      this.notification.addToast({ title: 'Error Message', msg: this.alertmsgs.hsn.entergstvalue, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }

    return true;

  }


  assignhsn(){
    this.router.navigate(['AssignHsnCode/AssignHsnCode']);
  }

}

