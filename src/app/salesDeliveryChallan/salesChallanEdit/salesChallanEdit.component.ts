
import { Component, OnInit, Input, Output, AfterViewInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormArray } from "@angular/forms";
import { providers } from 'ng2-toasty';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { dateFormatPipe } from '../../notifications/notifications.datepipe';
import { salesChallanServices } from '../salesChallanServices.service';
import { AppComponent } from '../../app.component';


const textPattern = "[a-zA-Z][a-zA-Z ]+";
const textnumbers = '^[0-9]+(\.[0-9]{1,3})?$';

@Component({
  selector: 'app-salesDeliveryChallan',
  templateUrl: './salesChallanEdit.component.html',
  styleUrls: ['./salesChallanEdit.component.css'],
  providers: [NotificationsComponent, dateFormatPipe, salesChallanServices]
})

export class salesChallanEditcomponent implements OnInit, AfterViewInit {
  parentMessage="sales";
  $: any;
  sid: any;
  deliveryForm: any;
  private branchValue: any;
  @Input() searchText;
  isDesc: boolean = false;
  column;
  id: any;
  val: string = 'PSIN';
  brandlist = [];
  branddata = [];
  returnValid: any;
  distibutor: Array<any>
  distributors = [];
  salesinvoice = [];
  distvalues = [''];
  characters = [];
  destination = [];
  purtax = [];
  localstore = [];
  firms = [];
  x;
  polist = [];
  coltax: any;



  firmsshops :any = [];

  firms1: any = [];
  constructor(private challanService: salesChallanServices, private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder, private notificationsComponent: NotificationsComponent, private appComponent: AppComponent) {
    this.deliveryForm = this.formBuilder.group({
      productid: ['', []],
      pino: ['', []],
      deliverytype: ['', []],
      totalproduct: ['', []],
      totalqty: ['', []],
      totalboxqty: ['', []],
      totaltabqty: ['', []],
      totalstripqty: ['', []],
      brandcode: ['', []],
      brandname: ['', []],
      batchno: ['123', []],
      totalamt: ['', []],
      taxableamount: ['', []],
      companyrefid: ['', []],
      branchrefid: ['', []],
      locname: ['', []],
      locrefid: ['', []],
      clientcdate: ['', []],
      deliverydate: ['', []],
      stockno: ['', []],
      salesno: ['', []],
      fromlocrefid: ['', []],
      fromlocname: ['', []],
      tolocname: ['', []],
      tolocrefid: ['', []],
      dcno: ['', []],
      brandDetails: this.formBuilder.array([
      ]),
    });

  }
  ngOnInit() {



    // this.firms1 = [[18, "emedsure HQ"], [20, "Emedsure Dist 1"], [21, "Emedsure Dist 2"], [22, "Emedsure Pharmacy Palayan"], [23, "Emedsure Pharmacy Manila"], [24, "Emedsure Pharmacy Metro Manila"],
    // [29, "Emedsure Pharmacy Sagayam"], [41, "Emedsure"], [44, "ghdfghj"], [45, "dist"], [46, "adandad"], [47, "arfarta"], [48, "arfaea"]]


    this.challanService.getShopInformation(AppComponent.companyID, AppComponent.branchID, AppComponent.locRefName1, AppComponent.locrefID1).subscribe(data => this.firms= data);




    this.sid = this.route.snapshot.paramMap.get('id');
    
    this.challanService.getEditDeliveryProduct(AppComponent.companyID, AppComponent.branchID, AppComponent.locRefName1, AppComponent.locrefID1, this.sid).subscribe(data => {
      this.getTabledata(data)
      if (data != null || data != '') {
        this.challanService.getEditDeliveryChallan(AppComponent.companyID, AppComponent.branchID, AppComponent.locRefName1, AppComponent.locrefID1, this.sid).subscribe(data => {
          this.getEditmaintance(data)
          //To Get Distributor Details  
        },
          error => {
            console.log('Error Occured on getEditmaintance');
          });
      }
    },
      error => {
        console.log('Error Occured on getEditpurchase');
      });



    if (this.deliveryForm.get('tolocname').value == 1) {
      this.challanService.getEditShop(this.deliveryForm.get('tolocrefid').value).subscribe(data => { this.firms = data, alert(data) },
        err => {
          console.log('Error Occured Get Shop');
        });
    }

    if (this.deliveryForm.get('tolocname').value == 2) {
      this.challanService.getEditWareHouse(this.deliveryForm.get('tolocrefid').value).subscribe(data => { this.firms = data },
        err => {
          console.log('Error Occured Get Warehouse');
        });
    }

    if (this.deliveryForm.get('tolocname').value == 3) {
      this.challanService.getEditHospital(this.deliveryForm.get('tolocrefid').value).subscribe(data => { this.firms = data },
        err => {
          console.log('Error Occured Get Hospital');
        });
    }



  }



  getEditmaintance(data: any) {
    let k;
    if (data !== undefined || data !== null) {
      for (k = 0; k < data.length; k++) {
        this.deliveryForm.get('dcno').setValue(data[k][1]);
        this.deliveryForm.get('deliverydate').setValue(data[k][2]);
        this.deliveryForm.get('totalproduct').setValue(data[k][3]);
        this.deliveryForm.get('totalqty').setValue(data[k][4]);
        this.deliveryForm.get('totalboxqty').setValue(data[k][5]);
        this.deliveryForm.get('totalstripqty').setValue(data[k][6]);
        this.deliveryForm.get('totaltabqty').setValue(data[k][7]);
        this.deliveryForm.get('tolocname').setValue(data[k][8]);
        this.deliveryForm.get('tolocrefid').setValue(data[k][9]);





      }
    }
  }






  getStock(searchValue: string) {

    if (AppComponent.usertype == "\"SuperAdmin\" ") {


      this.challanService.getSuperStockNo(searchValue).subscribe(data => {
        this.distributors = [];
        for (let i = 0; i < data.length; i++) {
          this.distributors.push({ value: data[i][0], label: data[i][1] });
        }
      });
    } else {
      this.challanService.getStockNo(searchValue, AppComponent.companyID, AppComponent.branchID, AppComponent.locRefName1, AppComponent.locrefID1).subscribe(data => {
        this.distributors = [];
        for (let i = 0; i < data.length; i++) {
          this.distributors.push({ value: data[i][0], label: data[i][1] });
        }
      });



    }
  }

  getFirm() {

    if (AppComponent.usertype == "\"SuperAdmin\" ") {

      if (this.deliveryForm.get('tolocname').value == 1) {
        this.challanService.getShop(this.deliveryForm.get('tolocname').value).subscribe(data => { this.firms = data },
          err => {
            console.log('Error Occured Get Shop');
          });
      }

      if (this.deliveryForm.get('tolocname').value == 2) {
        this.challanService.getWareHouse(this.deliveryForm.get('tolocname').value).subscribe(data => { this.firms = data },
          err => {
            console.log('Error Occured Get Warehouse');
          });
      }

      if (this.deliveryForm.get('tolocname').value == 3) {
        this.challanService.getHospital(this.deliveryForm.get('tolocname').value).subscribe(data => { this.firms = data },
          err => {
            console.log('Error Occured Get Hospital');
          });
      }
    } else {


      if (this.deliveryForm.get('tolocname').value == 1) {

        this.challanService.getUserShop(AppComponent.companyID, AppComponent.locRefName1).subscribe(data => { this.firms = data },
          err => {
            console.log('Error Occured Get Warehouse');
          });

      }
      if (this.deliveryForm.get('tolocname').value == 2) {
        this.challanService.getUserWareHouse(AppComponent.companyID, AppComponent.locRefName1).subscribe(data => { this.firms = data },
          err => {
            console.log('Error Occured Get Warehouse');
          });

      }
      if (this.deliveryForm.get('tolocname').value == 2) {
        this.challanService.getUserHospital(AppComponent.companyID, AppComponent.locRefName1).subscribe(data => { this.firms = data },
          err => {
            console.log('Error Occured Get Warehouse');
          });
      }
    }

  }

  getTabledata(data: any) {
    if (data !== undefined || data !== null) {
      let flag: number = 0;
      const getData = <FormArray>this.deliveryForm.controls['brandDetails'];
      let setData = getData.value;
      for (this.i = 0; this.i < data.length; this.i++) {
        for (this.x = 0; this.x < setData.length; this.x++) {
          if (data[this.i][0] == setData[this.x].productid) {
            flag = 1;
          }
        }
        if (flag == 1) {
          this.notificationsComponent.addToast({ title: 'Error Message', msg: 'The  ' + data[this.i][1].toUpperCase() + '  Product Already Exist...', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
        }
        else {
          getData.push(this.showBrandlist(
            data[this.i][0],
            data[this.i][1],
            data[this.i][2],
            data[this.i][3],
            data[this.i][4],
            data[this.i][5],
            data[this.i][6],
            data[this.i][7],
            data[this.i][8],
            data[this.i][9],
            data[this.i][10],
            data[this.i][11],
            data[this.i][12]
          ));
        }
      }

    }
  }
  showBrandlist(pid: any, pname: any, batch: any, box: any, strip: any, tap: any,
    gsts: any, cgsts: any, mrps: any, sgsts: any, dosageId: number, formID: number, mfgId: number) {
    return this.formBuilder.group({
      drugproductrefid: [pid, []],
      dcrefid: ['', []],
      productname: [pname, []],
      batchno: [batch, []],
      boxqty: [box, Validators.pattern(textnumbers)],
      stripqty: [strip, Validators.pattern(textnumbers)],
      tabqty: [tap, Validators.pattern(textnumbers)],
      totalqty: ['', []],
    });
  }

  /**Table calculation Start **/
  i;
  j;
  m;
  imagepath: string;
  sbQuantity = [];
  getSum() {
    /** Declare Given Table Datas**/
    alert("getSumCalling");
    let txtproduct: number = 0;
    let txttabletquantity: any = 0;
    let txtstripquantity: any = 0;
    let txtboxquantity: any = 0;
    /** To set and calculate Given Table Datas into total values(formcontrolname) **/
    let totalproduct: any = 0;
    let totalQuantity: any = 0;
    let BoxQuantity: any = 0;
    let StripQuantity: any = 0;
    let TabQuantity: any = 0;
    const getData = <FormArray>this.deliveryForm.controls['brandDetails'];
    let setData = getData.value;
    let purcTax: any = this.purtax;
    let k: number = 0;
    let Stripperbox: any;
    let Quantityperstrip: any;
    for (this.j = 0; this.j < setData.length; this.j++) {
      this.getSBQuantity(setData[this.j].drugproductrefid);
      Stripperbox = this.sbQuantity[0][0];
      Quantityperstrip = this.sbQuantity[0][1];
      /* To Get Total Products */
      if (parseInt(setData.length) !== null) {
        txtproduct = parseInt(setData.length);
      }
      /* Tablet Quantity */
      if (setData[this.j].tabqty == '' || parseFloat(setData[this.j].tabqty) == null) {
        setData[this.j].tabqty = 0;
        txttabletquantity = 0;
      }
      else {
        txttabletquantity = parseFloat(setData[this.j].tabqty);
        TabQuantity += parseFloat(setData[this.j].tabqty);
      }
      /* Strip Quantity */
      if (setData[this.j].stripqty == '' || parseFloat(setData[this.j].stripqty) == null) {
        setData[this.j].stripqty = 0;
        txtstripquantity = 0;
      }
      else {
        txtstripquantity = parseFloat(setData[this.j].stripqty) * Quantityperstrip;
        StripQuantity += parseFloat(setData[this.j].stripqty);
      }
      /* Box Quantity */
      if (setData[this.j].boxqty == '' || parseFloat(setData[this.j].boxqty) == null) {
        setData[this.j].boxqty = 0;
        txtboxquantity = 0;
      }
      else {
        txtboxquantity = parseFloat(setData[this.j].boxqty) * Stripperbox * Quantityperstrip;
        BoxQuantity += parseFloat(setData[this.j].boxqty);
      }



      /* Row Wise SubTotal Amount */


      setData[this.j].totalqty = txttabletquantity + txtstripquantity + txtboxquantity;

      /* To Patch values Row wise */
      getData.patchValue(setData);
      /* Toatl Calculation*/
      totalproduct = txtproduct;
      totalQuantity += txttabletquantity + txtstripquantity + txtboxquantity;
      /* To Set value from Table calculation Final Values on Input types*/
      this.deliveryForm.get('totalproduct').setValue(totalproduct);
      this.deliveryForm.get('totalqty').setValue(totalQuantity);
      this.deliveryForm.get('totalboxqty').setValue(BoxQuantity);
      this.deliveryForm.get('totalstripqty').setValue(StripQuantity);
      this.deliveryForm.get('totaltabqty').setValue(TabQuantity);
      //To set Temporary Values In Bottom Input types    
    }
  }


  getSBQuantity(id: number) {
    this.challanService.getSBQuantity(id).subscribe(data => { this.sbQuantity = data }),
      error => {
        console.log("Error Occured on getSBQuantity");
      }
  }

  /* Table calculation End*/
  // keyup while typing show data...keyup.enter  while entering show data..keydown.Tab while tab 
  onSubmit(): any {
    this.returnValid = this.invoiceDatavalidation();
    if (this.returnValid == true) {
      this.appComponent.ngOnInit();
      this.deliveryForm.get('clientcdate').setValue(AppComponent.date);
      this.challanService.getDeliveryChallan(JSON.stringify(this.deliveryForm.value)).subscribe(
        data => {
          alert(data);
          if (data == true) {
            const saveData = this.deliveryForm.controls['brandDetails'];
            this.challanService.getDeliveryChallanProduct(JSON.stringify(saveData.value)).subscribe(
              data => {
                if (data == true) {
                  this.notificationsComponent.addToast({ title: 'SUCCESS MESSAGE', msg: 'DATA SAVED SUCCESSFULLY..', timeout: 5000, theme: 'success', position: 'top-right', type: 'success' });
                  window.location.href = "/DeliveryChallan/ChallanView";
                }
              },
              error => {
                console.log("Error createPurchaseOrderProduct");
              }
            );
          }
        });
    }

  }

  invoiceDatavalidation(): Boolean {
    const getData = this.deliveryForm.controls['brandDetails'];
    let setData = getData.value;
    if (this.deliveryForm.get('tolocname').value == "opt1") {
      this.notificationsComponent.addToast({ title: 'ERROR MESSAGE', msg: 'PLS SELECT LOCATION TYPE', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'error' });
      return false;
    } else if (this.deliveryForm.get('tolocrefid').value == "opt1") {
      this.notificationsComponent.addToast({ title: 'ERROR MESSAGE', msg: 'PLS SELECT LOCATION NAME', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'error' });
      return false;
    } else if (this.deliveryForm.get('deliverydate').value == '' || this.deliveryForm.get('deliverydate').value == null) {
      this.notificationsComponent.addToast({ title: 'ERROR MESSAGE', msg: 'PLS SELECT DELIVERY CHALLAN DATE', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'error' });
      return false;
    }
    else if (setData.length == '' || setData.length == null || setData.length == undefined) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: ' Your Table Data is Empty..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    return true;
  }


  removeRow(index: number) {
    const getData = <FormArray>this.deliveryForm.controls['brandDetails'];
    getData.removeAt(index);
    this.getSum();
    let removeVal = getData.value;
    if (removeVal == null || removeVal == '') {
      this.deliveryForm.reset();
      this.ngOnInit();
    }
  }

  ngAfterViewInit() {
    $(document).ready(function () {
      var minlength = 2;
      var searchRequest = null;
      $("#brand").on("input", function () {
        var that = this,
          value = $(this).val();
        if (value.length >= minlength) {
          if (searchRequest != null)
            searchRequest.abort();
          searchRequest = $.ajax({
            type: "GET",
            url: '/api/getPibrandlist' + '/' + value,
            dataType: "json",
            success: function (data) {
              $("#brandlist").empty();
              for (var i = 0; i < data.length; i++) {
                $("#brandlist").append("<option value='" + data[i] + "'></option>");
              }
            },
            error: function (data) {
              $("#brandlist").val('');
              console.log("No Data Available");
            }

          });
        }
      });
    });
    //remove Row
    $(document).ready(function () {
      $(".removebutton").click(function () {
        $("table tbody").find('input[name="check"]').each(function () {
          if ($(this).is(":checked")) {
            if (confirm("Are you sure you want to delete..")) {
              $(this).closest("tr").remove();
            }
          }
        });

      });
    });
    //Search outer
    var elem = $('#searchorder')[0];
    $(document).on('click', function (e) {
      if ($(e.target).closest(elem).length === 0) {
        $(elem).hide();
      }
    });

    $(document).ready(function () {
      var inv = [];
      setInterval(function search() {
        var hos = $("#searchproduct").val();
        if (hos == 0 || hos == null) {
          $("#searchorder").hide();
        } else {
          $("#searchorder").show();
        }
        if (hos != 0 && hos != null) {
          $.ajax({
            type: "GET",
            contentType: "application/json",
            url: "/api/getTest",
            data: {
              'val': hos
            },
            success: function (data) {
              inv.push(data);
              $('#searchorder .form75').each(function () {
                $(this).val("");
              });
              var i = 0;
              $('#searchorder .form75').each(function () {
                $(this).val(data[i]);
                i++;
              });
            },
            error: function (e) {
              $('#searchorder .form75').each(function () {
                $(this).val("");
              });
            }
          });
        }
      }, 570);
    });
    //Panel Show and Hide 
    $(document).ready(function () {
      $("#flip").click(function () {
        $("#panel").slideToggle("slow");
      });
    });

    //Check Box in Table
    $(document).ready(function () {
      $('.checkAll').on('click', function () {
        $(this).closest('table').find('tbody :checkbox')
          .prop('checked', this.checked)
          .closest('tr').toggleClass('selected', this.checked);
      });

      $('tbody :checkbox').on('click', function () {
        $(this).closest('tr').toggleClass('selected', this.checked);

        $(this).closest('table').find('.checkAll').prop('checked',
          ($(this).closest('table').find('tbody :checkbox:checked').length == $(this).closest('table').find('tbody :checkbox').length));
      });
    });

  }
  //Search Box
  insertDrug(articleId: number) {
    var n = 56;
    var rt = $("#searchorder li:nth-child(" + articleId + ") .form75").val();
    $("#searchproduct").val(rt);
    $("#searchproduct").focus();
    $("#searchorder").hide();
  }

  upDown(event: KeyboardEvent, articleId: number) {
    var nr: number;
    var n = 74;
    if (event.keyCode == 13) {
      $(".dropdown-menu").hide();
      var rt = $("#searchorder li:nth-child(" + articleId + ") .form75").val();
      $("#searchproduct").val(rt);
      $("#searchproduct").focus();
      $("#searchorder").hide();
    }
    if (event.keyCode == 9) {
      if (articleId == 0) {
        $("#searchorder li:nth-child(" + articleId + ") input").focus();
      }
    }
    if (event.keyCode == 38) {
      var nr = articleId - 1;
      if (nr == 0) {
        $("#searchproduct").focus();
      } else {
        $("#searchorder li:nth-child(" + nr + ") input").focus();
      }
    }
    if (event.keyCode == 40) {
      var nr = articleId + 1;
      $("#searchorder li:nth-child(" + nr + ") input").focus();

    }
  }

  /**TO CONVERT PURCHASE ORDER TO PURCHASE INCOICE START**/
  getStockNumber(): any {
    this.challanService.getStockTransferProduct(this.deliveryForm.get('stockno').value).subscribe(data => { this.pushTableData(data) },
      error => {
        console.log('Error occured On getPotablelist()');
      });
  }



  pushTableData(data: any) {
    if (data !== undefined || data !== null) {
      let flag: number = 0;
      const getData = <FormArray>this.deliveryForm.controls['brandDetails'];
      let setData = getData.value;
      for (this.i = 0; this.i < data.length; this.i++) {
        for (this.x = 0; this.x < setData.length; this.x++) {
          if (data[this.i][0] == setData[this.x].productid) {
            flag = 1;
          }
        }
        if (flag == 1) {
          this.notificationsComponent.addToast({ title: 'Error Message', msg: 'The  ' + data[this.i][1].toUpperCase() + '  Product Already Exist...', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
        }
        else {
          getData.push(this.showPOdata(
            data[this.i][0],
            data[this.i][1],
            data[this.i][2],
            data[this.i][3],
            data[this.i][4],
          ));
        }
      }
      this.deliveryForm.get('brandcode').setValue("");
      this.deliveryForm.get('productid').setValue("");
      this.getSum();
    }
  }

  showPOdata(pid: any, barandname: any, bqty: any, sqty: any, tabqty: any): any {
    return this.formBuilder.group({
      drugproductrefid: [pid, []],
      dcrefid: ['', []],
      productname: [barandname, []],
      batchno: ['', []],
      boxqty: [bqty, [Validators.pattern(textnumbers)]],
      stripqty: [sqty, [Validators.pattern(textnumbers)]],
      tabqty: [tabqty, [Validators.pattern(textnumbers)]],
      totalqty: ['', []]
    });
  }





}


