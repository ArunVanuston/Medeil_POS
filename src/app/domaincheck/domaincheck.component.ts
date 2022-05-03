import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { environment } from 'environments/environment.prod';

@Component({
  selector: 'app-domaincheck',
  templateUrl: './domaincheck.component.html',
  styleUrls: ['./domaincheck.component.css']
})
export class DomaincheckComponent implements OnInit {
  domaincheckForm:FormGroup;
  baseResUrl2=environment.medauthbackend.baseResUrl2;
  constructor(private fb: FormBuilder,private router: Router,private http: Http) { }

  ngOnInit() {
    this.domaincheckForm = this.fb.group({
      username: ['', [Validators.required]],
      });
  }
  message: any;
  domainvalid(){
    let dname=this.domaincheckForm.get('username').value;
    this.http.get(this.baseResUrl2 + '/check-existing-domain/' + dname).map(res => res).subscribe(data => {
    let datamsg = JSON.stringify(data);this.message=datamsg.split(":")[1].substring(1,5);
    if(this.message=='true'){
      sessionStorage.setItem('loginstatus', '1');
      this.router.navigate(['/userlogin/login']);
    }else{
      sessionStorage.setItem('loginstatus', '0');
      this.router.navigate(['/domaincheck/errorpage']);
    }
    });
  }

    
  }


