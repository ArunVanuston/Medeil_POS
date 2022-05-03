import { custEditService } from './custEdit.service';

import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';
import { AppComponent } from '../../../app.component';


import {NotificationsComponent }  from  '../../../notifications/notifications.component'  ;
import swal from 'sweetalert2';
import { custSaveService } from '../custSave/custSave.service';


@Component({
  selector: 'app-custEdit',
  templateUrl: './custEdit.component.html',
  providers: [custEditService  ,NotificationsComponent ,custSaveService ]
})

export class custEditComponent implements OnInit {

  parentMessage = "sales";
  private sub: any;
  
    registerForm: FormGroup;
  
  
    id: number;
    countries : any;
  
    states = [];
  
    cities = [];
  
    selobj ;
    saveprocess:boolean=false;
  custcat: any;
    constructor(private userService: custEditService,private usersaveService:custSaveService, private formBuilder: FormBuilder, private route: ActivatedRoute  , private notificationsComponent:NotificationsComponent, private router: Router) {}
  
    ngOnInit() {
    
      this.selobj  = {   userid  : AppComponent.userID , locrefid  :AppComponent. locrefID1 , locname  :AppComponent.locRefName1       , countryrefid  :AppComponent.countryID   , companyid  :AppComponent.companyID    , branchrefid  :AppComponent.branchID   }  ;
     


      this.sub = this.route.params.subscribe(params => {
        this.id = +params['id']; // (+) converts string 'id' to a number
      });
  
          this.registerForm = this.formBuilder.group({
            id: ['', []],
            hospitalid  : ['', []],
            patientcode  : ['', []],
            patienttitle  : ['', []],
            patientfirstname   : ['',  [Validators.required,Validators.pattern("[a-zA-Z ]*")]],
            patientlastname  : ['',  [Validators.pattern("[a-zA-Z ]*")]],
            gender  : ['', []],
            maritalstatus  : ['', []],
            dob : ['', []],
            age:['',[]],
            patienttype  : ['', []],
            address1   : ['', [Validators.required]],
            address2  : ['', []],
            country  : ['', []],
            state  : ['', []],
            city   : ['', []],
            pincode   : ['', []],
            countrycode  : ['', []],
            mobile  : ['', [Validators.required]],
            phone  : ['', []],
            email  : ['', [Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
            aadhaarcardno  : ['', []],
            language  : ['', []],
            description  : ['', []],
            ipaddress  : ['', []],
            latitude  : ['', []],
            longitude  : ['', []],
         
            companyid  : ['', []],
            clientmdate  : ['', []],
            modifiedby  : ['', []],
            patientcattypeid:['',[]],
            clientcdate  : ['', []],
            createdby:   [this.selobj.userid , []]         ,
            locrefid:   [this.selobj.locrefid , []]         ,
            locname:     [this.selobj.locname , []]         , 

          countryrefid: [ this.selobj.countryrefid  , []],
          companyrefid: [ this.selobj .companyid , []],
          branchrefid: [ this.selobj .branchrefid , []],

            tinno  : [, []],
            gstno  : [, []],
            vatno  : [ , []],

            
            scitizenflag  : [false, []],
            phycapflag  : [false , []],
  
            scitizenno  : [ {value: '', enabled: true}, []],
            phycapno  : [ {value: '', enabled: true} , []],


            
          });
          
            this.usersaveService.getcc(AppComponent.companyID,AppComponent.branchID,AppComponent.locRefName1,AppComponent.locrefID1).subscribe(data =>{
              this.custcat=data,this.getcc(data)
              Error =>{
                console.log("The Error Occure in Getcc()");
              }
            })
          


          var   frmdata={ frmint1 : this.id ,  frmstr1  :'', createdby  :'' , locrefid  :this.selobj.locrefid , locname  :this.selobj.locname   } ;
          var custedit={patientid:this.id}
          this.userService.viewPatientEdit(JSON.stringify(frmdata)).subscribe(data => this.registerForm.patchValue(data),
          errorCode => console.log(errorCode) );
  
  
          this.userService.viewCountry(JSON.stringify(frmdata)).subscribe(data => this.countries = data,
         errorCode => console.log(errorCode)  );
         this.userService.getcuststateedit(JSON.stringify(custedit)).subscribe(data =>{ this.states = data, this.viewState()},
         errorCode => console.log(errorCode)  );
         this.userService.getcustcityedit(JSON.stringify(custedit)).subscribe(data =>{ this.cities = data, this.viewCity()},
         errorCode => console.log(errorCode)  );
        }
        getcc(data:any){

        }

        agecalculate(gd1){
          let d1=new Date(gd1);
          let d2=new Date();
          if(d1>d2){
            this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'Select Valid Previous Date', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
            this.registerForm.get('dob').setValue('');
            this.registerForm.get('age').setValue(0);
          }else{
            var diff = Math.floor(d2.getTime() - d1.getTime());
            var calcdays=1000 * 60 * 60 * 24;
            var days=0; var months=0; var years=0;
            days = Math.floor(diff/calcdays);
            months = Math.floor(days/31);
            years = Math.floor(days/365.25);    // Math.floor(months/12);
            var message = d2.toDateString();
            this.registerForm.get('age').setValue(days);
          }
        }

        seniorvalid(){
          var resval=1;
          let patientfname=this.registerForm.get('patientfirstname').value
          let patientlname=this.registerForm.get('patientlastname').value
          let address1=this.registerForm.get('address1').value
          let address2=this.registerForm.get('address2').value
          let seniorflag=this.registerForm.get('scitizenflag').value
          let phyflag=this.registerForm.get('phycapflag').value
          let seniorno=this.registerForm.get('scitizenno').value
          let phyno=this.registerForm.get('phycapno').value
          let mobno=this.registerForm.get('mobile').value
          let phno=this.registerForm.get('phone').value
          let countrycode=this.registerForm.get('country').value
          let statecode=this.registerForm.get('state').value
          let citycode=this.registerForm.get('city').value
          if(patientfname.toString().length>30) {
            this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'First Name Maximum 30 Characters', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
            resval=0;
          }else if(patientlname.toString().length>20) {
            this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'Last Name Maximum 20 Characters', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
            resval=0;
          }else if (seniorflag == true && seniorno == '') {
            this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'Enter Senior Citizen No', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
            resval=0;
          }else if(phyflag == true && phyno == '') {
            this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'Enter Physcap No', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
            resval=0;
          }else if((address1.toString().length>200)) {
            this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'Address1 Limit 200 Characters', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
            resval=0;
          }else if((address2.toString().length>200)) {
            this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'Address2 Limit 200 Characters', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
            resval=0;
          }else if(countrycode=='opt1'||countrycode==''||countrycode==null) {
            this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'Select Country', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
            resval=0;
          }else if(statecode=='opt1'||statecode==''||statecode==null) {
            this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'Select State', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
            resval=0;
          }else if(citycode=='opt1'||citycode==''||citycode==null) {
            this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'Select City', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
            resval=0;
          }else if(mobno.toString().length>15) {
            this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'Mobile No Maximum Limit 15 Digits', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
            resval=0;
          }else if(phno != null && phno.toString().length>15) {
            this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'Phone No Maximum Limit 15 Digits', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
            resval=0;
          }
          return resval;
        }

        onSubmit() {
         // var answer =  confirm("Save data?");
          let valflag=this.seniorvalid();
          if(valflag==1){
            this.saveprocess=true;
            this.registerForm.get('clientmdate').setValue(AppComponent.date);
            this.registerForm.get('modifiedby').setValue(AppComponent.userID);
            this.userService.savePatient(JSON.stringify(this.registerForm.value)).subscribe(data =>{this.savevalid(data)},
            errorCode => {console.log(errorCode),this.saveprocess=false} );
          }
       }
      
      savevalid(data:any){
        if(data==1){ 
          this.saveprocess=false;
          this.notificationsComponent.addToast({title:'Success', msg:'Data Updated Successfully', timeout: 5000, theme:'default', position:'top-right',type:'success'}); 
          setTimeout(() => {
            this.router.navigate(['CustomerRegistration/ViewCustomer']);
          }, 2000);
        }else{
          this.notificationsComponent.addToast({title:'Error', msg:'Data Not  saved  ', timeout: 5000, theme:'default', position:'top-right',type:'error'}); 
          this.saveprocess=false;
        }
      }
      
      viewState() {
        var   frmdata={ frmint1 : this.registerForm.get('country').value ,  frmstr1  :'', createdby  :'' , locrefid  :this.selobj.locrefid , locname  :this.selobj.locname   } ;
        this.userService.viewState( JSON.stringify(frmdata) ).subscribe(data => this.states = data,
          errorCode => console.log(errorCode));
      }   


        viewCity(){
          this.cities=[];

          var   frmdata={ frmint1 :  this.registerForm.get('state').value  ,  frmstr1  :'', createdby  :'' , locrefid  :this.selobj.locrefid , locname  :this.selobj.locname   } ;
          this.userService.viewCity(  JSON.stringify(frmdata)   ).subscribe(data => this.cities = data,
            errorCode => console.log(errorCode));
             
        }
  
     deletePatient(){
        
    
     var   frmdata={ frmint1 : this.registerForm.get('id').value ,  frmstr1  :'', createdby  :'' , locrefid  :this.selobj.locrefid , locname  :this.selobj.locname   } ;
     
     var answer ;
     
    // if (answer) { 
     
     this.userService.deletePatient( JSON.stringify(frmdata) ).subscribe(data => {
      if(data==1){
        this.notificationsComponent.addToast({title:'Success', msg:'Data  Deleted successfully  ', timeout: 5000, theme:'default', position:'top-right',type:'success'}); 
        this.router.navigate(['/Customer/ViewCustomer']);
      }else{
        this.notificationsComponent.addToast({title:'Error', msg:'Data  Not Deleted', timeout: 5000, theme:'default', position:'top-right',type:'error'}); 
      }
      },
        errorCode => console.log(errorCode));
     
          
      }
  

      
      clear(){
        
          this.ngOnInit() ;
        }

        openConfirmsSwal() {
          swal({
            title: 'Do you want Delete this Customer?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
          }).then(() => {
        
            this.deletePatient();
            
          }).catch(swal.noop);
        }
        
        


}