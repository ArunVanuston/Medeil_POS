import { Component, OnInit, ViewChild } from '@angular/core';
import {fadeInOutTranslate} from '../../../shared/elements/animation';
import { DomSanitizer } from '@angular/platform-browser';
import { NotificationsComponent } from 'app/notifications/notifications.component'; 
import { TranslateService } from 'ng2-translate'; 


@Component({
  selector: 'app-slsInvSave',
  templateUrl: './slsInvSave.component.html',
  providers: [NotificationsComponent],
  animations: [fadeInOutTranslate],
})

export class slsInvSaveComponent implements OnInit {

  @ViewChild('screen') screen;

  public tabs = [];
  tempbind:any;
  htmlContent:any;
  constructor( public translate: TranslateService,private notificationsComponent: NotificationsComponent,private sanitizer: DomSanitizer){translate.setDefaultLang('en');}
  ngOnInit(){
    this.translate.use(localStorage.getItem('language'));
    this.tabs.push({});
  }

  onAddTabClick() {
    if(this.tabs.length<12){
      this.tabs.push({});
    }else{
      this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'Maximum No of Tabs Created', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
    }
  }

  closetab(tabindex) {
    if(tabindex>0){
      tabindex = false;
      this.tabs.splice(tabindex,1);
    }
  }
      /*To Get HTML Elements and Bind all with inputs */
  // let getemp=document.querySelectorAll(".gethtml")[0].innerHTML;  //[0] is a Index..
  // this.htmlContent= this.sanitizer.bypassSecurityTrustHtml(getemp);  // use sanitizer for bind html correctly (some input will not bind so we use)

}