import { Component, OnInit } from '@angular/core';
import { fadeInOutTranslate } from 'app/shared/elements/animation';

@Component({
  selector: 'app-profileinfo',
  templateUrl: './profileinfo.component.html',
  animations: [fadeInOutTranslate]
})
export class ProfileinfoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
