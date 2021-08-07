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
  name: string = '';
  constructor(public router: Router, private fb: FormBuilder, private http: HttpClient,
    private uploadDoc: UploadDocumentService, private loginservice: LoginService) {
    this.uploadForm = this.fb.group({
      document: new FormControl('', [Validators.required, Validators.minLength(3)]),
      file: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.uploadForm = this.fb.group({
      document: new FormControl('', [Validators.required, Validators.minLength(3)]),
      file: new FormControl('', [Validators.required]),
    });
  }

  get f() {
    return this.uploadForm.controls;
  }

  onFileSelect(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.onSubmit(file);

      this.uploadForm.patchValue({
        fileSource: file

      });
      // console.log(this.uploadForm.value.fileSource);
      // this.uploadForm.get('filename').setValue(file);
    }
  }
  onSubmit(file: any) {
    const formData = new FormData();
    formData.append('document', file);
    // formData.append('file', file);
    // console.log(formData);
    let getToken = localStorage.getItem('token');
    if (getToken)
    // && this.userType=="reviewer"
    {
      this.uploadDoc.uploadFile(formData).subscribe((document) => {
        // console.log(document);
        this.getAllDocuments();
        alert("document upload successfully");
      },
        (error) => {
          alert(error.error.message);
        });

    }

    // if (getToken) 
    // // && this.userType=="requester"
    // {
    //   this.uploadDoc.uploadFile(formData).subscribe((document) => {
    //     console.log(document);
    //     this.getAllDocuments();
    //     alert("document upload successfully");
    //   },
    //     (error) => {
    //       alert(error.error.message);
    //     });

    // }
  }

  // ______________get All Documents_______________


  getAllDocuments() {
    // debugger;
    let getToken = localStorage.getItem('token');

    if (getToken) {
      this.uploadDoc.getRequesterDocument()
        .subscribe(
          document => {
            this.documents = document;
            this.name =document.name;
            // console.log(this.name);
          },
          error => {
            // console.log(error);
          });
    }
    if (getToken) {
      this.uploadDoc.getReviwerDocument()
        .subscribe(
          document => {
            // console.log(document);
          },
          error => {
            // console.log(error);
          });
    }
  }


//   deleteFile(id:any){
//     let getToken = localStorage.getItem('token');

//     if(getToken){
//     this.uploadDoc.deleteFile(id).subscribe((file:any) => {
//       this.documents = this.documents.filter((file: { id: any; }) => file.id !== id);
//       console.log('Post deleted successfully!');
//  })
// }
//   }


  onFileupdate(event: any,id:number) {
    // debugger;
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const id = event.target.id;
      this.UpdateFile(id,file);
      
      this.uploadForm.patchValue({
        fileSource: file

      });
      console.log(this.uploadForm.value.fileSource);
      // this.uploadForm.get('filename').setValue(file);
    }
  }
  UpdateFile(id:number,file:any){
    // debugger;
    const formData = new FormData();
    let getToken = localStorage.getItem('token');
    if (getToken){
    formData.append('document', file);
    this.uploadDoc.updateFile(formData).subscribe((document) => {
      console.log(document);
      this.getAllDocuments();
      alert("document upload successfully");
    },
      (error) => {
        alert(error.error.message);
      });
    }
  }

  logout() {
    let removeToken = localStorage.removeItem('token');
    if (removeToken == null) {
      this.router.navigate(['login']);
    }
    // this.loginservice.doLogout();
    // localStorage.clear();
    //   localStorage.clear();
    // localStorage.removeItem('token');
    //   const isLoggedin = false;
    //   this.router.navigate(['/login'])
    //     .then(() => {
    //       window.location.reload();
    //     });
  }
}
function id(id: any, file: any) {
  throw new Error('Function not implemented.');
}

