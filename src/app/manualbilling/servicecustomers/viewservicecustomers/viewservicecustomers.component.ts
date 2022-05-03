import { Component, OnInit } from '@angular/core';
import { ManualbillingService } from 'app/manualbilling/manualbilling.service';

@Component({
  selector: 'app-viewservicecustomers',
  templateUrl: './viewservicecustomers.component.html',
  styleUrls: ['./viewservicecustomers.component.css'],
  providers: [ManualbillingService]
})

export class ViewservicecustomersComponent implements OnInit {
  gifFail:boolean=true;
  rowsOnPage:number=10;
  servicecustomers:any=[];
  servicecustomerscopy:any=[];
  constructor(private manualservice:ManualbillingService) { }

  ngOnInit() {
    this.manualservice.searchservicecustomers().subscribe(data => {
      this.servicecustomers=data;this.servicecustomerscopy=data;
    });
    setTimeout(() => {
      this.gifFail=false;
    }, 1400);
  }

   //search customers
   searchcustomers(event:any){
    if(event.length>0){
      //===0  starts with
      let srch = Object.assign([], this.servicecustomerscopy).filter(
      item => ((item[1].toLowerCase()).indexOf(event.toLowerCase()) !== -1 || (item[3].toLowerCase()).indexOf(event.toLowerCase()) !== -1));
      this.servicecustomers=srch;
    }else{
      this.servicecustomers=this.servicecustomerscopy;
    }
  }


}
