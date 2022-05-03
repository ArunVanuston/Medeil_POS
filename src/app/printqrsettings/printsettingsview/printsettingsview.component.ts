import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AppComponent } from 'app/app.component';
import { PrintqrSettingService } from '../printqrsettings.service'; 
import { TranslateService } from 'ng2-translate'; 

@Component({
  selector: 'app-printsettingsview',
  templateUrl: './printsettingsview.component.html',
  styleUrls: ['./printsettingsview.component.css']
})
export class PrintsettingsviewComponent implements OnInit {
  printdata=[];
  parentMessage="sales";
  gifFail: boolean=true;
  constructor(public translate: TranslateService,private printservice:PrintqrSettingService,private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.translate.use(localStorage.getItem('language'));
    this.printservice.viewprintsettings(AppComponent.companyID,AppComponent.branchID,AppComponent.locRefName1,AppComponent.locrefID1).subscribe(data => {
      this.bindprintdata(data);
      //this.printdata=data;
    },err => { console.log(err)});

    setTimeout(() => {
        this.gifFail=false;
    },3100);
  }

  private readonly imageType: any = 'data:image/*;base64,';
  bindprintdata(data){
    this.printdata=[];
    for(let i=0;i<data.length;i++){
      this.printdata.push({ printid: data[i][0], formid: data[i][1], formname: data[i][2], printtype: data[i][4], printmodel: data[i][6],
        imageurl:this.sanitizer.bypassSecurityTrustUrl(this.imageType + data[i][7])});
    }
  }

  imagefullview:boolean=false;
  fullimageurl:any;
  viewfullimage(imgurl){
    this.imagefullview=true;
    this.fullimageurl=imgurl;
  }

}
