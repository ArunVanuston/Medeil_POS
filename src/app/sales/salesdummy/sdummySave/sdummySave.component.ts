
import {Component, OnInit   ,ViewChild  ,Input} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators  ,  FormArray} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';

import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';
import {sdummySaveService} from './sdummySave.service'  ;

import {NotificationsComponent }  from  '../../../notifications/notifications.component'  ;


import { DxDataGridComponent } from "devextreme-angular";



import {dateFormatPipe }  from  '../../../notifications/notifications.datepipe'  ; 

import { AppComponent } from '../../../app.component';



@Component({
  selector: 'app-sdummySave',
  templateUrl: './sdummySave.component.html',

  providers: [sdummySaveService,NgbDropdownConfig ,NotificationsComponent , dateFormatPipe ] 
 
})

export class sdummySaveComponent implements OnInit {


      registerForm: FormGroup;
  
      customers=[];
      doctors=[];

      sdummydata=[];

      prcsettings=[];

         errors=[] ;

       i;
     
      inc  =1 ;
     
       autoincr  ;
   
      autoval =  0    ;
          
      autoinc =  0    ;

     autodata =[]  ;


     autodatacopy =[]  ;
   
     images  =  [] ;
  
     selobj  ;

     drgid;
     ignoreflag   ;
    priceselflag  ;
    barcodeflag  ;

    truncatepos;

   @Input() fileExt: string = "JPG, GIF, PNG";
   
    constructor(private userService: sdummySaveService  ,    private   dateformat: dateFormatPipe  ,private formBuilder: FormBuilder ,config: NgbDropdownConfig , private notificationsComponent:NotificationsComponent) {
  
        config.autoClose = false;
    }
  
    ngOnInit() {
  
     
      this.selobj  = {   userid  : AppComponent.userID , locrefid  :AppComponent. locrefID1 , locname  :AppComponent.locRefName1  , countryrefid  :AppComponent.countryID   , companyid  :AppComponent.companyID  
        , branchrefid  :AppComponent.branchID     , vatdispflag  :AppComponent.vatDispFlag   , boxdispflag  :AppComponent.BoxDispFlag  
        , stripdispflag  :AppComponent.StripDispFlag    , tabdispflag  :AppComponent.TabDispFlag }  ;

     

      this.registerForm = this.formBuilder.group({
        
    				
	       salesbillid: [  , []],    
         salesbilltype: [  , []],    
	       salesbillno: [  , []], 
	       billdate: [  , []],     
         customerrefid: [  , [ Validators.required ]],
	       doctorrefid: [  , []],  
         totalamount: [  , [ ]],    
	       totalitems: [  , []],    
	       totaldiscount: [  , []],   
	       taxableamt: [  , []],    
	       totaltaxamt: [  , []],    
         totalinclamt: [  , []], 
	       totalexclamt: [  , []],     
         grandtotal : [  , [ Validators.required ,Validators.min(1)  ]], 

      
         createdby:   [this.selobj .userid , []]      ,
         locrefid:   [ this.selobj .locrefid, []]      ,
         locname:     [ this.selobj .locname  , []]     ,
	             countryrefid: [ this.selobj.countryrefid  , []],
          companyrefid: [ this.selobj .companyid , []],
          branchrefid: [ this.selobj .branchrefid , []],
    
   
   
        customername: [, []]  ,
        invoiceno: [, []]  ,
        autonamenew: [, []]  ,
        subtotal  : [, []]  ,
        roundoff  : [, []]  ,

        freeflag: [, []]  ,
        gstflag: [1, []]  ,
        frgstflag: [1, []]  ,
        discautoflag  : [, []]  ,

        barcode : [, []]  ,
        custdiscamt: [, []]  ,

        prescpath:  [, []]  ,
        paymenttype:  [, []]  ,
        ptrefno :  [, []]  ,


         clientcdate: [ this.dateformat.transform04()   , []],
         clientcdate1: [ this.dateformat.transform04()   , []],

          date: [this.dateformat.transform05(Date.now())   , []],
          vatdispflag: [ this.selobj.vatdispflag , []], 
          boxdispflag: [  this.selobj.boxdispflag  , []],        
          stripdispflag: [  this.selobj.stripdispflag , []],                    
          tabdispflag: [this.selobj.tabdispflag , []], 
        invoice:  this.formBuilder.array([
          
          ]),
       dummy:  this.formBuilder.array([
          
           ]),




      }) ;
  


  


      this.registerForm.get('customerrefid').setValue('opt1');
      
    var   frmdata={ frmint1 : '' ,  frmstr1  :'', createdby  :'' , locrefid  :this.selobj.locrefid , locname  :this.selobj.locname   , companyid  :this.selobj.companyid  } ;
      this.userService.viewCustomers( JSON.stringify(frmdata)).subscribe(data => {      this.customers= data   },
        errorCode => console.log(errorCode));  

        this.userService.viewDoctors( JSON.stringify(frmdata)).subscribe(data => {      this.doctors= data     },
          errorCode => console.log(errorCode));  
  
          this.userService.viewPriceSettings( JSON.stringify(frmdata)).subscribe(data => {      this.prcsettings= data   },
            errorCode => console.log(errorCode)); 

            this.userService.viewInvoiceNoInc( JSON.stringify(frmdata)).subscribe(data => {     this.registerForm.get('salesbillno').setValue(data)  },
              errorCode => console.log(errorCode)); 

              this.userService.viewSITaxSettings( JSON.stringify(frmdata)).subscribe(data => {  this.registerForm.get('gstflag').setValue(data[0][0] ) 
              , this.registerForm.get('frgstflag').setValue(data[0][1] )   },
                errorCode => console.log(errorCode)); 
       
      this.registerForm.get('freeflag').setValue(1)  ; 
      

  $( document ).ready(function() {


    $('.image').hide()  ;
  
  });
  
  
  $('.boxname ').hide()  ;
       

      this.images=[] ;


     this.init() ;
 
  
    }


ClosePresc(){
  
      $('.image ').hide()  ;
  }


 viewsPresc(){

  this.images=[['http://localhost:4200/api/slsinv/viewPresImage?search='+this.registerForm.get('prescpath').value]] ;

     $('.image ').show()  ;
   
  }



    autofocusin(){



      this.autoincr = setInterval(() => {

        if(this.registerForm.get('autonamenew').value){

       
          $('#autolist').show()   ;

          
          if(this.autoval== this.registerForm.get('autonamenew').value){
            
                   
                    this.autoinc+= 1 ;
                    
            
            } else{
            
                    this.autoinc = 0  ;
            }
                  
     
            this.autoval= this.registerForm.get('autonamenew').value  ;

         if(this.autoinc<1){
          var   frmdata={ frmint1 : '' ,  frmstr1 : this.registerForm.get('autonamenew').value , createdby  :'' , locrefid  :this.selobj.locrefid , locname  :this.selobj.locname  , companyid  :this.selobj.companyid   } ;
        this.userService.viewSDProductNames( JSON.stringify(frmdata) ).subscribe(data => {      this.autodata= data    },
        errorCode => console.log(errorCode));  

            }

        

    
        }
        
      }, 610);

    
    }


    
    autofocusout(){
      
 
      if(this.registerForm.get('autonamenew').value) {
   
    
      } else{

        $('#autolist').hide() ;
      }


      clearInterval( this.autoincr );
        
            
       }







       autokeyselect(event: KeyboardEvent,articleId: number){
        
          
        var autoincrflag: number;
        

if(event.keyCode == 38){

var autoincrflag=articleId-1;

if(autoincrflag == 0){
$("#autoname").focus();
}else{
$( "#autolist li:nth-child("+autoincrflag+") input" ).focus();
}
}

if(event.keyCode == 40){


var autoincrflag=articleId+1;

$( "#autolist li:nth-child("+autoincrflag+") input" ).focus();
}
           
              if(event.keyCode == 13){
    
                this.drgid =   articleId -1 ;
    
               this.autodatacopy  =  this.autodata  ;
    
                this.autodata =  []   ;
    
                    $('.boxname ').show()  ;
    
                     $('#autolistnew  ul   li:nth-child(1)   input:nth-child(1) ').focus()  ;
           
             }
      
             this.barcodeflag=0 ;
    
            }
    


            
viewBarcodeProd(event: KeyboardEvent ){
  
  
  
  
     if(event.keyCode == 13){
  
     this.barcodeflag=1 ;
  
     $('.boxname ').show()  ;
  
     $('#autolistnew  ul   li:nth-child(1)   input:nth-child(1) ').focus()  ;
  
     }
  
  
  }



            viewStock(event: KeyboardEvent,stktype: number){
              

              
              var autoincrflag: number;
              if(event.keyCode == 38){
                
                 autoincrflag=stktype-1;
                
                $( "#autolistnew li:nth-child("+autoincrflag+") input" ).focus();
                
                }
                
                if(event.keyCode == 40){
                
                 
                 autoincrflag=stktype+1;
                
                $( "#autolistnew li:nth-child("+autoincrflag+") input" ).focus();
                }
      
                
                 
                        if(event.keyCode == 13){
              

                 if(this.barcodeflag==0){

             
                        
                        var   drg=   this.autodatacopy[this.drgid ][1]  ;
                   
          
                        var   frmdata={ frmint1 :drg ,  frmstr1  :'', createdby  :'' , locrefid  :this.selobj.locrefid , locname  :this.selobj.locname   , companyid  :this.selobj.companyid  } ;
                          this.userService.viewSDProductName( JSON.stringify(frmdata) ).subscribe(data => {   this.viewServWareHouseStock(data ,stktype )      },
                           errorCode => console.log(errorCode));
                      
                        
                            $("#autoname").focus();
                       
                            $('.boxname ').hide()  ;
                     
                           this.registerForm.get('autonamenew').setValue('')  ;
              
                           this.autodatacopy=[]  ;

                 }else if(this.barcodeflag==1){

                  alert(2)  ;


            var   frmdata1={ frmint1 : ''  ,  frmstr1  :  this.registerForm.get('barcode').value, createdby  :'' , locrefid  :this.selobj.locrefid , locname  :this.selobj.locname   , companyid  :this.selobj.companyid  } ;
                          this.userService.viewBarCodeProd( JSON.stringify(frmdata1) ).subscribe(data => {      this.viewServWareHouseStock(data ,stktype )        },
                           errorCode => console.log(errorCode));

                           $('.boxname ').hide()  ;
                           
                                $(".barcode").focus();
                            this.registerForm.get('barcode').setValue('')  ;



                 }

                  }
              
              
              
              }






              viewServWareHouseStock(data : any , stktype : any ){
                
                var conversionfactor  ;

                const control = <FormArray>this.registerForm.controls['invoice'];


                 var unitprice ;
                
                    if(stktype==1){
                
                      conversionfactor=  data[0][9] ;
                    }else if(stktype==2){
                      conversionfactor=  data[0][10] ;
                
                    }else if(stktype==3){
                
                      conversionfactor= 1   ;
                    }


                
                  for (this.i = 0; this.i < data.length; this.i++) {
                
                
                              /*         this.prcsettings[0][1]==1;
                    
                                        if(this.prcsettings[0][1]==1){
                                          
                                              unitprice=   data[this.i][3  ]  ;
                                              }else if(this.prcsettings[0][1]==2){
                                                unitprice=    data[this.i][15   ]   ;
                                          
                                              }else if(this.prcsettings[0][1]==3){
                                          
                                                unitprice=   data[this.i][16   ]   ;
                                             }else if(this.prcsettings[0][1] ==4){
                                              
                                              unitprice=   data[this.i][17   ]   ;
                                             }else if(this.prcsettings[0][1]==5){
                                              
                                              unitprice=  data[this.i][18   ]   ;
                                              }  */

                                              unitprice=  20 ;

                
                

                    control.insert(0,this.formBuilder.group({
                      
                        salesprdtid:  [ , []] ,
                        salesrefid: [ , []] ,
                        drugproductid:  [data[this.i][ 1 ] , []]  , 
                        batchrefid: [ , []]  , 
                    
                    
                  
                       totalqty: [ 0  , []]  , 
                       totalfreeqty: [ , []] ,
                       unitprice:   [unitprice , []]  ,          
                       mrp:  [data[this.i][3  ] , []]   ,
                       expirydate:  [ , []] ,
                     
                    
                       unitdiscount:  [ , []]  , 
                       unitvat:  [data[this.i][ 4 ] , []] ,
                       unitsgst: [data[this.i][ 5 ] , []]  , 
                       unitcgst:  [data[this.i][6  ] , []] , 
                       unitigst:   [data[this.i][ 7  ] , []] , 
                 
                    
                       discountamt : [ , []] ,
                       vatamt: [ , []] ,
                       sgstamt: [ , []] ,
                       cgstamt: [ , []] ,
                       igstamt: [ , []] ,
                  
                
                
                       subtotal: [ , []] ,
                   
                       clientcdate: [ this.dateformat.transform04()   , []],
                       clientcdate1: [ this.dateformat.transform04()   , []],
                       
                       createdby   : [this.selobj.userid   , []], 
                       locrefid   : [this.selobj.locrefid, []],
                       locname   : [this.selobj.locname, []],
                  

                               countryrefid: [ this.selobj.countryrefid  , []],
          companyrefid: [ this.selobj .companyid , []],
          branchrefid: [ this.selobj .branchrefid , []],


                       drgtyp:stktype ,
                       gstflag: [this.registerForm.get('gstflag').value , []] ,
                       frgstflag:  [this.registerForm.get('frgstflag').value  , []]  ,
                       freeflag:  [this.registerForm.get('freeflag').value    , []]  ,

                       priceflag: [ , []],
                       discautoflag:   [ , []],
                       indvqty: [ , []] ,
                       indvfreeqty: [ , []] ,
                       convfactor:   [ conversionfactor, []]  ,

                      
                     

               
                       crntstkqty: [ , []]  ,
                       productname: [data[this.i][ 0 ] , []]   ,



                       calcflag: [0  , []]   ,
                     delflag : [ false , []]   ,
                      }));
      

                
                 this.inc+= 1  ;
                      
                
            }
                



            }






onSubmit(){
  
      var  valflag =0 ; 


    var answer =  confirm("Save data?");
             
       if (answer) { 
      this.userService.saveSalesDummy(JSON.stringify(this.registerForm.value) ).subscribe(data => {this.saveSDProducts(data)   },
        errorCode => console.log(errorCode));
        }
  
    
  }
    




saveSDProducts(data:any){



  const control = <FormArray>this.registerForm.controls['invoice'];
  if(data==1){ 

      this.userService.saveSDProducts(JSON.stringify( control.value)  ) .subscribe(data => {this.savevalid(data)},
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


calc( e){
  

     
  if(e.keyCode == 9){
    

        this.calcGST()  ; 

  }
  
     }


     setDiscAmt(){

        var custdiscamt:number=0;

        const control = <FormArray>this.registerForm.controls['invoice'];
        
        var sprod=control.value ;

         if(parseInt(this.registerForm.get('custdiscamt').value)){
        
          custdiscamt= parseInt(this.registerForm.get('custdiscamt').value)  ;
         
         }else{

          custdiscamt=0  ;
         }

         if(custdiscamt<1){

          for (this.i = 0; this.i < sprod.length; this.i++) {
            if(sprod[this.i].calcflag!=1){
            sprod[this.i].unitdiscount =0  ;

              }
          }

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
 
 var  precustdisc:number =0;


  var inv  ;









    if(parseInt(this.registerForm.get('custdiscamt').value)>0 ){


    this.registerForm.get('discautoflag').setValue(1);
    }else{

      this.registerForm.get('discautoflag').setValue(0);

      this.registerForm.get('custdiscamt').setValue(0);
    }


  for (this.i = 0; this.i < sprod.length; this.i++) {


          
    if(parseInt(sprod[this.i].indvqty) ){
      preqty=parseInt(sprod[this.i].indvqty);
  
    }else{
      preqty=0;
    }


        
    if(parseInt(sprod[this.i].unitprice) ){
      preprodprice=parseInt(sprod[this.i].unitprice);

    }else{
      preprodprice=0;
    }

      
    if( parseInt(sprod[this.i].freeflag) ){
      freeflag=  parseInt(sprod[this.i].freeflag) ;
   
  
     }else{
      freeflag=0;
  
     
     }


    pretotprice=  preqty* preprodprice;
   
        if(freeflag == 1){
      
  
               subtotal+=pretotprice;
         
         }
  
  }
  

  precustdisc= (this.registerForm.get('custdiscamt').value /subtotal)*100  ;
  
  subtotal=0;
  pretotprice=0;
  
  for (this.i = 0; this.i < sprod.length; this.i++) {
    
    
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
      
          if(freeflag == 0){
                    sprod[this.i].indvfreeqty=0  ;
                  discount=0 ;
                  prefree=0 ;
         } else {

          prodcount+=1  ;
         }
      

         if( this.registerForm.get('discautoflag').value  == 1){                       
          sprod[this.i].unitdiscount =precustdisc;
          predisc= precustdisc;                                            
      
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
            else   if(frgstflag == 2) {
    
             
            vatamt=   (((preqty+prefree)*preprodprice-discount) *prevat)/100;  
    
            sgstamt=   (((preqty+prefree)*preprodprice-discount) *presgst)/100;  
            cgstamt=   (((preqty+prefree)*preprodprice-discount) *precgst)/100;  
            igstamt=   (((preqty+prefree)*preprodprice-discount) *preigst)/100;        
    
    
               }                     
                 }
            else    if(gstflag == 2){
    
             vatamt  =  (preqty+prefree)*(premrp-(premrp/(1+prevat/100)))   ; 
    
             sgstamt  =  (preqty+prefree)*(premrp-(premrp/(1+presgst/100)))   ; 
             cgstamt  =  (preqty+prefree)*(premrp-(premrp/(1+precgst/100)))   ;   
             igstamt  =  (preqty+prefree)*(premrp-(premrp/(1+preigst/100)))   ;             
    
           }
    
    
      
           if(freeflag == 1  || freeflag == 0 ) {
      
            sprod[this.i].vatamt=vatamt;  
    
            sprod[this.i].sgstamt=sgstamt;
            sprod[this.i].cgstamt=cgstamt;
            sprod[this.i].igstamt=igstamt;
      
      
            totvatamt+=vatamt   ;
            
            totsgstamt+=sgstamt   ;
            totcgstamt+= cgstamt   ;
            totigstamt+=igstamt    ;
              
    
           } 
           
           
           
           if(freeflag == 1){
    
    
      
             totalproduct=prodcount ;
             totqty+=preqty;
             subtotal+=pretotprice;
             totdiscount+=discount  ;
    
      
            }
      
      
            this.ignoreflag==1  ;



        }
          }








 
     totgstamt =totsgstamt+totcgstamt+totigstamt + totvatamt;
 
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
                     
         
                totalitems:  prodcount, 
                totaldiscount:  totdiscount.toFixed(this.truncatepos)  ,
                taxableamt:  totaltaxableamt.toFixed(this.truncatepos)  ,   
                totaltaxamt: totaltaxamt.toFixed(this.truncatepos)  ,         
                totalinclamt:totalincamt.toFixed(this.truncatepos)  ,
                totalexclamt: totalexclamt.toFixed(this.truncatepos)  , 
                grandtotal: grandtotal.toFixed(this.truncatepos)  ,
           
  
               createdby:   this.selobj .userid,
               locrefid:   this.selobj .locrefid,
               locname:  this.selobj.locname,      
               totalamount:   subtotal.toFixed(this.truncatepos)  ,
       
              });






   }



  init(){
    const control = <FormArray>this.registerForm.controls['invoice'];
    var data=[ [],[] ];
     
    for (this.i = 0; this.i < data.length; this.i++) {

     control.push(this.formBuilder.group({
       
         salesprdtid:  [ , []] ,
         salesrefid: [ , []] ,
         drugproductid:  [ , []] ,
         batchrefid:[ , []] ,
     
     
   
        totalqty: [ , []] ,
        totalfreeqty: [ , []] ,
        unitprice:   [ , []] ,      
        mrp: [ , []] ,
        expirydate:  [ , []] ,
      
     
        unitdiscount:  [ , []] ,
        unitvat:  [ , []] ,
        unitsgst: [ , []] ,
        unitcgst:  [ , []] ,
        unitigst:   [ , []] , 
  
     
        discountamt : [ , []] ,
        vatamt: [ , []] ,
        sgstamt: [ , []] ,
        cgstamt: [ , []] ,
        igstamt: [ , []] ,
   
 
 
        subtotal: [ , []] ,
    
       clientcdate: [ this.dateformat.transform04()   , []],
       clientcdate1: [ this.dateformat.transform04()   , []],
        createdby   : [ , []] ,
        locrefid   : [ , []] ,
        locname   : [ , []] ,
   

                countryrefid: [ this.selobj.countryrefid  , []],
          companyrefid: [ this.selobj .companyid , []],
          branchrefid: [ this.selobj .branchrefid , []],

          
        drgtyp: [ , []] ,
        gstflag: [ , []] ,
        frgstflag:  [ , []]  ,
        freeflag:  [    , []]  ,

   
        priceflag: [ , []],
        discautoflag:   [ , []],
        convfactor:   [ , []]  ,
        indvqty: [ , []] ,
        indvfreeqty: [ , []] ,
    

     

        crntstkqty: [ , []]  ,
        productname: [, []]   ,


        calcflag: [1 , []]   ,

          delflag : [ false , []]   ,
       }));


   }



 }





fileChange(event) {
  
    var  valflag =0 ; 

      let fileList: FileList = event.target.files;
      if(fileList.length > 0) {
  
          let file: File = fileList[0];
  
          let formData:FormData = new FormData();
          formData.append('file', file, file.name);
          formData.append('locrefid', this.selobj.locrefid);
          formData.append('locname', this.selobj.locname   );


              this.userService.savePresImage(formData).subscribe(data => {this.registerForm.get('prescpath').setValue(data)      },
          errorCode => console.log(errorCode));
      
      }
  }
  


  // photoValidation(files) {

  //   if (files.length > 0 && (!this.isValidFileExtension(files))) {
  //     return;
  //   }


  // }

  private isValidFileExtension(files) {
   
    var extensions = (this.fileExt.split(','))
      .map(function(x) {return x.toLocaleUpperCase().trim()});
    for (var i = 0; i < files.length; i++) {
  
      var ext = files[i].name.toUpperCase().split('.').pop() || files[i].name;
 
      var exists = extensions.includes(ext);
      if (!exists) {
        this.errors.push("Error (Extension): " + files[i].name);
      }

    }
  } 







   

     remove( ){
      const control = <FormArray>this.registerForm.controls['invoice'];  


      const controlrem = <FormArray>this.registerForm.controls['dummy']; 

      var  valorg = control.value  ;


      for (this.i = 0; this.i < valorg.length; this.i++) {

        if((parseInt(valorg[this.i].calcflag)!=1) && (valorg[this.i].delflag!=true )  ) {   


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


       this.init() ;
  


   
     }





































   validnew():Number{
    var  valflag =0 ;
  
  
     return   valflag;
  
  }

  












  
  clear(){
    
      this.ngOnInit() ;
    }



    

}