import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { DistributorViewService } from './distributorView.service'
import { Router, ActivatedRoute } from '@angular/router';
import 'jquery';
import { AppComponent } from '../../../app.component';
import swal from 'sweetalert2';
import { NotificationsComponent } from 'app/notifications/notifications.component';
import * as html2canvas from 'assets/html2canvas';
import { TranslateService } from 'ng2-translate'; 
@Component({
  selector: 'app-patientview',
  templateUrl: './distributorView.component.html',
  providers: [DistributorViewService, NotificationsComponent]
})
export class DistributorViewComponent implements OnInit {
  @ViewChild('screen') screen;
  
  parentMessage = "sales";
  public data: any;
  public rowsOnPage: number = 10;
  public filterQuery: string = "";
  public sortBy: string = "";
  public sortOrder: string = "desc";
  testArray2 = [];
  statusCode: number;
  selobj;
  testArray = [{ id: 1, name: 'Test 1' }, { id: 2, name: 'Test 2' }, { id: 3, name: 'Test 3' }];
  gifFail: boolean = true;
  constructor(public translate: TranslateService,private userService: DistributorViewService, private notificationsComponent: NotificationsComponent) {translate.setDefaultLang('en');
  }
  ngOnInit() {
    this.translate.use(localStorage.getItem('language'));
    this.selobj = { userid: AppComponent.userID, locrefid: AppComponent.locrefID1, locname: AppComponent.locRefName1, countryrefid: AppComponent.countryID, companyid: AppComponent.companyID, branchrefid: AppComponent.branchID };
    this.viewAll();
  }
  deleteArticle(articleId: number) {
    var frmdata = { frmint1: '', frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname };
    this.userService.patientDelete(JSON.stringify(frmdata)).subscribe(data => console.log(JSON.stringify(data)),
      errorCode => console.log(errorCode));
  }
  viewAll() {
    var frmdata = { frmint1: '', frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname };
    setTimeout(() => {
      this.userService.patientView(JSON.stringify(frmdata)).subscribe(data => this.data = data,
        errorCode => console.log(errorCode));
      this.gifFail = false;
    }, 1000);
  }
  deleteDistributor(id) {
    this.openSuccessSwal(id)
  }
  openSuccessSwal(id) {
    swal({
      title: 'Are you sure?',
      text: "It will permanently deleted !",
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      showConfirmButton: true
    }).then(() => {
      var frmdata = { frmint1: id, frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname };
      this.userService.deleteDistributor(JSON.stringify(frmdata)).subscribe(data => {
        if (data == 1) {
          this.notificationsComponent.addToast({ title: 'SUCESS MESSAGE', msg: 'DATA DELETED SUCESSFULLY.', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'success' });
          setTimeout(() => {
            this.ngOnInit()
          }, 1000);
        }
        else {
          this.ngOnInit();
        }
      });
    }).catch(swal.noop);
  }
  capturedImage:any="assets/image";
  downloadImage1() {
    html2canvas(this.screen.nativeElement).then(canvas => {
      /// document.body.appendChild(canvas);
      // this.downloadLink.nativeElement.href = canvas.toDataURL('image/png');
      // this.downloadLink.nativeElement.download = 'marble-diagram.png';
      // this.downloadLink.nativeElement.click();
      
      this.capturedImage = canvas.toDataURL();
      var img = document.createElement('img'); 
      img.src =this.capturedImage; 
      document.getElementById('printarea1').innerHTML = "";
      document.getElementById('printarea1').appendChild(img); 
      //down.innerHTML = "Image Element Added.";  
      var w = window.open();
      w.document.open();
      w.document.write(document.getElementById('printarea1').innerHTML);
      w.document.close();
      w.print();
      // this will contain something like (note the ellipses for brevity), console.log cuts it off 
      // "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAa0AAAB3CAYAAACwhB/KAAAXr0lEQVR4Xu2dCdiNZf7HP/ZQkpQtaUxDjYYoTSYlURMhGlmKa..."
      // canvas.toBlob(function(blob){
      //   // To download directly on browser default 'downloads' location
      //   let link = document.createElement("a");
      //   link.download = "image.png";
      //   link.href = URL.createObjectURL(blob);
      //   link.click();
      //   // To save manually somewhere in file explorer
       
      // },'image/png');
    }); 
  
  }
}
