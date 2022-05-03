import {Subdomain} from '../subdomain';
import {SubdomainService} from '../subdomain.service';
import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subdomainlist',
  templateUrl: './subdomainlist.component.html'
})
export class SubdomainlistComponent implements OnInit {
  subdomainlist=[];
  public data: any; 
  public rowsOnPage: number =10;
  public filterQuery: string = ""; 
  public sortBy: string = "";
  public sortOrder: string = "desc";
  constructor(private subdomainService: SubdomainService, private router: Router) { }

  ngOnInit(): void {
    this.subdomainService.getSubdomainlist().subscribe(data => this.data = data,
    err=>
    {
      console.log("Error Occured On getSubdomainlist()");
    });
  }
 
}
