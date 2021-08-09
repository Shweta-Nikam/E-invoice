import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LoginService } from '../login/login.service';
import { UploadDocumentService } from '../dashboard/upload-document.service';
import { StatusUpdateService } from '../dashboard/status-update.service';

@Component({
  selector: 'app-review-document',
  templateUrl: './review-document.component.html',
  styleUrls: ['./review-document.component.css']
})
export class ReviewDocumentComponent implements OnInit {
  uploadForm: FormGroup;
  baseUrl: string = environment.baseurl;
  token: string = '';
  userType: string = '';
  documents: any = [];
  name: string = '';
  selectedIndex: any = null;
  document: Document;
  popup = false;
  idStatus:any;

  constructor(public router: Router, private fb: FormBuilder, private http: HttpClient,
    private uploadDoc: UploadDocumentService, private loginservice: LoginService,
    private statusUpdate:StatusUpdateService) {
    this.uploadForm = this.fb.group({
      document: new FormControl('', [Validators.required, Validators.minLength(3)]),
      file: new FormControl('', [Validators.required]),
    });
    this.documents = new Array<Document>();
    this.document = new Document();
  }

  ngOnInit(): void {
    this.getAllDocuments();
    this.uploadForm = this.fb.group({
      document: new FormControl('', [Validators.required, Validators.minLength(3)]),
      file: new FormControl('', [Validators.required]),
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
            this.userType = document.userType;
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
            this.userType = document.userType;

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
      // this.UpdateFile(file, id);
      this.uploadForm.patchValue({
        fileSource: file
      });
    }
  }

  // UpdateFile(file: any, id: number) {
  //   const formData = new FormData();
  //   formData.append('document', file);
  //   let getToken = localStorage.getItem('token');
  //   if (getToken) {
  //     this.uploadDoc.updateFile(formData, id).subscribe((document) => {
  //       console.log(document);
  //       this.getAllDocuments();
  //       // alert("document upload successfully");
  //     },
  //       (error) => {
  //         // alert(error.error.message);
  //       });
  //   }
  //   this.documents.push(this.documents);
  //   this.document = new Document();
  // }


  openPopoup(id:any){
   this.idStatus= id;
   this.popup = true;
  }

  statusApprove(){
const formData = new FormData();

let getToken = localStorage.getItem('token');
if (getToken) {
    this.statusUpdate.updateStatus(this.idStatus).subscribe(res =>{
      alert("Document Approved !");
      status= res.status;
      this.getAllDocuments();

      return this.document;
    },
    (error) => {
      // alert(error.error.message);
    });   this.popup = false;
  }
}

}
