import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from 'app/app.component';
import { NotificationsComponent } from 'app/notifications/notifications.component';
import { SoacodeService } from './soacode.service';

@Component({
  selector: 'app-soacode',
  templateUrl: './soacode.component.html',
  styleUrls: ['./soacode.component.css'],
  providers:[SoacodeService,NotificationsComponent]
})
export class SoacodeComponent implements OnInit {
  SoaForm:FormGroup;
  section: any;
  group: any;
  sac: any;
  sacsubcode1: any;
  sacsubcode2: any;
  secdes: any;
  secs: any;
  closeResult: string;

  constructor(private appcomponent:AppComponent,
              private soaservice:SoacodeService ,
              private router:Router,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
              private formbuilder:FormBuilder,
              private notification:NotificationsComponent,    
              private modalService: NgbModal) { }

  ngOnInit() {
    this.SoaForm = this.formbuilder.group({
      sectioncode:[,[]],
      secdesription:['',[]],
	    groupcode:[,[]],
      groupdes:['',[]],
	    saccode:[,[]],
      sacdes:['',[]],
	    subcode1code:[,[]],
      subcode1desc:['',[]],
	    subcode2code:[,[]],
      subcode2desc:['',[]],
	    gstrate:[,[]],
	    cess:[,[]],
	    countrycode:[parseInt(AppComponent.countryID),[]],
	    status:[0,[]]

    });

  

  }

getsectionid(){
  this.soaservice.getsection().subscribe(data =>{
    this.section =data},
    err=>{
      console.log("Error Occure getsection()");
  });
}

  seccodedes(id){
    // alert(id)
    for(let i=0 ; i<= this.section.length;i++){
      if(id == this.section[i][1]){
        // alert(this.section[i][1])
        // alert(this.section[i][2])
        this.SoaForm.get('secdesription').setValue(this.section[i][2]);
        // alert( this.SoaForm.get('secdesription').value);
        break;
       }
     
    }  
   
    
  }

  getgroupid(){
    this.soaservice.getgroup(this.SoaForm.get('sectioncode').value).subscribe(data =>{
      this.group = data},
      err =>{
        console.log("Error Occure in getgroup()");
    });
  }


  getgroupdesc(id){
    // alert(id)
    for(let i=0 ; i<= this.group.length;i++){
      if(id == this.group[i][1]){
        // alert(this.group[i][1])
        // alert(this.group[i][2])
        this.SoaForm.get('groupdes').setValue(this.group[i][2]);
        // alert( this.SoaForm.get('groupdes').value);
        break;
       }
     
    }  
   
    
  }

  getsacid(){
    this.soaservice.getsac(this.SoaForm.get('groupcode').value).subscribe(data =>{
      this.sac = data},
      err =>{
        console.log("Error Occure in getsac()");
    });
  }

  getsaciddes(id){
    // alert(id)
    for(let i=0 ; i<= this.sac.length;i++){
      if(id == this.sac[i][0]){
        // alert(this.sac[i][0])
        // alert(this.sac[i][1])
        this.SoaForm.get('sacdes').setValue(this.sac[i][1]);
        // alert( this.SoaForm.get('sacdes').value);
        break;
       }
     
    }  
   
    
  }


  getsaccode1(){
    this.soaservice.getsacsubgrp1(this.SoaForm.get('sectioncode').value,this.SoaForm.get('groupcode').value,this.SoaForm.get('saccode').value).subscribe(data =>{
      this.sacsubcode1 = data},
      err =>{
        console.log("Error Occure in getsac()");
    });
  }

  sub1desc(id){
    // alert(id)
    for(let i=0 ; i<= this.sacsubcode1.length;i++){
      if(id == this.sacsubcode1[i][0]){
        // alert(this.sacsubcode1[i][0])
        // alert(this.sacsubcode1[i][1])
        this.SoaForm.get('subcode1desc').setValue(this.sacsubcode1[i][1]);
        // alert( this.SoaForm.get('subcode1desc').value);
        break;
       }
   
    }  
     }

  getsaccode2(){
    this.soaservice.getsacsubgrp2(this.SoaForm.get('sectioncode').value,this.SoaForm.get('groupcode').value,this.SoaForm.get('saccode').value,this.SoaForm.get('subcode1code').value).subscribe(data =>{
      this.sacsubcode2 = data},
      err =>{
        console.log("Error Occure in getsac()");
    });
  }

  getsubdesc2(id){
    alert(id)
    for(let i=0 ; i<= this.sacsubcode1.length;i++){
      if(id == this.sacsubcode2[i][0]){
        alert(this.sacsubcode2[i][0])
        alert(this.sacsubcode2[i][1])
        this.SoaForm.get('subcode2desc').setValue(this.sacsubcode2[i][1]);
        alert( this.SoaForm.get('subcode2desc').value);
        break;
       }
   
    }  

  }


  onSubmit(){

   let soaformvalue = {sectioncode:parseInt(this.SoaForm.get('sectioncode').value),
                       groupcode:parseInt(this.SoaForm.get('groupcode').value),
                       saccode:parseInt(this.SoaForm.get('saccode').value),
                       subcode1code:parseInt(this.SoaForm.get('subcode1code').value),
                       subcode2code:parseInt(this.SoaForm.get('subcode2code').value),
                       gstrate:parseInt(this.SoaForm.get('gstrate').value),
                       cess:parseInt(this.SoaForm.get('cess').value),
                       countrycode:parseInt(AppComponent.countryID),
                       status:parseInt(this.SoaForm.get('status').value)};
    this.soaservice.savesoa(JSON.stringify(soaformvalue)).subscribe(data=>{
      if(data){
        this.notification.addToast({ title: 'Sucess Message', msg: 'Save Successfuly.', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });            
        this.ngOnInit();
      }
      else{
        this.notification.addToast({ title: 'Error Message', msg: 'Data Not Save..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      }
    })
  }


  // ==============================Add New Section Code =========================
  searchwithsection(event, contenetsection) {
    // this.HsnaddForm.get('main_description').setValue('');
    if (event == 'nonechapter') {
      this.openchapter(contenetsection);
    }
    else {
      return;
    }

  }

  openchapter(contenetsection) {
    this.modalService.open(contenetsection).result.then(
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


  savesc(c) {
   
    if (this.SoaForm.get('sectioncode').value == null || this.SoaForm.get('sectioncode').value == '' && this.SoaForm.get('secdesription').value == null || this.SoaForm.get('secdesription').value == '') {
      this.notification.addToast({ title: 'Error Message', msg: 'Enter the Values...', timeout: 7000, theme: 'default', position: 'top-right', type: 'error' });

    }
    else {
      var sectioncode = { sectioncode: this.SoaForm.get('sectioncode').value,sectionname: this.SoaForm.get('secdesription').value,countryid:AppComponent.countryID,status: this.SoaForm.get('status').value};
      // alert(JSON.stringify(mdescrip));
      this.soaservice.savesc(JSON.stringify(sectioncode)).subscribe(data => {

        if (data) {
          c('Close click');
          this.SoaForm.get('sectioncode').setValue(0);
          this.notification.addToast({ title: 'Success Message', msg: 'Saved Successfully...', timeout: 7000, theme: 'default', position: 'top-right', type: 'success' });
         this.getsectionid();
          // this.ngOnInit();
          
        }
        else {
          this.notification.addToast({ title: 'Error Message', msg: 'Not Saved...', timeout: 7000, theme: 'default', position: 'top-right', type: 'error' });

        }
      })

    }
  }


   // ==============================Add New Group Code =========================
   searchwithgroup(event, contenetGroup) {
    // this.HsnaddForm.get('main_description').setValue('');
    if (event == 'nonechapter') {
      this.openchapter(contenetGroup);
    }
    else {
      return;
    }

  }

  opengroup(contenetGroup) {
    this.modalService.open(contenetGroup).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getGDismissReason(reason)}`;
      }
    );


  }


  private getGDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


  savegc(c) {
   
    if (this.SoaForm.get('groupcode').value == null || this.SoaForm.get('groupcode').value == '' && this.SoaForm.get('groupdes').value == null || this.SoaForm.get('groupdes').value == '') {
      this.notification.addToast({ title: 'Error Message', msg: 'Enter the Values...', timeout: 7000, theme: 'default', position: 'top-right', type: 'error' });

    }
    else {
      var groupcode = { sectionid: this.SoaForm.get('sectioncode').value,groupcode: this.SoaForm.get('groupcode').value,groupname: this.SoaForm.get('groupdes').value,countryid:AppComponent.countryID,status: this.SoaForm.get('status').value};
      // alert(JSON.stringify(mdescrip));
      this.soaservice.savegc(JSON.stringify(groupcode)).subscribe(data => {

        if (data) {
          c('Close click');
          this.SoaForm.get('sectioncode').setValue(0);
          this.notification.addToast({ title: 'Success Message', msg: 'Saved Successfully...', timeout: 7000, theme: 'default', position: 'top-right', type: 'success' });
          // this.ngOnInit();
          this.getgroupid();
        }
        else {
          this.notification.addToast({ title: 'Error Message', msg: 'Not Saved...', timeout: 7000, theme: 'default', position: 'top-right', type: 'error' });

        }
      })

    }
  }


// =============================Add SAC Code===============================================================

searchwithsac(event, contenetsac) {
  // this.HsnaddForm.get('main_description').setValue('');
  if (event == 'nonechapter') {
    this.openchapter(contenetsac);
  }
  else {
    return;
  }
}

opensac(contenetsac) {
  this.modalService.open(contenetsac).result.then(
    (result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getSacDismissReason(reason)}`;
    }
  );
}

private getSacDismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
    return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
  } else {
    return `with: ${reason}`;
  }
}

savesac(c) {
 
      if (this.SoaForm.get('saccode').value == null || this.SoaForm.get('saccode').value == '' && this.SoaForm.get('sacdes').value == null || this.SoaForm.get('sacdes').value == '') {
    this.notification.addToast({ title: 'Error Message', msg: 'Enter the Values...', timeout: 7000, theme: 'default', position: 'top-right', type: 'error' });
      }  
  else {
    var groupcode = { sectionid: parseInt(this.SoaForm.get('sectioncode').value),grouprefid:parseInt(this.SoaForm.get('groupcode').value),saccode:parseInt(this.SoaForm.get('saccode').value),desc_ofservices: this.SoaForm.get('sacdes').value,countryid:parseInt(AppComponent.countryID),status: this.SoaForm.get('status').value};
    // alert(JSON.stringify(mdescrip));
    this.soaservice.savesac(JSON.stringify(groupcode)).subscribe(data => {
      if (data) {
        c('Close click');
        this.SoaForm.get('sectioncode').setValue(0);
        this.notification.addToast({ title: 'Success Message', msg: 'Saved Successfully...', timeout: 7000, theme: 'default', position: 'top-right', type: 'success' });
        // this.ngOnInit();
        this.getsacid()
      }
      else {
        this.notification.addToast({ title: 'Error Message', msg: 'Not Saved...', timeout: 7000, theme: 'default', position: 'top-right', type: 'error' });
      }
    })

  }
}


// =============================Add SAC SubCode1===============================================================

searchwithsacsub1(event, contenetsacsub1) {
  // this.HsnaddForm.get('main_description').setValue('');
  if (event == 'nonechapter') {
    this.openchapter(contenetsacsub1);
  }
  else {
    return;
  }
}

opensacsub1(contenetsacsub1) {
  this.modalService.open(contenetsacsub1).result.then(
    (result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getSacsub1DismissReason(reason)}`;
    }
  );
}

private getSacsub1DismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
    return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
  } else {
    return `with: ${reason}`;
  }
}

savesacsub1(c) {
 
      if (this.SoaForm.get('subcode1code').value == null || this.SoaForm.get('subcode1code').value == '' && this.SoaForm.get('subcode1desc').value == null || this.SoaForm.get('subcode1desc').value == '') {
    this.notification.addToast({ title: 'Error Message', msg: 'Enter the Values...', timeout: 7000, theme: 'default', position: 'top-right', type: 'error' });
      }  
  else {
    var groupcode = { sectionid: parseInt(this.SoaForm.get('sectioncode').value),grouprefid:  parseInt(this.SoaForm.get('groupcode').value),saccode:parseInt(this.SoaForm.get('saccode').value),sacsubcode1:this.SoaForm.get('subcode1code').value,sac_subcode1_des: this.SoaForm.get('subcode1desc').value,countryid: parseInt(AppComponent.countryID),status: this.SoaForm.get('status').value};
    // alert(JSON.stringify(mdescrip));
    this.soaservice.savesacg1(JSON.stringify(groupcode)).subscribe(data => {
      if (data) {
        c('Close click');
        this.SoaForm.get('sectioncode').setValue(0);
        this.notification.addToast({ title: 'Success Message', msg: 'Saved Successfully...', timeout: 7000, theme: 'default', position: 'top-right', type: 'success' });
       this.getsaccode1();
        // this.ngOnInit();
      }
      else {
        this.notification.addToast({ title: 'Error Message', msg: 'Not Saved...', timeout: 7000, theme: 'default', position: 'top-right', type: 'error' });
      }
    })

  }
}



// =============================Add SAC SubCode2===============================================================

searchwithsacsub2(event, contenetsacsub2) {
  // this.HsnaddForm.get('main_description').setValue('');
  if (event == 'nonechapter') {
    this.openchapter(contenetsacsub2);
  }
  else {
    return;
  }
}

opensacg2(contenetsacsub2) {
  this.modalService.open(contenetsacsub2).result.then(
    (result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getSacg2DismissReason(reason)}`;
    }
  );
}

private getSacg2DismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
    return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
  } else {
    return `with: ${reason}`;
  }
}

savesacsub2(c) {
 
      if (this.SoaForm.get('subcode2code').value == null || this.SoaForm.get('subcode2code').value == '' && this.SoaForm.get('subcode2desc').value == null || this.SoaForm.get('subcode2desc').value == '') {
    this.notification.addToast({ title: 'Error Message', msg: 'Enter the Values...', timeout: 7000, theme: 'default', position: 'top-right', type: 'error' });
      }  
  else {
    var groupcode = { sectionid: parseInt(this.SoaForm.get('sectioncode').value),groupcode:  parseInt(this.SoaForm.get('groupcode').value),saccode:parseInt(this.SoaForm.get('saccode').value),sacsubcode1:parseInt(this.SoaForm.get('subcode1code').value),sac_subcode2:parseInt(this.SoaForm.get('subcode2code').value),sac_subcode2_desc: this.SoaForm.get('subcode2desc').value,countryid: parseInt(AppComponent.countryID),status: this.SoaForm.get('status').value};
    // alert(JSON.stringify(mdescrip));
    this.soaservice.savesacg2(JSON.stringify(groupcode)).subscribe(data => {
      if (data) {
        c('Close click');
        this.SoaForm.get('sectioncode').setValue(0);
        this.notification.addToast({ title: 'Success Message', msg: 'Saved Successfully...', timeout: 7000, theme: 'default', position: 'top-right', type: 'success' });
        // this.ngOnInit();
        this.getsaccode2();
      }
      else {
        this.notification.addToast({ title: 'Error Message', msg: 'Not Saved...', timeout: 7000, theme: 'default', position: 'top-right', type: 'error' });
      }
    })

  }
}


}
