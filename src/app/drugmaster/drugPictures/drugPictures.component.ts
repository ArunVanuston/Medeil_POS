import {Component, OnInit, Input, ElementRef, ViewChild, AfterViewInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpClient, HttpResponse, HttpEventType} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {drugpicService} from './drugPictures.services'
import {FormGroup, FormControl, Validators} from "@angular/forms";
@Component({
  selector: 'app-drugPuctures',
  templateUrl: './drugPictures.component.html',
  providers: [drugpicService]
})
export class drugpicturesComponent implements OnInit {
  id: number;
  private sub: any;
  @Input() multiple: boolean = false;
  @ViewChild('fileInput') inputEl: ElementRef;
  drugpicForm: FormGroup;
  constructor(private route: ActivatedRoute, private picservice: drugpicService) {

    let uploadpic = new FormControl();
    this.drugpicForm = new FormGroup({
      uploadpic: uploadpic
    });
  }


  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
    });
  }

  selectedFiles: FileList
  currentFileUpload: File
  progress: {percentage: number} = {percentage: 0}

  selectFile(event) {
    this.selectedFiles = event.target.files;
    this.photoValidation(this.selectedFiles);
  }
  onChange(event: any, input: any) {//(change)="onChange($event,showFileNames)" 
    let files = [].slice.call(event.target.files);
    input.value = files.map(f => f.name).join(', ');

  }
  reset() {
    this.drugpicForm.get('uploadpic').setValue("");
  }
  //Photo validation  
  errors: Array<string> = [];
  @Input() fileExt: string = "JPG, GIF, PNG";
  @Input() maxFiles: number = 2;
  @Input() maxSize: number = 1; // 5MB
  //fileupload: string = '/assets/imges/fileupload.gif';
  photoValidation(files) {
    this.errors = []; // Clear error
    // Validate file size and allowed extensions
    if (files.length > 0 && (!this.isValidFiles(files))) {
      return;
    }
  }
  private isValidFiles(files) {
    // Check Number of files
    if (files.length > this.maxFiles) {
      this.errors.push("Error: At a time you can upload only " + this.maxFiles + " files");
      return;
    }
    this.isValidFileExtension(files);
    return this.errors.length === 0;
  }
  private isValidFileExtension(files) {
    // Make array of file extensions
    var extensions = (this.fileExt.split(','))
      .map(function(x) {return x.toLocaleUpperCase().trim()});
    for (var i = 0; i < files.length; i++) {
      // Get file extension
      var ext = files[i].name.toUpperCase().split('.').pop() || files[i].name;
      // Check the extension exists
      var exists = extensions.includes(ext);
      if (!exists) {
        this.errors.push("Error (Extension): " + files[i].name);
      }
      // Check file size
      this.isValidFileSize(files[i]);
    }
  }
  private isValidFileSize(file) {
    var fileSizeinMB = file.size / (1024 * 1000);
    var size = Math.round(fileSizeinMB * 100) / 100;
    if (size > this.maxSize)
      this.errors.push("Error (File Size): " + file.name + ": exceed file size limit of " + this.maxSize + "MB ( " + size + "MB )");
  }


  private uploadPics() {
    const inputEl: HTMLInputElement = this.inputEl.nativeElement;
    const newCount: number = inputEl.files.length;
    if (newCount != 0) {
      alert('Please Wait your Files are Uploading.........');
      setTimeout(() => {
        for (let k = 0; k < newCount; k++) {
          alert("Files and Data Saved Sucessfully....!!!!" + k);
          this.progress.percentage = 0;
          this.currentFileUpload = this.selectedFiles.item(k);
          this.picservice.pushFileToStorage(this.currentFileUpload, this.id).subscribe(event => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress.percentage = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              console.log('File is completely uploaded!');
            }
          })
        }
        window.location.href = '/ProductMaster/ViewProductList';
      }, 20000);
    }
    else {
      setTimeout(() => {
        window.location.href = '/ProductMaster/ViewProductList';
      }, 1000);
      this.selectedFiles = undefined
    }
  }
}
