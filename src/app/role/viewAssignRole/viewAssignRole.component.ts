import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { RoleService } from '../role.service';
declare var $: any;
@Component({
  selector: 'app-viewassignRole',
  templateUrl: './viewassignRole.component.html',
  styleUrls: ['./viewassignRole.component.css'],
  providers: [NotificationsComponent]
})
export class viewAssignComponent implements OnInit {
  public data: any;
  public rowsOnPage: number = 20;
  public filterQuery: string = "";
  public sortBy: string = "";
  public sortOrder: string = "desc";
  sub: any;
  rID: any;
  constructor(private roleService: RoleService, private route: ActivatedRoute, private router: Router, private notificationsComponent: NotificationsComponent) {

  }

  ngOnInit() {
    this.sub = this.route.queryParams.subscribe(params => {
      this.rID = +params['roleID'];
    });

    this.roleService.getRoles(this.rID).subscribe(data => { this.data = data; },
      err => {
        console.log('Console Error On getRoles()');
      });
  }
  viewRole() {
    this.router.navigate(['Role/ViewRole']);
  }
  deleteRow(id: any) {
      
    var answer = confirm("Delete data?");
    if (answer) {
    this.roleService.deleteRow(id).subscribe(data => { },
      err => {
        console.log('Console Error On getRoles()');
      });
   // this.router.navigate(['Role/ViewRole']);
  
      }
      this.ngOnInit();
  }


}


