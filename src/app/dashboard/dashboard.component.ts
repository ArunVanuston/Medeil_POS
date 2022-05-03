import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DashboardService } from './dashboard.service';
import { Router } from '@angular/router';
import * as c3 from 'c3';
import { bisectRight } from 'd3';
import { dateFormatPipe } from './../notifications/notifications.datepipe';
import { AppComponent } from './../app.component';
import CanvasJS from 'assets/canvasjs.min.js';
import { AdminLayoutComponent } from 'app/layouts/admin/admin-layout.component';
import { adminService } from 'app/layouts/admin/admin-layout.services';
//import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';
//import { LoginComponent } from 'app/userlogin/login/login.component';
import { LoginComponent } from './../../app/userlogin/login/login.component';
declare var $: any;
declare var Morris: any;

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css',
        '../../assets/icon/SVG-animated/svg-weather.css'
    ],
    providers: [DashboardService],
    encapsulation: ViewEncapsulation.None
})

export class DashboardComponent implements OnInit {
    //Distributor wise guage charts
    currentValue=70
    gaugeType = "arch";
    gaugeValue = 70.3;
    gaugeThick = 12;
    gaugeLabel = "Sales Value";
    fcolor="#799cdc";
    //gaugeAppendText = "%";
    // gaugethresholds = {
    //     '0': {color: 'green'},
    //     '1000': {color: 'orange'},
    //     '3500': {color: 'orangeRed'},
    //     '5000': {color: 'red'}
    // };
    distvalues=[10,20,50,25,45]
    disttooltip=['KL Distributor', 'Alpha Pharma', 'Robert Dist', 'Benit Pharma', 'Lipa Dist']
       
    
       
    customizeText = (arg) => {
        return this.getText(arg.item, arg.text);
    }
    getText(item, text){
        return this.disttooltip[item.index] + " - " + text + "%";
    }

    customizeTooltip = (arg) => {
        return {
            text: this.getText(arg, arg.valueText)
        };
    }

    // ABC Analysis
    comboChartData1 =  {
        chartType: 'ComboChart',
        dataTable: [
          ['Month', 'Bolivia', 'Ecuador', 'Madagascar', 'Papua New Guinea', 'Rwanda', 'Average'],
          ['2004/05', 165, 938, 522, 998, 450, 614.6],
          ['2005/06', 135, 1120, 599, 1268, 288, 682],
          ['2006/07', 157, 1167, 587, 807, 397, 623],
          ['2007/08', 139, 1110, 615, 968, 215, 609.4],
          ['2008/09', 136, 691, 629, 1026, 366, 569.6]
        ],
        options: {
          height: 300,
          title: 'Monthly Coffee Production by Country',
          vAxis: { title: 'Cups' },
          hAxis: { title: 'Month' },
          seriesType: 'bars',
          series: { 5: { type: 'line' } },
          colors: ['#2ecc71', '#01C0C8', '#FB9678', '#5faee3', '#f4d03f', '#e74c3c']
        },
      };
    
    dashboard: FormGroup;




    checkval=75;
    SalesDay:any;
    SalesMonth:any;
    SalesYear:any;
    daysale:any=0;
    weeksale:any=0;
    monthsale:any=0;
    totalsales:any=0;
    yearsales:any=0;
    daypurchase:any=0;
    weekpurchase:any=0;
    monthpurchase:any=0;
    yearpurchase:any=0;
    totalpurchases:any=0;
    daystock:any=0;
    weekstock:any=0;
    monthstock:any=0;
    yearstocks:any=0;
    totalstocks:any=0;
    daycust:any=0;
    weekcust:any=0;
    monthcust:any=0;
    yearcust:any=0;
    totalcust:any=0;
    dayprod:any=0;
    weekprod:any=0;
    monthprod:any=0;
    yearprod:any=0;
    totalprod:any=0;
    dayoutofstock:any=0;
    weekoutofstock:any=0;
    monthoutofstock:any=0;
    yearoutofstocks:any=0;
    totaloutofstocks:any=0;
    companyrefid;
    branchid;
    locname;
    locrefid;
    userID;
    clientcdate;
    purchasesale;
    totalpurchase;
    totalsale;
    weeklysale = [];
    saleschart = [];
    salesorder = [];
    purchasechart = [];
    comboChartData: any;
    sales: any;
    purchase: any;
    todypurchase: any;
    todysales: any;
    minstock: any;
    lastsale: any;

    countHigh: number;
    countMedium: number;
    countLow: number;


    /*Polar chart*/
    type3 = 'polarArea';
    data3 = {
        datasets: [{
            data: [
                2000,
                4500,
                8000,
                500
            ],
            backgroundColor: [
                '#7E81CB',
                '#1ABC9C',
                '#B8EDF0',
                '#01C0C8'
            ],
            hoverBackgroundColor: [
                '#a1a4ec',
                '#2adab7',
                '#a7e7ea',
                '#10e6ef'
            ],
            label: 'My dataset' // for legend
        }],
        legend: {
            display: false,
        },
        labels: [
            'Palayan',
            'Metro Manila',
            'Manila',
            'Sagayam'
        ]
    };
    options3 = {
        elements: {
            arc: {
                borderColor: ''

            },
            // labels: {
            //     display: false,
            // }
        }
    };
    pieChart: any;
    pieChart1: any = {};
    completedDate: any = [];
    notStartedCount: number;
    openCount: number;
    inProgressCount: number;
    pendingCount: number;
    closeCount: number;
    taskStatsLength: number;
    morArrData: any = [];
    y: any;
    NotStarted: any;
    Open: any;
    InProgress: any;
    Pending: any;
    Close: any;
    convertedJson: string;
    ddata: any;
    customercount: any;
    productcount: any;
    profit: any=0;
    stockcount: any;
    expstock: any;
    outofstock: any;
    shortex: any=0;
    pyramidSource=[];
    leadSource=[];
    constructor(private purchaseservice: DashboardService, private router: Router, private dateformat: dateFormatPipe) {
        const totalsale = new FormControl;
        const totalpurchase = new FormControl;
        const weeklysale = new FormControl;
        this.dashboard = new FormGroup({
            totalpurchase: totalpurchase,
            totalsale: totalsale
        });
        // this.leadSource= [{
        //     state: "KL Dist",
        //     young: 6.7,
        //     middle: 28.6,
        //     older: 5.1
        //   }, {
        //     state: "Alpha Pharma",
        //     young: 9.6,
        //     middle: 43.4,
        //     older: 9
        //   }, {
        //     state: "Robert Dist",
        //     young: 13.5,
        //     middle: 49,
        //     older: 5.8
        //   }, {
        //     state: "Lipha Dist",
        //     young: 30,
        //     middle: 90.3,
        //     older: 14.5
        //   },{
        //     state: "Arokiys Dist",
        //     young: 28,
        //     middle: 67.3,
        //     older: 19.5
        //   }];

        // this.pyramidSource = [{
        //     count: 95,
        //     level: "A Products"
        // }, {
        //     count: 75,
        //     level: "B Products"
        // }, {
        //     count: 53,
        //     level: "C Products"
        // }]; 
    }
    shopname:any='Medeil';
    shopcityname:any='Chennai';
    ngOnInit() {
       
        setTimeout(() => {
            /* visitors pie chart*/
            $('.visitor-chart').sparkline([1, 2], {
                type: 'pie',
                width: '100px',
                height: '65px',
                sliceColors: ['#ccc', '#0073aa'],
                tooltipClassname: 'chart-sparkline'
            });
            /* visitor total sale line chart */
            $('.sale-chart').sparkline([this.purchasechart, 12], {
                type: 'line',
                width: '100%',
                height: '65px',
                tooltipClassname: 'chart-sparkline',
                chartRangeMax: '50',
                lineColor: '#ccc',
                fillColor: '#ccc'
            });
            this.companyrefid =AppComponent.companyID;
            this.branchid =AppComponent.branchID;
            this.locname = AppComponent.locRefName1;
            this.locrefid =AppComponent.locrefID1;
            this.clientcdate = AppComponent.date;
            this.userID = AppComponent.userID;
            this.clientcdate = [this.dateformat.transform05(Date.now()), []];
            // alert("Raja")
            this.abcpyramid();
           
         

            this.purchaseservice.getSalesDatas(this.companyrefid, this.branchid, this.locname, this.locrefid).subscribe(data => { this.ddata=data
                this.SalesDay=data.DayTotal[1], this.SalesMonth=data.DayTotal[2],this.SalesYear=data.DayTotal[3], this.daysale = data.DayTotal[4],
                this.weeksale = data.WeekTotal[4], this.monthsale = data.MonthTotal[4], this.yearsales=data.YearTotal[4], this.totalsales=data.GrandTotal[4]});
               
                // alert("Desing")
            this.purchaseservice.getProductwiseSales(this.companyrefid, this.branchid, this.locname, this.locrefid).subscribe(data => { 
                this.ProductwiseSale(data)});      

            this.purchaseservice.getPurchaseDatas(this.companyrefid, this.branchid, this.locname, this.locrefid).subscribe(data => { 
                this.SalesDay=data.DayTotal[1], this.SalesMonth=data.DayTotal[2], this.SalesYear=data.DayTotal[3], this.daypurchase=data.DayTotal[4]
                this.weekpurchase = data.WeekTotal[4], this.monthpurchase = data.MonthTotal[4], this.yearpurchase = data.YearTotal[4], this.totalpurchases=data.GrandTotal[4] });   

            //this.companyrefid, this.branchid, this.locname, this.locrefid
            this.purchaseservice.getDistributorwisePurchase(80,80,1,80).subscribe(data => { 
                this.DistributorwisePurchase(data)});      
                                                  
    
            this.purchaseservice.getMinimumQuantity(this.companyrefid, this.branchid,
                this.locname, this.locrefid).subscribe(data => { this.minstock = data });

            this.purchaseservice.getcustomercount(this.companyrefid, this.branchid, this.locname, this.locrefid).subscribe(data => {
                this.customercount=data,
                this.daycust=data.DayTotal, this.weekcust = data.WeekTotal, this.monthcust = data.MonthTotal, this.yearcust = data.YearTotal, this.totalcust=data.GrandTotal });
           
            this.purchaseservice.getproductcount(this.companyrefid, this.branchid, this.locname, this.locrefid).subscribe(data => { 
                this.productcount=data,
                this.dayprod=data.DayTotal, this.weekprod = data.WeekTotal, this.monthprod = data.MonthTotal, this.yearprod = data.YearTotal, this.totalprod=data.GrandTotal });

            this.purchaseservice.getstockcount(this.companyrefid, this.branchid, this.locname, this.locrefid).subscribe(data => { 
                this.stockcount=data,
                this.daystock=data.DayTotal, this.weekstock = data.WeekTotal, this.monthstock = data.MonthTotal, this.yearstocks = data.YearTotal, this.totalstocks=data.GrandTotal });

            //this.companyrefid, this.branchid, this.locname, this.locrefid
            this.purchaseservice.getsalesinvoice(this.companyrefid, this.branchid, this.locname, this.locrefid).subscribe(data => { this.invoicebind(data) });
           
            this.profit = (this.totalsales - this.totalpurchases).toFixed(2);

            this.purchaseservice.getoutofstock(this.companyrefid, this.branchid, this.locname, this.locrefid).subscribe(data => {
                this.outofstock=data,
                this.dayoutofstock=data.DayTotal, this.weekoutofstock = data.WeekTotal, this.monthoutofstock = data.MonthTotal, this.yearoutofstocks = data.YearTotal, this.totaloutofstocks=data.GrandTotal });

            this.purchaseservice.getshortexp(this.companyrefid, this.branchid, this.locname, this.locrefid).subscribe(data => { this.shortex=data});
            // this.purchaseservice.getminimumstock(this.companyrefid, this.branchid, this.locname, this.locrefid).subscribe(data => { this.stockcount=data});
            this.purchaseservice.getexpiredstock(this.companyrefid, this.branchid, this.locname, this.locrefid).subscribe(data => { this.expstock=data});


            // alert("profit" +this.profit);
            setTimeout(() => {

                setTimeout(() => {
                this.purchaseservice.getShopName(AppComponent.locrefID1).subscribe(data => {
                    this.shopname = data[0][1];
                    this.shopcityname=data[0][2];
                }, err => {});
                },1200)

                this.purchaseservice.getTaskStatusBar(this.companyrefid, this.branchid,
                    this.locname, this.locrefid).subscribe(data => { this.getTaskStatus(data) });
    
                this.purchaseservice.getPriorityBar(this.companyrefid, this.branchid,
                    this.locname, this.locrefid, parseInt(this.userID)).subscribe(data => {
                        this.taskPriorityBar(data) });
    
                this.purchaseservice.salesordertype(this.companyrefid, this.branchid,
                    this.locname, this.locrefid).subscribe(data => { this.salesorder = data, this.method3() });

                this.morrisline();
               
            },1000)
          
        
            /* visitor total revenue chart */
            $('.resource-barchart').sparkline([5, 6, 2, 4, 9, 8, 3, 6, 4, 2], {
                type: 'bar',
                barWidth: '8px',
                height: '50px',
                barColor: '#239a55',
                tooltipClassname: 'abc'
            });
            /*custom line chart*/
            $('.customchart').sparkline([15, 30, 27, 35, 50, 71, 60], {
                type: 'line',
                width: 300,
                height: 300,
                tooltipClassname: 'chart-sparkline',
                chartRangeMax: '50',
                lineColor: '#0073aa',
                fillColor: 'rgba(0, 115, 170, 0.5)'
            });
            $('.customchart').sparkline([0, 25, 10, 7, 25, 35, 30], {
                type: 'line',
                width: 300,
                height: 300,
                composite: '!0',
                tooltipClassname: 'chart-sparkline',
                chartRangeMax: '40',
                lineColor: '#239a55',
                fillColor: 'rgba(35, 154, 85, .5)'
            });

        }, 100);

        this.method5();
       
    }

    invoicebind(data){
        this.lastsale=[];
        for(let i=0;i<data.length;i++){
            this.lastsale.push({ invno: data[i][0], invdate: data[i][1], cusname:data[i][4], 
                                invqty:data[i][2], invtotal:parseFloat(data[i][3]).toFixed(2) });
        }
    }

    statusflag:number=4;
    statuschange(statusid){
        this.statusflag=statusid;
        this.abcstatuschange(statusid);
    }

    abcstatuschange(statusid){
    if(statusid==1){
        this.gaugeValue=this.daysale;
        let chart = new CanvasJS.Chart("chartContainer",
        {
            animationEnabled: true,
            exportEnabled: false,
            data: [
            {
                type: "pyramid",
                //valueRepresents: "area",
                indexLabelFontSize: 15,
                indexLabelFontFamily: "Lucida",
                //indexLabelPlacement: "inside",
                //showInLegend: true,  { y: 18, indexLabel: "A Products", color: "#002e86" },
                dataPoints: [
                { y: this.abcdatas.DayTotal[0], indexLabel: "A Products", color: "#002e86" },
                { y: this.abcdatas.DayTotal[1], indexLabel: "B Products", color: "#00d7b5" },
                { y: this.abcdatas.DayTotal[2], indexLabel: "C Products", color: "#799cdc" },
                ]
            }
            ]
        });
        chart.render();  
    }else if(statusid==2){
        this.gaugeValue=this.weeksale;
        let chart = new CanvasJS.Chart("chartContainer",
        {
            animationEnabled: true,
            exportEnabled: false,
            data: [
            {
                type: "pyramid",
                //valueRepresents: "area",
                indexLabelFontSize: 15,
                indexLabelFontFamily: "Lucida",
                //indexLabelPlacement: "inside",
                //showInLegend: true,
                dataPoints: [
                { y: this.abcdatas.WeekTotal[0], indexLabel: "A Products", color: "#002e86" },
                { y: this.abcdatas.WeekTotal[1], indexLabel: "B Products", color: "#00d7b5" },
                { y: this.abcdatas.WeekTotal[2], indexLabel: "C Products", color: "#799cdc" },
                ]
            }
            ]
        });
        chart.render();  
    }else if(statusid==3){
        this.gaugeValue=this.monthsale;
        let chart = new CanvasJS.Chart("chartContainer",
        {
            animationEnabled: true,
            exportEnabled: false,
            data: [
            {
                type: "pyramid",
                //valueRepresents: "area",
                indexLabelFontSize: 15,
                indexLabelFontFamily: "Lucida",
                //indexLabelPlacement: "inside",
                //showInLegend: true,
                dataPoints: [
                { y: this.abcdatas.MonthTotal[0], indexLabel: "A Products", color: "#002e86" },
                { y: this.abcdatas.MonthTotal[1], indexLabel: "B Products", color: "#00d7b5" },
                { y: this.abcdatas.MonthTotal[2], indexLabel: "C Products", color: "#799cdc" },
                ]
            }
            ]
        });
        chart.render();  
    }else if(statusid==4){
        this.gaugeValue=this.yearsales;
        let chart = new CanvasJS.Chart("chartContainer",
        {
            animationEnabled: true,
            exportEnabled: false,
            data: [
            {
                type: "pyramid",
                //valueRepresents: "area",
                indexLabelFontSize: 15,
                indexLabelFontFamily: "Lucida",
                //indexLabelPlacement: "inside",
                //showInLegend: true,
                dataPoints: [
                { y: this.abcdatas.YearTotal[0], indexLabel: "A Products", color: "#002e86" },
                { y: this.abcdatas.YearTotal[1], indexLabel: "B Products", color: "#00d7b5" },
                { y: this.abcdatas.YearTotal[2], indexLabel: "C Products", color: "#799cdc" },
                ]
            }
            ]
        });
        chart.render();  
    }
         
    }
    
    Salesdata(){
        this.purchaseservice.getcustomercount(this.companyrefid, this.branchid, this.locname, this.locrefid).subscribe(data => {
            this.customercount=data});
        // this.purchaseservice.getProductwiseSales(this.companyrefid, this.branchid, this.locname, this.locrefid).subscribe(data => { 
        //     this.ProductwiseSale(data)}); 
    }

    ProductwiseSale(salesdata){
        // for Pie Chart 
          console.log(JSON.stringify(salesdata));
          const transection = c3.generate({
          bindto: '#productwisesale',
          data: {
              // iris data from R
              columns: [
               [10,50],
               [50,10],
               [25,80],
               [85,20],
               [30,70],
               [75,45],
               [50,80]
            ],
            //   columns: [
            //     [salesdata[0][1], salesdata[0][4]],
            //     [salesdata[1][1], salesdata[1][4]],
            //     [salesdata[2][1], salesdata[2][4]],
            //     [salesdata[3][1], salesdata[3][4]],
            //     [salesdata[4][1], salesdata[4][4]],
            //     [salesdata[5][1], salesdata[5][4]],
            //     [salesdata[6][1], salesdata[6][4]],
            //     [salesdata[7][1], salesdata[7][4]],
            //     [salesdata[8][1], salesdata[8][4]],
            //     [salesdata[9][1], salesdata[9][4]],
            // ],
              type: 'pie',
              onclick: function(d, j) { console.log('onclick', d, j); },
              onmouseover: function(d, j) { console.log('onmouseover', d, j); },
              onmouseout: function(d, j) { console.log('onmouseout', d, j); }
          },
          color: {//01a768
              //pattern: ['#277145', '#3aa967', '#328055', '#68b38a', '#868e96']
              pattern: ['#002e86', '#00d7b5', '#799cdc', '#89e5d6', '#a5b9de']
          },
          legend: {
            show: false
         }
        });
    }


    DistributorwisePurchase(purchasedata){
        //alert("pur: "+purchasedata.length+"--"+purchasedata[1][2]+"------"+JSON.stringify(purchasedata))
        this.distvalues=[purchasedata[0][2], purchasedata[1][2], purchasedata[2][2],purchasedata[3][2],purchasedata[4][2]];
        this.disttooltip=[purchasedata[0][3], purchasedata[1][3], purchasedata[2][3],purchasedata[3][3],purchasedata[4][3]];
        //alert("distvalues"+this.distvalues);
       
       
        //for Pie Chart 
       
        //     [purchasedata[0][3], purchasedata[0][2]],
        //     [purchasedata[1][3], purchasedata[1][2]],
        //     [purchasedata[2][3], purchasedata[2][2]],
         
        //   const transection = c3.generate({
        //   bindto: '#distwisepurchase',
        //   data: {
        //       // iris data from R
        //       columns: [
        //         [purchasedata[0][3], purchasedata[0][2]],
        //         [purchasedata[1][3], purchasedata[1][2]],
        //         [purchasedata[2][3], purchasedata[2][2]],
        //     ],
        //       type: 'donut',
        //       onclick: function(d, j) { console.log('onclick', d, j); },
        //       onmouseover: function(d, j) { console.log('onmouseover', d, j); },
        //       onmouseout: function(d, j) { console.log('onmouseout', d, j); }
        //   },
        //   color: {
        //       pattern: ['#239a55', '#f1c40f', '#33abbe']
        //   },legend: {
        //     show: false
        //     }
        // });
    }

    
    

    method3() {
        const transection = c3.generate({
            bindto: '#donut-example', //'#distwisepurchase',
            data: {
                // iris data from R
                columns: [
                  ['SMS',20],// this.salesorder[0][0]],
                  ['E-mail',30],// this.salesorder[0][1]],
                  ['Whatsapp',25], //this.salesorder[0][2]],
                  ['Telephone',10],// this.salesorder[0][3]],
                  ['Online Pharmacy',50]// this.salesorder[0][4]],
              ],
                type: 'donut',
                onclick: function(d, j) { console.log('onclick', d, j); },
                onmouseover: function(d, j) { console.log('onmouseover', d, j); },
                onmouseout: function(d, j) { console.log('onmouseout', d, j); }
            },
            color: {
                //pattern: ['#277145', '#3aa967', '#01a768', '#328055', '#68b38a'],
                pattern: ['#002e86', '#00d7b5', '#799cdc', '#89e5d6', '#a5b9de']
                
            },legend: {
              show: false
              }
          });
        // Morris.Donut({
        //     element: 'donut-example',
        //     redraw: true,
        //     data: [
        //         { label: 'SMS', value: this.salesorder[0][0] },
        //         { label: 'E-mail', value: this.salesorder[0][1] },
        //         { label: 'Whatsapp', value: this.salesorder[0][2] },
        //         { label: 'Telephone', value: this.salesorder[0][3] },
        //         { label: 'Online Pharmacy', value: this.salesorder[0][4] }
        //     ],
        //     colors: ['#5FBEAA', '#34495E', '#FF9F55', '#56a0ef', '#0f8dbf']
        // });

    }

    method4() {
        var sdata;
        if((JSON.parse(this.convertedJson)).length<=0){
            sdata=[
                { y: '2012', NotStarted: 100, Open: 90, InProgress:20, Pending:40, Close:50 },
                { y: '2014', NotStarted: 75,  Open: 65, InProgress:30, Pending:20, Close:30 },
                { y: '2016', NotStarted: 150, Open: 80, InProgress:40, Pending:50, Close:10 },
                { y: '2018', NotStarted: 75,  Open: 85, InProgress:28, Pending:20, Close:30 },
                { y: '2020', NotStarted: 50,  Open: 40, InProgress:30, Pending:25, Close:48 }
              ]
        }else{
            sdata=JSON.parse(this.convertedJson);
        }
        Morris.Bar({
            element: 'bar-chart',
            data: sdata,
            xkey: 'y',
            //ykeys: ['NotStarted', 'Open', 'InProgress'],
            ykeys: ['NotStarted', 'Open', 'InProgress', 'Pending', 'Close'],
            //labels: ['Purchase Reports', 'Sales Reports', 'Task Open'],
            labels: ['Task NotStarted', 'Task Open', 'Task InProgress', 'Task Pending', 'Task Close'],
            lineWidth: '3px',
            resize: true,
            redraw: true,
            //barColors: ["#277145", "#3aa967", "#328055", "#68b38a","#868e96"],
            barColors:['#002e86', '#00d7b5', '#799cdc', '#89e5d6', '#a5b9de'],
            hideHover: true,        //'always' for hide purpose
        });
    }
   
    stackbar() {
        var sdata=[
            { y: 'KL Dist', a: 50, b: 90, c:11},
            { y: 'Alpha Pharma', a: 75,  b: 60, c:44},
            { y: 'Robert dist', a: 120, b: 85, c:99},
            { y: 'Lipha Dist', a: 145, b: 85, c:11},
            { y: 'Arokiya dist', a: 160, b: 95, c:45}
            ]
        Morris.Bar({
            element: 'stackbar-chart',
            data: sdata,
            xkey: 'y',
            ykeys: ['a', 'b' , 'c'],
            labels: ['Long Time', 'Mid Time', 'Short Time'],
            lineWidth: '3px',
            stacked: true,
            resize: true,
            //redraw: true, #89e5d6
            //barColors: ["#277145", "#3aa967","#868e96", "#68b38a"], 
            barColors:['#002e86', '#00d7b5', '#799cdc', '#89e5d6','#a5b9de'],
            //hideHover: 'always',
        });
    }

    abcdatas:any;
    abcpyramid(){
        this.purchaseservice.getABCDatas(this.companyrefid, this.branchid, this.locname, this.locrefid).subscribe(data => {
            this.abcdatas=data });

            let chart = new CanvasJS.Chart("chartContainer",
            {
                animationEnabled: true,
                exportEnabled: false,
                data: [
                {
                    type: "pyramid",
                    //valueRepresents: "area",
                    indexLabelFontSize: 15,
                    indexLabelFontFamily: "Lucida",
                    //indexLabelPlacement: "inside",
                    //showInLegend: true,
                    dataPoints: [
                    { y: 18, indexLabel: "A Products", color: "#002e86" },
                    { y: 11, indexLabel: "B Products", color: "#00d7b5" },
                    { y: 30, indexLabel: "C Products", color: "#799cdc" },
                    ]
                }
                ]
            });
            chart.render();
    }    

    morrisline(){
        Morris.Line({
            element: 'dist_lead',
            data: [
                { y: '2006', a: 30, b: 10, c:20 },
                { y: '2007', a: 28, b: 60, c:10 },
                { y: '2008', a: 25, b: 20, c:30 },
                { y: '2009', a: 29, b: 50, c:40 },
                { y: '2010', a: 35, b: 22, c:10 },
                { y: '2011', a: 45, b: 95, c:25 },
                { y: '2012', a: 32, b: 26, c:19 },
                { y: '2013', a: 19, b: 75, c:29 },
                { y: '2014', a: 22, b: 35, c:35 },
                { y: '2015', a: 40, b: 65, c:31 },
                { y: '2016', a: 25, b: 10, c:20 }
            ],
            xkey: 'y',
            redraw: true,
            ykeys: ['a', 'b', 'c'],
            hideHover: 'auto',
            labels: ['LIPA Dist', 'KL Dist', 'Arokiya Dist'],
            lineColors: ['#f1c40f', '#239a55', '#868e96']
        });
    }

    getTaskStatus(data: any) {
        let length = data.length;
        this.taskStatsLength = data.length;

        let countNS = 0;
        let countO = 0;
        let countIP = 0;
        let countP = 0;
        let countC = 0;

        this.notStartedCount = 0;
        this.openCount = 0;
        this.inProgressCount = 0;
        this.pendingCount = 0;
        this.closeCount = 0;

        for (let i = 0; i < length; i++) {
            if (data[i][1] != undefined && data[i][1] < this.dateformat.transform02(Date.now())) {

                this.completedDate = data[i][1]
                if (data[i][0] == 6 || data[i][0] == 1) {
                    countNS++;
                    this.notStartedCount = countNS;
                }

                else if (countNS == 0 || undefined) {
                    this.notStartedCount = 0;
                }

                if (data[i][0] == 7 || data[i][0] == 2) {
                    countO++;
                    this.openCount = countO;
                }
                else if (countO == 0 || undefined) {
                    this.openCount = 0;
                }

                if (data[i][0] == 8 || data[i][0] == 3) {
                    countIP++;
                    this.inProgressCount = countIP;
                }
                else if (countIP == 0 || undefined) {
                    this.inProgressCount = 0;
                }
                if (data[i][0] == 9 || data[i][0] == 4) {
                    countP++;
                    this.pendingCount = countP;

                }
                else if (countP == 0 || undefined) {
                    this.pendingCount = 0;
                }

                if (data[i][0] == 10 || data[i][0] == 5) {
                    countC++;
                    this.closeCount = countC;

                }

                else if (countC == 0 || undefined) {
                    this.closeCount = 0;
                }


                this.morArrData.push({ y: this.completedDate, NotStarted: this.notStartedCount, Open: this.openCount, InProgress: this.inProgressCount, Pending: this.pendingCount, Close: this.closeCount });

            }

        }
        this.calculateMorArrData();
        // console.log("this.morArrDataNostringify " + this.morArrData[1].Close);
        this.convertedJson = JSON.stringify(this.morArrData);
        // console.log("this.morArrData " + this.convertedJson);

        this.y = this.morArrData.map(item => item.y);
        this.NotStarted = this.morArrData.map(item => item.NotStarted);
        this.Open = this.morArrData.map(item => item.Open);
        this.InProgress = this.morArrData.map(item => item.InProgress);
        this.Pending = this.morArrData.map(item => item.Pending);
        this.Close = this.morArrData.map(item => item.Close);
        // console.log("Y " + this.y[0]);
        // console.log("this.NotStarted[0] " + this.NotStarted[0]);
        this.method4();
        this.stackbar();
    }


    calculateMorArrData() {
        let GropArr: any = this.groupBy(this.morArrData, data => data.y);
        let temp = [];
        GropArr.forEach(function (key) {
            // console.log(key);
            let latObj = {}
            key.map(mdata => {
                latObj = mdata
            })
            temp.push(latObj)
        });
        // temp = temp.sort((a, b) => b.y - a.y);
        // console.log("GropArr", temp);
        this.morArrData = temp;
    }
    groupBy(list, keyGetter) {
        const map = new Map();
        list.forEach((item) => {
            const key = keyGetter(item);
            const collection = map.get(key);
            if (!collection) {
                map.set(key, [item]);
            } else {
                collection.push(item);
            }
        });
        return map;
    }

    method5() {
        const chart = c3.generate({
            bindto: '#priority',
            color: {

                pattern: ['#FAEBD7', '#00FFFF', '#F0F8FF'],
               
            },
           
            data: {
                columns: [
                    ['High', this.countHigh],
                    ['Medium', this.countMedium],
                    ['Low', this.countLow],
                ],
                type: 'pie',
                // onclick: function (d, i) { console.log('onclick', d, i); },
                // onmouseover: function (d, i) { console.log('onmouseover', d, i); },
                // onmouseout: function (d, i) { console.log('onmouseout', d, i); }
            },
            // donut: {
            //     title: 'Today Result'
            // }
        });


    }


    taskPriorityBar(data: any) {
        if (data) {

            let length = data.length;


            let countL = 0;
            let countM = 0;
            let countH = 0;

            for (let i = 0; i < length; i++) {

                if (data[i][0] == 4 || data[i][0] == 1) {
                    countL++;
                    this.countLow = countL;

                }

                else if (countL == 0 || undefined) {
                    this.countLow = 0;
                }

                if (data[i][0] == 5 || data[i][0] == 2) {
                    countM++;
                    this.countMedium = countM;

                }
                else if (countM == 0 || undefined) {
                    this.countMedium = 0;
                }

                if (data[i][0] == 6 || data[i][0] == 3) {
                    countH++;
                    this.countHigh = countH;

                }
                else if (countH == 0 || undefined) {
                    this.countHigh = 0;
                }
            }
        }

        this.method5();
      
       
    }

  //Raja
    
    minstocks(){
        this.router.navigate(['ReorderForm/ReorderForm']);
    } 

    shortexp(){
        this.router.navigate(['ShortExpiry/Viewshortexpiry']);
    } 
    expiredstock(){
        this.router.navigate(['ExpiredStock/ExpiredStock']);
    } 


//Combo Chart





}
