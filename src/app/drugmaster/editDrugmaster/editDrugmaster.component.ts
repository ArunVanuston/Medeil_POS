import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { providers } from 'ng2-toasty';
import { editdrugService } from './editDrugmaster.services';
import { HttpClient, HttpResponse, HttpEventType } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { AppComponent } from '../../app.component';
import { dateFormatPipe } from 'app/notifications/notifications.datepipe';
import { cardToggle } from 'app/shared/card/card-animation'; 
import { TranslateService } from 'ng2-translate';
import { adddrugService } from '../addDrugmaster/addDrugmaster.services';

@Component({
  selector: 'app-drugmaster',
  templateUrl: './editDrugmaster.component.html',
  animations: [cardToggle],
  providers: [editdrugService,adddrugService,NotificationsComponent]
})
export class editdrugComponent implements OnInit {
  /**  view to Edit call**/
  parentMessage="sales";
  drugid: number;
  private drugValue: any;
  additionalcardToggle: string = 'collapsed';
  taxcardToggle:string='collapsed';
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
  Manufacturername=[];
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
  maingroup = [];
  subgroup1 = [];
  subgroup2 = [];
  i;
  drugForm: FormGroup;
  textPattern = "[a-zA-Z][a-zA-Z ]+";
  textnumbers = '^[0-9]+(\.[0-9]{1,2})?$';
  deviceObj: any;
  verticallist:any;
  getgenericname:any;
  getmanufacturename:any;
  constructor(public translate: TranslateService,private drugservice: editdrugService, private route: ActivatedRoute, private router: Router,
    private notificationsComponent: NotificationsComponent,private appComponent: AppComponent, 
    private dateformat: dateFormatPipe,private drugservice1: adddrugService) { translate.setDefaultLang('en');
    let brandname = new FormControl('', [Validators.pattern(this.textPattern)]);
    let pharmacompanyid=new FormControl();
    let selectedCountry = new FormControl();
    let genericid = new FormControl();
    let genericids = new FormControl();
    let genericcombinationid = new FormControl();
    let genericnamedosage = new FormControl();
    let uom = new FormControl('mg');
    let therapeuticid = new FormControl();
    let subtherapeuticid = new FormControl();
    let vat = new FormControl();
    let gst = new FormControl();
    let sgst = new FormControl();
    let cgst = new FormControl();
    let igst = new FormControl();
    let formulationid = new FormControl();
    let schudletype = new FormControl();
    let mrp = new FormControl(0,[Validators.pattern(this.textnumbers)]);
    let minqty = new FormControl(0, Validators.pattern(this.textnumbers));
    let maxqty = new FormControl(0, Validators.pattern(this.textnumbers));
    let insuranceid = new FormControl();
    let boxpercartoon = new FormControl(0, Validators.pattern(this.textnumbers));
    let stripperbox = new FormControl(0, Validators.pattern(this.textnumbers));
    let quantityperstrip = new FormControl(0, Validators.pattern(this.textnumbers));
    let banneddrug = new FormControl();
    let selectedCharacter = new FormControl();
    let photos = new FormControl();
    let barcode = new FormControl();
    let id = new FormControl();
    let productregno = new FormControl();
    let distimporterid = new FormControl();
    let banneddrugreason = new FormControl();
    let companyid = new FormControl(AppComponent.companyID);
    let branchid = new FormControl(AppComponent.branchID);
    let locname = new FormControl(AppComponent.locRefName1);
    let locrefid = new FormControl(AppComponent.locrefID1);
    let uniformproductcode = new FormControl();
    let drugstatus = new FormControl(1);
    let verticalid = new FormControl(sessionStorage.getItem('verticalrank'));
    let temperature= new FormControl(0);
    let temptype=new FormControl('C');
    let production_sunlight=new FormControl('No');
    let narcoticdrug=new FormControl('No');
    let emergency_type=new FormControl('No');
    let hanzoration_drug=new FormControl('No');
    let sanitizing=new FormControl('No');
    let coldstorage=new FormControl('No');
    let stock_available=new FormControl('nil');
    let groupid=new FormControl('0');
    let subgroupid1=new FormControl('0');
    let subgroupid2=new FormControl('0');
    let hsnid=new FormControl('0');
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
      drugstatus:drugstatus,
      verticalid:verticalid,
      pharmacompanyid:pharmacompanyid,
      //Additional Details
      temperature:temperature,
      stock_available:stock_available,
      temptype:temptype,
      production_sunlight:production_sunlight,
      narcoticdrug:narcoticdrug,
      emergency_type:emergency_type,
      hanzoration_drug:hanzoration_drug,
      sanitizing:sanitizing,
      coldstorage:coldstorage,
      groupid:groupid,
      subgroupid1:subgroupid1,
      subgroupid2:subgroupid2,
      hsnid:hsnid
    });
  }

  fieldhide : any;
  taxid: number;
  taxgstid:number=0;
  state:number;
  unionstate=[20934,20936,20940,20948,21773,21775,21776];
  ngOnInit() {
    this.translate.use(localStorage.getItem('language'));
    this.drugValue = this.route.params.subscribe(params => {
      this.drugid = +params['drugid'];
    });
    //this.drugForm.get('verticalid').setValue(sessionStorage.getItem('verticalrank'));
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

    setTimeout(() => {
      this.drugservice1.getFieldhide(AppComponent.companyID, AppComponent.branchID,
        AppComponent.shopID, AppComponent.locrefID)
        .subscribe(data => {
          if(data.length>0){
            this.fieldhide = data[0][0];
          }else{
            this.fieldhide = 2;
          }
          this.drugservice1.gettaxCountrystate(AppComponent.companyID, AppComponent.branchID, AppComponent.locRefName1, AppComponent.locrefID1).subscribe(data => { this.state = data
            if (this.fieldhide == 2) {
              // this.taxgstid=1;
              for (this.i = 0; this.i < this.unionstate.length; this.i++) {
                if (this.state[0][1] == this.unionstate[this.i]) {
                  //  this.taxid=0;
                  this.taxid = 2;
                  this.taxgstid = 2;
                  break;
                } else {
                  this.taxid = 2;
                  this.taxgstid = 1;
                }
              }
            } else {
              this.taxid = null;
              this.taxgstid = 0;
            }
          })
        },
          error => {
            console.log('Error Occured On getFieldhide()');
          });  
      
    }, 1200);

  }

  AdditionaltoggleCard() {
    this.additionalcardToggle = this.additionalcardToggle === 'collapsed' ? 'expanded' : 'collapsed';
  }

  TaxtoggleCard() {
    this.taxcardToggle = this.taxcardToggle === 'collapsed' ? 'expanded' : 'collapsed';
    //this.gethsnchapter();
  }
  getmanufactid:any=0;
  getEditdata(data: any) {
    let k;
    let temp: number = 0;
    if (data !== undefined || data !== null) {
      //this.getmanufactid=data[0][39];
      //this.drugForm.get('pharmacompanyid').setValue(data[0][39].toString());
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
          data[k][27],
          data[k][28],
          data[k][29],
          data[k][30],
          data[k][31],
          data[k][32],
          data[k][33],
          data[k][34],
          data[k][35],
          data[k][36],
          data[k][37],
          data[k][38],
          data[k][39],
          data[k][40]
        ));
      }
      temp = 1;
    }

    if (temp == 1) {
      
      this.drugservice.geteditGeneric(data[0][2]).subscribe(drdata => {
        this.getgenericname=drdata[0][1];
      },err => {
          console.log('Error Occured geteditGeneric()');
      });
      // this.drugservice.getVerticals(AppComponent.countryID).subscribe(data => { this.verticallist = data},
      //   err => { console.log('Error Occured On getATC()') });

      this.drugservice.mainGroup(sessionStorage.getItem('verticalrank')).subscribe(data => this.maingroup = data,
          err => {
            console.log('Error Occured MainGroup');
      });    

      this.drugservice.getFormulation().subscribe(data => this.formulation = data,
          err => {
            console.log('Error Occured getFormulation');
      });

      this.drugservice.getSchedule().subscribe(data => this.schedule = data,
        err => {
          console.log('Error Occured getSchedule');
      });
  
      this.drugservice.subGroup1(sessionStorage.getItem('verticalrank'),data[0][36]).subscribe(data => 
        this.subgroup1 = data,
        err => {
          console.log('Error Occured geteditSchedule');
      });

      this.drugservice.subGroup2(sessionStorage.getItem('verticalrank'),data[0][37]).subscribe(data => 
        this.subgroup2 = data,
        err => {
          console.log('Error Occured geteditSchedule'); 
      });

      setTimeout(() => {
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
      }, 2800);

      setTimeout(() => {
        this.drugservice.geteditManufacture(this.drugForm.get('pharmacompanyid').value).subscribe(data =>{
         this.getmanufacturename=data[0][1];
        },err => {
            console.log('Error Occured geteditFormulation');
        });

       /* this.drugservice.geteditVat(this.drugForm.get('vat').value).subscribe(data => this.vat = data,
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

        this.drugservice.geteditDistributorChannel(this.drugForm.get('distimporterid').value).subscribe(data => this.distchannel = data,
          err => {
            console.log('Error Occured getDistributorChannel');
        });
        
        this.drugservice.geteditInsurance(this.drugid).subscribe(data => { this.geteditInsurance(data) },
        err => {
          console.log('Error Occured geteditInsurance');
        });

        this.drugservice.geteditFormulation(this.drugForm.get('formulationid').value).subscribe(data => this.formulation = data,
          err => {
            console.log('Error Occured geteditFormulation');
        });

        this.drugservice.geteditSchedule(this.drugForm.get('schudletype').value).subscribe(data => this.schedule = data,
          err => {
            console.log('Error Occured geteditSchedule');
        });

      */
     
      }, 2500);
      
     
      
    }
  }

  fetchEidtdata(d0: any, d1: any, d2: any, d3: any, d4: any, d5: any, d6: any, d7: any, d8: any, d9: any, d10: any, d11: any, d12: any,
    d13: any, d14: any, d15: any, d16: any, d17: any, d18: any, d19: any, d20: any, d21: any,d22: any, d23: any, d24: any, d25: any,
    d26:any,d27:any,d28:any,d29:any,d30:any,d31:any,d32:any,d33:any,d34:any,d35:any,d36:any,d37:any,d38:any,d39:any,d40:any) {
    return {
      id: d0,
      brandname: d1,
      genericid: d2,
      genericnamedosage: d3,
      uom: d4,
      vat: d5,
      cgst: d6,
      igst: d7,
      sgst: d8,
      formulationid: d9,
      schudletype: d10,
      mrp: d11,
      minqty: d12,
      maxqty: d13,
      banneddrug:d14,
      banneddrugreason: d15,
      boxpercartoon: d16,
      stripperbox: d17,
      quantityperstrip: d18,
      gst: d19,
      productregno: d20,
      distimporterid: d21,
      locname: d22,
      locrefid: d23,
      companyid: d24,
      branchid: d25,
      uniformproductcode:d26,
      temperature:d27,
      // temptype:d27,
      stock_available:d28,
      emergency_type:d29,
      narcoticdrug:d30,
      hanzoration_drug:d31,
      production_sunlight:d32,    
      sanitizing:d33,
      verticalid:d34,
      coldstorage:d35,
      photos: '',
      barcode: '',
      genericcombinationid: '',
      groupid:d36,
      subgroupid1:d37,
      subgroupid2:d38,
      pharmacompanyid:d39.toString(),
      hsnid:d40
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

   //Get manufacturer name 
   getmanufacturer(value: string) {
    this.Manufacturername = [];
    this.drugservice.getManufacturer(value).subscribe(data => {
      this.Manufacturername = [];
      for (let i = 0; i < data.length; i++) {
        this.Manufacturername.push({ value: data[i][0], label: data[i][1] });
      }
    },err => {
        console.log('Error Occured Get manufacturer');
    });
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

  getSubgroup1() {
    this.drugForm.get('subgroupid1').setValue(0);
    this.drugForm.get('subgroupid2').setValue(0);
    this.drugservice.subGroup1(sessionStorage.getItem('verticalrank'), this.drugForm.get('groupid').value).subscribe(data => this.subgroup1 = data,
      err => {
        console.log('Error Occured Get subgroup 1');
      });
  }

  getSubgroup2() {
    this.drugForm.get('subgroupid2').setValue(0);
    this.drugservice.subGroup2(sessionStorage.getItem('verticalrank'), this.drugForm.get('subgroupid1').value).subscribe(data => { this.subgroup2 = data },
      err => {
        console.log('Error Occured Get subgroup 2');
      });
  }

  public reFlag: boolean = false;
  onSubmit() {
    this.submitted = true;
    this.reFlag = this.drugInputValidation();
    if (this.reFlag == true) {
      this.updateRecord();
    }
  }

  saveprocess:boolean=false;
  private updateRecord() {
    this.saveprocess=true;
    //this.insu = this.drugForm.get('insuranceid').value;
    if (this.drugForm.get('genericids').value != null) {
      this.drugForm.get('genericid').setValue(this.drugForm.get('genericids').value);
    }

    this.drugservice.updteDrug(JSON.stringify(this.drugForm.value)).subscribe(data => {
      if (data == true) {
        this.saveprocess=false;
        this.notificationsComponent.addToast({ title: 'Success Message', msg: 'DATA UPDATED SUCCESSFULLY', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
        //this.drugservice.insuranceSave(JSON.stringify(this.insu));
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
    }else if (this.drugForm.get('genericid').value == '' || this.drugForm.get('genericid').value == null) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Generic Or Generic-Combination  must Not be Empty', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }else if (this.drugForm.get('genericnamedosage').value == '' || this.drugForm.get('genericnamedosage').value == null) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Dosage Value must Not be Empty', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }else if (this.drugForm.get('uom').value == '' || this.drugForm.get('uom').value == null) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'UOM must Not be Empty', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.drugForm.get('formulationid').value == '0' || this.drugForm.get('formulationid').value == null) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Formulation must Not be Empty', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    // if (this.drugForm.get('vat').value == '0' || this.drugForm.get('vat').value == null) {
    //   this.notificationsComponent.addToast({ title: 'Error Message', msg: 'VAT must Not be Empty', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    //   return false;
    // }
    // if (this.drugForm.get('gst').value == '0' || this.drugForm.get('gst').value == null) {
    //   this.notificationsComponent.addToast({ title: 'Error Message', msg: 'GST must Not be Empty', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    //   return false;
    // }
   
    // if (this.drugForm.get('mrp').value == '' || this.drugForm.get('mrp').value ==0 || this.drugForm.get('mrp').value == null) {
    //   this.notificationsComponent.addToast({ title: 'Error Message', msg: 'MRP must Not be Empty', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    //   return false;
    // }
    // if (this.drugForm.get('boxpercartoon').value == '' || this.drugForm.get('boxpercartoon').value == null) {
    //   this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Box Quantity must Not be Empty', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    //   return false;
    // }
    // if (this.drugForm.get('stripperbox').value == '' || this.drugForm.get('stripperbox').value == null) {
    //   this.notificationsComponent.addToast({ title: 'Error Message', msg: 'StripPerBox must Not be Empty', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    //   return false;
    // }
    // if (this.drugForm.get('quantityperstrip').value == '' || this.drugForm.get('quantityperstrip').value == null) {
    //   this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Quantity must Not be Empty', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    //   return false;
    // }

    return true;
  }
}

