import { Component, OnInit, HostBinding, HostListener } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule, FormBuilder, FormArray } from '@angular/forms';
import { AppComponent } from 'app/app.component';
import { dateFormatPipe } from 'app/notifications/notifications.datepipe';
import { Usertaskservice } from '../usertask.service';
import { NotificationsComponent } from 'app/notifications/notifications.component';
//import { setTimeout } from 'timers';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css'],
  providers: [Usertaskservice, NotificationsComponent]
})
export class TodoListComponent implements OnInit {

  // @HostBinding('class.someClass') someField: boolean =false;

  ToDoList: FormGroup;

  public rowsOnPage: number = 10;
  public sortBy: string = "";
  public sortOrder: string = "desc";
  selobj;
  retrunFlag: boolean;
  addButton: boolean;
  toggle: boolean;


  todoList: any = [];
  public activeElement = "Lorem Ipsum Dolor Sit Amet";
  public index: any;
  alreadySelect: any;
  bgColor: boolean;
  clearAllBtn: boolean = true;
  goToDelete: any = [];
  length1: any;
  deleteAll: any = [];
  startDateandTime: any = [];
  loadToDOList: any = [];
  count: number;
  closeResult: string;





  constructor(private usertaskservice: Usertaskservice, private notificationsComponent:
    NotificationsComponent, private formBuilder: FormBuilder, private modalService: NgbModal) { }



  ngOnInit() {

    // this.todoList = [
    //   {
    //     "list": "Lorem Ipsum Dolor Sit Amet"
    //   },
    //   {
    //     "list": "Hey! How are you, i'm fine...."
    //   },
    // ];

    this.addButton = false;
    this.toggle = false;

    const topicname = new FormControl();
    const description = new FormControl();
    const start_date_time = new FormControl();
    const end_date_time = new FormControl();
    const companyrefid = new FormControl();
    const branchrefid = new FormControl();
    const locname = new FormControl();
    const locrefid = new FormControl();

    this.ToDoList = new FormGroup({

      topicname: topicname,
      description:description,
      start_date_time: start_date_time,
      end_date_time: end_date_time,
      companyrefid: companyrefid,
      branchrefid: branchrefid,
      locname: locname,
      locrefid: locrefid,

      ToDoArray: this.formBuilder.array([
      ])
    });



    this.ToDoList.get('companyrefid').setValue(AppComponent.companyID);
    this.ToDoList.get('branchrefid').setValue(AppComponent.branchID);
    this.ToDoList.get('locname').setValue(AppComponent.locrefID);
    this.ToDoList.get('locrefid').setValue(AppComponent.shopID);

    // this.viewusertask.get('deptid').setValue('opt1');
    // userid: AppComponent.userID
    // countryrefid: AppComponent.countryID,

    this.selobj = {
      companyrefid: AppComponent.companyID, branchrefid: AppComponent.branchID,
      locname: AppComponent.locRefName1, locrefid: AppComponent.locrefID1,

    };

    this.loaddata(true);

    if (this.count == 0) {
      this.clearAllBtn = false;
    }

    // alert("ngOninit todolenght"+ this.todoList.length);
  }//ngOninit end

  addButton1() {
    this.addButton = true;
  }

  onSubmit() {
    let obj = {};
    let obj1 = {};

    let topicname = this.ToDoList.get('topicname').value;
    if (topicname != null || undefined) {
      let start_date_time = this.ToDoList.get('start_date_time').value;
      let end_date_time = this.ToDoList.get('end_date_time').value;

      if (start_date_time && end_date_time != null || undefined) {

        // obj = { topicname: topicname + " " + start_date_time + "to" + end_date_time };
        // this.todoList.push(obj);

        obj = {
          topicname: topicname, description:this.ToDoList.get('description').value, start_date_time: start_date_time, end_date_time: end_date_time,
          companyrefid: AppComponent.companyID, branchrefid: AppComponent.branchID,
          locname: AppComponent.locRefName1, locrefid: AppComponent.locrefID1,
        };


        this.usertaskservice.saveToDoList(obj).subscribe(data => {
          if (this.ToDoList.get('topicname').value == null) this.addButton = false;
          this.loaddata(data);

        });


        if (this.todoList.length > 0)
          this.clearAllBtn = true;
      }
      else {
        // obj = { list: topicname }
        // this.todoList.push(obj);
        obj1 = {
          topicname: topicname,
          description:this.ToDoList.get('description').value,
          // start_date_time: "", end_date_time: "",
          companyrefid: AppComponent.companyID, branchrefid: AppComponent.branchID,
          locname: AppComponent.locRefName1, locrefid: AppComponent.locrefID1,
        };
        this.usertaskservice.saveToDoList(obj1).subscribe(data => {
          if (this.ToDoList.get('topicname').value == null) this.addButton = false;
          this.loaddata(data);
        });
        if (this.todoList.length > 0)
          this.clearAllBtn = true;
      }
    }

    this.ToDoList.reset();
  }

  loaddata(data: any) {
    this.count = 0;
    if (data)
      this.usertaskservice.getData(this.selobj).subscribe(data => {
        if (data) {
          this.todoList = [];
          for (let i = 0; i < data.length; i++) {
            this.todoList.push(data[i]);
            this.count++;
          }

          this.loadToDOList.push(this.todoList)
          if (this.count > 0) this.clearAllBtn = true; this.bgColor = false;

          // goToDelete.push(this.loadToDOList);
          this.length1 = this.count;

        }

      })


  }


  maxlength() {
    let topicname = this.ToDoList.get('topicname').value;
    this.addButton = true;
    if (topicname.length < 2)
      this.addButton = false;
    if (topicname.length > 124 && topicname.length < 126) {
      if (topicname.length == 125)
        this.notificationsComponent.addToast({ title: 'Error', msg: 'You can type only 125 caharacters....', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });

    }
  }




  maxlengthTxtArea() {
    let description = this.ToDoList.get('description').value;
    if (description.length > 1999 && description.length < 2001) {
      if (description.length == 2000)
        this.notificationsComponent.addToast({ title: 'Error', msg: 'You can type only 2000 caharacters....', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });

    }
  }

  // basicValidation(): boolean {
  //   if (this.ToDoList.get('deptid').value ==  "opt1" ) {
  //     this.notificationsComponent.addToast({ title: 'Error', msg: 'please enter Department....', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
  //     return false;
  //   }
  //   return true;
  // }
  // getTableValues() {
  //   alert("data "+this.data);
  //   this.retrunFlag = this.basicValidation();
  // } getTableValues

  isActive(data: any) {
    data.active = !data.active;
  }

  removeItem(index: any, data1: any) {
    let delObjOne: any = [];
    // alert(data1[0]);
    // alert(index);
    delObjOne = {
      "topicname": data1[0],
      "companyrefid": AppComponent.companyID,
      "branchrefid": AppComponent.branchID,
      "locname": AppComponent.locRefName1,
      "locrefid": AppComponent.locrefID1,
    };

    this.usertaskservice.deleteOne(delObjOne).subscribe(data => {
      if (data) this.todoList.splice(index, 1);
    });

    //  alert("count "+this.count--);

    this.count--;
    if (this.count == 0)
      this.clearAllBtn = false;

    if (this.ToDoList.get('topicname').value == null)
      this.addButton = false;

  }

  removeAll(c) {

    c('Close click')

    if (this.ToDoList.get('topicname').value == null)
      this.addButton = false;

    let delObj: any = [];
    let todoLength: number;
    this.bgColor = true;
    this.length1 = this.count;
    // alert(this.length1);
    // let length = this.goToDelete.length;
    // alert(this.length1);
    // for (let i = 0; i < this.length1; i++) {
    //   delObj.push({
    //     "topicname": this.todoList[i][0],
    //     "start_date_time": this.todoList[i][1],
    //     "end_date_time": this.todoList[i][2],
    //     "companyrefid": AppComponent.companyID,
    //     "branchrefid": AppComponent.branchID,
    //     "locname": AppComponent.locRefName1,
    //     "locrefid": AppComponent.locrefID1,
    //     // "status": 1
    //   });
    // }

    delObj = {
      companyrefid: AppComponent.companyID, branchrefid: AppComponent.branchID,
      locname: AppComponent.locRefName1, locrefid: AppComponent.locrefID1
    }

    setTimeout(() => {
      this.usertaskservice.deleteAll(delObj).subscribe(data => {
        if (data) {
          this.clearAllBtn = false;
          for (let i = 0; i < this.length1; i++) {
            this.todoList.splice(i, this.length1);
          }
        }
        else {
          setTimeout(() => {
            this.bgColor = false;
            this.clearAllBtn = true;
          }, 5000);

        }

      });

    }, 3000);
  }



  clearAllModal(event, clearallmoodal) {

    if (event == 'clearAll') {
      this.open(clearallmoodal);
    }
    else {
      return;
    }


  }




  open(clearallmoodal) {
    this.modalService.open(clearallmoodal).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
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



}









