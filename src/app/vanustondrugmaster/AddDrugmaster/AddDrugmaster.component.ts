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
import { cardToggle } from 'app/shared/card/card-animation';

@Component({
  selector: 'app-drugmaster',
  templateUrl: './addDrugmaster.component.html',
  animations: [cardToggle],
  providers: [adddrugService, NotificationsComponent]
})

export class AdddrugComponent implements OnInit {

  @Input() multiple: boolean = false;
  @ViewChild('fileInput') inputEl: ElementRef;
  otherscardToggle: string = 'collapsed';
  taxcardToggle: string = 'collapsed';
  additionalcardToggle: string = 'collapsed';
  currnot= "Currently Not Available....";
  closeResult: string;
  submitted = false;
  show = false;
  characters = [];
  chars = [];
  selectedCharacter: string = '3';
  countrylist = [];
  states = [];
  items = [];
  dropdownSettings = {};
  dropdownList = [];
  genericdata = [];
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
  state:number;
  hsnc: any;
  hsnlist=[];
  ATCData=[];
  constructor(private drugservice: adddrugService, private sanitizer: DomSanitizer, private fb: FormBuilder, 
  private notificationsComponent: NotificationsComponent, private router: Router, private modalService: NgbModal,
  private appComponent: AppComponent, private dateformat: dateFormatPipe ) {

    let brandname = new FormControl('',[Validators.required,Validators.pattern("[a-zA-Z]*")]);
    let selectedCountry = new FormControl();
    let genericid = new FormControl();
    let maingroupid = new FormControl();
    let subgroupid1 = new FormControl();
    let subgroupid2 = new FormControl();
    let genericname = new FormControl();
    let groupname = new FormControl('');
    let subgroupname1 = new FormControl();
    let subgroupname2 = new FormControl();
    let genericcombinationid = new FormControl();
    let genericnamedosage = new FormControl();
    let uom = new FormControl('mg', []);
    let vat = new FormControl();
    let gst = new FormControl();
    let sgst = new FormControl();
    let cgst = new FormControl();
    let igst = new FormControl();
    let ugst = new FormControl();
    let hsnchap = new FormControl(0);
    let hsnid = new FormControl(0);
    let formulationid = new FormControl();
    let Manufacturernameid = new FormControl();
    let manufacturerdivisionid = new FormControl();
    let schudletype = new FormControl();
    let mrp = new FormControl('', [Validators.pattern(this.textnumbers)]);
    let minqty = new FormControl('', Validators.pattern(this.textnumbers));
    let maxqty = new FormControl('', Validators.pattern(this.textnumbers));
    let insuranceid = new FormControl(0);
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
    let countryid = new FormControl('opt1');
    let verticalid = new FormControl('opt1');
    let drugstatus = new FormControl(0);
    let verticalname = new FormControl();
    let temperature= new FormControl(0);
    let temptype=new FormControl('C');
    let production_sunlight=new FormControl('No');
    let narcoticdrug=new FormControl('No');
    let emergency_type=new FormControl('No');
    let hanzoration_drug=new FormControl('No');
    let sanitizing=new FormControl('No');
    let stock_available=new FormControl('nil');
    let genericflag=new FormControl(false);
    let combinegenericflag=new FormControl(false);
    this.drugForm = new FormGroup({
      genericname: genericname,
      groupname: groupname,
      subgroupname1: subgroupname1,
      subgroupname2: subgroupname2,
      brandname: brandname,
      genericid: genericid,
      maingroupid: maingroupid,
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
      Manufacturernameid: Manufacturernameid,
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
      countryid: countryid,
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
      combinegenericflag:combinegenericflag,
      genericflag:genericflag,
      FormArrayOne: this.fb.array([])
    });

  }
  private addmanuf = "";
  unionstate=[20934,20936,20940,20948,21773,21775,21776];
  ngOnInit() {

    this.drugForm.get('maingroupid').setValue("0");
    this.drugForm.get('subgroupid1').setValue("0");
    this.drugForm.get('subgroupid2').setValue("0");

    //Here to Set Default Values For DropDownBoxes        
    this.drugForm.get('vat').setValue("0");
    // this.drugForm.get('gst').setValue("0");
    this.drugForm.get('sgst').setValue("0");
    this.drugForm.get('cgst').setValue("0");
    this.drugForm.get('igst').setValue("0");
    this.drugForm.get('ugst').setValue("0");
    this.drugForm.get('formulationid').setValue("0");
    this.drugForm.get('Manufacturernameid').setValue("0");
    this.drugForm.get('manufacturerdivisionid').setValue("0");
    this.drugForm.get('schudletype').setValue("0");
    this.drugForm.get('distimporterid').setValue("0");
    this.drugForm.get('boxpercartoon').setValue("0");
    this.drugForm.get('stripperbox').setValue("0");
    this.drugForm.get('quantityperstrip').setValue("0");
    this.drugForm.get('custflag').setValue("1");
    this.drugForm.get('banneddrug').setValue("0");
    this.drugForm.get('companyid').setValue(AppComponent.companyID);
    this.drugForm.get('branchid').setValue(AppComponent.branchID);
    this.drugForm.get('locname').setValue(AppComponent.locRefName1);
    this.drugForm.get('locrefid').setValue(AppComponent.locrefID1);
   
    //Get Formulation
    this.drugservice.getFormulation().subscribe(data => this.formulation = data,
      err => {
        console.log('Error Occured getFormulation');
      });

    //Get Distributor Channel

    this.drugservice.getdistributorchannel(AppComponent.companyID,AppComponent.branchID,AppComponent.locRefName1,AppComponent.locrefID1).subscribe(data => {
      this.ditributorchann = data},
      err => {
        console.log('Error occured getdistributorchannel()');
      });


    //Get Schedule
    this.drugservice.getSchedule().subscribe(data => this.schedule = data,
      err => {
        console.log('Error Occured getSchedule');
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


   //get Country
   this.drugservice.getCountry().subscribe(data => this.countrylist = data,
    err => {
      console.log('Error Occured ');
    });

    this.dropdownSettings = {
      maxHeight: 400,
      singleSelection: false,
      text: "---Select InsuranceType---",
      badgeShowLimit: 1,
      classes: "myclass custom-class"
    };

  }

  vatcall(){
      //Get Vat
      this.drugservice.getVat().subscribe(data => this.vat = data,
        err => {
          console.log('Error Occured Vat');
        });
  }

  countrycall(){
    this.drugservice.getCountry().subscribe(data => this.countrylist = data,
      err => {
        console.log('Error Occured ');
      });
  }


  gstcalc(){
    let gstval=parseFloat(this.drugForm.get('gst').value);
    let gstcal=gstval/2;
    this.drugForm.get('sgst').setValue(gstcal);
    this.drugForm.get('cgst').setValue(gstcal);
  }
  //Get Manufacturer Division


  getSubgroup1() {

    this.drugservice.subGroup1(this.drugForm.get('verticalid').value, this.drugForm.get('maingroupid').value).subscribe(data => this.subgroup1 = data,
      err => {
        console.log('Error Occured Get subgroup 1');
      });
  }

  getSubgroup2() {

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
      var answer = confirm("Save data?");
      if (answer) {
        this.drugservice.saveGenericname(JSON.stringify(frmdata)).subscribe(data => { 
          if(data){
            c('Close click');
            this.notificationsComponent.addToast({ title: 'Success Message', msg: 'Generic Saved Successfully...', timeout: 7000, theme: 'default', position: 'top-right', type: 'success' });
          }else{
            this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Generic not Saved...', timeout: 7000, theme: 'default', position: 'top-right', type: 'error' });
          }},
          errorCode => console.log(errorCode));
      }
    }
  }



  saveMaingroup(c) {
    let groupname=this.drugForm.get('groupname').value;
    let verticalid=this.drugForm.get('verticalid').value;
    if(verticalid=='opt1'||verticalid==null||verticalid==''||verticalid==undefined){
      this.notificationsComponent.addToast({ title: 'Alert Message', msg: 'Select Vertical...', timeout: 7000, theme: 'default', position: 'top-right', type: 'warning' });
      this.drugForm.get('maingroupid').setValue(0);
      c('Close click');
    }else if(groupname==''||groupname==null||groupname==undefined){
      this.notificationsComponent.addToast({ title: 'Alert Message', msg: 'Enter Group Name...', timeout: 7000, theme: 'default', position: 'top-right', type: 'warning' });
    }else{
      var frmdata = { createdby: sessionStorage.getItem('indvuserid'), groupname: groupname, verticalid: verticalid };
      var answer = confirm("Save data?");
      if (answer) {
        this.drugservice.saveMaingroup(JSON.stringify(frmdata)).
          subscribe(data => { 
          if(data){
            c('Close click');
            this.drugForm.get('maingroupid').setValue(0);
            this.drugservice.mainGroup(this.drugForm.get('verticalid').value).subscribe(data => this.maingroup = data,
              err => {
                console.log('Error Occured MainGroup');
              }); 
          }else{
            this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Main Group not Saved...', timeout: 7000, theme: 'default', position: 'top-right', type: 'error' });
          }
         },err => console.log(err));
      }
    }
    // c('Close click')
  }

  saveSubgroup1(c) {
    let verticalid=this.drugForm.get('verticalid').value;
    let groupid=this.drugForm.get('maingroupid').value;
    let subgroupname1= this.drugForm.get('subgroupname1').value
    if(verticalid=='opt1'||verticalid==null||verticalid==''||verticalid==undefined){
      this.notificationsComponent.addToast({ title: 'Alert Message', msg: 'Select Vertical...', timeout: 7000, theme: 'default', position: 'top-right', type: 'warning' });
      this.drugForm.get('maingroupid').setValue(0);
      this.drugForm.get('subgroupid1').setValue(0);
      c('Close click');
    }else if(groupid==0|| groupid == 'nonemain' || groupid==null||groupid==''||groupid==undefined){
      this.notificationsComponent.addToast({ title: 'Alert Message', msg: 'Select Main Group...', timeout: 7000, theme: 'default', position: 'top-right', type: 'warning' });
      this.drugForm.get('subgroupid1').setValue(0);
      c('Close click');
    }else if(subgroupname1==''||subgroupname1==null||subgroupname1==undefined){
      this.notificationsComponent.addToast({ title: 'Alert Message', msg: 'Enter Sub-Group1 Name...', timeout: 7000, theme: 'default', position: 'top-right', type: 'warning' });
    }else{
      var frmdata1 = { createdby: sessionStorage.getItem('indvuserid'), verticalid: verticalid , grouprefid: this.drugForm.get('maingroupid').value, subgroupname1: this.drugForm.get('subgroupname1').value };
      //  c('Close click')
      var answer = confirm("Save data?");
      if (answer) {
        this.drugservice.saveSubgroup1(JSON.stringify(frmdata1)).
          subscribe(data => { 
            if(data){
              c('Close click');
              this.drugForm.get('subgroupid1').setValue(0);
              this.drugservice.subGroup1(this.drugForm.get('verticalid').value, this.drugForm.get('maingroupid').value).subscribe(data => this.subgroup1 = data,
                err => {
                  console.log('Error Occured Get subgroup 1');
                });
            }else{
              this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Sub-Group1 not Saved...', timeout: 7000, theme: 'default', position: 'top-right', type: 'error' });
            }
            },err => console.log(err));
      }
  
    }
  }

  saveSubgroup2(c) {
    let verticalid=this.drugForm.get('verticalid').value;
    let groupid=this.drugForm.get('maingroupid').value;
    let subgroupid1=this.drugForm.get('subgroupid1').value
    let subgroupname2= this.drugForm.get('subgroupname2').value
    if(verticalid=='opt1'||verticalid==null||verticalid==''||verticalid==undefined){
      this.notificationsComponent.addToast({ title: 'Alert Message', msg: 'Select Vertical...', timeout: 7000, theme: 'default', position: 'top-right', type: 'warning' });
      this.drugForm.get('maingroupid').setValue(0);
      this.drugForm.get('subgroupid1').setValue(0);
      this.drugForm.get('subgroupid2').setValue('0');
      c('Close click');
    }else if(groupid==0|| groupid == 'nonemain' || groupid==null||groupid==''||groupid==undefined){
      this.notificationsComponent.addToast({ title: 'Alert Message', msg: 'Select Main Group...', timeout: 7000, theme: 'default', position: 'top-right', type: 'warning' });
      this.drugForm.get('subgroupid1').setValue(0);
      this.drugForm.get('subgroupid2').setValue('0');
      c('Close click');
    }else if(subgroupid1==0|| subgroupid1=='nonesub1' || subgroupid1==null||subgroupid1==''||subgroupid1==undefined){
      this.notificationsComponent.addToast({ title: 'Alert Message', msg: 'Select Sub-Group1...', timeout: 7000, theme: 'default', position: 'top-right', type: 'warning' });
      this.drugForm.get('subgroupid2').setValue('0');
      c('Close click');
    }else if(subgroupname2==''||subgroupname2==null||subgroupname2==undefined){
      this.notificationsComponent.addToast({ title: 'Alert Message', msg: 'Enter Sub-Group2 Name...', timeout: 7000, theme: 'default', position: 'top-right', type: 'warning' });
    }else{
      var frmdata2 = { createdby: sessionStorage.getItem('indvuserid'), verticalid: verticalid, subgrouprefid1: this.drugForm.get('subgroupid1').value, subgroupname2: this.drugForm.get('subgroupname2').value };
      var answer = confirm("Save data?");
      if (answer) {
        this.drugservice.saveSubgroup2(JSON.stringify(frmdata2)).
          subscribe(data => { 
            if(data){
              c('Close click');
              this.drugForm.get('subgroupid2').setValue('0');
              this.drugservice.subGroup2(this.drugForm.get('verticalid').value, this.drugForm.get('subgroupid1').value).subscribe(data => { this.subgroup2 = data },
                err => {
                  console.log('Error Occured Get subgroup 2');
                });
            }else{
              this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Sub-Group2 not Saved...', timeout: 7000, theme: 'default', position: 'top-right', type: 'error' });
            }
          },err => console.log(err));
      }   
    }
    
  }

  //Get generic 
  getGeneric(value: string) {
    this.genericdata = [];
    this.drugservice.getGeneric(value).subscribe(data => {
      this.genericdata = [];
      for (let i = 0; i < data.length; i++) {
        this.genericdata.push({ value: data[i][0], label: data[i][1] });
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
    },
      err => {
        console.log('Error Occured Get manufacturer');
      });

  }

  //Get genericCombination 
  getGenericComb(value: string) {
    this.drugservice.getgenericCombination(value).subscribe(data => {
      this.genericCombination = [];
      for (let i = 0; i < data.length; i++) {
        this.genericCombination.push({ value: data[i][0], label: data[i][1] });
      }
    },
      err => {
        console.log('Error Occured Get genericCombination');
      });
  }

  getInsurance() {
    for (this.i = 0; this.i < this.insurance.length; this.i++) {
      this.insurancetype.push({ id: this.insurance[this.i][0], itemName: this.insurance[this.i][1] });
    }

  }

  getSubthera() {
    //Get Subtherabeutic
    this.drugservice.getSubthera(this.drugForm.get('therapeuticid').value).subscribe(data => this.subtherapeutic = data,
      err => {
        console.log('Error Occured Subtherabeutic');
      });
  }


  isValid: boolean = false;
  changeValue(valid: boolean) {
    this.isValid = valid;
  }

  checkgeneric(event, id: number) {
    if (event.target.checked){ 
      if (id == 0) {
        this.drugForm.get('combinegenericflag').setValue(false);
      }else if( id == 1) {
        let verticalid=this.drugForm.get('verticalid').value;
        if(verticalid=='opt1'||verticalid==null||verticalid==''||verticalid==undefined){
          this.drugForm.get('combinegenericflag').setValue(false);
          this.notificationsComponent.addToast({ title: 'Alert Message', msg: 'Select Vertical...', timeout: 7000, theme: 'default', position: 'top-right', type: 'warning' });
        }else{
          if(verticalid>=8||verticalid==2||verticalid==3){
            this.drugForm.get('combinegenericflag').setValue(false);
            this.notificationsComponent.addToast({ title: 'Alert Message', msg: 'Combine Generic not Avail on this Vertical...', timeout: 7000, theme: 'default', position: 'top-right', type: 'warning' });
          }else{
            this.drugForm.get('genericflag').setValue(false);
          }
        }
      }
    }
  }

  //QR Code Here
  elementType: 'url' | 'canvas' | 'img' = 'url';
  value: string = 'paracetamal';
  errormessage:string;
  drugimgURL:any;
  drugphoto: File;
  showimage:boolean=false;
  showeye:boolean=true;
  showeyeslash:boolean=false;
  //Drug Image Validation & Preview
  drugphotoChange(event: any) {

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
    this.errormessage = "Max Image Size 500KB Only & Check File Format";
  }


  }

  }

    imageshow(){
      this.showimage=true;
      this.showeyeslash=true;
      this.showeye=false;
    }

    hide(){
      this.showimage=false;
      this.showeyeslash=false;
      this.showeye=true;
    }

    reset(){

      this.inputEl.nativeElement.value="";
      this.drugimgURL = '';
      this.showimage=false;
      this.showeyeslash=false;
      this.showeye=true;
      this.errormessage='';
    }
    /* Employee Image End */


    savedrugimage(){

      // Instantiate a FormData to store form fields and encode the file
      let body = new FormData();
      // Add file content to prepare the request
      body.append("file", this.drugphoto);
     
      // Launch post request Service Call
      this.drugservice.savedrugimage(body).subscribe( (data) => {
      
        //Employee image  notification start
        if(data==true){
        
          this.notificationsComponent.addToast({ title: 'SUCESS MESSAGE', msg: 'DATA & DRUG IMAGE SAVED SUUCCESSFULLY', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'success' });
          //this.myForm.reset();
          (<HTMLInputElement>document.getElementById("imagefile")).value = '';
        }
        else{
  
          this.notificationsComponent.addToast({ title: 'Warning Message', msg: 'DATA ONLY SAVED & DRUG IMAGE UNSAVED....', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
        }
       //Employee image  notification end
      
      });
  
      }
      
  private formSubmitAttempt: boolean;
  public reFlag: boolean = false;
  onSubmit() {
    this.submitted = true;
    this.reFlag = this.drugInputValidation();
    if (this.reFlag == true) {
      this.createRecord();
    }
  }

  drugInputValidation(): boolean {
    let verticalid=this.drugForm.get('verticalid').value;
    let groupid=this.drugForm.get('maingroupid').value;
    let subgroupid1=this.drugForm.get('subgroupid1').value;
    let subgroupid2= this.drugForm.get('subgroupid2').value;
    if(verticalid=='opt1'||verticalid==null||verticalid==''||verticalid==undefined){
      this.notificationsComponent.addToast({ title: 'Alert Message', msg: 'Select Vertical...', timeout: 7000, theme: 'default', position: 'top-right', type: 'warning' });
    }
    if (this.drugForm.get('brandname').value == '' || this.drugForm.get('brandname').value == null) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'ProductName must Not be Empty', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if(groupid==0|| groupid == 'nonemain' || groupid==null||groupid==''||groupid==undefined){
      this.notificationsComponent.addToast({ title: 'Alert Message', msg: 'Select Main Group...', timeout: 7000, theme: 'default', position: 'top-right', type: 'warning' });
    }
    if(subgroupid1==0|| subgroupid1=='nonesub1' || subgroupid1==null||subgroupid1==''||subgroupid1==undefined){
      this.notificationsComponent.addToast({ title: 'Alert Message', msg: 'Select Sub-Group1...', timeout: 7000, theme: 'default', position: 'top-right', type: 'warning' });
    }
    if(subgroupid2==0||subgroupid2=='nonesub2'||subgroupid2==null||subgroupid2==undefined){
      this.notificationsComponent.addToast({ title: 'Alert Message', msg: 'Select Sub-Group2...', timeout: 7000, theme: 'default', position: 'top-right', type: 'warning' });
    }
    if (this.drugForm.get('genericnamedosage').value == '' || this.drugForm.get('genericnamedosage').value == null) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Dosage Value must Not be Empty', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.drugForm.get('uom').value == '' || this.drugForm.get('uom').value == null) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'UOM must Not be Empty', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }    
    if (this.drugForm.get('formulationid').value == '0' || this.drugForm.get('formulationid').value == null) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Formulation must Not be Empty', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.drugForm.get('Manufacturernameid').value == '0' || this.drugForm.get('Manufacturernameid').value == null) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Manufacturer Name must not be Empty', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.drugForm.get('combinegenericflag').value == false && this.drugForm.get('genericflag').value == false) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Select Generic Or Generic-Combination', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.drugForm.get('genericflag').value == true && this.drugForm.get('genericid').value == null) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Selected Generic must Not be Empty', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.drugForm.get('combinegenericflag').value == true && this.drugForm.get('genericcombinationid').value == null) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Selected Generic-Combination  must Not be Empty', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    return true;
    // if (this.drugForm.get('manufacturerdivisionid').value == '0' || this.drugForm.get('manufacturerdivisionid').value == null) {
    //   this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Manufacturer Division Must not be Empty', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    //   return false;
    // }
    // if (this.drugForm.get('mrp').value == '' || this.drugForm.get('mrp').value == null) {
    //   this.notificationsComponent.addToast({ title: 'Error Message', msg: 'SRP must Not be Empty', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
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
    // if (this.drugForm.get('maingroupid').value == '0' || this.drugForm.get('maingroupid').value == null) {
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
    // if (this.drugForm.get('vat').value == '0' || this.drugForm.get('vat').value == null) {
    //   this.notificationsComponent.addToast({ title: 'Error Message', msg: 'VAT must Not be Empty', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    //   return false;
    // }
    // if (this.drugForm.get('gst').value == '0' || this.drugForm.get('gst').value == null) {
    //   this.notificationsComponent.addToast({ title: 'Error Message', msg: 'GST must Not be Empty', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    //   return false;
    // }
  }


  private createRecord() {
    if(this.drugForm.get('genericid').value == null){
      this.drugForm.get('genericid').setValue(0);
    }
    this.insu = this.drugForm.get('insuranceid').value;
    this.drugForm.get('temperature').setValue(this.tempjoin);
    this.drugservice.createDrug(JSON.stringify(this.drugForm.value)).subscribe(data => {
      if (data == true) {
        this.drugservice.insuranceSave(JSON.stringify(this.insu));
        this.openSuccessSwal();
        //this.savedrugimage();
        // this.devicedetails();           
        // this.deviceObj.apiname="api/drugcreateRecord";
        // this.deviceObj.description="Save Drug Details";
        // this.drugservice.devicedetails(JSON.stringify(this.deviceObj)).subscribe(data => {});
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

 
  openSuccessSwal() {
    swal({
      title: 'Data Saved SuccessFully!',
      type: 'success',
      confirmButtonText: 'OK!..',
    }).then(() => {
      this.router.navigate(['VanustonProductMaster/ViewDrugmaster']);
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

  openvertical(contenetsub2) {
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
    this.drugForm.get('subgroupid2').setValue(0);
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


  verticalval:any=0;
  verticalopen(event,popvalue){
    this.verticalval=event;
    if (event == 'contentvertical') {
      this.openvertical(popvalue);
    }
    else {
     this.drugservice.mainGroup(this.drugForm.get('verticalid').value).subscribe(data => this.maingroup = data,
      err => {
        console.log('Error Occured MainGroup');
      });
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
  data = [];
  public rowsOnPage: number = 7;
  public filterQuery: string = "";
  public sortBy: string = "";
  public sortOrder: string = "desc";
  genCounts: number = 2;
  gendata = [];
  public showButton: boolean = false;
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
    this.combineflag=false;this.CombineData=[];
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

  CombineData:any=[];
  combinationpush(index){
    const Control = <FormArray>this.drugForm.get('FormArrayOne');
    let setData=Control.value;
    let subindx= this.genericdata.findIndex(p => p.value==setData[index].genericid);
    this.CombineATCgeneric=this.genericdata[subindx].label;
    this.CombineData.push({
      genericid:setData[index].genericid,
      genericname:this.genericdata[subindx].label,
      dosage:setData[index].dosage,
      uom:setData[index].uom1
    })
  }

  combineflag: boolean = false;
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
              Control.controls = [];this.combineflag=true;
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
    Control.removeAt(index);
    if(Control.length<=0){
      this.ATCData=[];this.CombineData=[];
      this.combineflag=false;
    }
  }

  saveVertical(c){
    var frmdata1 = { countryid: this.drugForm.get('countryid').value, verticalname: this.drugForm.get('verticalname').value, verticalid:0 };
    var answer = confirm("Save data?");
    if (answer) {
      this.drugservice.saveVertical(JSON.stringify(frmdata1)).subscribe(data => {
         c('Close click');
        if(data){
          this.notificationsComponent.addToast({ title: 'Success Message', msg: 'Vertical Saved Successfully', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
          this.verticalcall();
        } },
          err => console.log(err)
        );
    }

  }

  verticallist=[];
  taxfield:any=0;
  verticalcall(){
    this.drugForm.get('verticalid').setValue('opt1');
    this.drugservice.getVerticals(this.drugForm.get('countryid').value).subscribe(data => { this.verticallist = data},
    err => { console.log('Error Occured On getATC()') });
    this.drugservice.gettaxCountrystate(this.drugForm.get('countryid').value).subscribe(data => {
      if(data==''||data==null||data==undefined){
        this.taxfield=0;
      }else{
        this.taxfield = data[0][2]
      }
    },err => { console.log('Error Occured On getATC()') });
  }

  //Get Hsn Chapter  Using Hsn Form Service Raja
  gethsnchapter(){
    this.drugservice.getmdesc().subscribe(data => {
     this.hsnc = data
   });
  }

  //Get Hsn code and Description Using Hsn Form Service Raja
  gethsncode(){
    this.drugservice.gethsndesc(this.drugForm.get('hsnchap').value).then(data => {this.hsnlist = data});
  }

  hsndesc:any;
  showdescription(){
    let hsnid = this.drugForm.get('hsnid').value;
    let subindx= this.hsnlist.findIndex(p => p[0]==hsnid);
    this.hsndesc=this.hsnlist[subindx][1];
    if(this.taxfield == 0){
      this.drugForm.get('vat').setValue(this.hsnlist[subindx][3]);
    }else if(this.taxfield == 1){
      this.drugForm.get('gst').setValue(this.hsnlist[subindx][3]);
    }else if(this.taxfield == 2){
      this.drugForm.get('cgst').setValue(this.hsnlist[subindx][3]/2);
      this.drugForm.get('sgst').setValue(this.hsnlist[subindx][3]/2);
      this.drugForm.get('ugst').setValue(this.hsnlist[subindx][3]/2);
      this.drugForm.get('igst').setValue(this.hsnlist[subindx][3]);
    }
  }

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










