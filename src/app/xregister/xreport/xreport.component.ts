import { Component, OnInit, Injectable, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { Router, ActivatedRoute } from '@angular/router';
import 'jquery';
import { NotificationsComponent } from 'app/notifications/notifications.component';
import { AppComponent } from 'app/app.component';
import { XreportService } from './xreport.component.service';
declare var $: any;
import '../../../../node_modules/peity/jquery.peity.min.js';
import { DataTable } from 'angular2-datatable';


@Component({
    selector: 'app-xreport',
    templateUrl: './xreport.component.html',
    styleUrls: ['./xreport.component.css'],
    providers: [XreportService, NotificationsComponent]
})


export class XreportComponent implements OnInit {

    @ViewChild('mf') dataTable: DataTable;//check


    public data1 = [];
    public rowsOnPage: number = 10;
    public filterQuery: string = "";
    public sortBy: string = "";
    public sortOrder: string = "desc";

    hideGrid: boolean = false;
    tableHide: boolean = false;
    xreportForm: FormGroup;
    companyrefid: any;
    branchid: any;
    locname: any;
    locrefid: any;
    shopid: any;
    obj: any;
    data = [];
    todaySales: any;
    startingOrNumber: number;
    endingOrNumber: number;
    todayTotalBill: number;
    beginningSales: any;
    billdate: any;
    cashAmount: any;
    cardAmount: any;
    lastPage: any;
    objLength: number;
    lastRow: number;

    constructor(private xreportService: XreportService, private route: Router, private formBuilder: FormBuilder,
        private notificationsComponent: NotificationsComponent) {
    }

    xcompanyid:any;
    xbranchid:any;
    xlocname:any;
    xlocrefid:any;
    xuserid:any
    ngOnInit() {

        this.xcompanyid= AppComponent.companyID,
        this.xbranchid=AppComponent.branchID,
        this.xlocname=AppComponent.locRefName1,
        this.xlocrefid= AppComponent.locrefID1,
        this.xuserid=AppComponent.userID,

        this.xreportForm = this.formBuilder.group({
            beginningsales: [, []],
            billdate: [, []],
            todaysales: [, []],
            startingOR: [, []],
            endingOR: [, []],
            cashamt: [, []],
            endingsales: [, []],
        })



        // $('.bar-chart').sparkline([20, 0, 15], {
        //     type: 'bar',
        //     barWidth: '40',
        //     height: '300px',
        //     width: '250px',
        //     tooltipClassname: 'chart-sparkline',
        //     barColor: 'rgba(153, 214, 131, 0.80)',

        //     dataSource: [

        //         { x: 0, xval: 'Robert', yval: 60 },
        //         { x: 1, xval: 'Andrew', yval: 65 },
        //     ],

        //     tooltipSettings: {
        //         visible: true,
        //         format: '${xval} : ${yval}%'
        //     },

        //     xName: 'xval', yName: 'yval'
        // });






    }

    xbilldate:any;
    printdate(){
        this.xbilldate=this.xreportForm.get('billdate').value
    }

    xReadSalesBillsDetails() {
        this.obj = {
            billdate: this.xreportForm.get('billdate').value,
            companyrefid: AppComponent.companyID,
            branchrefid: AppComponent.branchID,
            locname: AppComponent.locRefName1,
            locrefid: AppComponent.locrefID1,

        }

        this.xreportService.xReadSalesBillsDetails(JSON.stringify(this.obj)).subscribe(data => {
            this.data = data;
            if (this.data != null || "")
                this.tableHide = true,
                    this.hideGrid = false
            let totalItems = 0; let totalQty = 0; let totalAmt = 0; let vat12 = 0; let Discount = 0; let Subtotal = 0; let GrandTotal = 0;
            // let totalItems, totalQty, totalAmt, vat12, Discount, Subtotal, GrandTotal = 0;
            for (let i = 0; i < this.data.length; i++) {
                totalItems += this.data[i][4];
                totalQty += this.data[i][5];
                totalAmt += this.data[i][6];
                vat12 += this.data[i][7];
                Discount += this.data[i][8];
                Subtotal += this.data[i][9];
                GrandTotal += this.data[i][10];
            }

            this.data.push([, , , , totalItems, totalQty, totalAmt, vat12, Discount, Subtotal, GrandTotal]);

            this.dataTable.activePage = this.rowsOnPage;
            this.objLength = this.data.length;
            this.lastRow = 0;
            this.lastPage = this.objLength / this.rowsOnPage;
            this.lastPage = parseInt(this.lastPage)
            if (this.objLength % this.rowsOnPage != 0) {
                this.lastPage = this.lastPage + 1;
                this.lastRow = this.objLength % this.rowsOnPage;
                this.lastRow = this.lastRow - 1;
            } else {
                this.lastRow = this.rowsOnPage;
                this.lastRow = this.lastRow - 1;
            }



            this.bar();
            error => {
                console.log(error);
            }
        });


    }
    xReadOverview() {

        this.obj = {
            billdate: this.xreportForm.get('billdate').value,
            companyrefid: AppComponent.companyID,
            branchrefid: AppComponent.branchID,
            locname: AppComponent.locRefName1,
            locrefid: AppComponent.locrefID1,
        }

        this.xreportService.xReadOverview(JSON.stringify(this.obj)).subscribe(data => {

            this.loadDatas(data);

            error => {
                console.log(error);
            }
        });

    }




    loadDatas(data: any) {

        if (data != null || "") {
            this.hideGrid = true;
            this.tableHide = false;

            this.billdate = data[0][0];
            this.todaySales = data[0][1];
            this.beginningSales = data[0][2];
            this.startingOrNumber = data[0][3];
            this.endingOrNumber = data[0][4];
            this.cashAmount = data[0][5];
            this.cardAmount = data[0][6];
            this.todayTotalBill = data[0][7];

        }

        this.bar();

    }


    bar() {
        $('.bar-chart').sparkline([this.cashAmount, 0, this.cardAmount], {
            type: 'bar',
            barWidth: '40',
            height: '300px',
            width: '500px',
            tooltipClassname: 'chart-sparkline',
            barColor: 'rgba(153, 214, 131, 0.80)',
            tooltipFormatFieldlist: ['med', 'lq'],
        });
    }




}









