import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { salesOrderServicenew } from '../salesordernew.services';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
    selector: 'app-viewSalesOrderRecord',
    templateUrl: './viewsalesorderrecordnew.component.html',
})

export class viewSalesOrderRecordComponentnew implements OnInit {
    id: any;
    public data: any;
    public rowsOnPage: number = 10;
    public filterQuery: string = "";
    public sortBy: string = "";
    public sortOrder: string = "desc";
    productRecord : any;
    constructor(private viewRecord: salesOrderServicenew, private routes: ActivatedRoute, private rout: Router, private fb: FormBuilder) {
     this.productRecord = this.fb.group({
         customername:['',[]],
         orderdate:['',[]]
     })
     }
    ngOnInit() {
        this.id = this.routes.snapshot.paramMap.get('id');
        
        this.viewRecord.viewSalesorderRecord(this.id).subscribe(data => 
            {
                this.data = data,
                this.productRecord.get('customername').setValue(data[0][3]),
                this.productRecord.get('orderdate').setValue(data[0][4]),
            err => {
                console.log('Error Occured On viewSalesorderRecord()');
            }
            });
        
           
    }


    goBack() {
        this.rout.navigate(['SalesOrder/SalesOrderHistory']);
    }
}


