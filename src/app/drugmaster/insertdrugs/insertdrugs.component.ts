import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'app/app.component';
import { NotificationsComponent } from 'app/notifications/notifications.component';
import { DruginsertService } from './insertdrugs.services';

@Component({
  selector: 'app-insertdrugs',
  templateUrl: './insertdrugs.component.html',
  styleUrls: ['./insertdrugs.component.css'],
  providers:[DruginsertService, NotificationsComponent]
})
export class InsertdrugsComponent implements OnInit {
  insertdataflag:boolean=false;
  parentMessage="sales";
  constructor(private insertservice: DruginsertService, private notificationsComponent:NotificationsComponent) { }

  ngOnInit() {
  }

  searcheddrugvalues=[];
  gifloading:boolean=false;
  getsearchvalue(searchvalue) {
    if (searchvalue.length > 0) {
      this.searcheddrugvalues=[];
      this.gifloading=true;
      this.insertservice.searchdrug(AppComponent.countryID,searchvalue).subscribe(data => {
        if (data.length > 0) {
          this.insertdataflag=true;
          this.gifloading=false;
          this.searcheddrugvalues = data;
        } else {
          this.searcheddrugvalues.length = 0;
          this.gifloading=false;
          this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'No Match Products', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
        }
      },
        error => { console.log(error); });
    }
    else {
      this.gifloading=false;
      this.searcheddrugvalues.length = 0;
    }
  }

  saveprocess:boolean=false;
  selecteddrugdata(drugid) {
    this.saveprocess=true;
      this.insertservice.searchdrugbyid(drugid).subscribe(data => {
        this.insertproducts(data);
      },error => { console.log(error);this.saveprocess=false;
        //this.insertdataflag=false;
        this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'No Match Products', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' }); 
      });
    //this.searcheddrugvalues.length = 0;
    // var answer = confirm("Insert Drugs?");
    // if(answer){
      
    // }
  }

  selectedinsertproduct:any;
  insertproducts(data){
    this.selectedinsertproduct={
      vanustonproductdrugid:data.productdrugid,
      //countryid:data.countryid,
      brandname:data.brandname,
      uniformproductcode:data.uniformproductcode,
      categoryid:data.categoryid,
      subcategoryid:data.subcategoryid,
      genericid:data.genericid,
      genericnamedosage:data.genericnamedosage,
      generic_name:data.generic_name,
      GenericCombination:data.GenericCombination,
      GenericCode:data.GenericCode,
      uom:data.uom,
      therapeuticid:data.therapeuticid,
      subtherapeuticid:data.subtherapeuticid,
      hsnid:data.hsnid,
      scccode:data.scccode,
      vat:0,
      cgst:0,
      utgst:0,
      igst:0,
      sgst:0,
      formulationid:data.formulationid,
      pharmacompanyid:data.pharmacompanyid,
      drugstatus:data.drugstatus,
      banneddrug:data.banneddrug,
      banneddrugreason:data.banneddrugreason,
      shortform:data.shortform,
      insuranceid:data.insuranceid,
      productregno:data.productregno,
      validity:data.validity,
      formaulationshort:data.formaulationshort,
      group_id:data.group_id,
      sub_group_id_1:data.sub_group_id_1,
      sub_group_id_2:data.sub_group_id_2,
      vatidentity:data.vatidentity,
      lastupdatedtimetick:data.lastupdatedtimetick,
      image_url:data.image_url,
      image_filename:data.image_filename,
      temperature:data.temperature,
      production_sunlight:data.production_sunlight,
      emergency_type:data.emergency_type,
      sanitizing:data.sanitizing,
      stock_available:data.stock_available,
      narcoticdrug:data.narcoticdrug,
      hanzoration_drug:data.hanzoration_drug,
      verticalid:data.verticalid,
      companyid: AppComponent.companyID,
      branchid:AppComponent.branchID,
      locname:AppComponent.locRefName1,
      locrefid:AppComponent.locrefID1,
      countryid:AppComponent.countryID
    };
    this.savevanustonproducts();
  }

  
  savevanustonproducts(){
    this.insertservice.savevanustonproducts(this.selectedinsertproduct).subscribe(data => {
      if(data){
        //this.insertdataflag=false;
        this.saveprocess=false;
        this.selectedinsertproduct='';
        this.notificationsComponent.addToast({ title: 'Success MSG', msg: 'Product Inserted Successfully', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
      }else if(!data){
        this.saveprocess=false;
        this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'Data Already Created', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      }else{
        this.saveprocess=false;
        this.notificationsComponent.addToast({ title: 'Error MSG', msg: 'Product not Inserted', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      }
    },error => { console.log(error);
      let errmsg=error.message.split(" ")[0];
      if(errmsg=="Duplicate"){
        //this.insertdataflag=false;
        this.saveprocess=false;
        this.selectedinsertproduct='';
        this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'Data Already Created', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'warning' });
      }
      });
  }

}
