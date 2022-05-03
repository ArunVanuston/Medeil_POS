import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms'; 
@Component({
  selector: 'app-damagestock',
  templateUrl: './damagestock.component.html',
  styleUrls: ['./damagestock.component.css']
})
export class DamagestockComponent implements OnInit {
  damagedstockForm: FormGroup;
  constructor() { }

  ngOnInit() {
  }

}
