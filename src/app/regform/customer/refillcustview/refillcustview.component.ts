import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'app/app.component';
import { NotificationsComponent } from 'app/notifications/notifications.component';
import { custViewService } from '../custView/custView.service';

@Component({
  selector: 'app-refillcustview',
  templateUrl: './refillcustview.component.html',
  providers: [custViewService, NotificationsComponent]
  //styleUrls: ['./refillcustview.component.css']
})
export class RefillcustviewComponent implements OnInit {
  gifFail: boolean=true;
  refillcustdata:any;
  refillcustdatacopy:any;
  refillalertsdata:any;
  rowsOnPage:number=10;
  constructor(private userService: custViewService) { }

  ngOnInit() {
    setTimeout(() => {
    this.userService.ViewAllRefillCustomers(AppComponent.companyID,AppComponent.branchID,AppComponent.locRefName1,AppComponent.locrefID1).subscribe(data => {
      this.refillcustdata = data, this.refillcustdatacopy = data },
      errorCode => console.log(errorCode));
      this.gifFail=false;
    },3000);
  }

  refillalertsview:boolean=false;
  todayrefills(){
    this.refillalertsview=true;
    this.userService.GetRefillAlerts(AppComponent.companyID,AppComponent.branchID,AppComponent.locRefName1,AppComponent.locrefID1).subscribe(data => {
      this.bindrefillalertdata(data);
    },err=> {
        console.log('Error Occured View Picking');
    });
  }

  bindrefillalertdata(data){
    //this.refilldata[this.refilldata.map((x, i) => [i, x]).filter(x => x.flag == false)[0][0]] = true;
    this.refillalertsdata=[];
    for(let i=0;i<data.length;i++){
      this.refillalertsdata.push({
        flag:false,
        custid:data[i][3],
        cusname:data[i][5],
        invid:data[i][0],
        invno:data[i][1],
        invdate:data[i][2],
        rdays:data[i][4],   //parseFloat(data[i][4]).toFixed(2),
      })
    }
  }

  searchrefillcustomer(sval){
    if(sval.length>0){
      //===0  starts with
      let srch = Object.assign([], this.refillcustdatacopy).filter(
      item => ((item[2].toLowerCase()).indexOf(sval.toLowerCase()) !== -1));
      this.refillcustdata=srch;
    }else{
      this.refillcustdata=this.refillcustdatacopy;
    }
  }

}
