import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AppComponent } from 'app/app.component';
import { providers } from 'ng2-toasty';
import { TranslateService } from 'ng2-translate';
import { NewpurchasedeliverychallanService } from '../newpurchasedeliverychallan.service';

@Component({
  selector: 'app-viewpdeliverychallan',
  templateUrl: './viewpdeliverychallan.component.html',
  styleUrls: ['./viewpdeliverychallan.component.css'],
  providers:[NewpurchasedeliverychallanService]
})
export class ViewpdeliverychallanComponent implements OnInit {


  
  public data: any;
  public rowsOnPage: number = 20;
  public filterQuery: string = "";
  public sortBy: string = "";
  public sortOrder: string = "desc";
  gifFail: boolean=true;
  scheduleupdate: any;
  schedule: any;
  dcproducts:any;
  constructor(private npdservice:NewpurchasedeliverychallanService,
              private AppComponent:AppComponent,
              private formbiulder:FormBuilder,public translate: TranslateService) { 
                translate.setDefaultLang('en');
              }

  ngOnInit() {
    this.translate.use(localStorage.getItem('language'));
    this.npdservice.viewpdc(AppComponent.companyID,AppComponent.branchID,AppComponent.locRefName1,AppComponent.locrefID1).subscribe(data =>{
      this.data=data
    })
  }

  productsview:boolean=false;
    viewdcproducts(id:any){
     // let obj={locname  :AppComponent.locRefName1,locrefid  :AppComponent. locrefID1 , frmint1:id};
      this.productsview=true;
      this.npdservice.ViewDCProducts(id).subscribe(data =>{
        if(data){
          this.dcproducts=data;
        }
      },error => {
          console.log('Error Occured  From DeleteSalesinvoice')
      });
    }

}
