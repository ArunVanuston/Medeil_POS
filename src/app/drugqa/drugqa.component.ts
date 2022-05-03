import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AppComponent } from 'app/app.component';
import { NotificationsComponent } from 'app/notifications/notifications.component';
import swal from 'sweetalert2';
import { DrugQaService } from './drugqa.service';

@Component({
  selector: 'app-drugqa',
  templateUrl: './drugqa.component.html',
  styleUrls: ['./drugqa.component.css'],
  providers:[DrugQaService,NotificationsComponent]
})
export class DrugqaComponent implements OnInit {

  public data = [];
  public rowsOnPage: number = 10;
  public filterQuery: string = "";
  public sortBy: string = "";
  public sortOrder: string = "desc";
  gifFail: boolean=true;
  status: any;
 
  rejstatus: any;
  qaStat: any;
  qaStatus: number;

  constructor(private appcomponent:AppComponent,
              private notification:NotificationsComponent,
              private formfuilder:FormBuilder,
              private drugqaservice:DrugQaService,
           
             ) { }

  ngOnInit() {

    setTimeout(() => {
      
   
    this.drugqaservice.getdrugqalist().subscribe(data =>{
      this.data = data,this.qaStat=data[38]
      err =>{
        console.log("Error Occure from getdrugqalist()")
      }
    })
    this.gifFail=false;
  }, 3000);


  }


  
  private selectedLink: string = "allpro";

  setradio(e: string): void {
    
    this.selectedLink = e;
  }
  isSelected(name: string): boolean {
 
    if (!this.selectedLink) { // if no radio button is selected, always return false so every nothing is shown  
      return false;
    }
    return (this.selectedLink === name); // if current radio button is selected, return true, else return false  

  }

  approvedlist:any=[];
  approved(){
    this.approvedlist = [];
    for(let i=0;i<this.data.length;i++){
      if(this.data[i].qaStatus==1){
         this.approvedlist.push(this.data[i]);
      }
    }
   
  }
  rejectedlist:any=[];
  rejected(){
    this.rejectedlist=[];
    for(let i=0;i<this.data.length;i++){
      if(this.data[i].qaStatus==2){
        this.rejectedlist.push(this.data[i]);
      }
    }

   
   
  }








  selectedproduct:any;
  combinegeneric=[];
  productsview:boolean=false;
  productdetails(drugdetails){
    this.productsview=true;
   
    this.drugqaservice.getDrugqaValues(drugdetails).subscribe(data => {
      this.selectedproduct={
        productdrugid:data.id,
        brandname:data.brandname,
        genericid:data.genericid,
        uniformproductcode:data.uniformproductcode,
        genericcombinationid:data.genericcombinationid,
        genericnamedosage:data.genericnamedosage,
        generic_name:data.generic_name,
        manfacname:drugdetails[9],
        schedulename:drugdetails[12],
        GenericCombination:data.GenericCombination,
        GenericCode:data.GenericCode,
        mrp:data.mrp,
        uom:data.uom,
        therapeuticid:data.therapeuticid,
        subtherapeuticid:data.subtherapeuticid,
        hsnid:data.hsnid,
        hsndesc:drugdetails[11],
        scccode:data.scccode,
        vat:data.vat,
        cgst:data.cgst,
        utgst:data.utgst,
        igst:data.igst,
        sgst:data.sgst,
        formulation:drugdetails[7],
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
        coldstorage:data.coldstorage,
        qaproductdrugid:data.qaproductdrugid,
        qaStatus:data.qaStatus
      };
    },error => {
      console.log('Error occured in Drug getdrugEditvalues');
    });

}




isapproved(proid:any){
 
 this.qaStatus = 1;
  this.drugqaservice.appstatus(proid,this.qaStatus).subscribe(data =>{this.status =data
    if(this.status){
      console.log("succeess")
    }
    });
    this.ngOnInit();
  }



isrejected(proid){

 this.qaStatus = 2;
  this.drugqaservice.appstatus(proid,this.qaStatus).subscribe(data =>{this.rejstatus =data
    if(this.rejstatus){
      console.log("succeess")
    }
     });
     this.ngOnInit();
}






openConfirmsSwal(proid) {
  swal({
    title: 'Do you want Reject this Product?',
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes'
  }).then(() => {

    this.isrejected(proid);

    // this.router.navigate(['/userlogin/login']);
 
  }).catch(swal.noop);
}


opensaveSwal(proid:any) {
  swal({
    title: 'Do you want Approve this Product?',
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes'
  }).then(() => {
    this.isapproved(proid);



  }).catch(swal.noop);
}

}