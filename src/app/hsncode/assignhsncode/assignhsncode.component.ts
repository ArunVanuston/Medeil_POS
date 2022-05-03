import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NotificationsComponent } from 'app/notifications/notifications.component';
import { Router } from '@angular/router';
import { HsncodeService } from '../hsncode.service';
import { Title } from '@angular/platform-browser';
import { AppComponent } from 'app/app.component';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from 'ng2-translate'

@Component({
  selector: 'app-assignhsncode',
  templateUrl: './assignhsncode.component.html',
  styleUrls: ['./assignhsncode.component.css'],
  providers: [NotificationsComponent,HsncodeService]
})
export class AssignhsncodeComponent implements OnInit {
  alertmsgs:any;
  parentMessage = "sales";
  
  AssignHsncodeForm: FormGroup;
  mulSettings: {};
  mulSettings1: {};
  selectedItems = [];
  selectedItems1 = [];
  country: any;
  concode: any;

  i;
  mdescList: any;
  idesclist: any;
  idescrlist: any;
  j: number;
  k: number;
  mdesclist = [];
  mdesc: any;

  datalist = [];
  ides: any;
  flag: boolean;
  characters= [];
  closeResult: string;

  constructor(public translate: TranslateService,private formbuilder: FormBuilder, private notification: NotificationsComponent, private router: Router,
    private hsncodeservice: HsncodeService, private modalService: NgbModal) {
    translate.setDefaultLang('en');
    this.AssignHsncodeForm = this.formbuilder.group({

      md_ref_id: ['', []],
      id_ref_id: ['', []],
      // company_ref_id: ['', []],
      // brnch_ref_id: ['', []],
      // companyrefid: ['', []],
      // branchrefid: ['', []],
      // country_id: ['', []],
      drugproductid:['',[]],
      id:['',[]],
      vat:[0,[]],
      gst:[0,[]],
      igst:[0,[]],
      ugst:['',[]],
      cgst:['',[]],
      sgst:['',[]],
      

    });

  }

  ngOnInit() {

    this.translate.use(localStorage.getItem('language'));
    this.mulSettings = {
      maxHeight: 200,
      singleSelection: false,
      text: "Select Types",
      badgeShowLimit: 1,
      classes: "myclass custom-class"
    };
    this.mulSettings1 = {
      maxHeight: 200,
      singleSelection: false,
      text: "Select Types",
      badgeShowLimit: 1,
      classes: "myclass custom-class"
    };

    // this.AssignHsncodeForm.get('company_ref_id').setValue(AppComponent.companyID);
    // this.AssignHsncodeForm.get('brnch_ref_id').setValue(AppComponent.branchID);

    this.hsncodeservice.getcoutry().subscribe(data => {
      this.country = data, this.concode = data[0][0];
      if (data == null || data == '') {
        this.notification.addToast({ title: 'Error Message', msg: this.alertmsgs.common.countrynotlisted, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      }
    });
    this.getmdesc();
    setTimeout(() => {
      let language='en';
      language=localStorage.getItem('language');
      this.hsncodeservice.GetAlerts(language).subscribe(data => this.alertmsgs = data,
        errorCode => console.log(errorCode));
    }, 1800);
  }


  getProduct(searchValue: string) {
    this.hsncodeservice.getProduct(searchValue, AppComponent.companyID,
      AppComponent.branchID, AppComponent.locrefID1, AppComponent.locRefName1).subscribe(data => {
        this.characters = [];
        for (let i = 0; i < data.length; i++) {
          this.characters.push({ value: data[i][0], label: data[i][1] });
        }
      });
  }

  getmdesc() {
    this.hsncodeservice.getmdesc().subscribe(data => {
      this.mdescList = data
     // this.setmulmdesc(data);
    },
      err => {
        console.log('Error Occured On getmdesc()');
        // ,this.mdescList = data
      })
  }
  // setmulmdesc(data: any) {
  //   for (this.i = 0; this.i < data.length; this.i++) {

  //     this.mdesclist.push({ id: data[this.i][0], itemName: data[this.i][1]});

  //   }

  // }

  getidescription() {
this.hsncodeservice.gethsndesc(this.AssignHsncodeForm.get('md_ref_id').value).then(data => this.idescrlist = data)
   // this.idesclist = [];
    // this.mdesc = this.AssignHsncodeForm.get('md_ref_id').value;

    // if (this.mdesc != "") {
    //   // alert("Raja1")
    //   for (this.k = 0; this.k < this.mdesc.length; this.k++) {
    //     // alert("Raja2")
    //     this.hsncodeservice.getidesc(this.mdesc[this.k].id,
    //       this.AssignHsncodeForm.get('country_id').value).then(data => {
    //         this.setmulidesc(data)
    //       },
    //         err => {
    //           console.log("Error Occured from getidesc()");

    //         });
    //  }

    // }
    // else {

    //   this.notification.addToast({ title: 'Error Message', msg: 'SELECT MODULE..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    // }

  }
  hsndesc:string;
  prodgst:any;
  taxid:number;
showdescription(){
  let hsncode = this.AssignHsncodeForm.get('id_ref_id').value;
  this.AssignHsncodeForm.get('id').setValue(hsncode);
  for(let p = 0; p<this.idescrlist.length; p++){
    if(hsncode == this.idescrlist[p][0]){
      this.hsndesc = this.idescrlist[p][1];
      this.prodgst = this.idescrlist[p][3];
    }
  }
  this.hsncodeservice.gettaxmaster(AppComponent.companyID,AppComponent.branchID,AppComponent.locrefID1,AppComponent.locRefName1).subscribe(data => {
    this.taxid = data[0][0]
    if(this.taxid == 0){
      this.AssignHsncodeForm.get('vat').setValue(this.prodgst);
    }
    else if(this.taxid == 1){
      this.AssignHsncodeForm.get('gst').setValue(this.prodgst);
    }
    else if(this.taxid == 2){
      this.AssignHsncodeForm.get('cgst').setValue(this.prodgst/2);
      this.AssignHsncodeForm.get('sgst').setValue(this.prodgst/2);
      this.AssignHsncodeForm.get('ugst').setValue(this.prodgst/2);
    }
  })

}
  setmulidesc(data: any) {
    this.idesclist = [];
    for (this.j = 0; this.j < data.length; this.j++) {
      this.idesclist.push({ id: data[this.j][0], itemName: data[this.j][1],mdid:data[this.j][2] })
      // alert(data[this.j][0])
    }

  }

  g;
  idescription;
  onSubmit() {

    //let mdescription = this.AssignHsncodeForm.get('md_ref_id').value;
    // this.idescription = this.AssignHsncodeForm.get('id_ref_id').value;
    // let countryid = this.AssignHsncodeForm.get('country_id').value;
    // console.log("Main Description" +this.AssignHsncodeForm.get('md_ref_id').value);
    // alert("Main Descriotuion" +this.AssignHsncodeForm.get('md_ref_id').value)
    
    //  alert("Item Descriotuion" +this.AssignHsncodeForm.get('id_ref_id').value)
    // for (this.i = 0; this.i < mdescription.length; this.i++) {

      // for (this.j = 0; this.j < this.idescription.length; this.j++) {
      //   this.datalist.push({
      //     country_id: countryid,
      //     id_ref_id: this.idescription[this.j].id,
      //     md_ref_id: this.idescription[this.j].mdid,          
      //     company_ref_id: this.AssignHsncodeForm.get('company_ref_id').value,
      //     brnch_ref_id: this.AssignHsncodeForm.get('brnch_ref_id').value
      //   });
      // }
    // }
    this.hsncodeservice.updatehsnproduct(JSON.stringify(this.AssignHsncodeForm.value)).subscribe(data => {
      // alert(this.datalist)
      if (data == true) {
        this.notification.addToast({ title: 'Sucess Message', msg: this.alertmsgs.common.datasavedsuccessfully, timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
        this.ngOnInit();
        
        // this.idesclist = [];
        // this.idesclist = [];
   
      }
    },
      err => {
        console.log('Error Occured on Savedata()')
        this.notification.addToast({ title: 'Error Message', msg: this.alertmsgs.common.datanotsaved, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      });
 
}

  // validation(): boolean {
  //   if (this.AssignHsncodeForm.get('country_id').value == 'opt1' || this.AssignHsncodeForm.get('country_id').value == null) {
  //     this.notification.addToast({ title: 'Error Message', msg: 'Please Select Your Country..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
  //     return false;
  //   }
  //   if (this.AssignHsncodeForm.get('md_ref_id').value == 'opt1' || this.AssignHsncodeForm.get('md_ref_id').value == null) {
  //     this.notification.addToast({ title: 'Error Message', msg: 'Please Select Main Description..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
  //     return false;
  //   }
  //   if (this.AssignHsncodeForm.get('id_ref_id').value == null || this.AssignHsncodeForm.get('id_ref_id').value == " ") {
  //     this.notification.addToast({ title: 'Error Message', msg: 'Please Select Item Description..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
  //     return false;
  //   }
  //   return true;
  // }

  addhsncode(){
    this.router.navigate(['AssignHsnCode/AddHsnCode']);
  }





//======================================Add Chapter=======
  // searchwithchapter(event,contenetchapter){
  //   this.AssignHsncodeForm.get('md_ref_id').setValue('');
  //   if(event == 'nonechapter'){
  //     this.openchapter(contenetchapter);
  //   }
  //   else{
  //     return;
  //   }

  // }

  // openchapter(contenetchapter){
  //   this.modalService.open(contenetchapter).result.then(
  //     (result) =>{
  //       this.closeResult = `Closed with: ${result}`;
  //     },(reason) => {
  //       this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  //     }
  //   );


  // }

  
  // private getDismissReason(reason: any): string {
  //   if (reason === ModalDismissReasons.ESC) {
  //     return 'by pressing ESC';
  //   } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
  //     return 'by clicking on a backdrop';
  //   } else {
  //     return `with: ${reason}`;
  //   }
  // }


  // saveChapter(c){

  //   this.hsncodeservice.savechapter()
  // }



// =====================================================
}
