import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from 'app/app.component';
import { loyalitysettingsService } from 'app/loyalitypoints/loyalitypoints.service';
import { NotificationsComponent } from 'app/notifications/notifications.component';
import { BonusloyalityService } from '../loyalitybonus.service';

@Component({
  selector: 'app-bonusloyalityview',
  templateUrl: './bonusloyalityview.component.html',
  styleUrls: ['./bonusloyalityview.component.css'],
  providers:[BonusloyalityService]
})
export class BonusloyalityviewComponent implements OnInit {
  public data = [];
  public rowsOnPage: number = 10;
  public filterQuery: string = "";
  public sortBy: string = "";
  public sortOrder: string = "desc";
  gifFail: boolean=true;
  codeval: any;
  codeval1: any;
  data1: any;


  constructor(private loyalityservice:BonusloyalityService,
              private notification:NotificationsComponent,
              private appcomponent:AppComponent,
              private modalService: NgbModal) { }
              fixeddec;
  ngOnInit() {
this.fixeddec = "00"

setTimeout(() => {
  

this.loyalityservice.getbounus(AppComponent.companyID,AppComponent.branchID,AppComponent.locRefName1,AppComponent.locrefID1).subscribe(data =>{
  this.data = data
})
this.gifFail=false;
}, 3000);

  }

  Showprod(popupname,codeval){
    // this.Schedulelist.get('productid').setValue(codeval);
   
    this.loyalityservice.getblproduct(codeval).subscribe(data=>{
      this.data1 =data
    })
    
    // this.Schedulelist.get('schedule').setValue(scheduleval);
    this.openmain(popupname);
  }


  //popup properties
closeResult: string;
openmain(popupname) {
  this.modalService.open(popupname).result.then(
    (result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
}

private getDismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
    
    return 'by pressing ESC';
  
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
  } else {
    return `with: ${reason}`;
  }
 
}


}
