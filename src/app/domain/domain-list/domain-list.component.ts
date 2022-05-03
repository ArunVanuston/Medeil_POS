
import {Domain} from '../domain';
import {DomainService} from '../domain.service';
import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-domain-list',
  templateUrl: './domain-list.component.html'   
})
export class DomainListComponent implements OnInit {
  domainlist=[];
  public data: any; 
  public rowsOnPage: number =10;
  public filterQuery: string = ""; 
  public sortBy: string = "";
  public sortOrder: string = "desc";
constructor(private domainService: DomainService,private router: Router) {
  }
  ngOnInit(): void {
    this.domainService.getdomain().then(data => this.data = data);
  }
 

} 
