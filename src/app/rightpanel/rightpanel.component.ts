import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Http } from '@angular/http';

@Component({
  selector: 'app-rightpanel',
  templateUrl: './rightpanel.component.html',
})
export class RightpanelComponent implements OnInit {
  helpicon:boolean=false;
  guideicon:boolean=false;
  activityicon:boolean=false;
  videourl:any="https://www.youtube.com/embed/TmJFCthK7WI";
  plists:any;
  
  @Input() rightpanelData: string;
  // @Output() rightpanelEvent = new EventEmitter<string>();
  //this.rightpanelEvent.emit(this.rightpanelData); 
  //http://medeilpos.medeil.io:8082/medeilpos/assets/data/rightpanel.json 
  constructor(private http:Http,private domSanitizer: DomSanitizer) { }

  ngOnInit() { }

  loadstatus:boolean=false;
  helpselect(){
    this.helpicon = !this.helpicon;
    if(this.helpicon){
      this.loadstatus=true;
      this.http.get("/assets/data/rightpanel.json").map(res => res.json()).subscribe(data => {
        this.loadstatus=false;
        this.videourl = this.domSanitizer.bypassSecurityTrustResourceUrl(data[0][this.rightpanelData].videourl);
      },errorCode => console.log(errorCode));
    }
    
  }

  guideselect(){
    this.guideicon = !this.guideicon;
    if(this.guideicon){
      this.loadstatus=true;
      this.http.get("/assets/data/rightpanel.json").map(res => res.json()).subscribe(data => {
        this.loadstatus=false;
        this.plists=data[0][this.rightpanelData].helpcontent;
      },errorCode => console.log(errorCode));
    }
    
  }

  activityselect(){
    this.activityicon = !this.activityicon;
  }


}
