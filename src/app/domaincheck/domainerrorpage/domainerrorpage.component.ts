import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-domainerrorpage',
  templateUrl: './domainerrorpage.component.html',
  styleUrls: ['./domainerrorpage.component.css']
})
export class DomainerrorpageComponent implements OnInit {

  constructor() { }

  location:any
  ngOnInit() {
    this.location=window.location.href;
  }

}
