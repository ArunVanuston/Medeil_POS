import { UsersService } from '../users.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-viewUserModules',
  templateUrl: './viewUserModules.component.html',
})
export class userViewmodule implements OnInit {
  public data: any;
  public rowsOnPage: number = 10;
  public filterQuery: string = "";
  public sortBy: string = "";
  public sortOrder: string = "desc";
  constructor(private service: UsersService, private rout: Router) { }

  ngOnInit() {
    this.service.viewModuleUser().subscribe(data => this.data = data, err => {
      console.log("Error occured on viewModuleUser()");
    });
  }
  adduserModule() {
    this.rout.navigate(['User/AssignUser']);
  }
  deleteRow(id: any) {
    this.service.deleteRow(id).subscribe(data => { },
      err => {
        console.log('Console Error On deleteRow()');
      });
    // this.rout.navigate(['User/ViewUser']);
    this.ngOnInit();
  }
}
