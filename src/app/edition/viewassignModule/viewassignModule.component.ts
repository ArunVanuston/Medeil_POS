import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { assignModuleService } from './viewassignModule.services';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationsComponent } from '../../notifications/notifications.component';
declare var $: any;
@Component({
  selector: 'app-viewassignModule',
  templateUrl: './viewassignModule.component.html',
  styleUrls: ['./viewassignModule.component.css'],
  providers: [NotificationsComponent, assignModuleService]
})
export class viewAssignComponent implements OnInit, AfterViewInit {
  public data: any;
  public rowsOnPage: number = 20;
  public filterQuery: string = "";
  public sortBy: string = "";
  public sortOrder: string = "desc";
  sub: any;
  eID: any;
  constructor(private moduleassignService: assignModuleService, private route: ActivatedRoute, private router: Router, private notificationsComponent: NotificationsComponent) {

  }
 
  ngOnInit() {
    this.sub = this.route.queryParams.subscribe(params => {
      this.eID = +params['editionId'];
    });
    this.moduleassignService.getModules(this.eID).subscribe(data => { this.data = data; },
      err => {
        console.log('Console Error On getModules()');
      });
  }
  viewEdition() {
    this.router.navigate(['Edition/ViewEdition']);
  }
  ngAfterViewInit() {

  }
}


