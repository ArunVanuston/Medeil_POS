import {PatientInService} from './patientIn.service';
import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';

import {NgbDatepicker} from '@ng-bootstrap/ng-bootstrap';

import {Router, ActivatedRoute} from '@angular/router';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


import {NotificationsComponent }  from  '../../../notifications/notifications.component'  ;
import 'jquery';


import {dateFormatPipe }  from  '../../../notifications/notifications.datepipe'  ; 




@Component({
  selector: 'app-patientin',
  templateUrl: './patientIn.component.html',
  providers: [PatientInService ,NotificationsComponent  , dateFormatPipe ]
})
export class PatientInComponent implements OnInit {



  ngOnInit() {
  }


  
}
