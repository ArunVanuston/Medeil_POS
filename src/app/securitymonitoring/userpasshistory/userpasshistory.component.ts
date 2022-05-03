import { Component, OnInit } from '@angular/core';
import { securitymonitoringService } from '../securitymonitoring.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userpasshistory',
  templateUrl: './userpasshistory.component.html',
  styleUrls: ['./userpasshistory.component.css'],
  providers:[securitymonitoringService]
})
export class UserpasshistoryComponent implements OnInit {
  public data = [];
  public rowsOnPage: number = 10;
  public filterQuery: string = "";
  public sortBy: string = "";
  public sortOrder: string = "desc";
  gifFail: boolean=true;
  constructor(private formbuider:FormBuilder,private seservice:securitymonitoringService,private router:Router) { }

  ngOnInit() {

    this.seservice.getupasshistory().subscribe(data =>{this.data =data},
        err => {
        console.log('Error in User Login history Service');
        });
  }

}
