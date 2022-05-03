
import {Component, OnInit  ,ViewChild} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators  ,  FormArray} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';

import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';
import {NotificationsComponent }  from  '../../../notifications/notifications.component'  ;

import {slsRetEditService} from './slsRetEdit.service' ;

import { DxDataGridComponent } from "devextreme-angular";

 import {dateFormatPipe }  from  '../../../notifications/notifications.datepipe'  ;


 import { AppComponent } from '../../../app.component';
 



@Component({
  selector: 'app-slsRetEdit',
  templateUrl: './slsRetEdit.component.html',
  providers: [slsRetEditService  ,NgbDropdownConfig  , NotificationsComponent   ,  dateFormatPipe]
 
})
export class slsRetEditComponent implements OnInit {
 

  @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent ;  
   parentMessage="sales";
   registerForm: FormGroup;

   id: number;
   private sub: any;

   invoices=[];

   srinvoices=[];

   i;
   selobj;

    editdata=[]  ;
    truncatepos=2;
 
   constructor(private userService: slsRetEditService ,private router: Router    ,    private   dateformat: dateFormatPipe    ,private formBuilder: FormBuilder ,config: NgbDropdownConfig ,  private notificationsComponent:NotificationsComponent    , private route: ActivatedRoute ) {
 
       config.autoClose = false;
   }
 
   ngOnInit() {

    this.selobj  = {   userid  : AppComponent.userID , locrefid  :AppComponent. locrefID1 , locname  :AppComponent.locRefName1  , countryrefid  :AppComponent.countryID   , companyid  :AppComponent.companyID  
      , branchrefid  :AppComponent.branchID     , vatdispflag  :AppComponent.vatDispFlag   , boxdispflag  :AppComponent.BoxDispFlag  
      , stripdispflag  :AppComponent.StripDispFlag    , tabdispflag  :AppComponent.TabDispFlag }  ;

     this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; 
     });
     
 
     this.registerForm = this.formBuilder.group({
       
      id: [  , []],    
      srno: [  , []],    
      srdate: [  , []], 
      invoiceno: [  , []],    
      customerrefid: [  , []],
      doctorrefid: [  , []],  
      totalamount: [  , []],    
      totalitems: [  , []],    
      totaldiscount: [  , []],   
      taxableamt: [  , []],    
      totaltaxamt: [  , []],    
      totalinclamt: [  , []], 
      totalexclamt: [  , []],     
      grandtotal : [  , []], 
      createdby:   [this.selobj .userid , []]      ,
      locrefid:   [ this.selobj .locrefid, []]      ,
      locname:     [ this.selobj .locname  , []]     ,
      countryrefid: [ this.selobj.countryrefid  , []],
      companyrefid: [ this.selobj .companyid , []],
      branchrefid: [ this.selobj .branchrefid , []],
      customername: [, []]  ,
      autonamenew: [, []]  ,
      subtotal  : [, []]  ,
      roundoff  : [, []]  ,
      clientcdate: [ this.dateformat.transform04()   , []],
      clientcdate1: [ this.dateformat.transform04()   , []],
      date: [   , []],
      invdispflag: [   , []], 
      vatdispflag: [ this.selobj.vatdispflag , []], 
      boxdispflag: [  this.selobj.boxdispflag  , []],        
      stripdispflag: [  this.selobj.stripdispflag , []],                    
      tabdispflag: [this.selobj.tabdispflag , []],    
      invoice:  this.formBuilder.array([
      ]),
    dummy:  this.formBuilder.array([]),

    }) ;


     var   frmdata={ frmint1 : this.id ,  frmstr1  :'', createdby  :'' , locrefid  :this.selobj.locrefid , locname  :this.selobj.locname   , companyid  :this.selobj.companyid  } ; 
     this.userService.getfixedroudoff(AppComponent.companyID, AppComponent.branchID, AppComponent.locRefName1, AppComponent.locrefID1).subscribe(data =>{
      if(data[0][1]==1){
        this.truncatepos=3;
      }else{this.truncatepos=2};
    });

     this.userService.viewSalesReturnNo(JSON.stringify(frmdata)  ).subscribe(data =>{this.srinvoices = data },
      errorCode => console.log(errorCode));

    this.userService.viewSalesReturn(JSON.stringify(frmdata)   ).subscribe(data => {  this.viewServSRInvoices(data) },
      errorCode => console.log(errorCode));  

    this.userService.viewSrProduct(JSON.stringify(frmdata)    ).subscribe(data => {this.viewServSrProduct(data)   },
      errorCode => console.log(errorCode));

    this.userService.viewSalesReturnAll( JSON.stringify(frmdata) ).subscribe(data => {this.editdata=data   },
        errorCode => console.log(errorCode));      

    if(this.id){
      this.registerForm.get('invdispflag').setValue(1) ; 
    }else{
      this.registerForm.get('invdispflag').setValue(0) ; 

    }


 
}




onSubmit(){
 
  var  valflag:Number =0 ;
  
        valflag  =this.validnew( )  ;


     const control = <FormArray>this.registerForm.controls['invoice'];


     

   var answer =  confirm("Save data?");
   
if (answer&& valflag==0) { 
this.userService.saveSalesReturn(JSON.stringify(this.registerForm.value)).subscribe(data => {this.saveSrProducts(data)},
errorCode => console.log(errorCode));


}
setTimeout(() => {
  this.router.navigate(['SalesReturn/ViewSalesReturn']);
}, 2000);
   
 }


 
   
    saveSrProducts(data:any){
      const control = <FormArray>this.registerForm.controls['invoice'];
      if(data==1){ 

  
          this.userService.saveSrProducts(JSON.stringify( control.value  ) ) .subscribe(data => {this.savevalid(data)},
          errorCode => console.log(errorCode));

      }
  
  }
  
  
  savevalid(data:any){


    if(data==1){ 
    
          this.notificationsComponent.addToast({title:'Success', msg:'Data  Saved  ', timeout: 5000, theme:'default', position:'top-right',type:'success'}); 
   
          this.clear() ; 
       }else{
  
      this.notificationsComponent.addToast({title:'Error', msg:'Data Not  saved  ', timeout: 5000, theme:'default', position:'top-right',type:'error'}); 
  
    }
      }

      deleteValid(data:any){
        if(data==1){ 
              this.notificationsComponent.addToast({title:'Success', msg:'Delted Succesfully    ', timeout: 5000, theme:'default', position:'top-right',type:'success'}); 
            //  this.clear() ; 
            this.router.navigateByUrl("/SalesReturn/ViewSalesReturn");
            }else{
      
          this.notificationsComponent.addToast({title:'Error', msg:' Not Delted', timeout: 5000, theme:'default', position:'top-right',type:'error'}); 
      
        }
         
      }

      calc( e){
 
   
  
        if(e.keyCode == 9){
          
      
              this.calcGST()  ; 
      
        }
   
      }


 


calcGST(){
        

  const control = <FormArray>this.registerForm.controls['invoice'];
        
   var sprod=control.value ;
 

   var preqty:number=0;
   var preprodprice:number=0;
 
   var prefree:number=0;
    var premrp:number=0;
   var predisc :number=0;
   var presgst:number =0;
   var precgst:number =0;
   var preigst:number = 0;
 
   var  pretotprice:number =0;
    var pretotfreeprice:number =0;
    var pretotmrp:number =0;
 
   var discount:number =0;
   var sgstamt :number=0;
   var cgstamt :number =0;
   var igstamt :number =0;
 
 
   var totdiscount :number = 0;
   var totsgstamt:number  =0;
   var totcgstamt :number =0;
   var totigstamt :number =0;
 
   var totutgstamt :number =0;
 

   var totgstamt:number  =0;
 
   var totaltaxableamt :number = 0;
 
   var totaltaxamt :number = 0;
 
   var totalincamt :number = 0;
 
 
  var totalexclamt :number = 0;
 
  var grandtotal :number = 0;
  var totalproduct :number = 0;
 
   var totqty :number =0;
   var subtotal:number  =0;
 
   var convfactor:number  =0;
   var gstflag:number  =0;


   var  frgstflag:number  =0;
   var  freeflag:number  =0;

   var prevat:number =0;
   var totvatamt:number  =0;
   var  vatamt :number=0;
 
   
 var  prodcount :number=0;

    var inv  ;


 
   



  
    
    for (this.i = 0; this.i < sprod.length; this.i++) {
      sprod[this.i].totalqty=sprod[this.i].indvqty;
         if(sprod[this.i].calcflag!=1){
        
           
         if(parseInt(sprod[this.i].indvqty) ){
          preqty=parseInt(sprod[this.i].indvqty);
      
        }else{
          preqty=0;
        }
        
      
        if(parseInt(sprod[this.i].indvfreeqty) ){
         prefree=parseInt(sprod[this.i].indvfreeqty);
      
          }else{
         prefree=0;
          }
      
            
            if(parseInt(sprod[this.i].unitprice) ){
              preprodprice=parseInt(sprod[this.i].unitprice);
        
            }else{
              preprodprice=0;
            }
        
        
       
        
           if(parseInt(sprod[this.i].mrp) ){
              premrp=parseInt(sprod[this.i].mrp);
        
            }else{
              premrp=0;
            }
        
        
        
            if(parseInt(sprod[this.i].unitdiscount)){
              predisc= parseInt(sprod[this.i].unitdiscount);
        
            }else{
              predisc=0;
            }
        
          
            if( parseInt(sprod[this.i].unitsgst)){
              presgst=parseInt(sprod[this.i].unitsgst) ;
          
        
            }else{
              presgst=0;
        
            
            }
            if(parseInt(sprod[this.i].unitcgst)){
              precgst=parseInt(sprod[this.i].unitcgst)  ;
          
        
            }else{
              precgst=0;
        
            
            }
        
            if( parseInt(sprod[this.i].unitigst) ){
              preigst=  parseInt(sprod[this.i].unitigst) ;
          
        
            }else{
              preigst=0;
        
            
            }
        
        
            if( parseInt(sprod[this.i].gstflag) ){
              gstflag=  parseInt(sprod[this.i].gstflag) ;
          
        
            }else{
              gstflag=0;
        
            
            }
        
            if( parseInt(sprod[this.i].frgstflag) ){
              frgstflag=  parseInt(sprod[this.i].frgstflag) ;
           
          
             }else{
              frgstflag=0;
          
             
             }
          
             if( parseInt(sprod[this.i].freeflag) ){
              freeflag=  parseInt(sprod[this.i].freeflag) ;
           
          
             }else{
              freeflag=0;
          
             
             }
             
             if( parseInt(sprod[this.i].unitvat)){
              prevat=parseInt(sprod[this.i].unitvat) ;
          
          
            }else{
              prevat=0;
          
            
            }
         
            if( parseInt(sprod[this.i].convfactor) ){
              convfactor=  parseInt(sprod[this.i].convfactor) ;
          
        
            }else{
              convfactor=0;
        
            
            }
        
            freeflag=1 ;

            if(freeflag == 0){
              
                    discount=0 ;
                    prefree=0 ;
           } else {
  
            prodcount+=1  ;
           }
        
            
              sprod[this.i].subtotal= preqty* preprodprice;
        
              sprod[this.i].totalqty= convfactor* preqty;
              sprod[this.i].totalfreeqty= convfactor* prefree;
        
              pretotprice=  preqty* preprodprice;
        
              discount= (pretotprice *predisc)/100;
      
      
       
      
              if(gstflag == 1) {
                if(frgstflag == 1) {
      
                 vatamt=   ((pretotprice-discount) *prevat)/100;
      
                 sgstamt=   ((pretotprice-discount) *presgst)/100;
                 cgstamt=   ((pretotprice-discount) *precgst)/100;
                 igstamt=   ((pretotprice-discount) *preigst)/100;
      
             
                         
                  }
              else if(frgstflag == 2) {
      
               
              vatamt=   (((preqty+prefree)*preprodprice-discount) *prevat)/100;  
      
              sgstamt=   (((preqty+prefree)*preprodprice-discount) *presgst)/100;  
              cgstamt=   (((preqty+prefree)*preprodprice-discount) *precgst)/100;  
              igstamt=   (((preqty+prefree)*preprodprice-discount) *preigst)/100;        
      
      
                 }                     
                   }
              else  if(gstflag == 2) {
      
               vatamt  =  (preqty+prefree)*(premrp-(premrp/(1+prevat/100)))   ; 
      
               sgstamt  =  (preqty+prefree)*(premrp-(premrp/(1+presgst/100)))   ; 
               cgstamt  =  (preqty+prefree)*(premrp-(premrp/(1+precgst/100)))   ;   
               igstamt  =  (preqty+prefree)*(premrp-(premrp/(1+preigst/100)))   ;             
      
             }
      
      
        
             if(freeflag == 1   || freeflag == 0) {
        
              sprod[this.i].vatamt=vatamt;  
      
              sprod[this.i].sgstamt=sgstamt;
              sprod[this.i].cgstamt=cgstamt;
              sprod[this.i].igstamt=igstamt;
        
        
              totvatamt+=vatamt   ;
              
              totsgstamt+=sgstamt   ;
              totcgstamt+= cgstamt   ;
              totigstamt+=igstamt    ;
                
      
             } 
             
             
             if(freeflag == 1 ){
      
      
        
               totalproduct=prodcount ;
               totqty+=preqty;
               subtotal+=pretotprice;
               totdiscount+=discount  ;
      
        
              }
        
        

         }
            }










        totgstamt =totsgstamt+totcgstamt+totigstamt +totvatamt;
   
        grandtotal=subtotal +totgstamt-totdiscount  ;
 
       if(gstflag==0){
 
        totalincamt=grandtotal  ;
 
       } else{
   
         totalexclamt=grandtotal  ;
 
         }
 
 
         totaltaxableamt=subtotal  ;
 
         totaltaxamt=  totgstamt  ;
 

         control.patchValue(sprod);
     
 
                this.registerForm.patchValue({
                       
       
              
                  totalitems:  prodcount , 
                  totaldiscount:  totdiscount.toFixed(this.truncatepos)  ,
                  taxableamt:  totaltaxableamt.toFixed(this.truncatepos)  ,   
                  totaltaxamt: totaltaxamt.toFixed(this.truncatepos)  ,         
                  totalinclamt:totalincamt.toFixed(this.truncatepos)  ,
                  totalexclamt: totalexclamt .toFixed(this.truncatepos) , 
                  grandtotal: grandtotal.toFixed(this.truncatepos)  ,
                  roundoff  : (grandtotal-Number(grandtotal.toFixed(this.truncatepos))).toFixed(this.truncatepos) ,
    
                 createdby:   this.selobj .userid,
                 locrefid:   this.selobj .locrefid,
                 locname:  this.selobj.locname,      
                 subtotal:   subtotal.toFixed(this.truncatepos)  ,
         
                });

 
 
 }





     
    viewSiProducts() {

                                 //      pi  validation         
                                        //   when    pr  is  not  selcte
    var pr  ;

    const control = <FormArray>this.registerForm.controls['invoice'];

    pr=  control.value  ;

    if(pr==null){

     this.notificationsComponent.addToast({title:'Error', msg:'Domain Name Already Exist', timeout: 5000, theme:'default', position:'top-right',type:'error'});  
    }

    var   frmdata={ frmint1 :this.registerForm.get('invoiceno').value ,  frmstr1  :'', createdby  :'' , locrefid  :this.selobj.locrefid , locname  :this.selobj.locname  , companyid  :this.selobj.companyid  } ;  
     this.userService.viewSrProductRemain(JSON.stringify(frmdata)     ).subscribe(data => {this.viewServSiProducts(data)      },
       errorCode => console.log(errorCode));
 

   }
 


   viewEdit() {


  this.viewSalesReturn();

 this.viewSrProduct();
}




viewSalesReturn() {
 var   frmdata={ frmint1 : this.registerForm.get('id').value   ,  frmstr1  :'', createdby  :'' , locrefid  :this.selobj.locrefid , locname  :this.selobj.locname   , companyid  :this.selobj.companyid  } ;  
 this.userService.viewSalesReturn(JSON.stringify(frmdata)   ).subscribe(data => {this.viewServSRInvoices(data)},
   errorCode => console.log(errorCode));


}



viewSrProduct() {
 var   frmdata={ frmint1 : this.registerForm.get('id').value ,  frmstr1  :'', createdby  :'' , locrefid  :this.selobj.locrefid , locname  :this.selobj.locname   , companyid  :this.selobj.companyid  } ;  
 this.userService.viewSrProduct(JSON.stringify(frmdata)    ).subscribe(data => {this.viewServSrProduct(data)   },
   errorCode => console.log(errorCode));


}


viewServSRInvoices(data:any){

    var  v   = 0  ;
    this.registerForm.patchValue({
      id:  data[0][v++   ]   ,    
      srno: data[0][v++   ]   ,  
      srdate:data[0][v++   ]   , 
      invoiceno: data[0][v++   ]   ,  
      customerrefid:data[0][v++   ]   , 
      doctorrefid: data[0][v++   ]   , 



  
     });  

       

          this.registerForm.get('customername').setValue(data[0][15]);

          this.registerForm.get('date').setValue(data[0][2]) ;

}



viewServSrProduct(data:any) {


   const control = <FormArray>this.registerForm.controls['invoice'];

   while (control.length !== 0) {
    control.removeAt(0) ;
     }
    
     
   var  v   = 0  ;

 for (this.i = 0; this.i < data.length; this.i++) {

      v =  1  ;


      control.insert(0, this.formBuilder.group({
        
      
          id:  [data[this.i][v++    ] , []]  ,  
          srrefid:  [data[this.i][v++    ] , []]  ,  
          drugproductid:  [data[this.i][v++    ] , []]  , 


          batchrefid:  [data[this.i][v++    ] , []]  , 
          totalqty:  [data[this.i][v++    ] , []]  , 
          unitprice:  [parseInt(data[this.i][v++]).toFixed(this.truncatepos) , []]  ,        	
          mrp:  [data[this.i][v++    ] , []]  ,  
          expirydate:  [data[this.i][v++    ] , []]  ,  


          unitdiscount:  [data[this.i][v++    ] , []]  ,  
          unitvat:  [data[this.i][v++    ] , []]  ,     
          unitsgst:  [data[this.i][v++    ] , []]  ,   
          unitcgst:  [data[this.i][v++    ] , []]  , 
          unitigst:  [data[this.i][v++    ] , []]  , 


          discountamt:[data[this.i][v++    ] , []]   ,
          vatamt:  [data[this.i][v++    ] , []]  , 
          sgstamt:  [data[this.i][v++    ] , []]  ,   
          cgstamt:  [data[this.i][v++    ] , []]  ,    
          igstamt:  [data[this.i][v++    ] , []]  ,   

           

   
          createdby   : [this.selobj.userid   , []], 
          locrefid   : [this.selobj.locrefid, []],
          locname   : [this.selobj.locname, []],     
             countryrefid: [ this.selobj.countryrefid  , []],
          companyrefid: [ this.selobj .companyid , []],
          branchrefid: [ this.selobj .branchrefid , []],
          subtotal:  [parseInt(data[this.i][v++]).toFixed(this.truncatepos) , []]  ,  
          drgtyp:[data[this.i][v++    ] , []]   ,
          gstflag:[data[this.i][v++    ] , []]  ,
          frgstflag:[data[this.i][v++    ] , []]  ,
          indvqty: [data[this.i][v++    ] , []]  ,   


          convfactor:  [data[this.i][v++    ] , []]   ,
          crntsiqty:  [data[this.i][v++    ] , []], 
          crntstkqty: [data[this.i][v++    ] , []]  ,
          sirefid : [data[this.i][v++    ] , []]    , 
          siqty:  [data[this.i][v++    ] , []]  ,  


          clientcdate  : [data[this.i][v    ] , []]  ,  
          clientcdate1  : [data[this.i][v++    ] , []]  , 
           productname:   [data[this.i][0    ] , []]  , 
           calcflag: [0  , []]   , 
            dbflag:   [  1 , []],

            delflag  : [ false   , []]    ,
            batchname  :  [data[this.i][v++    ] , []] , 

            stkmainrefid: [ data[this.i][v++    ] , []]   ,

            siprodrefid: [ data[this.i][v++    ] , []]  , 
        }));

  


   }

   this.calcGST();

 }



   
viewServSiProducts(data:any) {

    var pr  ;
    var k=0  ;
    var rm=[]  ;
    var  v   = 0  ;
    const control = <FormArray>this.registerForm.controls['invoice'];



  pr= control.value  ;

    for (k= 0;  k < pr.length; k++) {
      if(pr[ k ].calcflag!=1){
       for (this.i = 0; this.i < data.length; this.i++) {

    
       if( (parseInt(data[this.i][2])==parseInt(pr[k].drugproductid ) )  && (parseInt(data[this.i][3])==parseInt(pr[k].batchrefid) ) ){


                data[this.i][6]=1  ;
     

       }

      }

    }

   }






for (this.i = 0; this.i < data.length; this.i++) {
 
     v  = 1  ;
 
     if( data[this.i][6]!=1){ 
  
     control.insert(0,  this.formBuilder.group({ 
    

      id:  [ , []]  ,  
      srrefid: [ this.registerForm.get('id').value   , []] ,  
      sirefid : [data[this.i][v++    ] , []]   ,  
      drugproductid:  [data[this.i][v++    ] , []]  ,  


      batchrefid:  [data[this.i][v++    ] , []]  ,  
      totalqty:  [ data[this.i][v++    ] , []] ,  
      unitprice:  [parseInt(data[this.i][v++]).toFixed(this.truncatepos) , []]  , 	
      mrp:  [data[this.i][v++    ] , []]  ,  
      expirydate:  [data[this.i][v++    ] , []]  ,  


      unitdiscount:  [data[this.i][v++    ] , []]  ,  
      unitvat:  [data[this.i][v++    ] , []]  ,     
      unitsgst:  [data[this.i][v++    ] , []]  ,   
      unitcgst:  [data[this.i][v++    ] , []]  , 
      unitigst:  [data[this.i][v++    ] , []]  ,  

      discountamt:[data[this.i][v++    ] , []]   ,
      vatamt:  [data[this.i][v++    ] , []]  , 
      sgstamt:  [data[this.i][v++    ] , []]  ,   
      cgstamt:  [data[this.i][v++    ] , []]  ,    
      igstamt:  [data[this.i][v++    ] , []]  ,  
  
      
      
      createdby   : [this.selobj.userid   , []], 
      locrefid   : [this.selobj.locrefid, []],
      locname   : [this.selobj.locname, []],
             countryrefid: [ this.selobj.countryrefid  , []],
          companyrefid: [ this.selobj .companyid , []],
          branchrefid: [ this.selobj .branchrefid , []],
      subtotal:  [parseInt(data[this.i][v++]).toFixed(this.truncatepos) , []]  , 
      drgtyp: [data[this.i][v++    ] , []]  ,
      gstflag: [data[this.i][v++    ] , []]   ,
      frgstflag: [data[this.i][v++    ] , []]   ,
      convfactor:  [data[this.i][v++    ] , []]  ,


      indvqty: [  , []]  ,

      
      crntsiqty:  [data[this.i][v++    ] , []], 
      crntstkqty: [data[this.i][v++    ] , []]  ,
      sinvrefid : [data[this.i][v++    ] , []]   ,  
      siqty: [data[this.i][v++    ] , []] , 
      clientcdate  :   [data[this.i][v    ] , []] ,
      clientcdate1  :   [data[this.i][v++    ] , []] ,



      productname: [data[this.i][0    ] , []]   ,   
      calcflag: [0  , []]   , 
      dbflag:   [ 0  , []],

      delflag  : [ false   , []]    ,
    
      batchname  :  [data[this.i][v++    ] , []] , 
        stkmainrefid: [ data[this.i][v++    ] , []]   ,
        siprodrefid: [data[this.i][v++    ] , []]  , 
    }));

  }

}



}




   deleteSalesRetn(){
      
  
   var   frmdata={ frmint1 : this.registerForm.get('id').value ,  frmstr1  :'', createdby  :'' , locrefid  :this.selobj.locrefid , locname  :this.selobj.locname  , companyid  :this.selobj.companyid   } ;
   
   var answer =  confirm("Delete data?");
   
  if (answer) { 
   this.userService.deleteSalesRetn( JSON.stringify(frmdata) ).subscribe(data => { this.deleteValid(data) },
      errorCode => console.log(errorCode));
          
   }
    }






     remove( ){
      const control = <FormArray>this.registerForm.controls['invoice'];  


      const controlrem = <FormArray>this.registerForm.controls['dummy']; 

      var  valorg = control.value  ;


      for (this.i = 0; this.i < valorg.length; this.i++) {

        if(((parseInt(valorg[this.i].calcflag)!=1) && (valorg[this.i].delflag!=true ))  ||  (valorg[this.i].dbflag==1) ) {   


         controlrem.insert(0,control.at(this.i))  ;

        }

      }

      while (control.length !== 0) {
        control.removeAt(0) ;
         }
      

        for (this.i = 0; this.i < controlrem.value.length; this.i++) {

         control.insert(0,controlrem.at(this.i))  ;

        
          }

        while (controlrem.length !== 0) {
        controlrem.removeAt(0) ;
         }
   
     }





     



     validnew():Number{
      var  valflag =0 ;
    
     const control = <FormArray>this.registerForm.controls['invoice'];
     
     
           var   invoicedata=  control.value  ;
     
           
            for (this.i = 0; this.i < invoicedata.length; this.i++) { 
                                            
                                                                                            
                                                                                  
             if(parseInt(invoicedata[this.i].totalqty  ) > parseInt(invoicedata[this.i].crntsiqty  )){
                    
               valflag=1 ;
              this.notificationsComponent.addToast({title:'Error', msg:'Qty > Siqty  ', timeout: 5000, theme:'default', position:'top-right',type:'error'});     
               }    
     
          if(parseInt(invoicedata[this.i].totalqty  ) > parseInt(invoicedata[this.i].crntstkqty  ) ){
           valflag=1 ;
              this.notificationsComponent.addToast({title:'Error', msg:'Qty > Stkqty  ', timeout: 5000, theme:'default', position:'top-right',type:'error'});     
           }                   
        }


       return   valflag;
    
    }


   clear(){
      this.ngOnInit() ;
      setTimeout(() => {
      this.router.navigate(['SalesReturn/ViewSalesReturn']);
    }, 2000);
    }

    
    

}