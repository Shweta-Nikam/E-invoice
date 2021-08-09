import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LoginService } from '../login/login.service';
import { UploadDocumentService } from './upload-document.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  uploadForm: FormGroup;
  baseUrl: string = environment.baseurl;
  token: string = '';
  userType: string = '';
  documents: any = [];
  showModal1:boolean=false;
  showFileModal:boolean=false;
  name: string = '';
  selectedIndex: any = null;
  document: Document;
  doc:any;
  constructor(public router: Router, private fb: FormBuilder, private http: HttpClient,
    private uploadDoc: UploadDocumentService, private loginservice: LoginService) {
    this.uploadForm = this.fb.group({
      document: new FormControl('', [Validators.required, Validators.minLength(3)]),
      file: new FormControl('', [Validators.required]),
      filename2: new FormControl('', [Validators.required]),

    });
    this.documents = new Array<Document>();
    this.document = new Document();
  }

  ngOnInit(): void {
    this.getAllDocuments();
    this.uploadForm = this.fb.group({
      document: new FormControl('', [Validators.required, Validators.minLength(3)]),
      file: new FormControl('', [Validators.required]),
      filename2: new FormControl('', [Validators.required]),

    });
  }

  get f() {
    return this.uploadForm.controls;
  }

  // onFileSelect(event: any) {
  //   if (event.target.files.length > 0) {
  //     const file = event.target.files[0];
  //     this.onSubmit(file);

  //     this.uploadForm.patchValue({
  //       fileSource: file

  //     });
  //   }
  // }
  
  // onSubmit(file: any) {
  //   const formData = new FormData();
  //   formData.append('document', file);
  //   let getToken = localStorage.getItem('token');
  // }

  // ______________get All Documents_______________


  getAllDocuments() {
    let getToken = localStorage.getItem('token');
    let getuserType = localStorage.getItem('userType');

    if (getToken && getuserType == "requester") {
      this.uploadDoc.getRequesterDocument()
        .subscribe(
          document => {
            this.documents = document;
            this.name = document.name;
            this.userType= document.userType;
          },
          error => {
            // console.log(error);
          });
    }
    if (getToken && getuserType == "reviewer") {
      this.uploadDoc.getReviwerDocument()
        .subscribe(
          document => {
            this.documents = document;
            this.name = document.name;
            this.userType= document.userType;

            // console.log(document);
          },
          error => {
            // console.log(error);
          });
    }
  }

  addNewFile() {
    this.router.navigate(['addNew']);
  }

  deleteFile(id: any) {
    let getToken = localStorage.getItem('token');

    if (getToken) {
      this.uploadDoc.deleteFile(id).subscribe((file: any) => {
        this.documents = this.documents.filter((file: { id: any; }) => file.id !== id);
        console.log('Post deleted successfully!');
      })
      this.getAllDocuments();
    }
  }


  onFileupdate(event: any, id: number) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const filename = this.uploadForm.value.filename2;
      // const name = event.target.filename;
      this.UpdateFile(id,file);
      this.uploadForm.patchValue({
        fileSource: file
      });
    }
  }

  UpdateFile(id:any,file: any) {
    const formData = new FormData();
    formData.append('document', this.uploadForm.value.document);
    formData.append('filename', this.uploadForm.value.filename2)
    const name= this.uploadForm.value.filename2;
    let getToken = localStorage.getItem('token');
    if (getToken) {
      this.uploadDoc.updateFile(id,formData,name).subscribe((document:any) => {
        console.log(document);
        this.documents[this.selectedIndex].filename=name;
        this.documents[this.selectedIndex].file=this.uploadForm.value.file;
        this.getAllDocuments();
        this.showModal1 = !this.showModal1;
      },
        (error) => {
        });
    }
  }

// -----show update modal--------
showModal(index:number){
  this.selectedIndex = index;
  this.showModal1 = !this.showModal1;

}


getDocument(id:any){
  let getToken = localStorage.getItem('token');
  let getuserType = localStorage.getItem('userType');

  if (getToken) {
    this.uploadDoc.getDocument(id)
      .subscribe(
        document => {
          this.documents = document;
          this.name = document.name;
          this.userType= document.userType;
        },
        error => {
          // console.log(error);
        });
  }
}
showFile(file:any){
  // this.getDocument(id);
  this.doc=file;
  this.showFileModal = !this.showFileModal;
}
  // logout() {
  //   let removeToken = localStorage.removeItem('token');
  //   if (removeToken !== null) {
  //     this.router.navigate(['login']);
  //   }
  // }
}

