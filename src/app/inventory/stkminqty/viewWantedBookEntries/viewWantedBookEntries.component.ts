import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";

import { Router, ActivatedRoute } from '@angular/router';

import { ViewWantedBookService } from './viewWantedBookEntries.service';

import { AppComponent } from 'app/app.component';



@Component({
    selector: 'app-viewWantedBookEntries',
    templateUrl: './viewWantedBookEntries.component.html',
    providers: [ViewWantedBookService]
})

export class viewWantedBookComponent implements OnInit {

    selobj;
    private sub: any;
    tabId = '';
    id ='';
    public data: any;
    public rowsOnPage: number = 10;
    public filterQuery: string = "";
    public sortBy: string = "";
    public sortOrder: string = "desc";


    constructor(private viewWantedService: ViewWantedBookService, private routes: ActivatedRoute, private rout: Router) { }





    ngOnInit() {



        this.selobj = {

            companyID: AppComponent.companyID,
            branchID: AppComponent.branchID,
            locName: AppComponent.locRefName1,
            locrefID: AppComponent.locrefID1

        }


        // this.id = this.routes.snapshot.paramMap.get('id');



        this.sub = this.routes.params.subscribe(params => {
            this.id = params['id'];
            this.tabId = params['tabId']
        });



        if (this.tabId == "1") {


            var frmdata = {

                companyrefid: this.selobj.companyID,

                branchrefid: this.selobj.branchID,

                locname: this.selobj.locName,

                locrefid: this.selobj.locrefID,

                stkminid: this.id



            }





            this.viewWantedService.viewMinWantedStockRecord(JSON.stringify(frmdata)).subscribe(data => this.data = data,
                err => {
                    console.log('Error Occured On viewSalesorderRecord()');
                });


        }

        else if (this.tabId == "2") {


     
  var frmdata1 = {

                companyrefid: this.selobj.companyID,

                branchrefid: this.selobj.branchID,

                locname: this.selobj.locName,

                locrefid: this.selobj.locrefID,

                newprodno: this.id

            }


            this.viewWantedService.viewNewWantedStockRecord(JSON.stringify(frmdata1)).subscribe(data => this.data = data,
                err => {
                    console.log('Error Occured On viewSalesorderRecord()');
                });




        }


    }




    goBack() {
        this.rout.navigate(['ReorderForm/ViewReorderForm']);
    }
}


