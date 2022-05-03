import { OnInit, Component } from "@angular/core";
import { NotificationsComponent } from "app/notifications/notifications.component";
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from "@angular/forms";
import { AppComponent } from "app/app.component";
import { dateFormatPipe } from "app/notifications/notifications.datepipe";
import { XRegisterServices } from "./xregister.services";

@Component({
    selector: 'app-openxregister',
    templateUrl: './openxregistershift.component.html',
    providers: [dateFormatPipe, NotificationsComponent, XRegisterServices]
})

export class OPenXRegisterComponent implements OnInit {
    parentMessage = "sales";
    shiftOpenedForm: FormGroup;
    purchasejournal: FormGroup;
    logintime:any;
    constructor(private formBuilder: FormBuilder, private dateformat: dateFormatPipe, private appComponent: AppComponent,
        private xRegisterServices: XRegisterServices, private notificationsComponent: NotificationsComponent) {}

    employeename:any;
    ngOnInit(): void {
        this.shiftOpenedForm = this.formBuilder.group({
            companyid: [AppComponent.companyID, []],
            branchid: [AppComponent.branchID, []],
            locname: [AppComponent.locRefName1, []],
            locrefid: [AppComponent.locrefID1, []],
            countryid: [AppComponent.countryID, []],
            suserid:[sessionStorage.getItem('indvuserid')],
            employeeid:[],
            counterid:['opt1',[]],
            logintime:[this.dateformat.transform04()],
            openbalance: ['',Validators.pattern("[0-9.]*")],
            additionalamount: ['',[Validators.pattern("[0-9.]*")]],
            openregdetails:['',[]]
        });

        this.purchasejournal = this.formBuilder.group({
            debitaccount: ['', []],
            creditaccount: [2, []],
            debitamount: ['', []],
            creditamount: [0, []],
            craccname: ['Debtors Add Cash', []],
            draccname: ['', []],
            invoiceno: [, []],
            invoicebalamt: [, []],
            clientcdate: [this.dateformat.transform04(), []],
            clientcdate1: [this.dateformat.transform04(), []],
            cashflag: [, []],
            jrnltype: [9, []],
            jrnlname: ['Receipt Shift Open', []],
            bulkflag: [, []],
            personid: [sessionStorage.getItem('indvuserid'), []],
            personname:['',[]],
            persontype: ['', []],
            invoicetype: ['', []],
            paymenttype: ['Cash', []],
            ptrefno: [, []],
            countryrefid: ['', []],
            companyrefid: [AppComponent.companyID, []],
            branchrefid: [AppComponent.branchID, []],
            locname: [AppComponent.locRefName1, []],
            locrefid: [AppComponent.locrefID1, []],
            salesflag: [0, []],
            calcflag: [0, []],
          });

        this.xRegisterServices.getEmployeedetails(sessionStorage.getItem("indvuserid")).subscribe(data => {
            this.shiftOpenedForm.get('employeeid').setValue(data[0][0]);
            this.employeename=data[0][1] });
    }

    shiftvalidate(){
        let counterno=this.shiftOpenedForm.get('counterid').value;
        let openbal=this.shiftOpenedForm.get('openbalance').value;
        let closedbal=this.shiftOpenedForm.get('additionalamount').value;
        let notes=this.shiftOpenedForm.get('openregdetails').value;
        if(counterno=='opt1'|| counterno== '' || counterno == null || counterno == undefined){
            this.notificationsComponent.addToast({ title: 'Alert', msg: 'Select Counter No..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
            return false;
        }else if(openbal==''|| openbal== null || openbal == undefined){
            this.notificationsComponent.addToast({ title: 'Alert', msg: 'Enter Opening Balance if not enter Zero!..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
            return false;
        }else if(closedbal==''|| closedbal== null || closedbal == undefined){
            this.notificationsComponent.addToast({ title: 'Alert', msg: 'Enter Additional Balance if not enter Zero!..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
            return false;
        }else if(notes==''|| notes== null || notes == undefined){
            this.notificationsComponent.addToast({ title: 'Alert', msg: 'Enter Something on Notes!..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
            return false;
        }
        return true;
    }

    saveprocess:boolean=false;
    onSubmit() {
        let valflag=this.shiftvalidate();
        if(valflag){
            let openbal=this.shiftOpenedForm.get('openbalance').value;
            let closedbal=this.shiftOpenedForm.get('additionalamount').value;
            this.shiftOpenedForm.get('openbalance').setValue(parseInt(openbal));
            this.shiftOpenedForm.get('additionalamount').setValue(parseInt(closedbal));
            this.saveprocess=true;
            this.xRegisterServices.xOpenRegisterSave(JSON.stringify(this.shiftOpenedForm.value)).subscribe(data => {
                if (data) {
                    this.saveprocess=false;
                    this.notificationsComponent.addToast({ title: 'Success', msg: 'Data Saved SuccessFully', timeout: 2000, theme: 'default', position: 'top-right', type: 'success' });
                    localStorage.setItem("shiftlogintime", this.shiftOpenedForm.get('logintime').value);
                    this.purchasejournal.get('personname').setValue(this.employeename);
                    this.purchasejournal.get('creditamount').setValue(this.shiftOpenedForm.get('openbalance').value);
                    this.xRegisterServices.xOpenRegisterAccountSave(JSON.stringify(this.purchasejournal.value)).subscribe(data => {
                    });
                    setTimeout(() => {
                        this.shiftOpenedForm.reset();
                        this.purchasejournal.reset();
                        this.ngOnInit();
                    },3200);
                }else{
                    this.saveprocess=false;
                    this.notificationsComponent.addToast({ title: 'Error', msg: 'Data Not Saved', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
                }     
            });
        }
    }


}