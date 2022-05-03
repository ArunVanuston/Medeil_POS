import { OnInit, Component } from "@angular/core";
import { NotificationsComponent } from "app/notifications/notifications.component";
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from "@angular/forms";
import { AppComponent } from "app/app.component";
import { dateFormatPipe } from "app/notifications/notifications.datepipe";
import { Router } from "@angular/router";
import { XRegisterServices } from "./xregister.services";
import { parse } from "querystring";

@Component({
    selector: 'app-closexregister',
    templateUrl: './closexregistershift.component.html',
    providers: [dateFormatPipe, NotificationsComponent, XRegisterServices]
})

export class CloseXRegisterComponent implements OnInit {
    parentMessage = "sales";
    shiftclosedform: FormGroup;
    purchasejournal: FormGroup;
    cashManageForm: FormGroup;

    constructor(private formBuilder: FormBuilder,private dateformat: dateFormatPipe, private xRegisterServices: XRegisterServices,
        private notificationsComponent: NotificationsComponent, private router: Router) { }

    employeename:any;
    transactions=[];
    opentotal:any=0;
    shiftopentime:any=0;
    ngOnInit(): void {
        this.shiftclosedform = this.formBuilder.group({
            companyid: [AppComponent.companyID, []],
            branchid: [AppComponent.branchID, []],
            locname: [AppComponent.locRefName1, []],
            locrefid: [AppComponent.locrefID1, []],
            countryid: [AppComponent.countryID, []],
            suserid:[sessionStorage.getItem('indvuserid')],
            openregid:['',[]],
            employeeid:['',[]],
            counterid:['opt1',[]],
            logintime:['',[]],
            logouttime:[this.dateformat.transform04(),[]],
            transactamt: [0.00, []],
            openbalance:[0.00,[]],
            closedbalance: ['', [Validators.pattern("[0-9]*")]],
            differenceamt: [0.00, []],
            inwards:[0.00,[]],
            outwards:[0.00,[]],
            closeregdetails:[this.dateformat.transform04(),[]],

            //Add Remove Cash Joins
            dummyaccid:['opt1',[]],
            accid:['opt1',[]],
            
            //Add Cash
            addpaymenttype:['opt1',[]],
            addamt:[0,[]],
            addamountreason:['',[]],
            //adddistributorid:['opt1',[]],

            //Remove Cash
            expensepaymenttype:['opt1',[]],
            expenseamt:[0,[]],
            expenseamtreason:['',[]],
            clientcdate:['',[]]
            //expensedistributorid:['opt1',[]],
        });

        // this.purchasejournal = this.formBuilder.group({
        //     debitaccount: ['', []],
        //     creditaccount: ['', []],
        //     debitamount: [0, []],
        //     creditamount: [0, []],
        //     craccname: ['Add Cash', []],
        //     draccname: ['Remove Cash', []],
        //     invoiceno: [, []],
        //     invoicebalamt: [, []],
        //     clientcdate: [this.dateformat.transform04(), []],
        //     clientcdate1: [this.dateformat.transform04(), []],
        //     cashflag: [, []],
        //     jrnltype: [10, []],
        //     jrnlname: ['Shift Close', []],
        //     bulkflag: [, []],
        //     personid: ['', []],
        //     personname:['',[]],
        //     persontype: ['', []],
        //     invoicetype: ['', []],
        //     paymenttype: [, []],
        //     ptrefno: [, []],
        //     countryrefid: ['', []],
        //     companyrefid: [AppComponent.companyID, []],
        //     branchrefid: [AppComponent.branchID, []],
        //     locname: [AppComponent.locRefName1, []],
        //     locrefid: [AppComponent.locrefID1, []],
        //     salesflag: [0, []],
        //     calcflag: [0, []],
        //   });

        this.cashManageForm = this.formBuilder.group({
            cashform:['Add Cash',[]],
            cashtype:[1,[]],
            paytype:['Cash',[]],
            payamount:[0,[]],
            dueamount:[0,[]],
            paydetails:['',[]],
            suserrefid:[sessionStorage.getItem('indvuserid'),[]],
            companyid:[AppComponent.companyID,[]],
            branchid:[AppComponent.branchID,[]],
            locname:[AppComponent.locRefName1,[]],
            locrefid:[AppComponent.locrefID1,[]],
            distributorname:['',[]],
            loyaltyamount:[0,[]],
            giftamount:[0,[]],
            clientcdate:[this.dateformat.transform04(),[]]
        });

        this.xRegisterServices.getOpenRegdetails(sessionStorage.getItem("indvuserid"),localStorage.getItem("shiftlogintime")).subscribe(data => {
            this.shiftclosedform.get('openregid').setValue(data[0][0]);
            this.shiftclosedform.get('counterid').setValue(data[0][2]);
            this.shiftclosedform.get('logintime').setValue(data[0][3]);
            this.opentotal=data[0][4]});

        this.xRegisterServices.getEmployeedetails(sessionStorage.getItem("indvuserid")).subscribe(data => {
            this.shiftclosedform.get('employeeid').setValue(data[0][2]);
            this.employeename=data[0][1] });

        setTimeout(() => {
            this.shiftopentime=localStorage.getItem("shiftlogintime");
            this.xRegisterServices.getTranscdetails(sessionStorage.getItem("indvuserid"),localStorage.getItem("shiftlogintime")).subscribe(data => {
                this.transactions=data;this.bindtranscations(data)});
        },1500);

    }

    inwards:number=0;
    outwards:number=0;
    bindtranscations(data){
        //var grtotal:number=0;
        // for(let i=0;i<data.length;i++){
        //     grtotal+=parseInt(data[i][1]);
        // }
       // alert("bind:"+data[0][12]+"---"+data[0][13])
        //alert("Data: "+data+"---"+data.length);
        if(data.length==0||data==''||data==null){
            this.shiftclosedform.get('transactamt').setValue(this.opentotal);
            // let nancheck=isNaN(this.opentotal);
            // //alert(this.opentotal+"----"+nancheck)
            // if(nancheck){
            //     this.shiftclosedform.get('transactamt').setValue((0).toFixed(2));
            //   }else{
                
            //   }
        }else{
            if(data[0][12]==null||data[0][12]==''){this.inwards==0.00}else{this.inwards=parseFloat(data[0][12])}
            if(data[0][13]==null||data[0][13]==''){this.outwards==0.00}else{this.outwards=parseFloat(data[0][13])}
            let finalamt=parseFloat(this.opentotal)+this.inwards-this.outwards;
            let nancheck=isNaN(finalamt);
            if(nancheck){
              this.shiftclosedform.get('transactamt').setValue((0).toFixed(2));
            }else{
              this.shiftclosedform.get('transactamt').setValue((finalamt).toFixed(2));
            }
        }
       
    }

    differcalc(){
        let expectamt = parseFloat(this.shiftclosedform.get('transactamt').value);
        let countedamt = parseInt(this.shiftclosedform.get('closedbalance').value);
        let differbal = countedamt - expectamt;
        let nancheck=isNaN(differbal);
        if(nancheck){
          this.shiftclosedform.get('differenceamt').setValue((0).toFixed(2));
        }else{
          this.shiftclosedform.get('differenceamt').setValue((differbal).toFixed(2));
        }
        this.xRegisterServices.getAddRemoveTotal(sessionStorage.getItem("indvuserid"),localStorage.getItem("shiftlogintime")).subscribe(data => {
            this.purchasejournal.get('creditamount').setValue(data[0][0]);
            this.purchasejournal.get('debitamount').setValue(data[0][1]); });
    }

    shiftvalidate(){
        let logintime=localStorage.getItem("shiftlogintime");
        let counterno=this.shiftclosedform.get('counterid').value;
        let closedbal=this.shiftclosedform.get('closedbalance').value;
        let details=this.shiftclosedform.get('closeregdetails').value;
        if(logintime== null || logintime== '' || logintime == undefined){
            this.notificationsComponent.addToast({ title: 'Alert', msg: 'First You Open Shift!..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
            return false;
        }else if(counterno=='opt1'|| counterno== '' || counterno == null || counterno == undefined){
            this.notificationsComponent.addToast({ title: 'Alert', msg: 'Select Counter No..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
            return false;
        }else if(closedbal==''|| closedbal== null || closedbal == undefined){
            this.notificationsComponent.addToast({ title: 'Alert', msg: 'Enter Closed Balance if not enter Zero!..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
            return false;
        }
        else if(details == '' || details == null || details == undefined){
            this.notificationsComponent.addToast({ title: 'Alert', msg: 'Enter something on Notes!..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
            return false;
        }
        return true;
    }

    saveprocess:boolean=false;
    onSubmit() {
        let valflag=this.shiftvalidate();
        if(valflag){
            this.saveprocess=true;
            let differamt=this.shiftclosedform.get('differenceamt').value;
            let transtotal= this.shiftclosedform.get('transactamt').value
            this.shiftclosedform.get('transactamt').setValue(parseInt(transtotal));
            this.shiftclosedform.get('differenceamt').setValue(parseInt(differamt));
            this.shiftclosedform.get('openbalance').setValue(this.opentotal);
            this.shiftclosedform.get('inwards').setValue(this.inwards);
            this.shiftclosedform.get('outwards').setValue(this.outwards);
            this.shiftclosedform.get('logintime').setValue(localStorage.getItem("shiftlogintime"));
            this.shiftclosedform.get('logouttime').setValue(this.dateformat.transform04());
            this.shiftclosedform.get('clientcdate').setValue(this.dateformat.transform04());
            this.xRegisterServices.xCloseRegisterSave(JSON.stringify(this.shiftclosedform.value)).subscribe(data => {
                if (data) {
                    this.saveprocess=false;
                    this.notificationsComponent.addToast({ title: 'Success', msg: 'Data Saved SuccessFully', timeout: 2000, theme: 'default', position: 'top-right', type: 'success' });
                    this.router.navigate(['/OpenRegister/OpenRegister']);
                    localStorage.removeItem("shiftlogintime");
                    this.xRegisterServices.xCloseRegisterAccountSave(JSON.stringify(this.purchasejournal.value)).subscribe(data => { });
                    setTimeout(() => {
                        this.router.navigate(['/OpenRegister/OpenRegister']);
                    },2000);

                    setTimeout(() => {
                        
                        this.shiftclosedform.reset();
                       this.purchasejournal.reset();
                        this.ngOnInit();
                      
                        // setTimeout(() => {
                         //   
                        // },1500); 
                   },3200);
                   
                }else{
                    this.saveprocess=false;
                    this.notificationsComponent.addToast({ title: 'Error', msg: 'Data Not Saved', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
                }
            });
        }
    }


    //Add Cash Process
    addcashflag:boolean=false;
    removecashflag:boolean=false;
    acctype:any;
    cashopen(ctype){
        if(ctype==1){this.addcashflag=true}else if(ctype==2){this.removecashflag=true}
        var frmdata = { frmint1: '', frmstr1: '', createdby: '', locrefid: AppComponent.locrefID1, locname: AppComponent.locRefName1 };
        this.xRegisterServices.viewAccountType(JSON.stringify(frmdata)).subscribe(data => { this.acctype=data},
            errorCode => console.log(errorCode));
    }

    accsubtype:any;
    getacctypelists(accid){
        this.xRegisterServices.GetAccountTypeLists(AppComponent.companyID,AppComponent.branchID,AppComponent.locRefName1,AppComponent.locrefID1, accid).subscribe(data => { this.accsubtype=data },
        errorCode => console.log(errorCode));
    }

    addcashvalidate(){
        let accid=this.shiftclosedform.get('accid').value;
        let paytype=this.shiftclosedform.get('addpaymenttype').value;
        let addamt=this.shiftclosedform.get('addamt').value;
        let addnotes=this.shiftclosedform.get('addamountreason').value;
        if(accid=='opt1' || accid== '' || accid == null || accid == undefined){
            this.notificationsComponent.addToast({ title: 'Alert', msg: 'Select Account Sub Type', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
            return false;
        }else  if(paytype=='opt1' || paytype== '' || paytype == null || paytype == undefined){
            this.notificationsComponent.addToast({ title: 'Alert', msg: 'Select Payment Type', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
            return false;
        }else if(addamt<1 || addamt== '' || addamt == null || addamt == undefined){
            this.notificationsComponent.addToast({ title: 'Alert', msg: 'Enter Minimum Amount 1', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
            return false;
        }else if(addnotes==''|| addnotes== null || addnotes == undefined){
            this.notificationsComponent.addToast({ title: 'Alert', msg: 'Enter Add Notes!..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
            return false;
        }
        return true;
    }

    addcash(){
        let valflag=this.addcashvalidate();
        if(valflag){
            // this.purchasejournal = this.formBuilder.group({
            //     debitaccount: ['', []],
            //     creditaccount: [2, []],
            //     debitamount: ['', []],
            //     creditamount: [0, []],
            //     craccname: ['Debtors Add Cash', []],
            //     draccname: ['', []],
            //     invoiceno: [, []],
            //     invoicebalamt: [, []],
            //     date:[this.dateformat.transform05(Date.now()),[]],
            //     clientcdate: [this.dateformat.transform04(), []],
            //     clientcdate1: [this.dateformat.transform04(), []],
            //     cashflag: [, []],
            //     jrnltype: [9, []],
            //     jrnlname: ['Receipt Add Cash', []],
            //     bulkflag: [, []],
            //     personid: [sessionStorage.getItem('indvuserid'), []],
            //     personame:['',[]],
            //     persontype: ['', []],
            //     invoicetype: ['', []],
            //     paymenttype: ['Cash', []],
            //     ptrefno: ['Add Cash Ref', []],
            //     countryrefid: [AppComponent.countryID, []],
            //     companyrefid: [AppComponent.companyID, []],
            //     branchrefid: [AppComponent.branchID, []],
            //     locname: [AppComponent.locRefName1, []],
            //     locrefid: [AppComponent.locrefID1, []],
            //     salesflag: [0, []],
            //     calcflag: [0, []],
            //   });
            // this.purchasejournal.get('personname').setValue(this.employeename);
            // this.purchasejournal.get('creditamount').setValue(this.shiftclosedform.get('addamt').value);
            // this.purchasejournal.get('paymenttype').setValue(this.shiftclosedform.get('addpaymenttype').value);
            // this.xRegisterServices.xOpenRegisterAccountSave(JSON.stringify(this.purchasejournal.value)).subscribe(data => {
            // });
            let formval={id:this.shiftclosedform.get('accid').value,accbalance:this.shiftclosedform.get('addamt').value}
            this.xRegisterServices.UpdateAccBal(JSON.stringify(formval)).subscribe(data => {
                if(data==1){
                    this.updateaddcashmanage();
                }      
            },errorCode => console.log(errorCode));
        }
    }

    updateaddcashmanage(){
        this.cashManageForm.get('payamount').setValue(parseFloat(this.shiftclosedform.get('addamt').value));
        this.cashManageForm.get('paytype').setValue(this.shiftclosedform.get('addpaymenttype').value);
        this.cashManageForm.get('paydetails').setValue(this.shiftclosedform.get('addamountreason').value);
        this.cashManageForm.get('cashtype').setValue(1);
        this.cashManageForm.get('clientcdate').setValue(this.dateformat.transform04());
        this.xRegisterServices.saveCashManage(JSON.stringify(this.cashManageForm.value)).subscribe(data => {
            if(data){
            this.shiftclosedform.get('dummyaccid').setValue('opt1');
            this.shiftclosedform.get('accid').setValue('opt1');
            this.shiftclosedform.get('addpaymenttype').setValue('opt1');
            this.shiftclosedform.get('addamt').setValue(0.00);
            this.shiftclosedform.get('addamountreason').setValue('');  
            this.shiftclosedform.get('closedbalance').setValue('');             
            this.xRegisterServices.getTranscdetails(sessionStorage.getItem("indvuserid"),localStorage.getItem("shiftlogintime")).subscribe(data => {
                this.transactions=data;this.bindtranscations(data) }); 
                setTimeout(() => {
                    this.addcashflag=false;
                },1500);
            }          
        },errorCode => console.log(errorCode));
    }


    //Remove Cash Process
    removecashvalidate(){
        let accid=this.shiftclosedform.get('accid').value;
        let paytype=this.shiftclosedform.get('expensepaymenttype').value;
        let removeamt=this.shiftclosedform.get('expenseamt').value;
        let removenotes=this.shiftclosedform.get('expenseamtreason').value;
        if(accid=='opt1' || accid== '' || accid == null || accid == undefined){
            this.notificationsComponent.addToast({ title: 'Alert', msg: 'Select Account Sub Type', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
            return false;
        }else  if(paytype=='opt1' || paytype== '' || paytype == null || paytype == undefined){
            this.notificationsComponent.addToast({ title: 'Alert', msg: 'Select Payment Type', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
            return false;
        }else if(removeamt<1 || removeamt== '' || removeamt == null || removeamt == undefined){
            this.notificationsComponent.addToast({ title: 'Alert', msg: 'Enter Minimum Amount 1', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
            return false;
        }else if(removenotes==''|| removenotes== null || removenotes == undefined){
            this.notificationsComponent.addToast({ title: 'Alert', msg: 'Enter Remove Notes!..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
            return false;
        }
        return true;
    }

    
    removecash(){
        let valflag=this.removecashvalidate();
        if(valflag){
            // this.purchasejournal = this.formBuilder.group({
            //     debitaccount: [4, []],
            //     creditaccount: [0, []],
            //     debitamount: [0, []],
            //     creditamount: ['', []],
            //     craccname: ['', []],
            //     draccname: ['Account Payable Remove Cash', []],
            //     invoiceno: [, []],
            //     invoicebalamt: [0, []],
            //     date:[this.dateformat.transform05(Date.now()),[]],
            //     clientcdate: [this.dateformat.transform04(), []],
            //     clientcdate1: [this.dateformat.transform04(), []],
            //     cashflag: [, []],
            //     jrnltype: [10, []],
            //     jrnlname: ['Payment Remove Cash', []],
            //     bulkflag: [, []],
            //     personid: [sessionStorage.getItem('indvuserid'), []],
            //     personame:['',[]],
            //     persontype: ['', []],
            //     invoicetype: ['', []],
            //     paymenttype: ['Cash', []],
            //     ptrefno: ['Remove Cash Ref', []],
            //     countryrefid: [AppComponent.countryID, []],
            //     companyrefid: [AppComponent.companyID, []],
            //     branchrefid: [AppComponent.branchID, []],
            //     locname: [AppComponent.locRefName1, []],
            //     locrefid: [AppComponent.locrefID1, []],
            //     salesflag: [0, []],
            //     calcflag: [0, []],
            //   });
             
            // this.purchasejournal.get('personname').setValue(this.employeename);
            // this.purchasejournal.get('debitamount').setValue(this.shiftclosedform.get('expenseamt').value);
            // this.purchasejournal.get('paymenttype').setValue(this.shiftclosedform.get('expensepaymenttype').value);
            // this.xRegisterServices.xCloseRegisterAccountSave(JSON.stringify(this.purchasejournal.value)).subscribe(data => {
            // });
            //this.xRegisterServices.xCloseRegisterAccountSave(JSON.stringify(this.purchasejournal.value)).subscribe(data => { });
            
            let formval={id:this.shiftclosedform.get('accid').value,accbalance:this.shiftclosedform.get('expenseamt').value}
            this.xRegisterServices.UpdateAccBal(JSON.stringify(formval)).subscribe(data => {
                if(data==1){
                    this.updateremovecashmanage();
                }      
            },errorCode => console.log(errorCode));
        }
    }

    updateremovecashmanage(){
        this.cashManageForm.get('cashform').setValue('Remove Cash');
        this.cashManageForm.get('cashtype').setValue(2);
        this.cashManageForm.get('payamount').setValue(parseFloat(this.shiftclosedform.get('expenseamt').value).toFixed(2));
        this.cashManageForm.get('paytype').setValue(this.shiftclosedform.get('expensepaymenttype').value);
        this.cashManageForm.get('paydetails').setValue(this.shiftclosedform.get('expenseamtreason').value);
        this.xRegisterServices.saveCashManage(JSON.stringify(this.cashManageForm.value)).subscribe(data => {
            if(data){
            this.shiftclosedform.get('dummyaccid').setValue('opt1');
            this.shiftclosedform.get('accid').setValue('opt1');
            this.shiftclosedform.get('expensepaymenttype').setValue('opt1');
            this.shiftclosedform.get('expenseamt').setValue(0.00);
            this.shiftclosedform.get('expenseamtreason').setValue('');  
            this.shiftclosedform.get('closedbalance').setValue('');             
            this.xRegisterServices.getTranscdetails(sessionStorage.getItem("indvuserid"),localStorage.getItem("shiftlogintime")).subscribe(data => {
                this.transactions=data;this.bindtranscations(data) }); 
                setTimeout(() => {
                    this.removecashflag=false;
                },1500);
            }          
        },errorCode => console.log(errorCode));
    }
   

    addcashreset1(){
        let expectamt = parseFloat(this.shiftclosedform.get('transactamt').value);
        let addcashamt = parseInt(this.shiftclosedform.get('addamt').value);
        let newexpectamt = expectamt-addcashamt;
        this.shiftclosedform.get('addamt').setValue(0);
        this.shiftclosedform.get('addamountreason').setValue('');
        this.differcalc();
        let nancheck=isNaN(newexpectamt);
        if(nancheck){
          this.shiftclosedform.get('transactamt').setValue((0).toFixed(2));
        }else{
          this.shiftclosedform.get('transactamt').setValue((newexpectamt).toFixed(2));
        }
    }

   
    
    addcash1(){
    let valflag=this.addcashvalidate();
    if(valflag){
        let expectamt = parseFloat(this.shiftclosedform.get('transactamt').value);
        let addcashamt = parseInt(this.shiftclosedform.get('addamt').value);
        let newexpectamt = expectamt+addcashamt;
        let nancheck=isNaN(newexpectamt);
        if(nancheck){
          this.shiftclosedform.get('transactamt').setValue((0).toFixed(2));
        }else{
          this.shiftclosedform.get('transactamt').setValue((newexpectamt).toFixed(2));
        }
        this.addcashflag=false;
        this.differcalc();
    }
    }

  

    removecashreset1(){
        let expectamt = parseFloat(this.shiftclosedform.get('transactamt').value);
        let removecashamt = parseInt(this.shiftclosedform.get('expenseamt').value);
        let newexpectamt = expectamt+removecashamt;
        this.shiftclosedform.get('expenseamt').setValue(0);
        this.shiftclosedform.get('expenseamtreason').setValue('');
        this.differcalc();
        let nancheck=isNaN(newexpectamt);
        if(nancheck){
          this.shiftclosedform.get('transactamt').setValue((0).toFixed(2));
        }else{
          this.shiftclosedform.get('transactamt').setValue((newexpectamt).toFixed(2));
        }
    }

    removecash1(){
        let valflag=this.removecashvalidate();
        if(valflag){
            let expectamt = parseFloat(this.shiftclosedform.get('transactamt').value);
            let removecashamt = parseInt(this.shiftclosedform.get('expenseamt').value);
            let newexpectamt = expectamt-removecashamt;
            let nancheck=isNaN(newexpectamt);
            if(nancheck){
              this.shiftclosedform.get('transactamt').setValue((0).toFixed(2));
            }else{
              this.shiftclosedform.get('transactamt').setValue((newexpectamt).toFixed(2));
            }  
            this.removecashflag=false; 
            this.differcalc();    
        }                
    }

    distflag:boolean=false;
    distributors=[];
    distflagchange(){
        this.distflag = !this.distflag
        if(this.distflag){
            this.xRegisterServices.getDistributordetails(AppComponent.companyID, AppComponent.branchID, AppComponent.locRefName1, AppComponent.locrefID1).subscribe(data => {
            this.distributors=data});   
        }
    }

}