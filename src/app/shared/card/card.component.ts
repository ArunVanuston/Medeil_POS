import {Component, OnInit, Input, ViewEncapsulation} from '@angular/core';
import {cardToggle, cardClose} from './card-animation';
import { UserloginService } from 'app/userlogin/userlogin.service';
import { Router } from '@angular/router';
import { AppComponent } from 'app/app.component';
import { adminService } from 'app/layouts/admin/admin-layout.services';
import swal from 'sweetalert2';
import { LoginComponent } from 'app/userlogin/login/login.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  providers:[UserloginService,adminService],
  animations: [cardToggle, cardClose],
  encapsulation: ViewEncapsulation.None
})
export class CardComponent implements OnInit {
  @Input() headerContent: string;
  @Input() title: string;
  @Input() blockClass: string;
  @Input() cardClass: string;
  @Input() classHeader: boolean = false;
  cardToggle: string = 'expanded';
  cardClose: string = 'open';
  constructor(private loginService: UserloginService, private router: Router,private adservice: adminService) { }

  ngOnInit() {
    this.gettoken();
  }

  toggleCard() {
    this.cardToggle = this.cardToggle === 'collapsed' ? 'expanded' : 'collapsed';
  }

  closeCard() {
    this.cardClose = this.cardClose === 'closed' ? 'open' : 'closed';
  }

  gettoken(){
    this.adservice.getShopName(AppComponent.locrefID1).subscribe(data => { },
      err => {
        if(err.message=="USER_DETECTED"){
        this.openNewLoginSwal();
        }else if (err.error == "invalid_token") {
            sessionStorage.removeItem("acctoken");
            sessionStorage.removeItem("indvuserid");
            sessionStorage.removeItem("ranking");
            let params = new URLSearchParams(); 
            params.append('grant_type', 'refresh_token');
            params.append('refresh_token',sessionStorage.getItem("reftoken"));
            this.loginService.userauthentication(params.toString()).subscribe(data => {
              sessionStorage.setItem("acctoken",data.access_token)
              sessionStorage.setItem("reftoken",data.refresh_token);
              sessionStorage.setItem("indvuserid",data.general);
              sessionStorage.setItem("ranking",data.editionranking);
            },
            err => {
              if(err.error == "invalid_token"){
                  this.openConfirmsSwal();
              }
              console.log("invalid_token")
            })
            //this.login.onSubmit();
        }
      });
  }

 
  openConfirmsSwal() {
    swal({
      title: 'SESSION TIMEOUT !....',
      type: 'warning',
      showCancelButton: false,
      confirmButtonColor: '#002e86',
      cancelButtonColor: '#dd333382',
      confirmButtonText: 'Back to Login'
    }).then(() => {
      this.router.navigate(['/userlogin/login']);
    }).catch(swal.noop);
  }

  openNewLoginSwal() {
    swal({
      title: 'NEW LOGIN DETECTED!...',
      type: 'warning',
      showCancelButton: false,
      confirmButtonColor: '#002e86',
      cancelButtonColor: '#dd333382',
      confirmButtonText: 'Exit'
    }).then(() => {
      this.router.navigate(['/userlogin/login']);
    }).catch(swal.noop);
  }

}