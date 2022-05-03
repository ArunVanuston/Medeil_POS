import { Component, OnInit, ViewChild } from '@angular/core';
import { RoleService } from '../role.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationsComponent } from '../../notifications/notifications.component';
import {AppComponent} from '../../app.component';
import { dateFormatPipe } from 'app/notifications/notifications.datepipe';
import { ArgumentOutOfRangeError } from 'rxjs';
import { CurrencyMaskDirective } from 'ng2-currency-mask';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from 'ng2-translate';
import swal from 'sweetalert2';
//import PouchDB from 'pouchdb';

@Component({
  selector: 'app-addrole',
  templateUrl: './addrole.component.html',
  providers: [NotificationsComponent, dateFormatPipe, RoleService]
})
export class AddroleComponent implements OnInit {
  alertmsgs:any;
  parentMessage="role";
  @ViewChild('role') rName: any;
  roleForm: any;
  rolelist = [];
  userdetails=[];
  flag: boolean = false;

  deviceObj;
  constructor(public translate: TranslateService,private rollService: RoleService, private dateformat: dateFormatPipe, private appComponent:AppComponent, 
    private router: Router, private notificationsComponent: NotificationsComponent, private modalService: NgbModal) { translate.setDefaultLang('en');
   
    const companyid = new FormControl();
    const companyname = new FormControl();
    const countryid = new FormControl();
    const productid = new FormControl();
    const userid = new FormControl();
    const editionrefid = new FormControl();
    const rank= new FormControl(sessionStorage.getItem('ranking'));
    const amount= new FormControl();
    const currency= new FormControl();
    const domainrefid= new FormControl();
    const subdomainrefid= new FormControl();
    const shopid = new FormControl(AppComponent.shopID);
    const rolename = new FormControl('');
    let clientcdate = new FormControl(this.dateformat.transform04());
    let createdby = new FormControl(this.dateformat.transform04());
    let status = new FormControl(0);
    this.roleForm = new FormGroup({
      companyid: companyid,
      shopid:shopid,
      companyname:companyname,
      countryid:countryid,
      productid:productid,
      userid:userid,
      editionrefid:editionrefid,
      rank:rank,
      amount:amount,
      currency:currency,
      domainrefid:domainrefid,
      subdomainrefid:subdomainrefid,
      rolename: rolename,
      clientcdate: clientcdate,
      createdby:createdby,
      status:status,
    });
  }

  ngOnInit() {
    this.translate.use(localStorage.getItem('language'));
     this.rollService.getUserdetails(sessionStorage.getItem('indvuserid')).subscribe(data =>  { this.companydetails(data) });
     this.rollService.getRole(sessionStorage.getItem('indvuserid')).subscribe(data =>  { this.rolelist=data });
     setTimeout(() => {
      let language='en';
      language=localStorage.getItem('language');
      this.rollService.GetAlerts(language).subscribe(data => this.alertmsgs = data,
        errorCode => console.log(errorCode));
    }, 1800);
    }

  public reFlag: boolean = false;

  compname:any;
  companydetails(data){
    this.roleForm.get('countryid').setValue(data[0][0]);
    this.roleForm.get('productid').setValue(data[0][1]);
    this.roleForm.get('domainrefid').setValue(data[0][2]);
    this.roleForm.get('userid').setValue(data[0][3]);
    this.roleForm.get('companyid').setValue(data[0][4]);
    console.log(this.roleForm.get('companyid').value)

    this.roleForm.get('editionrefid').setValue(data[0][5]);
    this.roleForm.get('subdomainrefid').setValue(data[0][7]);
    this.roleForm.get('companyname').setValue(data[0][9]);
    this.roleForm.get('amount').setValue(data[0][10]);
    this.roleForm.get('currency').setValue(data[0][11]);
    this.compname=this.roleForm.get('companyname').value.substr(0,4).toUpperCase();
  }


  roleValidation(): boolean {
    // if (this.roleForm.get('companyid').value == 0 || this.roleForm.get('companyid').value == '' || this.roleForm.get('companyid').value == null) {
    //   this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Company Name is required', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    //   return false;
    // }
    if (this.roleForm.get('rolename').value == 'opt1' || this.roleForm.get('rolename').value == 'newrolename' || this.roleForm.get('rolename').value == null) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: this.alertmsgs.role.rolenameisrequired, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    return true;
  }

  rolepopup(selvalue, popupname){
    
    if (selvalue == "") {
      this.openmain(popupname);
    }
    // else {
    //   this.newmodule=false;
    // }
  }
  role(){
    
    setTimeout(() => {
      this.roleForm.get('rolename').setValue('');
    },1000);
   
  }

  
  closeResult: string;
  openmain(popupname) {
    this.modalService.open(popupname).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
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
  
  SaveNewRole(c) {
    this.reFlag = this.roleValidation();
    if (this.reFlag == true) {
      //this.roleForm.get('rolename').setValue(this.compname + "_" + this.roleForm.get('rolename').value);
      const name=this.roleForm.get('rolename').value;
      let reprole=name.replace(/\s/g, '_');
      this.rollService.isExist(this.roleForm.get('companyid').value, reprole).subscribe(data => {
        if (data == true) {
          this.notificationsComponent.addToast({ title: 'Error Message', msg: this.alertmsgs.role.rolenameisalreadyexists, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
          this.roleForm.get('rolename').setValue('');
          //this.rName.nativeElement.focus();
        }
        else {
          this.roleForm.get('clientcdate').setValue(AppComponent.date);
          this.roleForm.get('createdby').setValue(AppComponent.userID);
          this.roleForm.get('rolename').setValue(reprole);
          this.rollService.createRole(JSON.stringify(this.roleForm.value)).subscribe(data => {
            if (data == true) {
              swal({
                type:'success',
                title:'Role Added',
                showConfirmButton:false,
                timer:1000
              })
              // this.notificationsComponent.addToast({ title: 'Sucess Message', msg: this.alertmsgs.role.rolesavedsucessfully, timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
              c('Close click');
              this.roleForm.reset();
              this.router.navigate(['Role/ViewRole']);
            }
            else {
              this.roleForm.get('rolename').setValue('');
              this.notificationsComponent.addToast({ title: 'Error Message', msg: this.alertmsgs.role.rolenamenotsaved, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
            }
          },
            err => {
              console.log('Errror occured omn createRole()');
            }
          );
        }
      },
        err => {
          console.log('Errror occured omn isExist()');
        });
    }
  }

  view(): void {
    this.router.navigate(['Role/ViewRole']);
  }

//   pouchsave(){
//     var LocalDB=new PouchDB('offlinecheck');
//     var recordcount=0;
//     //Fetch Doc from Local DB
//     LocalDB.allDocs(function(err,res){ 
//       if(err){
//         // error log
//         //alert("fetcherror"+JSON.stringify(err))
//         return console.log(err);
//       }else{
//         // success log
//         console.log("local get db");
//         console.log(res);
//         alert("fetchres"+res.rows.length);
//         recordcount=res.rows.length+1;
//         //alert("fetchres"+JSON.stringify(res));
//       }
//     });
   
//     var loccount= localStorage.getItem('localcount');
//     var updatecount=loccount+1;
//     alert("upcount"+updatecount);
//     localStorage.setItem('localcount',updatecount);
//     let offlineval={
//       "_id":'SIV00'+updatecount,
//       "name":'Puthiran G',
//       "mobile":'8987677693',
//       "email":'office@gmail.com'
//     }
   
//     alert("loc val"+JSON.stringify(offlineval));
 
//     //Store Local DB
//     LocalDB.put(offlineval,function(err,res){ 
//       if(err){
//         // error log
//         //alert("error"+JSON.stringify(err))
//         return console.log(err);
//       }else{
//         // success log
//         console.log("local db");
//         console.log(res);
//         //alert("res"+JSON.stringify(res));
//       }
//     });
 
//    //api/saveRole
//    // this.remote ='http://admin:admin@192.168.0.101:5984/test5';
//    //this.remote='http://127.0.0.1:5984/cloudo1';//Working Localyy
//    //this.db.replicate.to(this.remote);

//   //  let opts = {
//   //    live: true,
//   //    retry: true,
//   //    continuous: true
//   //  };
 
//    //LocalDB.sync(RemoteDB, opts);

//    var RemoteDB='http://Vanuston:Van2020@localhost:5984/serveroffline';
//    //Sync  Local to Server
//    LocalDB.sync(RemoteDB, {
//     live: true,
//     retry: true
//   }).on('change', function (change) {
//     // yo, something changed!
//     console.log("change --> "+change);
//   }).on('paused', function (err) {
//     // replication was paused, usually because of a lost connection
//     console.log("paused --> "+err);
//   }).on('active', function (info) {
//     // replication was resumed
//     console.log("active --> " + info);
//   }).on('denied', function (err) {
//     // a document failed to replicate (e.g. due to permissions)
//     console.log("denied --> " + err);
//   }).on('complete', function (info) {
//     // handle complete
//     console.log("complete --> " + info);
//   }).on('error', function (err) {
//     // totally unhandled error (shouldn't happen)
//     console.log("error -->" +err);
//   });

//   //Get DB Info
//   LocalDB.info().then(function (info) {
//     alert("info"+JSON.stringify(info));
//     console.log(info);
//   })  
  
// }

}