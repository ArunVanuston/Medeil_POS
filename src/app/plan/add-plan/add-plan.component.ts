import { Component, OnInit } from '@angular/core';
import { EditionService } from 'app/edition/edition.service';
import { FormControl, FormGroup } from '@angular/forms';
import { NotificationsComponent } from 'app/notifications/notifications.component';
import { planService } from './add-plan.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { isInteger } from '@ng-bootstrap/ng-bootstrap/util/util';

@Component({
  selector: 'app-add-plan',
  templateUrl: './add-plan.component.html',
  styleUrls: ['./add-plan.component.css'],
  providers: [NotificationsComponent, EditionService, planService]
})
export class AddPlanComponent implements OnInit {
  planForm: FormGroup;
  country = [];
  prodcutlist = [];
  domainlist = [];
  subdomainlist = [];
  editionlist = [];
  editionDetails = {};
  // plancreate = [];
  constructor(private editionService: EditionService, private planService: planService,
    private notificationsComponent: NotificationsComponent, private modalService: NgbModal) { }
  ngOnInit() {
    const countryid = new FormControl('opt1');
    const productid = new FormControl('opt1');
    const domainrefid = new FormControl('opt1');
    const subdomainrefid = new FormControl('opt1');
    const editionrefid = new FormControl('opt1');
    const planname = new FormControl('opt1');
    const period = new FormControl('opt1');
    const interval = new FormControl('');
    const description = new FormControl('');
    const newplan = new FormControl('');
    const plantype = new FormControl(2);
    const amount = new FormControl('');
    const currency = new FormControl('');
    const ranking = new FormControl(5);
    this.planForm = new FormGroup({
      countryid: countryid,
      domainrefid: domainrefid,
      productid: productid,
      subdomainrefid: subdomainrefid,
      editionrefid: editionrefid,
      period: period,
      interval: interval,
      planname: planname,
      newplan: newplan,
      plantype:plantype,
      amount:amount,
      currency:currency,
      description: description,
      ranking:ranking
    })
    this.newplanshow = false;
    this.editionService.getcountry().subscribe(data => {
      this.country = data,
        err => {
          console.log('Error occured On getcountry()');
        }
    });
  }

  //get plan details lists
  //new edition select Popup
  newplanshow: boolean = false;
  planselect(selvalue, popupname) {
    if (selvalue == "newplanname") {
      this.openmain(popupname);
    }
    else {
      this.newplanshow = false;
    }
  }

  //save new Edition
  SaveNewPlan(c) {
    let newedition = this.planForm.get('newplan').value;
    this.planForm.get('planname').setValue(newedition);
    this.newplanshow = true;
    c('Close click')
  }

  getProduct() {
    this.editionService.getProduct(this.planForm.get('countryid').value).subscribe(data => this.prodcutlist = data,
      err => {
        console.log('Error occured On getProduct()');
      });

    this.editionService.getCurrency(this.planForm.get('countryid').value).subscribe(data => {
      this.planForm.get('currency').setValue(data[0]);
      },err => {
          console.log('Error occured On getsubdomain()');
      });
  }

  getDomains() {
    this.editionService.getDomain(this.planForm.get('countryid').value, this.planForm.get('productid').value).subscribe(data => this.domainlist = data,
      err => {
        console.log('Error occured On getdomain()');
      });
  }

  // getedition() {
  //   this.planService.geteditionlist(this.planForm.get('countryid').value, this.planForm.get('productid').value, this.planForm.get('domainrefid').value, this.planForm.get('subdomainrefid').value).subscribe(data => this.editionlist = data,
  //     err => {
  //       console.log('Error occured On getedition()');
  //     });
  // }
  saveflag: number=0;
  geteditiontype(event) {
    if (event == 0) {
      this.saveflag = 0;
      this.planService.geteditionlist(this.planForm.get('countryid').value, this.planForm.get('productid').value, this.planForm.get('domainrefid').value, this.planForm.get('subdomainrefid').value, event).subscribe(data => this.editionlist = data,
        err => {
          console.log('Error occured On getedition()');
        });
    } else {
      this.saveflag = 1;
      this.planService.geteditionlist(this.planForm.get('countryid').value, this.planForm.get('productid').value, this.planForm.get('domainrefid').value, this.planForm.get('subdomainrefid').value, event).subscribe(data => this.editionlist = data,
        err => {
          console.log('Error occured On getedition()');
        });
    }
  }
  //editionamount;
 // editioncurrency;
 // editiondescription;
  // geteditionDetails() {
  //   this.planService.geteditionDetails(this.planForm.get('editionrefid').value).subscribe(data => 
  //     {this.editionamount = data.amount;
  //       this.editioncurrency = data.currency;
  //       this.editiondescription = data.description},
  //     err => {
  //       console.log('Error occured On geteditionDetails()');
  //     });
  // }
  planlist;
  getplan(){
    this.planService.getplan(this.planForm.get('countryid').value,this.planForm.get('editionrefid').value,this.planForm.get('plantype').value).subscribe(data => this.planlist = data,
      err => {
        console.log('Error occured On getplan()');
      });
  }

  getSubdomain() {
    this.editionService.getSubdomainid(this.planForm.get('countryid').value, this.planForm.get('productid').value, this.planForm.get('domainrefid').value).subscribe(data => {
      this.subdomainlist = data;
      if (data == '' || data == null) {
        this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Sub-Domain Not Availabe For the Given Domain', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      }
    },
      err => {
        console.log('Error occured On getsubdomain()');
      });
  }

 
  getcurrency(value:any){
   // let countryid=this.planForm.get('countryid').value;
   if(value=='weekly'){
    this.planForm.get('plantype').setValue(0);
    }else if(value=='monthly'){
      this.planForm.get('plantype').setValue(1);
    }else{
      this.planForm.get('plantype').setValue(2);
    }
  }

  planvalidate(){
    let country=this.planForm.get('countryid').value;
    let product=this.planForm.get('productid').value;
    let domain=this.planForm.get('domainrefid').value;
    let subdomain=this.planForm.get('subdomainrefid').value;
    let edition=this.planForm.get('editionrefid').value;
    let plan=this.planForm.get('planname').value;
    let period=this.planForm.get('period').value;
    let interval=this.planForm.get('interval').value;
    let description=this.planForm.get('description').value;
    if(country=='opt1'||country==null||country==''||country==undefined){
      this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'Select Country!..', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
      return false;
    }else if(product=='opt1'||product==null||product==''||product==undefined){
      this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'Select Product Name!..', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
      return false;
    }else if(domain=='opt1'||domain==null||domain==''||domain==undefined){
      this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'Select Domain Name!..', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
      return false;
    }else if(subdomain=='opt1'||subdomain==null||subdomain==''||subdomain==undefined){
      this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'Select Sub Domain Name!..', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
      return false;
    }else if(edition=='opt1'||edition==null||edition==''||edition==undefined){
      this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'Select Edition Name!..', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
      return false;
    }else if(plan=='opt1'||plan==null||plan==''||plan==undefined){
      this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'Select or Enter Plan Name!..', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
      return false;
    }else if(period=='opt1'||period==null||period==''||period==undefined){
      this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'Select Period!..', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
      return false;
    }else if(interval<=0||interval==null||interval==''||interval==undefined){
      this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'Enter Minimum 1', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
      return false;
    }else if(description==null||description==''||description==undefined){
      this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'Enter Description!..', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
      return false;
    }
    return true;
  }

  onSubmit() {
    let valflag=this.planvalidate();
    if(valflag){
      let subindx= this.editionlist.findIndex(p => p[0]==this.planForm.get('editionrefid').value);
      //this.planForm.get('ranking').setValue(this.editionlist[subindx][2]);
      if (this.saveflag == 0) {this.planForm.get('amount').setValue(0)};
      var plancreate = {
        periodname: this.planForm.get('period').value,
        intervalid: this.planForm.get('interval').value,
        //item: this.editionDetails,
        planname: this.planForm.get('planname').value,
        countryid: this.planForm.get('countryid').value,
        productid: this.planForm.get('productid').value,
        domainrefid: this.planForm.get('domainrefid').value,
        subdomainrefid: this.planForm.get('subdomainrefid').value,
        editiontype: this.saveflag,
        editionid: this.planForm.get('editionrefid').value,
        plantype: this.planForm.get('plantype').value,
        ranking: this.editionlist[subindx][2],
        currency:this.planForm.get('currency').value,
        amount: this.planForm.get('amount').value
      }
  
      // let subindx= this.prodcutlist.findIndex(p => p[0]==this.planForm.get('productid').value);
      // let producname=this.prodcutlist[subindx][1];
  
      var razorplan = {
          "period": this.planForm.get('period').value,
          "interval": this.planForm.get('interval').value,
          "item": {
            "name": this.planForm.get('planname').value,
            "amount": this.planForm.get('amount').value+'00',
            "currency":this.planForm.get('currency').value,
            "description": this.planForm.get('description').value
          },
          "notes":{
            "notes_key_1": this.planForm.get('countryid').value,
            "notes_key_2": this.planForm.get('editionrefid').value     
          }
      }
      
      if (this.saveflag == 0) {
  
        this.planService.saveplan(JSON.stringify(plancreate)).subscribe(data => {
          if (data) {
            this.notificationsComponent.addToast({ title: 'Sucess', msg: 'Plan Saved Sucessfully..', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
            this.ngOnInit();
          }
        },
          err => {
            if (err.status == 400) {
              this.notificationsComponent.addToast({ title: 'Warning', msg: 'Plan Name Already Exists!..', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
            }
          })
      } else if (this.saveflag == 1) {
        console.log(JSON.stringify(razorplan));
        this.planService.saveplan(JSON.stringify(plancreate)).subscribe(data => {
          if (data) {
            this.planService.saverazorplan(JSON.stringify(razorplan)).subscribe(data => {
              if (data) {
                this.notificationsComponent.addToast({ title: 'Sucess', msg: 'Plan Saved Sucessfully..', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
                this.ngOnInit();
              }
            },
              err => {
                if (err.status == 400) {
                  this.notificationsComponent.addToast({ title: 'Warning', msg: 'Plan Name Already Exists!..', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
                }
              })
            //this.notificationsComponent.addToast({ title: 'Sucess', msg: 'Plan Saved Sucessfully..', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
            this.ngOnInit();
          }
        },
          err => {
            if (err.status == 400) {
              this.notificationsComponent.addToast({ title: 'Warning', msg: 'Plan Name Already Exists!..', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
            }
          })
      }
    }
  }


  //popup properties
  closeResult: string;
  openmain(popupname) {
    this.modalService.open(popupname).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


// translate() {
//   var trans=document.getElementById("translate").innerHTML;
//   alert(trans);console.log(trans);
//   var apiKey = 'AIzaSyAwViOjOCe-RrxXh7wUk2hOwvv--z7DkNs';
//   var options = {
//     concurrentLimit: 20,
//     // requestOptions: {
//     //   proxy: 'http://localhost:4200/',
//     //   //ca: fs.readFileSync('/usr/share/ca-certificates/company/company.crt'),
//     // },
//   };
//   var googleTranslate = require('google-translate')(apiKey, options);
  
//   googleTranslate.translate('My name is Brandon', 'es', function(err, translation) {
//     console.log(translation.translatedText);
//     console.log(err);
//     // =>  Mi nombre es Brandon
//   });


//   // const googleObj: GoogleObj = {
//   // q: ‘hello’,
//   // target: ‘es’
//   // };
//   // //this.translateBtn.disabled = true;
//   // this.google.translate(googleObj).subscribe(
//   // (res: any) => {
//   // //this.translateBtn.disabled = false;
//   // console.log(res.data.translations[0].translatedText)
//   // },
//   // err => {console.log(err);});
//   //  AIzaSyAwViOjOCe-RrxXh7wUk2hOwvv--z7DkNs
// }

// //Trnaslate
// translate1(){
//     /**
//  * TODO(developer): Uncomment the following line before running the sample.
//  */
// // const projectId = 'YOUR_PROJECT_ID';

// // Imports the Google Cloud client library
// var projectId={
//   "type": "service_account",
//   "project_id": "translate-302312",
//   "private_key_id": "72d6421b09ad59bf8fd2a71a1335ea89a87649c2",
//   "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCkgJTn3wTOxh1w\nIFYJ5zwPpVxjWaRED/JUiUFczuqwycAw6s67R4SDKgbazjWSi7nRooDm5thfLU3S\nFROqrUmqxjwZ4+vzNeqVSwBfyFhq8aK56h64DYQKlzW7x6kd7nQnl2ojMTBDfJvf\ngidcUHyWJQp2O0HsQCHbNb088gBa/aAooxiCEodnQkPW1cWum+nnjzwkqxumwUhi\naX7peH4sxSuocAlGTLOcqndrrVaiJbDm9xILy/5WKVjIwULPruFO0uNJWNmqWDpC\ns9NALcEiGIdcWqrlnbwAbpg9fVABbCs+Ive4Uho5rzkMWu0bA5hs+vTtBWWgbTb3\nzR1YyDcNAgMBAAECggEABUZSiqkkm5JlL8BNr0rGQCnZJPNjIxk6zTn1yf7K2N6D\nO95Pli2PIsXhII4jpXO3AoaPfmKRC2OQaafU21sWmrP5XzV8eO415nxtl49SQc2b\n3j0S/UEBBqDoxMERxmdWu01C2+bayWiFtqc9prC1qfp9PnjHHpxDfvwBucz4X3J8\ny7y8BuEEC+kVPxjcx0bNBZY7CTfBrEk3fbzWCOG5Q77azte/en8DvaoHTxtrKQb0\nn4TjCM5tou8sWRqwYXinr7emyByXuXn2UQLzrEnUILuqv4OUSVB6spgS7bY58sTM\nEZRuXkrq/s06yVv+HPKk0XZNIc9toFJ7diSwhto8wQKBgQDZpB4bfgMcUQUlB1lm\n7umtwEqLALzf/f1N4zZxd2jWqB6o5soQKRpknZe9a5KCdll2OVuEhyESDwMk/tQV\nhOwcOtP55AzswENTX5rfR/DADVuaFPYqwuE5MHdQYwtAALYambGCPOR6AL6clYU/\nOJ1YSJiyfmxK2iRqhVeTBCVVTQKBgQDBftx3I6sBRctw1gfaESz8UmdDsv7yObo/\n68ZIVJQ9i+Jj5BY77J7f14oTSjyPtqGFsYkCSsaqNLdeye6ezQ5NCZmDy0cC90wF\nelke8ZviPgKUyxf6yyTe8SEniRb9o3ytCXRWlUAMqIrmHYuatF60rD33F2qgeYsQ\n5WaQ35qIwQKBgDRp4NJQI6GjJXEIdxBiAybUA1+8esAa4/DpAkiLMFVZwaB9jDYe\nH/wRM+TrTipbJCpjn9Wn0WAO+3viXuMb0tztkfVBZZdyqgQfJyYUpjcqQGA4Ihyk\nOCdUs7dJUwFD6pc3YldyILf9C+qb264hDUugmB2McroIFPMOT8vZGMCVAoGAV0ca\nuJ6dDsjll/LivckLipC8xXuipa3GRfjailukNhK3vijuon77tqnpPQQ6RvSw7LYE\nv8Ts0W9P2vCosnZ54ePXm+wADuVvI/Vo551BnA4uaeEl4tjou6r2MngSp7uri/18\nvWU667rGVD+1bcW4BjS/CopEbTgFs0xWNDi34sECgYAv0yO/K4+bh5OAFf0c9je6\ndTcOEjXc4ztysxDTN4xdyBJ6leOM16ojJZukcKIfc5etjXVng2G7M6esuZd14jaf\ntl3WA7w3QY6hDdJYjPL9G76EkysOLuK4EQHOChlT2mIVqOJA6jPRiH65X7UW7g2z\n1gczEgoP2H1b0rx4B9DodQ==\n-----END PRIVATE KEY-----\n",
//   "client_email": "quickstart@translate-302312.iam.gserviceaccount.com",
//   "client_id": "105157942803060750975",
//   "auth_uri": "https://accounts.google.com/o/oauth2/auth",
//   "token_uri": "https://oauth2.googleapis.com/token",
//   "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
//   "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/quickstart%40translate-302312.iam.gserviceaccount.com"
// }

// // const {Translate} = require('@google-cloud/translate').v2;

// // // Instantiates a client
// // const translate = new Translate({projectId});

// // async function quickStart() {
// //   // The text to translate
// //   const text = 'Hello, world!';
// //   alert("TXT: "+text)
// //   // The target language
// //   const target = 'ru';

// //   // Translates some text into Russian
// //   const [translation] = await translate.translate(text, target);
// //   console.log(`Text: ${text}`);
// //   console.log(`Translation: ${translation}`);
// // }

// //quickStart();
// }

}
