import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { stkminqtySaveService } from './stkminqtySave.service';
import { NotificationsComponent } from '../../../notifications/notifications.component';
import { dateFormatPipe } from '../../../notifications/notifications.datepipe';
import { AppComponent } from '../../../app.component';
@Component({
  selector: 'app-stkminqtySave',
  templateUrl: './stkminqtySave.component.html',
  providers: [stkminqtySaveService, NotificationsComponent, dateFormatPipe]
})
export class stkminqtySaveComponent implements OnInit {
  alertmsgs:any;
  registerForm: FormGroup;
  selobj;
  i;



  k;

  j;


  vflag: number;
  deviceObj: any;

  constructor(private userService: stkminqtySaveService, private formBuilder: FormBuilder, private dateformat: dateFormatPipe, 
    private notificationsComponent: NotificationsComponent, private router:Router,private appComponent: AppComponent) { }
  ngOnInit() {

    this.vflag = 0;

    this.selobj = { userid: AppComponent.userID, locrefid: AppComponent.locrefID1, locname: AppComponent.locRefName1, countryrefid: AppComponent.countryID, companyid: AppComponent.companyID, branchrefid: AppComponent.branchID };
    this.registerForm = this.formBuilder.group({
      date: [this.dateformat.transform05(Date.now()), []],
      minstockflag: ['', []],
      stkminqty: this.formBuilder.array([
      ]),


      stkminqty1: this.formBuilder.array([
      ]),



    });
    //   this.registerForm.get('minstockflag').setValue(1) ;
    //       this.viewProd();
    this.init();

    this.init1();


    this.registerForm.get('minstockflag').setValue("1");

    this.viewProd();

    setTimeout(() => {
      let language='en';
      language=localStorage.getItem('language');
      this.userService.GetAlerts(language).subscribe(data => this.alertmsgs = data,
        errorCode => console.log(errorCode));
    }, 1800);
  }







  // onSubmit() {

  //   const control = <FormArray>this.registerForm.controls['stkminqty']


  //   alert(control.value.drugname + "val");




  //    if (control.value.drugname == undefined || null || '') {
  //     console.log("empty");


  //     alert("Hi Kishore please check your values is not be null");

  //   }

  //   else {
  //     var valflag: Number = 0;
  //     const control = <FormArray>this.registerForm.controls['stkminqty'];

  //     let setData = control.value;
  //     valflag = this.validnew();
  //     var answer = confirm("Save data?");
  //     if (answer && valflag == 0) {
  //       this.userService.saveStkMinQty(JSON.stringify(control.value)).subscribe(data => { this.savevalid(data) },
  //         errorCode => console.log(errorCode));
  //     }


  //   }
  // }




  // onSubmit() {


  //   var valflag: Number = 0;
  //   const control = <FormArray>this.registerForm.controls['stkminqty'];

  //   let setData = control.value;
  //   valflag = this.validnew();
  //   var answer = confirm("Save data?");
  //   if (answer && valflag == 0) {
  //     this.userService.saveStkMinQty(JSON.stringify(control.value)).subscribe(data => { this.savevalid(data) },
  //       errorCode => console.log(errorCode));




  //   }


  // }



  // onSubmit() {
  //   //const control =this.registerForm.controls['stkminqty'];
  //   const control = <FormArray>this.registerForm.get('stkminqty');
  //   let setData = control.value;

  //   if (this.registerForm.get('minstockflag').value == 1) {
  //     var valflag: Number = 0;
  //     const control = <FormArray>this.registerForm.controls['stkminqty'];
  //     let setData = control.value;

  //     let selected = 0;
  //     let arr = [];

  //     valflag = this.validnew();

  //     var answer = confirm("Save data?");
  //     if (answer && valflag == 0) {

  //       for (let i = 0; i < setData.length; i++) {
  //         if (setData[i].selectflag) {

  //           selected = selected + 1;

  //           arr.push(setData[i]);

  //           this.userService.saveStkMinQty(JSON.stringify(arr)).subscribe(data => { this.savevalid(data) },
  //             errorCode => console.log(errorCode));
  //         }

  //         else if (!setData[i].selectflag) {

  //           this.notificationsComponent.addToast({ title: 'Error', msg: 'Please tick data ...', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });

  //         }

  //       }

  //     }

  //   }


  //   else if (this.registerForm.get('minstockflag').value == 2) {
  //     var valflag: Number = 0;
  //     const control1 = <FormArray>this.registerForm.controls['stkminqty1'];

  //     let setData1 = control1.value;

  //     let arr1 = [];





  //     valflag = this.validnew();

  //     var answer = confirm("Save data?");
  //     if (answer && valflag == 0) {

  //       for (let i = 0; i < setData1.length; i++) {
  //         if (setData1[i].selectflag) {





  //           arr1.push(setData[i]);
  //           this.userService.saveStkMinQty1(JSON.stringify(arr1)).subscribe(data => { this.savevalid(data) },
  //             errorCode => console.log(errorCode));

  //         }



  //         else if (!setData1[i].selectflag) {

  //           this.notificationsComponent.addToast({ title: 'Error', msg: 'Please tick data ...', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });

  //         }
  //       }
  //     }
  //   }
  // }




  onSubmit() {

    const control = <FormArray>this.registerForm.get('stkminqty');
    let setData = control.value;


    if (this.registerForm.get('minstockflag').value == 1) {
      var valflag: Number = 0;
      const control = <FormArray>this.registerForm.controls['stkminqty'];
      let setData = control.value;
      let arr = [];
      valflag = this.validnew();
      let selected = 0;
      var answer = confirm("Save data?");

      if (answer && valflag == 0) {

        for (let i = 0; i < setData.length; i++) {
          if (setData[i].selectflag && setData[i].drugproductid != undefined || null || '') {
            selected = selected + 1;

            arr.push(setData[i]);
          }
        }
        if (selected == 0) {



          this.notificationsComponent.addToast({ title: 'Error', msg: this.alertmsgs.inevtory.pleasetickdata, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
          return;
        }

        this.devicedetails();
        this.deviceObj.apiname="api/stkmin/saveStkMinQty";
        this.deviceObj.description="Save Stock Minimum Qty";
  
        this.userService.saveStkMinQty(JSON.stringify(arr)).subscribe(data => { this.savevalid(data) },
          errorCode => console.log(errorCode));

          this.router.navigate(['ReorderForm/ViewReorderForm']);

      }
    }



    else if (this.registerForm.get('minstockflag').value == 2) {

      var valflag: Number = 0;
      const control1 = <FormArray>this.registerForm.controls['stkminqty1'];
      let setData1 = control1.value;
      let arr1 = [];
      let selected1 = 0;

      valflag = this.validnew();

      var answer = confirm("Save data?");

      if (answer && valflag == 0) {

        for (let i = 0; i < setData1.length; i++) {


          if (setData1[i].selectflag1 && setData1[i].newproductname != undefined || null || '') {

            selected1 = selected1 + 1;

            arr1.push(setData1[i]);
          }
        }

        if (selected1 == 0) {

          this.notificationsComponent.addToast({ title: 'Error', msg: this.alertmsgs.inevtory.pleaseselectdata, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
          return;

        }



        this.userService.oneProduct(JSON.stringify(arr1)).subscribe(data => {


          if (data == true) {


            const filteredArr = arr1.reduce((acc, current) => {
              const x = acc.find(item => item.newproductname === current.newproductname && item.reqqty ===
                current.reqqty && item.remarks === current.remarks);
              if (!x) {
                return acc.concat([current]);
              } else {
                return acc;
              }
            }, []);



            this.userService.saveNewprod(JSON.stringify(filteredArr)).subscribe(data => {


              if (data == true) {

                this.devicedetails();
                this.deviceObj.apiname="api/slsinv/savenewprodminqty";
                this.deviceObj.description="Save New Product";
          
                this.userService.saveStkMinQty1(JSON.stringify(filteredArr)).subscribe(data => { this.savevalid(data) },
                  errorCode => console.log(errorCode));

                  this.router.navigate(['ReorderForm/ViewReorderForm']);
              
              

              }
            },
              errorCode => console.log(errorCode));

          }

          else {

            this.notificationsComponent.addToast({ title: 'Error', msg: this.alertmsgs.inevtory.pleasecheckproductmayalreadyexist, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
            return;

          }

        });


      }
    }

  }







  validnew(): Number {
    var valflag = 0;
    return valflag;

  }





  viewServWareHouseStock(data: any) {



    const control = <FormArray>this.registerForm.controls['stkminqty'];
    while (control.length !== 0) {
      control.removeAt(0);
    }
    this.init();


    for (this.i = 0; this.i < data.length; this.i++) {
      control.insert(0, this.formBuilder.group({


        // stkminautoid: [, []],


        stkminid: [data[this.i][5], []],
        drugproductid: [data[this.i][1], []],
        batchrefid: [, []],

        receivedqty: [data[this.i][2], []],           //  data[this.i][ 2 ] 
        minqty: [data[this.i][3], []],

        ageingtime: [data[this.i][7], []],


        clientcdate: [this.dateformat.transform04(), []],
        clientcdate1: [this.dateformat.transform04(), []],
        createdby: [this.selobj.userid, []],
        locrefid: [this.selobj.locrefid, []],
        locname: [this.selobj.locname, []],
        countryrefid: [this.selobj.countryrefid, []],
        companyrefid: [this.selobj.companyid, []],
        branchrefid: [this.selobj.branchrefid, []],
        drugname: [data[this.i][0], []],
        selectflag: [false, []],
        calcflag: [0, []],
        remarks: [, []],
        qty: [data[this.i][4], []],

        gridcolor: [data[this.i][6], []],

        abcanalysis: [data[this.i][8], []],
        reqqty: [data[this.i][9], []]

      }));
    }
  }




  viewServMinimumProdNew(data: any) {
    const control = <FormArray>this.registerForm.controls['stkminqty1'];
    while (control.length !== 0) {
      control.removeAt(0);
    }
    this.init1();

    for (this.i = 0; this.i < data.length; this.i++) {
      control.insert(0, this.formBuilder.group({
        //stkminautoid: [, []],

        //stkminid: [, []],
        //drugproductid: [0, []],
        batchrefid: [, []],
        reqqty: [data[this.i][2], []],

        // minqty: [data[this.i][], []],

        clientcdate: [this.dateformat.transform04(), []],
        clientcdate1: [this.dateformat.transform04(), []],
        createdby: [this.selobj.userid, []],
        locrefid: [this.selobj.locrefid, []],
        locname: [this.selobj.locname, []],
        countryrefid: [this.selobj.countryrefid, []],
        companyrefid: [this.selobj.companyid, []],
        branchrefid: [this.selobj.branchrefid, []],
        newproductname: [data[this.i][1], []],
        selectflag1: [false, []],
        calcflag: [0, []],
        //ageingtime: [0, []],
        remarks: [data[this.i][3], []],
        qty: [, []],
        gridcolor: [data[this.i][4], []],
        nprefid: [data[this.i][0], []]

      }));
    }
  }


      
  devicedetails(){

    this.deviceObj = {

        userid: AppComponent.userID,
        companyrefid: AppComponent.companyID,
        branchrefid: AppComponent.branchID,
        locname: AppComponent.locRefName1,
        locrefid: AppComponent.locrefID1,
        clientcdate:this.dateformat.transform04(),
        ipaddress: this.appComponent.ipAddress, 
        browsertype: this.appComponent.browser,
        ostype: this.appComponent.os,
        osversion: this.appComponent.osversion,
        devicetype: this.appComponent.devicetype,
        description:'',
        apiname:''

      };
  
}


  viewProd() {
    if (this.registerForm.get('minstockflag').value == 1) {


      this.vflag = 0;

      var frmdata = { frmint1: '', frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname, companyrefid: this.selobj.companyid, branchrefid: this.selobj.branchrefid };
      this.userService.viewMinimumStock(JSON.stringify(frmdata)).subscribe(data => { this.viewServWareHouseStock(data) },
        errorCode => console.log(errorCode));


        this.devicedetails();
        this.deviceObj.apiname="api/stkmin/viewMinimumStock";
        this.deviceObj.description="Loaded Minimum Stock";

        this.userService.adddevicedetails(JSON.stringify(this.deviceObj)).subscribe(data => {});
    }



    else if (this.registerForm.get('minstockflag').value == 2) {

      this.vflag = 1;

      var frmdata = { frmint1: '', frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname, companyrefid: this.selobj.companyid, branchrefid: this.selobj.branchrefid };

      this.userService.viewMinimumProdNew(JSON.stringify(frmdata)).subscribe(data => { this.viewServMinimumProdNew(data), this.vflag = 1 },
        errorCode => console.log(errorCode));
      
    
        this.devicedetails();
        this.deviceObj.apiname="api/stkmin/viewMinimumProdNew";
        this.deviceObj.description="Loaded New Product";

        this.userService.adddevicedetails(JSON.stringify(this.deviceObj)).subscribe(data => {});



    }
  }



  selectAll(event: any) {

    const control = <FormArray>this.registerForm.controls['stkminqty'];
    let setData = control.value;

    if (event) {

      for (let i = 0; i < setData.length; i++) {

        if (setData[i].drugproductid && setData[i].gridcolor != 1) {
          control.controls[i].get('selectflag').setValue(true);
        }

      }



    }

    else {

      for (let i = 0; i < setData.length; i++) {

        if (setData[i].drugproductid && setData[i].gridcolor != 1) {
          control.controls[i].get('selectflag').setValue(false);
        }
      }
    }
  }



  selectAll1(event1: any) {
    const control1 = <FormArray>this.registerForm.controls['stkminqty1'];
    let setData1 = control1.value;
    if (event1) {
      for (let i = 0; i < setData1.length; i++) {
        if (setData1[i].newproductname && setData1[i].gridcolor != 1) {
          control1.controls[i].get('selectflag1').setValue(true);
        }
      }
    }
    else {
      for (let i = 0; i < setData1.length; i++)
        if (setData1[i].newproductname && setData1[i].gridcolor != 1) {
          control1.controls[i].get('selectflag1').setValue(false);
        }
    }
  }

  savevalid(data: number) {
    if (data == 1) {

      this.userService.adddevicedetails(JSON.stringify(this.deviceObj)).subscribe(data => {});

      this.notificationsComponent.addToast({ title: 'Success', msg: this.alertmsgs.common.datasavedsuccessfully, timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
      //this.clear();
    } else {
      this.notificationsComponent.addToast({ title: 'Error', msg: this.alertmsgs.common.datanotsaved, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    }
  }




  init() {
    const control = <FormArray>this.registerForm.controls['stkminqty'];
    var data = [[]];
    for (this.i = 0; this.i < data.length; this.i++) {
      control.push(this.formBuilder.group({


        //stkminautoid: [, []],


        stkminid: [, []],
        drugproductid: [, []],
        batchrefid: [, []],
        receivedqty: [, []],
        minqty: [, []],
        clientcdate: [this.dateformat.transform04(), []],
        clientcdate1: [this.dateformat.transform04(), []],
        createdby: [this.selobj.userid, []],
        locrefid: [this.selobj.locrefid, []],
        locname: [this.selobj.locname, []],
        countryrefid: [this.selobj.countryrefid, []],
        companyrefid: [this.selobj.companyid, []],
        branchrefid: [this.selobj.branchrefid, []],
        drugname: [, []],
        selectflag: [false, []],
        calcflag: [1, []],


        ageingtime: [, []],


        remarks: [, []],
        qty: [, []],
        gridcolor: [, []],
        abcanalysis: [, []],
        reqqty: [, []]
      }));
    }
  }



  init1() {
    const control = <FormArray>this.registerForm.controls['stkminqty1'];
    var data = [[]];
    for (this.i = 0; this.i < data.length; this.i++) {
      control.push(this.formBuilder.group({


        //stkminautoid: [, []],


        stkminid: [, []],
        // drugproductid: [, []],
        batchrefid: [, []],
        reqqty: [, []],
        // minqty: [, []],
        clientcdate: [this.dateformat.transform04(), []],
        clientcdate1: [this.dateformat.transform04(), []],
        createdby: [this.selobj.userid, []],
        locrefid: [this.selobj.locrefid, []],
        locname: [this.selobj.locname, []],
        countryrefid: [this.selobj.countryrefid, []],
        companyrefid: [this.selobj.companyid, []],
        branchrefid: [this.selobj.branchrefid, []],
        newproductname: [, []],
        selectflag1: [false, []],
        calcflag: [, []],

        //ageingtime: [, []],


        remarks: [, []],
        qty: [, []],

        gridcolor: [, []],
        nprefid: [, []]

      }));
    }
  }



  clear() {
    this.ngOnInit();
  }
}