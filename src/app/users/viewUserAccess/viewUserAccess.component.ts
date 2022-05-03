import { UsersService } from '../users.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-viewUserAccess',
  templateUrl: './viewUserAccess.component.html',
})
export class userViewAccess implements OnInit {
  public data: any;
  public rowsOnPage: number = 10;
  public filterQuery: string = "";
  public sortBy: string = "";
  public sortOrder: string = "desc";
  constructor(private service: UsersService, private route: ActivatedRoute, private rout: Router) { }
  val: any;
  label: string = '';
  ngOnInit() {
    this.val = this.route.snapshot.paramMap.get('value');
    if (this.val == 'branch') {
      this.service.viewAccessUser(this.val).subscribe(data => this.data = data, err => {
        console.log("Error occured on viewAccessUser()");
      });
      this.label = 'Branch Access';
    }

    if (this.val == 'shop') {
      this.service.viewAccessUser(this.val).subscribe(data => this.data = data, err => {
        console.log("Error occured on viewAccessUser()");
      });
      this.label = 'Shop Access';
    }

    if (this.val == 'ware') {
      this.service.viewAccessUser(this.val).subscribe(data => this.data = data, err => {
        console.log("Error occured on viewAccessUser()");
      });
      this.label = 'Warehouse Access';
    }

    if (this.val == 'hospital') {
      this.service.viewAccessUser(this.val).subscribe(data => this.data = data, err => {
        console.log("Error occured on viewAccessUser()");
      });
      this.label = 'Hospital Access';
    }
  }

  addAccess() {
    this.rout.navigate(['User/UserAccess']);
  }

}
