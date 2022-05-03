import { Component, OnInit } from '@angular/core';
import { CustomizeformassignService } from '../customizeformassign.service';

@Component({
  selector: 'app-customizeformcustomers',
  templateUrl: './customizeformcustomers.component.html',
  providers:[CustomizeformassignService]
})
export class CustomizeformcustomersComponent implements OnInit {
  gifFail:boolean=true;
  rowsOnPage:number=10;
  customizecustomers:any=[];
  customizecustomerscopy:any=[];
  constructor(private customizeservice:CustomizeformassignService) { }

  ngOnInit() {
    this.customizeservice.getcustomizeformcustomers().subscribe(data => {
      this.customizecustomers=data;this.customizecustomerscopy=data;
    },error => { console.log(error)}); 
    setTimeout(() => {
      this.gifFail=false;
    }, 2800);
  }

  searchcustomerslist(sval){
    if(sval.length>0){
      //===0  starts with
      let srch = Object.assign([], this.customizecustomerscopy).filter(
      item => ((item[2].toLowerCase()).indexOf(sval.toLowerCase()) !== -1)||((item[3].toLowerCase()).indexOf(sval.toLowerCase()) !== -1));
      this.customizecustomers=srch;
    }else{
      this.customizecustomers=this.customizecustomerscopy;
    }
  }


}
