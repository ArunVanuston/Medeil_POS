import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { providers } from 'ng2-toasty';
import { editdrugService } from './editDrugmaster.services';
import { HttpClient, HttpResponse, HttpEventType } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { AppComponent } from '../../app.component';
import { dateFormatPipe } from 'app/notifications/notifications.datepipe';
@Component({
  selector: 'app-drugmaster',
  templateUrl: './editDrugmaster.component.html',
  providers: [editdrugService, NotificationsComponent]
})
export class editdrugComponent implements OnInit {
  /**  view to Edit call**/
  drugid: number;
  private drugValue: any;
  //**************** */
  submitted = false;
  show = false;
  characters = [];
  chars = [];
  countries = [];
  states = [];
  items = [];
  dropdownSettings = {};
  dropdownList = [];

distchannel =[];



  //Form Declaration
  generic = [];
  genericCombination = [];
  dosage = [];
  uom = [];
  therapeutic = [];
  subtherapeutic = [];
  formulation = [];
  schedule = [];
  insurance = [];
  insurancetype = [];
  showeditinsurance = [];
  editInsurance = [];
  insu = [];
  vat = [];
  gst = [];
  sgst = [];
  cgst = [];
  igst = [];
  i;
  drugForm: FormGroup;
  textPattern = "[a-zA-Z][a-zA-Z ]+";
  textnumbers = '^[0-9]+(\.[0-9]{1,2})?$';
  deviceObj: any;

  constructor(private drugservice: editdrugService, private route: ActivatedRoute, private router: Router,
    private notificationsComponent: NotificationsComponent,private appComponent: AppComponent, private dateformat: dateFormatPipe) {

    let brandname = new FormControl('', [Validators.pattern(this.textPattern)]);
    let selectedCountry = new FormControl();
    let genericid = new FormControl();
    let genericids = new FormControl();
    let genericcombinationid = new FormControl();
    let genericnamedosage = new FormControl();
    let uom = new FormControl();
    let therapeuticid = new FormControl();
    let subtherapeuticid = new FormControl();
    let vat = new FormControl();
    let gst = new FormControl();
    let sgst = new FormControl();
    let cgst = new FormControl();
    let igst = new FormControl();
    let formulationid = new FormControl();
    let schudletype = new FormControl();
    let mrp = new FormControl('',[Validators.required,Validators.pattern(this.textnumbers)]);
    let minqty = new FormControl('', Validators.pattern(this.textnumbers));
    let maxqty = new FormControl('', Validators.pattern(this.textnumbers));
    let insuranceid = new FormControl();
    let boxpercartoon = new FormControl('', Validators.pattern(this.textnumbers));
    let stripperbox = new FormControl('', Validators.pattern(this.textnumbers));
    let quantityperstrip = new FormControl('', Validators.pattern(this.textnumbers));
    let banneddrug = new FormControl();
    let selectedCharacter = new FormControl();
    let photos = new FormControl();
    let barcode = new FormControl();
    let id = new FormControl();
    let productregno = new FormControl();
    let distimporterid = new FormControl();
    let banneddrugreason = new FormControl();
    let companyid = new FormControl();
    let branchid = new FormControl();
    let locname = new FormControl();
    let locrefid = new FormControl();
    let uniformproductcode = new FormControl();
    let drugstatus = new FormControl(0);
    this.drugForm = new FormGroup({
      id: id,
      brandname: brandname,
      genericid: genericid,
      genericids: genericids,
      genericcombinationid: genericcombinationid,
      genericnamedosage: genericnamedosage,
      uom: uom,
      vat: vat,
      gst: gst,
      sgst: sgst,
      cgst: cgst,
      igst: igst,
      formulationid: formulationid,
      schudletype: schudletype,
      mrp: mrp,
      minqty: minqty,
      maxqty: maxqty,
      insuranceid: insuranceid,
      boxpercartoon: boxpercartoon,
      stripperbox: stripperbox,
      quantityperstrip: quantityperstrip,
      banneddrug: banneddrug,
      photos: photos,
      barcode: barcode,
      productregno: productregno,
      distimporterid: distimporterid,
      banneddrugreason: banneddrugreason,
      companyid: companyid,
      branchid: branchid,
      locname: locname,
      locrefid: locrefid,
      uniformproductcode:uniformproductcode,
      drugstatus:drugstatus
    });
  }

  getEditdata(data: any) {
    let k;
    let temp: number = 0;
    if (data !== undefined || data !== null) {
      for (k = 0; k < data.length; k++) {
        this.drugForm.patchValue(this.fetchEidtdata(
          data[k][0],
          data[k][1],
          data[k][2],
          data[k][3],
          data[k][4],
          data[k][5],
          data[k][6],
          data[k][7],
          data[k][8],
          data[k][9],
          data[k][10],
          data[k][11],
          data[k][12],
          data[k][13],
          data[k][14],
          data[k][15],
          data[k][16],
          data[k][17],
          data[k][18],
          data[k][19],
          data[k][20],
          data[k][21],
          data[k][22],
          data[k][23],
          data[k][24],
          data[k][25],
          data[k][26],
        ));
      }
      temp = 1;
    }
    if (temp == 1) {
      this.drugservice.geteditGeneric1(this.drugid).subscribe(data =>  this.generic = data,
      err => {
        console.log('Error Occured geteditGeneric');
      });



      
      this.drugservice.geteditFormulation(this.drugForm.get('formulationid').value).subscribe(data => this.formulation = data,
        err => {
          console.log('Error Occured geteditFormulation');
        });


        this.drugservice.geteditDistributorChannel(this.drugForm.get('distimporterid').value).subscribe(data => this.distchannel = data,
          err => {
            console.log('Error Occured getDistributorChannel');
          });
  

      this.drugservice.geteditInsurance(this.drugid).subscribe(data => { this.geteditInsurance(data) },
        err => {
          console.log('Error Occured geteditInsurance');
        });

      this.drugservice.geteditSchedule(this.drugForm.get('schudletype').value).subscribe(data => this.schedule = data,
        err => {
          console.log('Error Occured geteditSchedule');
        });

      this.drugservice.geteditVat(this.drugForm.get('vat').value).subscribe(data => this.vat = data,
        err => {
          console.log('Error Occured geteditVat');
        });

      this.drugservice.geteditGst(this.drugForm.get('gst').value).subscribe(data => this.gst = data,
        err => {
          console.log('Error Occured Gst');
        });

      this.drugservice.geteditSgst(this.drugForm.get('sgst').value).subscribe(data => this.sgst = data,
        err => {
          console.log('Error Occured Sgst');
        });

      this.drugservice.geteditCgst(this.drugForm.get('cgst').value).subscribe(data => this.cgst = data,
        err => {
          console.log('Error Occured Cgst');
        });

      this.drugservice.geteditIgst(this.drugForm.get('igst').value).subscribe(data => this.igst = data,
        err => {
          console.log('Error Occured Igst');
        });


        
      // this.drugservice.geteditdistributorchannel(this.drugForm.get('distimporterid').value).subscribe(data => this.distchannel = data,
      //   err => {
      //     console.log('Error Occured Igst');
      //   });




      this.drugservice.getFormulation().subscribe(data => this.formulation = data,
        err => {
          console.log('Error Occured getFormulation');
        });



        //Get Distributor Channel

        this.drugservice.getDistributorChannel().subscribe(data => this.distchannel = data,
          err => {
            console.log('Error Occured getDistributorChannel');
          });
  


      //Get Vat
      this.drugservice.getVat().subscribe(data => this.vat = data,
        err => {
          console.log('Error Occured Vat');
        });
      //Get Gst
      this.drugservice.getGst().subscribe(data => this.gst = data,
        err => {
          console.log('Error Occured Gst');
        });
      //Get sgst
      this.drugservice.getSgst().subscribe(data => this.sgst = data,
        err => {
          console.log('Error Occured Sgst');
        });
      //Get cgst
      this.drugservice.getCgst().subscribe(data => this.cgst = data,
        err => {
          console.log('Error Occured Cgst');
        });
      //Get igst
      this.drugservice.getIgst().subscribe(data => this.igst = data,
        err => {
          console.log('Error Occured Igst');
        });
      //Get Schedule
      this.drugservice.getSchedule().subscribe(data => this.schedule = data,
        err => {
          console.log('Error Occured getSchedule');
        });
    }
  }
  geteditGeneric(id: any) {
    this.drugservice.geteditGeneric(id).subscribe(data => {
      this.generic = [];
      for (let i = 0; i < data.length; i++) {
        this.generic.push({ value: data[i][0], label: data[i][1] });
      }
    },
      err => {
        console.log('Error Occured geteditGeneric()');
      });
  }
  fetchEidtdata(d0: any, d1: any, d2: any, d3: any, d4: any, d5: any, d6: any, d7: any, d8: any, d9: any, d10: any, d11: any, d12: any,
    d13: any, d14: any, d15: any, d16: any, d17: any, d18: any, d19: any, d20: any, d21: any,
    d22: any, d23: any, d24: any, d25: any,d26:any) {
    return {
      id: d0,
      brandname: d1,
      genericid: d2,
      genericcombinationid: '',
      genericnamedosage: d3,
      uom: d4,
      vat: d5,
      gst: d19,
      sgst: d8,
      cgst: d6,
      igst: d7,
      formulationid: d9,
      schudletype: d10,
      mrp: d11,
      minqty: d12,
      maxqty: d13,
      boxpercartoon: d16,
      stripperbox: d17,
      quantityperstrip: d18,
      banneddrug: d14,
      photos: '',
      barcode: '',
      productregno: d20,
      distimporterid: d21,
      banneddrugreason: d15,
      companyid: d24,
      branchid: d25,
      locname: d22,
      locrefid: d23,
      uniformproductcode:d26,
    }
  }

  getGeneric(value: string) {
    this.generic = [];
    this.drugservice.getGeneric(value).subscribe(data => {
      this.generic = [];
      for (let i = 0; i < data.length; i++) {
        this.generic.push({ value: data[i][0], label: data[i][1] });
      }
    },
      err => {
        console.log('Error Occured Get generic');
      });
  }




  ngOnInit() {
    
    this.drugValue = this.route.params.subscribe(params => {
      this.drugid = +params['drugid'];
    });

    /**Get Edit values From view From **/
    this.drugservice.getdrugEditvalues(this.drugid).subscribe(data => this.getEditdata(data),
      error => {
        console.log('Error occured in Drug getdrugEditvalues');
      });

    /*this.drugservice.getInsurance().subscribe(data => { this.insurance = data, this.getInsurance() },
      err => {
      console.log('Error Occured getInsurance');
      });*/

    this.dropdownSettings = {
      maxHeight: 400,
      singleSelection: false,
      text: "---Select InsuranceType---",
      badgeShowLimit: 1,
      classes: "myclass custom-class"
    };

  }


  isValid: boolean = false;
  changeValue(valid: boolean) {
    this.isValid = valid;
  }



  getInsurance() {
    for (this.i = 0; this.i < this.insurance.length; this.i++) {
      this.insurancetype.push({ id: this.insurance[this.i][0], itemName: this.insurance[this.i][1] });
    }
  }

  geteditInsurance(data: any) {
    for (this.i = 0; this.i < data.length; this.i++) {
      this.insurancetype.push({ id: data[this.i][0], itemName: data[this.i][1] });
    }
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

  public reFlag: boolean = false;
  onSubmit() {
    this.submitted = true;
    this.reFlag = this.drugInputValidation();
    if (this.reFlag == true) {
      this.updateRecord();
    }
  }

  private updateRecord() {

    this.insu = this.drugForm.get('insuranceid').value;

    if (this.drugForm.get('genericids').value != null) {
      this.drugForm.get('genericid').setValue(this.drugForm.get('genericids').value);
    }

    this.drugservice.updteDrug(JSON.stringify(this.drugForm.value)).subscribe(data => {
      if (data == true) {
        this.drugservice.insuranceSave(JSON.stringify(this.insu));
        this.devicedetails();
        this.deviceObj.apiname="api/drugupdateRecord";
        this.deviceObj.description="Update Drug Data";
        this.drugservice.devicedetails(JSON.stringify(this.deviceObj)).subscribe(data => {});
        this.notificationsComponent.addToast({ title: 'Success Message', msg: 'DATA UPDATED SUCCESSFULLY', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
        setTimeout(() => {
          this.router.navigate(['ProductMaster/ViewProductList']);
        }, 3000);
      }
    });
  }

  drugInputValidation(): boolean {
    if (this.drugForm.get('brandname').value == '' || this.drugForm.get('brandname').value == null) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'ProductName must Not be Empty', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.drugForm.get('genericid').value == null && this.drugForm.get('genericcombinationid').value == null) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Generic Or Generic-Combination  must Not be Empty', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.drugForm.get('genericnamedosage').value == '' || this.drugForm.get('genericnamedosage').value == null) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Dosage Value must Not be Empty', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.drugForm.get('uom').value == '' || this.drugForm.get('uom').value == null) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'UOM must Not be Empty', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.drugForm.get('vat').value == '0' || this.drugForm.get('vat').value == null) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'VAT must Not be Empty', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    // if (this.drugForm.get('gst').value == '0' || this.drugForm.get('gst').value == null) {
    //   this.notificationsComponent.addToast({ title: 'Error Message', msg: 'GST must Not be Empty', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    //   return false;
    // }
    if (this.drugForm.get('formulationid').value == '0' || this.drugForm.get('formulationid').value == null) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Formulation must Not be Empty', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.drugForm.get('mrp').value == '' || this.drugForm.get('mrp').value == null) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'MRP must Not be Empty', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.drugForm.get('boxpercartoon').value == '' || this.drugForm.get('boxpercartoon').value == null) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Box Quantity must Not be Empty', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.drugForm.get('stripperbox').value == '' || this.drugForm.get('stripperbox').value == null) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'StripPerBox must Not be Empty', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.drugForm.get('quantityperstrip').value == '' || this.drugForm.get('quantityperstrip').value == null) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Quantity must Not be Empty', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }

    return true;
  }
}

