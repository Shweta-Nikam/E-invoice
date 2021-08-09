import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { UploadDocumentService } from '../dashboard/upload-document.service';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-add-new-file',
  templateUrl: './add-new-file.component.html',
  styleUrls: ['./add-new-file.component.css']
})
export class AddNewFileComponent implements OnInit {
  uploadForm: FormGroup;
  baseUrl: string = environment.baseurl;
  token: string = '';
  userType: string = '';
  documents: any = [];
  name: string = '';
  selectedIndex : any=null;
  document :Document;
  constructor(public router: Router, private fb: FormBuilder, private http: HttpClient,
    private uploadDoc: UploadDocumentService, private loginservice: LoginService) { 
      this.uploadForm = this.fb.group({
        document: new FormControl('', [Validators.required, Validators.minLength(3)]),
        file: new FormControl('', [Validators.required]),
        filename: new FormControl('', [Validators.required]),

      });
      this.documents = new Array<Document>();
      this.document = new Document();
    }

  ngOnInit(): void {
    this.getAllDocuments();
    this.uploadForm = this.fb.group({
  document: new FormControl('', [Validators.required, Validators.minLength(3)]),
  file: new FormControl('', [Validators.required]),
  filename: new FormControl('', [Validators.required]),

});
  }

 

// ------------Select file----------------

  onFileSelect(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      // const filename = event.target.files[0].__filename;
      // this.onuploadFile(file,filename);

      this.uploadForm.patchValue({
        document: file,

      });
    }
  }

  onuploadFile() {
    // debugger;
    const formData = new FormData();
    formData.append('document', this.uploadForm.value.document);
    formData.append('filename', this.uploadForm.value.filename)
    let getToken = localStorage.getItem('token');
    if (getToken)
    {
      this.uploadDoc.uploadFile(formData).subscribe((document) => {
        // alert("document upload successfully");
        this.router.navigate(['dashboard']);
      },
        (error) => {
          // alert(error.error.message);
        });
    }
  }



  getAllDocuments() {
    let getToken = localStorage.getItem('token');
    let getuserType = localStorage.getItem('userType');

    if (getToken && getuserType == "requester") 
    {
      this.uploadDoc.getRequesterDocument()
        .subscribe(
          document => {
            this.documents = document;
            this.name =document.name;
          },
          error => {
          });
    }
    if (getToken && getuserType == "reviewer") {
      this.uploadDoc.getReviwerDocument()
        .subscribe(
          document => {
          },
          error => {
          });
    }

  }

}
