import { Component, OnInit, Input, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from "@angular/forms";
import { adddrugService } from './addDrugmaster.services';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient, HttpResponse, HttpEventType } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import * as $ from 'jquery';
import swal from 'sweetalert2';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { AppComponent } from '../../app.component';
import { Router } from '@angular/router';
import { dateFormatPipe } from 'app/notifications/notifications.datepipe';
import { formControlBinding } from '@angular/forms/src/directives/ng_model';
import { HsncodeService } from 'app/hsncode/hsncode.service';
import { cardToggle } from 'app/shared/card/card-animation';
import { TranslateService } from 'ng2-translate';

@Component({
  selector: 'app-drugmaster',
  templateUrl: './addDrugmaster.component.html',
  animations: [cardToggle],
  providers: [adddrugService, NotificationsComponent,HsncodeService]
})

export class adddrugComponent implements OnInit {
  parentMessage="sales";
  @Input() multiple: boolean = false;
  @ViewChild('fileInput') inputEl: ElementRef;
  otherscardToggle: string = 'collapsed';
  taxcardToggle: string = 'collapsed';
  additionalcardToggle: string = 'collapsed';
  currnot = "Currently Not Available....";
  closeResult: string;
  submitted = false;
  show = false;
  characters = [];
  chars = [];
  selectedCharacter: string = '3';
  countries = [];
  states = [];
  items = [];
  dropdownSettings = {};
  dropdownList = [];
  genericdata = [];
  fieldhide : any;
  gentype = [];
  maingroup = [];
  subgroup1 = [];
  subgroup2 = [];
  selobj;
  genericCombination = [];


  //dosage = [];
  //uom = [];
  therapeutic = [];
  subtherapeutic = [];
  formulation = [];
  ditributorchann = [];

  Manufacturername = [];
  manudivision = [];

  schedule = [];
  insurance = [];
  insurancetype = [];
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
  taxid: number;
  taxgstid:number=0;
  state:number;
  hsnc: any;
  hsnlist=[];
  description: any;
  idescrlist: any;
  constructor(public translate: TranslateService,private drugservice: adddrugService, private sanitizer: DomSanitizer, private fb: FormBuilder,
    private notificationsComponent: NotificationsComponent, private router: Router, private modalService: NgbModal,
    private appComponent: AppComponent, private dateformat: dateFormatPipe,private hsnservice:HsncodeService) { translate.setDefaultLang('en');
   
    //Validators.pattern("[a-zA-Z]*")
    let brandname = new FormControl('',[Validators.required]);
    let selectedCountry = new FormControl();
    let genericid = new FormControl();
    let groupid = new FormControl();
    let subgroupid1 = new FormControl();
    let subgroupid2 = new FormControl();
    let genericname = new FormControl();
    let groupname = new FormControl();
    let subgroupname1 = new FormControl();
    let subgroupname2 = new FormControl();
    let genericcombinationid = new FormControl();
    let genericnamedosage = new FormControl();
    let uom = new FormControl('mg', [Validators.pattern("[a-zA-Z]*")]);
    let vat = new FormControl();
    let gst = new FormControl();
    let sgst = new FormControl();
    let ugst = new FormControl();
    let cgst = new FormControl();
    let igst = new FormControl();
    let hsnchap = new FormControl(0);
    let hsnid = new FormControl(0);
    let formulationid = new FormControl();
    let pharmacompanyid = new FormControl();
    let manufacturerdivisionid = new FormControl();
    let schudletype = new FormControl();
    let mrp = new FormControl((0).toFixed(2),[Validators.pattern("[0-9.]*")]);
    let minqty = new FormControl('', Validators.pattern(this.textnumbers));
    let maxqty = new FormControl('', Validators.pattern(this.textnumbers));
    let insuranceid = new FormControl('0');
    let boxpercartoon = new FormControl('', Validators.pattern(this.textnumbers));
    let stripperbox = new FormControl('', Validators.pattern(this.textnumbers));
    let quantityperstrip = new FormControl('', Validators.pattern(this.textnumbers));
    let banneddrug = new FormControl();
    let banneddrugreason = new FormControl();
    let selectedCharacter = new FormControl();
    let choosephotos = new FormControl();
    let barcode = new FormControl();
    let productregno = new FormControl();
    let distimporterid = new FormControl();
    let custflag = new FormControl();
    let companyid = new FormControl();
    let branchid = new FormControl();
    let locname = new FormControl();
    let locrefid = new FormControl();
    let verticalid = new FormControl('opt1');
    let drugstatus = new FormControl(1);
    let verticalname = new FormControl();
    let temperature= new FormControl();
    let temptype=new FormControl('C');
    let production_sunlight=new FormControl('No');
    let narcoticdrug=new FormControl('No');
    let emergency_type=new FormControl('No');
    let hanzoration_drug=new FormControl('No');
    let sanitizing=new FormControl('No');
    let coldstorage=new FormControl('No');
    let stock_available=new FormControl('nil');
    let qcstatus=new FormControl(0);
    let countryid=new FormControl(AppComponent.countryID);
    this.drugForm = new FormGroup({
      genericname: genericname,
      groupname: groupname,
      subgroupname1: subgroupname1,
      subgroupname2: subgroupname2,
      brandname: brandname,
      genericid: genericid,
      groupid: groupid,
      subgroupid1: subgroupid1,
      subgroupid2: subgroupid2,
      genericcombinationid: genericcombinationid,
      genericnamedosage: genericnamedosage,
      uom: uom,
      vat: vat,
      gst: gst,
      sgst: sgst,
      cgst: cgst,
      igst: igst,
      ugst: ugst,
      hsnchap:hsnchap,
      hsnid:hsnid,
      formulationid: formulationid,
      pharmacompanyid: pharmacompanyid,
      manufacturerdivisionid: manufacturerdivisionid,
      schudletype: schudletype,
      mrp: mrp,
      minqty: minqty,
      maxqty: maxqty,
      insuranceid: insuranceid,
      boxpercartoon: boxpercartoon,
      stripperbox: stripperbox,
      quantityperstrip: quantityperstrip,
      banneddrug: banneddrug,
      choosephotos: choosephotos,
      barcode: barcode,
      productregno: productregno,
      distimporterid: distimporterid,
      banneddrugreason: banneddrugreason,
      custflag: custflag,
      companyid: companyid,
      branchid: branchid,
      locname: locname,
      locrefid: locrefid,
      verticalid:verticalid,
      verticalname:verticalname,
      drugstatus:drugstatus,
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
       qcstatus:qcstatus,
       countryid:countryid,
       FormArrayOne: this.fb.array([])
    });

  }
  private addmanuf = "";
  unionstate=[20934,20936,20940,20948,21773,21775,21776]
  verticallist=[];

  OtherstoggleCard() {
    this.otherscardToggle = this.otherscardToggle === 'collapsed' ? 'expanded' : 'collapsed';
  }

  TaxtoggleCard() {
    this.taxcardToggle = this.taxcardToggle === 'collapsed' ? 'expanded' : 'collapsed';
    this.gethsnchapter();
  }

  AdditionaltoggleCard() {
    this.additionalcardToggle = this.additionalcardToggle === 'collapsed' ? 'expanded' : 'collapsed';
  }

  verticalrank:any;
  ngOnInit() {
    this.translate.use(localStorage.getItem('language'));
    this.drugForm.get('groupid').setValue("0");
    this.drugForm.get('subgroupid1').setValue("0");
    this.drugForm.get('subgroupid2').setValue("opt1");
    //Here to Set Default Values For DropDownBoxes        
    this.drugForm.get('vat').setValue("0");
    this.drugForm.get('gst').setValue("0");
    this.drugForm.get('sgst').setValue("0");
    this.drugForm.get('cgst').setValue("0");
    this.drugForm.get('ugst').setValue("0");
    this.drugForm.get('igst').setValue("0");
    this.drugForm.get('formulationid').setValue("0");
    this.drugForm.get('pharmacompanyid').setValue("0");
    this.drugForm.get('manufacturerdivisionid').setValue("0");
    this.drugForm.get('schudletype').setValue("0");
    this.drugForm.get('distimporterid').setValue("0");
    this.drugForm.get('boxpercartoon').setValue('');
    this.drugForm.get('stripperbox').setValue("");
    this.drugForm.get('quantityperstrip').setValue("");
    this.drugForm.get('custflag').setValue("1");
    this.drugForm.get('banneddrug').setValue("0");
    this.drugForm.get('companyid').setValue(AppComponent.companyID);
    this.drugForm.get('branchid').setValue(AppComponent.branchID);
    this.drugForm.get('locname').setValue(AppComponent.locRefName1);
    this.drugForm.get('locrefid').setValue(AppComponent.locrefID1);
    this.drugForm.get('verticalid').setValue(sessionStorage.getItem('verticalrank'));
    this.verticalrank=sessionStorage.getItem('verticalrank');
    // this.drugservice.getVerticals(AppComponent.countryID).subscribe(data => { this.verticallist = data},
    //   err => { console.log('Error Occured On getATC()') });
    // this.drugservice.mainGroup(this.drugForm.get('verticalid').value).subscribe(data => this.maingroup = data,
    //   err => {
    //     console.log('Error Occured MainGroup');
    //   });

    
    //Get Formulation
    this.drugservice.getFormulation().subscribe(data =>{this.getFormulation(data);
      },err => {
        console.log('Error Occured getFormulation');
    });

    //Get Distributor Channel

    this.drugservice.getdistributorchannel(AppComponent.companyID,AppComponent.branchID,AppComponent.locRefName1,AppComponent.locrefID1).subscribe(data => this.ditributorchann = data,
      err => {
        console.log('Error occured getdistributorchannel()');
    });

    //Get Manufacturer Name
    // this.drugservice.getPharmacompany().subscribe(data => this.pharmacompany = data,

    //   err => {

    //     console.log('Error Occured getPharmaCompany()');
    //   });

    //Get Schedule
    this.drugservice.getSchedule().subscribe(data => this.schedule = data,
      err => {
        console.log('Error Occured getSchedule');
      });

    setTimeout(() => {
      this.drugservice.mainGroup(this.drugForm.get('verticalid').value).subscribe(data => this.maingroup = data,
        err => {
          console.log('Error Occured MainGroup');
      });

      //Get Insurance
      this.drugservice.getInsurance().subscribe(data => { this.insurance = data, this.getInsurance() },
    
      err => {
        console.log('Error Occured getInsurance');
      });
     

      //Drug Search 
      this.drugservice.getval().subscribe(data => {
      this.characters = data.map(obj => ({ value: obj.id, label: obj.companyname }));
      });

      setTimeout(() => {
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
        setTimeout(() => {
          this.drugservice.getFieldhide(AppComponent.companyID, AppComponent.branchID,
            AppComponent.shopID, AppComponent.locrefID)
            .subscribe(data => {
              if(data.length>0){
                this.fieldhide = data[0][0];
              }else{
                this.fieldhide = 2;
              }
              this.drugservice.gettaxCountrystate(AppComponent.companyID, AppComponent.branchID, AppComponent.locRefName1, AppComponent.locrefID1).subscribe(data => { this.state = data
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
        }, 1300);
      }, 1500);
    }, 1300);

    this.dropdownSettings = {
      maxHeight: 400,
      singleSelection: false,
      text: "---Select InsuranceType---",
      badgeShowLimit: 1,
      classes: "myclass custom-class"
    };

  }

  searcheddrugvalues = [];
  getdruglist(searchvalue:any){
    if(searchvalue.length>0){
          this.drugservice.searchdrug(AppComponent.companyID,searchvalue).subscribe(data => {
            if (data.length > 0) {
              this.searcheddrugvalues = data;
            } else {
              this.searcheddrugvalues.length = 0;
              //this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'No Match Products', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
            }
        },error => { console.log(error); });
    }else{
      this.searcheddrugvalues.length = 0;
    }
  }

  //Get Hsn Chapter  Using Hsn Form Service Raja
  gethsnchapter(){
    this.hsnservice.getmdesc().subscribe(data => {
     this.hsnc = data
    });
  }

//Get Hsn code and Description Using Hsn Form Service Raja
 gethsncode(){
  this.hsnservice.gethsndesc(this.drugForm.get('hsnchap').value).then(data => {this.hsnlist = data,this.description=data});
 }

 hsndesc:string;
  prodgst:any;
  // taxid:number;
showdescription(){
  let hsncode = this.drugForm.get('hsnid').value;
  this.drugForm.get('hsnid').setValue(hsncode);
  for(let p = 0; p<this.hsnlist.length; p++){
    if(hsncode == this.hsnlist[p][0]){
      this.hsndesc = this.hsnlist[p][1];
      this.prodgst = this.hsnlist[p][3];
    }
  }
  if(this.taxid == 0){
    this.drugForm.get('vat').setValue(this.prodgst);
  }
  else if(this.taxid == 1){
    this.drugForm.get('gst').setValue(this.prodgst);
  }
  else if(this.taxid == 2){
    this.drugForm.get('cgst').setValue(this.prodgst/2);
    this.drugForm.get('sgst').setValue(this.prodgst/2);
    this.drugForm.get('ugst').setValue(this.prodgst/2);
  }
}

  gstcalc() {
    let gstval = parseFloat(this.drugForm.get('gst').value);
    let gstcal = gstval / 2;
    this.drugForm.get('sgst').setValue(gstcal);
    this.drugForm.get('cgst').setValue(gstcal);
  }
  //Get Manufacturer Division



  // getmanufactuereDiv() {

  //   this.drugservice.getmanufactuereDivision(this.drugForm.get('pharmacompanyid').value).subscribe(data => this.manudivision = data,
  //     err => {
  //       console.log('Error Occured getmanufactuereDivision()');
  //     });
  // }


  getSubgroup1() {
    this.drugForm.get('subgroupid1').setValue(0);
    this.drugForm.get('subgroupid2').setValue('opt1');
    this.drugservice.subGroup1(this.drugForm.get('verticalid').value, this.drugForm.get('groupid').value).subscribe(data => this.subgroup1 = data,
      err => {
        console.log('Error Occured Get subgroup 1');
      });
  }

  getSubgroup2() {
    this.drugForm.get('subgroupid2').setValue('opt1');
    this.drugservice.subGroup2(this.drugForm.get('verticalid').value, this.drugForm.get('subgroupid1').value).subscribe(data => { this.subgroup2 = data },
      err => {
        console.log('Error Occured Get subgroup 2');
      });
  }


  saveGeneric(c) {
    //debugger;
    let genericname=this.drugForm.get('genericname').value;
    if(genericname=='' || genericname==null || genericname==undefined){
      this.notificationsComponent.addToast({ title: 'Alert Message', msg: 'Enter Generic Name...', timeout: 7000, theme: 'default', position: 'top-right', type: 'warning' });
    }else{
      var frmdata = { genericname: genericname };
      this.drugservice.saveGenericname(JSON.stringify(frmdata)).subscribe(data => { 
        if(data){
          c('Close click');
          this.notificationsComponent.addToast({ title: 'Success Message', msg: 'Generic Saved Successfully...', timeout: 7000, theme: 'default', position: 'top-right', type: 'success' });
        }else{
          this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Generic not Saved...', timeout: 7000, theme: 'default', position: 'top-right', type: 'error' });
        }},
        errorCode =>{
          if(errorCode.status==400){
            c('Close click');
            this.notificationsComponent.addToast({ title: 'Alert Message', msg: 'Generic already Exists Saved...', timeout: 7000, theme: 'default', position: 'top-right', type: 'error' });
          }else{
            this.notificationsComponent.addToast({ title: 'Alert Message', msg: 'Generic not Saved...', timeout: 7000, theme: 'default', position: 'top-right', type: 'error' });
            console.log(errorCode)} 
        });
    }
  }


  saveMaingroup(c) {
    let groupname=this.drugForm.get('groupname').value;
    let verticalid=this.drugForm.get('verticalid').value;
    if(verticalid=='opt1'||verticalid==null||verticalid==''||verticalid==undefined){
      this.notificationsComponent.addToast({ title: 'Alert Message', msg: 'Select Vertical...', timeout: 7000, theme: 'default', position: 'top-right', type: 'warning' });
      this.drugForm.get('groupid').setValue(0);
      c('Close click');
    }else if(groupname==''||groupname==null||groupname==undefined){
      this.notificationsComponent.addToast({ title: 'Alert Message', msg: 'Enter Group Name...', timeout: 7000, theme: 'default', position: 'top-right', type: 'warning' });
    }else{
      var frmdata = { createdby: sessionStorage.getItem('indvuserid'), groupname: groupname, verticalid: verticalid };
      this.drugservice.saveMaingroup(JSON.stringify(frmdata)).
      subscribe(data => { 
      if(data){
        c('Close click');
        this.drugForm.get('groupid').setValue(0);
        this.drugservice.mainGroup(this.drugForm.get('verticalid').value).subscribe(data => this.maingroup = data,
          err => {
            console.log('Error Occured MainGroup');
          }); 
      }else{
        this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Main Group not Saved...', timeout: 7000, theme: 'default', position: 'top-right', type: 'error' });
      }
     },err =>{
      if(err.status){
        this.notificationsComponent.addToast({ title: 'Alert Message', msg: 'Main Group already Exists Saved...', timeout: 7000, theme: 'default', position: 'top-right', type: 'error' });
      }else{console.log(err)}
    });
    }
    // c('Close click')
  }

  saveSubgroup1(c) {
    let verticalid=this.drugForm.get('verticalid').value;
    let groupid=this.drugForm.get('groupid').value;
    let subgroupname1= this.drugForm.get('subgroupname1').value
    if(verticalid=='opt1'||verticalid==null||verticalid==''||verticalid==undefined){
      this.notificationsComponent.addToast({ title: 'Alert Message', msg: 'Select Vertical...', timeout: 7000, theme: 'default', position: 'top-right', type: 'warning' });
      this.drugForm.get('groupid').setValue(0);
      this.drugForm.get('subgroupid1').setValue(0);
      c('Close click');
    }else if(groupid==0|| groupid == 'nonemain' || groupid==null||groupid==''||groupid==undefined){
      this.notificationsComponent.addToast({ title: 'Alert Message', msg: 'Select Main Group...', timeout: 7000, theme: 'default', position: 'top-right', type: 'warning' });
      this.drugForm.get('subgroupid1').setValue(0);
      c('Close click');
    }else if(subgroupname1==''||subgroupname1==null||subgroupname1==undefined){
      this.notificationsComponent.addToast({ title: 'Alert Message', msg: 'Enter Sub-Group1 Name...', timeout: 7000, theme: 'default', position: 'top-right', type: 'warning' });
    }else{
      var frmdata1 = { createdby: sessionStorage.getItem('indvuserid'), verticalid: verticalid , grouprefid: this.drugForm.get('groupid').value, subgroupname1: this.drugForm.get('subgroupname1').value };
      //  c('Close click')
      this.drugservice.saveSubgroup1(JSON.stringify(frmdata1)).
      subscribe(data => { 
        if(data){
          c('Close click');
          this.drugForm.get('subgroupid1').setValue(0);
          this.drugservice.subGroup1(this.drugForm.get('verticalid').value, this.drugForm.get('groupid').value).subscribe(data => this.subgroup1 = data,
            err => {
              console.log('Error Occured Get subgroup 1');
            });
        }else{
          this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Sub-Group1 not Saved...', timeout: 7000, theme: 'default', position: 'top-right', type: 'error' });
        }
      },err => {
        if(err.status){
          this.notificationsComponent.addToast({ title: 'Alert Message', msg: 'Sub Group1 already Exists Saved...', timeout: 7000, theme: 'default', position: 'top-right', type: 'error' });
        }else{console.log(err)}
      });
    }
  }

  subgroup2flag:boolean=false;
  saveSubgroup2(c) {
    let verticalid=this.drugForm.get('verticalid').value;
    let groupid=this.drugForm.get('groupid').value;
    let subgroupid1=this.drugForm.get('subgroupid1').value
    let subgroupname2= this.drugForm.get('subgroupname2').value
    if(verticalid=='opt1'||verticalid==null||verticalid==''||verticalid==undefined){
      this.notificationsComponent.addToast({ title: 'Alert Message', msg: 'Select Vertical...', timeout: 7000, theme: 'default', position: 'top-right', type: 'warning' });
      this.drugForm.get('groupid').setValue(0);
      this.drugForm.get('subgroupid1').setValue(0);
      this.drugForm.get('subgroupid2').setValue('opt1');
      c('Close click');
    }else if(groupid==0|| groupid == 'nonemain' || groupid==null||groupid==''||groupid==undefined){
      this.notificationsComponent.addToast({ title: 'Alert Message', msg: 'Select Main Group...', timeout: 7000, theme: 'default', position: 'top-right', type: 'warning' });
      this.drugForm.get('subgroupid1').setValue(0);
      this.drugForm.get('subgroupid2').setValue('opt1');
      c('Close click');
    }else if(subgroupid1==0|| subgroupid1=='nonesub1' || subgroupid1==null||subgroupid1==''||subgroupid1==undefined){
      this.notificationsComponent.addToast({ title: 'Alert Message', msg: 'Select Sub-Group1...', timeout: 7000, theme: 'default', position: 'top-right', type: 'warning' });
      this.drugForm.get('subgroupid2').setValue('opt1');
      c('Close click');
    }else if(subgroupname2==''||subgroupname2==null||subgroupname2==undefined){
      this.notificationsComponent.addToast({ title: 'Alert Message', msg: 'Enter Sub-Group2 Name...', timeout: 7000, theme: 'default', position: 'top-right', type: 'warning' });
    }else{
      var frmdata2 = { createdby: sessionStorage.getItem('indvuserid'), verticalid: verticalid, subgrouprefid1: this.drugForm.get('subgroupid1').value, subgroupname2: this.drugForm.get('subgroupname2').value };
      this.drugservice.saveSubgroup2(JSON.stringify(frmdata2)).
      subscribe(data => { 
        if(data){
          c('Close click');
          this.drugForm.get('subgroupid2').setValue('opt1');
          this.drugservice.subGroup2(this.drugForm.get('verticalid').value, this.drugForm.get('subgroupid1').value).subscribe(data => { this.subgroup2 = data },
            err => {
              console.log('Error Occured Get subgroup 2');
            });
        }else{
          this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Sub-Group2 not Saved...', timeout: 7000, theme: 'default', position: 'top-right', type: 'error' });
        }
      },err =>{if(err.status){
        this.notificationsComponent.addToast({ title: 'Alert Message', msg: 'Sub Group1 already Exists...', timeout: 7000, theme: 'default', position: 'top-right', type: 'error' });
      }else{console.log(err)}
    });  
    }
  }

  //Get generic 
  getGeneric(value: string) {
    this.drugservice.getGeneric(value).subscribe(data => {
      this.genericdata=[];
      for (let i = 0; i < data.length; i++) {
        this.genericdata.push({ value: data[i][0], label: data[i][1] });
      }
    },err => {
        console.log('Error Occured Get generic');
    });
  }


  getFormulation(data) {
    this.formulation = [];
    for (let i = 0; i < data.length; i++) {
      this.formulation.push({ value: data[i][0], label: data[i][1] });
    }  
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

  getInsurance() {
    for (this.i = 0; this.i < this.insurance.length; this.i++) {
      this.insurancetype.push({ id: this.insurance[this.i][0], itemName: this.insurance[this.i][1] });
    }
   
  }
   

  isValid: boolean = false;
  changeValue(valid: boolean) {
    this.isValid = valid;
  }

  //QR Code Here
  elementType: 'url' | 'canvas' | 'img' = 'url';
  value: string = 'paracetamal';

  errormessage: string;
  drugimgURL: any;
  drugphoto: File;
  showimage: boolean = false;
  showeye: boolean = true;
  showeyeslash: boolean = false;
  //Drug Image Validation & Preview
  drugphotoChange(event: any) {

    this.errormessage = "";

    // when the load event is fired and the file not empty
    if (event.target.files && event.target.files.length > 0) {

      //Check & Print Type Error Message
      var mimeType = event.target.files[0].type;
      if (mimeType.match(/image\/*/) == null) {
        this.showimage = false;
        this.errormessage = "Only images are supported.";
        return;
      }


      if (event.target.files[0].size < 500000) {

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

      else {
        this.errormessage = "Max Image Size 500KB Only & Check File Format";
      }


    }

  }

  imageshow() {
    this.showimage = true;
    this.showeyeslash = true;
    this.showeye = false;
  }

  hide() {
    this.showimage = false;
    this.showeyeslash = false;
    this.showeye = true;
  }

  reset() {

    this.inputEl.nativeElement.value = "";
    this.drugimgURL = '';
    this.showimage = false;
    this.showeyeslash = false;
    this.showeye = true;
    this.errormessage = '';
  }
  /* Employee Image End */


  savedrugimage() {

    // Instantiate a FormData to store form fields and encode the file
    let body = new FormData();
    // Add file content to prepare the request
    body.append("file", this.drugphoto);

    // Launch post request Service Call
    this.drugservice.savedrugimage(body).subscribe((data) => {

      //Employee image  notification start
      if (data) {
        this.saveprocess=false;
        this.notificationsComponent.addToast({ title: 'SUCESS MESSAGE', msg: 'DATA & DRUG IMAGE SAVED SUUCCESSFULLY', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'success' });
        //this.myForm.reset();
        (<HTMLInputElement>document.getElementById("imagefile")).value = '';
      }
      else {
        this.saveprocess=false;
        this.notificationsComponent.addToast({ title: 'Warning Message', msg: 'DATA ONLY SAVED & DRUG IMAGE UNSAVED....', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
      }
      //Employee image  notification end

    });

  }


  private formSubmitAttempt: boolean;
  //public reFlag: boolean = false;
  onSubmit() {
    this.submitted = true;
    let reFlag = this.drugInputValidation();
    if (reFlag == true) {
      this.drugForm.get('companyid').setValue(parseInt(this.drugForm.get('companyid').value));
      this.drugForm.get('branchid').setValue(parseInt(this.drugForm.get('branchid').value));
      this.drugForm.get('locname').setValue(parseInt(this.drugForm.get('locname').value));
      this.drugForm.get('locrefid').setValue(parseInt(this.drugForm.get('locrefid').value));
      this.createRecord();
    }
  }

  drugInputValidation(): boolean {
    let verticalid=this.drugForm.get('verticalid').value;
    let groupid=this.drugForm.get('groupid').value;
    let subgroupid1=this.drugForm.get('subgroupid1').value;
    let subgroupid2= this.drugForm.get('subgroupid2').value;
    if(this.verticalrank==8||this.verticalrank==11){
      this.drugForm.get('genericnamedosage').setValue('nil');
    }
    if (this.drugForm.get('brandname').value == '' || this.drugForm.get('brandname').value == null) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'ProductName must Not be Empty', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }else if(groupid==0|| groupid == 'nonemain' || groupid==null||groupid==''||groupid==undefined){
      this.notificationsComponent.addToast({ title: 'Alert Message', msg: 'Select Main Group...', timeout: 7000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }else if(subgroupid1==0|| subgroupid1=='nonesub1' || subgroupid1==null||subgroupid1==''||subgroupid1==undefined){
      this.notificationsComponent.addToast({ title: 'Alert Message', msg: 'Select Sub-Category1...', timeout: 7000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }else if(subgroupid2=='opt1'||subgroupid2=='nonesub2'||subgroupid2==null||subgroupid2==undefined){
      this.notificationsComponent.addToast({ title: 'Alert Message', msg: 'Select Sub-Category2...', timeout: 7000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }else if (this.drugForm.get('genericid').value == '' || this.drugForm.get('genericid').value == null && this.drugForm.get('genericcombinationid').value == null) {
        this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Generic Or Generic-Combination  must Not be Empty', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
        return false;
    }else if (this.drugForm.get('genericnamedosage').value == '' || this.drugForm.get('genericnamedosage').value == null) {
        this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Dosage Value must Not be Empty', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
        return false;
    }else if (this.drugForm.get('uom').value == '' || this.drugForm.get('uom').value == null) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'UOM must Not be Empty', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }else if (this.drugForm.get('formulationid').value == '0' || this.drugForm.get('formulationid').value == null) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Formulation must Not be Empty', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }else if (this.drugForm.get('pharmacompanyid').value == '0' || this.drugForm.get('pharmacompanyid').value == null) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Manufacturer Name must not be Empty', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    return true;

    // else if (this.drugForm.get('vat').value == '' || this.drugForm.get('vat').value == null) {
    //   this.notificationsComponent.addToast({ title: 'Error Message', msg: 'VAT must Not be Empty', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    //   return false;
    // }
    // if (this.drugForm.get('gst').value == '0' || this.drugForm.get('gst').value == null) {
    //   this.notificationsComponent.addToast({ title: 'Error Message', msg: 'GST must Not be Empty', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    //   return false;
    // }
     // }else if (this.drugForm.get('boxpercartoon').value == '' || this.drugForm.get('boxpercartoon').value == null) {
    //   this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Box Quantity must Not be Empty', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    //   return false;
    // }else if (this.drugForm.get('stripperbox').value == '' || this.drugForm.get('stripperbox').value == null) {
    //   this.notificationsComponent.addToast({ title: 'Error Message', msg: 'StripPerBox must Not be Empty', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    //   return false;
    // }else if (this.drugForm.get('quantityperstrip').value == '' || this.drugForm.get('quantityperstrip').value == null) {
    //   this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Quantity must Not be Empty', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    //   return false;
    // }
     // if (this.drugForm.get('manufacturerdivisionid').value == '0' || this.drugForm.get('manufacturerdivisionid').value == null) {
    //   this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Manufacturer Division Must not be Empty', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });

    //   return false;
    // }
    // if (this.drugForm.get('groupid').value == '0' || this.drugForm.get('groupid').value == null) {
    //   this.notificationsComponent.addToast({ title: 'Error', msg: 'Main Group must not be empty', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    //   return false;
    // }
    // if (this.drugForm.get('subgroupid1').value == '0' || this.drugForm.get('subgroupid1').value == null) {
    //   this.notificationsComponent.addToast({ title: 'Error', msg: 'Sub Group1 must not be empty', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    //   return false;
    // }
    // if (this.drugForm.get('subgroupid2').value == '0' || this.drugForm.get('subgroupid2').value == null) {
    //   this.notificationsComponent.addToast({ title: 'Error', msg: 'Sub Group2 must not be empty', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    //   return false;
    // }


  }


  saveprocess:boolean=false;
  private createRecord() {
      this.insu = this.drugForm.get('insuranceid').value;
      this.drugForm.get('temperature').setValue(this.tempjoin);
      this.saveprocess=true;
      this.drugservice.createDrug(JSON.stringify(this.drugForm.value)).subscribe(data => {
        if (data == true) {
          this.saveprocess=false;
          //this.drugservice.createQCDrug(JSON.stringify(this.drugForm.value)).subscribe(data => {});
          this.savedrugimage();
          this.drugservice.insuranceSave(JSON.stringify(this.insu));
          // this.devicedetails();
          // this.deviceObj.apiname = "api/drugcreateRecord";
          // this.deviceObj.description = "Save Drug Details";
          // this.drugservice.devicedetails(JSON.stringify(this.deviceObj)).subscribe(data => { });
          this.openSuccessSwal();
          //this.router.navigate(['ProductMaster/ViewProductList']);
        }
      });
  }

  sanitizedImageData: any;
  sid: number = 1;
  public image: any = [];
  private readonly imageType: any = 'data:image/*;base64,';
  showInfo() {
    this.drugservice.getImage(this.sid)
      .subscribe(data =>
        this.image = this.sanitizer.bypassSecurityTrustUrl(this.imageType + data.content), error => {
          console.log('Error Occured on getImages  : ' + this.image)
        });
  }


  //this.router.navigate(['ProductMaster/ViewProductList']);
  openSuccessSwal() {
    swal({
      title: 'Good job!',
      text: 'Data Saved Sucessfully',
      type: 'success'
    }).then(() => {
      this.router.navigate(['/ProductMaster/ViewProductList']);
    }).catch(swal.noop);
  }


  open(content) {
    // debugger;
    this.modalService.open(content).result.then(

      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },

      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
  }


  open1(contenet) {
    // debugger;
    this.modalService.open(contenet).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
  }




  openmain(contenetmain) {
    this.modalService.open(contenetmain).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
  }

  opensub1(contenetsub1) {
    this.modalService.open(contenetsub1).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
  }

  opensub2(contenetsub2) {
    this.modalService.open(contenetsub2).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
  }

  searchwithcode(event, contenet) {
    if (event == 'none') {
      this.open1(contenet);
    }
    else {
      return;
    }
  }


  searchwithcodeformain(event, contenetmain) {
    this.drugForm.get('groupname').setValue('');
    if (event == 'nonemain') {
      this.openmain(contenetmain);
    }
    else {
      return;
    }
  }



  searchwithcodeforsub1(event, contenetsub1) {
    this.drugForm.get('subgroupname1').setValue('');
    this.drugForm.get('subgroupid2').setValue("opt1");
    if (event == 'nonesub1') {
      this.opensub1(contenetsub1);
    }
    else {
      return;
    }
  }


  searchwithcodeforsub2(event, contenetsub2) {
    this.drugForm.get('subgroupname2').setValue('');
    if (event == 'nonesub2') {
      this.opensub2(contenetsub2);
    }
    else {
      return;
    }
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


  //******************************************************************** */
  ATCData = [];
  public rowsOnPage: number = 10;
  public filterQuery: string = "";
  public sortBy: string = "";
  public sortOrder: string = "desc";
  genCounts: number = 2;
  //gendata = [];
  public initFormArrayTwo() {
    return this.fb.group({
      genericid: ['', []],
      dosage: ['', []],
      uom1: ['', []]
    });
  }


  genericcombinevalidate(){
    var valflag = 1;
    const Control = <FormArray>this.drugForm.get('FormArrayOne');
    let setData = Control.value;
    for (let p = 0; p < setData.length; p++) {
      if (setData[p].genericid == '' || setData[p].genericid == null) {
        valflag = 0;
        this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'Please Fill Created Generic Fields', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
        break;
      }else if (setData[p].dosage == '' || setData[p].dosage == null) {
        valflag = 0;
        this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'Please Fill Created Dosage Fields', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
        break;
      }else if (setData[p].uom1 == '' || setData[p].uom1 == null) {
        valflag = 0;
        this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'Please Fill Created UOM Fields', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
        break;
      }
    }
    return valflag;
  }

  getOtherGeneric() {
    const control = <FormArray>this.drugForm.get('FormArrayOne');
    control.controls=[];
    control.push(this.initFormArrayTwo());
    // this.drugForm.get('genericid').value;
    // this.drugForm.get('dosage').value;
    // this.drugForm.get('uom1').value;
    // control.controls[0].get('genericid1').setValue(this.drugForm.get('genericcombinationid').value);
  }

  addnewgenericrow(){
    const control = <FormArray>this.drugForm.get('FormArrayOne');
    let valflag=this.genericcombinevalidate();
    if(valflag==1){
      control.push(this.initFormArrayTwo());
    }
  }

  GetMainATCData() {
    const Control = <FormArray>this.drugForm.get('FormArrayOne');
     this.ATCData = []; Control.controls=[];
     this.drugservice.getATC(this.drugForm.get('genericid').value).subscribe(data => {  this.PushMainATCdata(data) }, err => {
       console.log('Error Occured On getATC()');
     });
  }

  CombineATCgeneric:any;
  GetCombineATCData(index:any){
    const Control = <FormArray>this.drugForm.get('FormArrayOne');
    let setData=Control.value;
    let subindx= this.genericdata.findIndex(p => p.value==setData[index].genericid);
    this.CombineATCgeneric=this.genericdata[subindx].label;
    this.drugservice.getATC(setData[index].genericid).subscribe(data => {  this.PushCombineATCdata(data) }, err => {
      console.log('Error Occured On getATC()');
    });
  }

  PushMainATCdata(ATCvalue: any){
    if (ATCvalue !== null  || ATCvalue !== undefined || ATCvalue !== '') {
      for (let i = 0; i < ATCvalue.length; i++) {
        this.ATCData.push(this.pushATCdata(
          ATCvalue[i][0],
          ATCvalue[i][1],
          ATCvalue[i][2],
          ATCvalue[i][3],
          ATCvalue[i][4],
          ATCvalue[i][5]
        ));
      }
    }
  }

  PushCombineATCdata(ATCvalue: any) {
    if (ATCvalue == null || ATCvalue.length <=0 || ATCvalue == undefined || ATCvalue == '') {
      this.ATCData.push(this.pushATCdata(
        'NA',
        'NA',
        'NA',
        'NA',
        'NA',
        this.CombineATCgeneric
       ));
    }else {
      for (let i = 0; i < ATCvalue.length; i++) {
        this.ATCData.push(this.pushATCdata(
          ATCvalue[i][0],
          ATCvalue[i][1],
          ATCvalue[i][2],
          ATCvalue[i][3],
          ATCvalue[i][4],
          ATCvalue[i][5]
        ));
      }
    }
  }

  pushATCdata(t1: any, t2: any, t3: any, t4: any, t5: any, t6: any) {
    return {
      disc1: t1,
      disc2: t2,
      disc3: t3,
      disc4: t4,
      disc5: t5,
      genericname: t6
    }
  }

  public flag: number = 0;
  SaveCombination() {
    const Control = <FormArray>this.drugForm.get('FormArrayOne');
    let setData = Control.value;
    if(setData.length>0){
      let valflag=this.genericcombinevalidate();
      if(valflag==1){
        this.drugservice.saveGenCobination(JSON.stringify(setData)).subscribe(data => {
          if (data != null || data != '') {
            this.drugForm.get('genericcombinationid').setValue(data);
            this.notificationsComponent.addToast({ title: 'Sucess', msg: 'Data Saved Sucessfully..', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
            setTimeout(() => {
              Control.controls = [];this.ATCData=[];
            }, 2000);
          } else {
            this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Data not Saved', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
          }
        },
          err => {
            console.log('Error Occured On saveGenCobination()');
          });
      }
    }else{
      this.notificationsComponent.addToast({ title: 'Alert Message', msg: 'Generic Combination Fields is Empty', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    }
  }
 
  cancel(index) {
    const Control = <FormArray>this.drugForm.get('FormArrayOne');
    //Control.controls.splice(index, 1);
    Control.removeAt(index);
    this.notificationsComponent.addToast({ title: 'Sucess', msg: 'Data Deleted Sucessfully..', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
            setTimeout(() => {
              if(Control.length<=0){
                this.ATCData=[];
              }
            },1000);
   
  }

  //Temperature Join
  tempjoin:any='0C';
  temperjoin(flag:any,val:any){
    let tempval=this.drugForm.get('temperature').value;
    let temptype;
    if(flag==1){
      temptype=this.drugForm.get('temptype').value;
    }else if(flag==2){
      temptype=val;
    }
    this.tempjoin=tempval+temptype
  }

}










