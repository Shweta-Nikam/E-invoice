import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UploadDocumentService } from './upload-document.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  uploadForm: FormGroup;
  baseUrl: string = environment.baseurl;

  constructor(public router: Router, private fb: FormBuilder, private http: HttpClient,
    private uploadDoc: UploadDocumentService) {
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

  get f(){
    return this.uploadForm.controls;
  }

  onFileSelect(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.onSubmit(file)
      this.uploadForm.patchValue({
        fileSource: file

      });
      console.log(this.uploadForm.value.fileSource);
      // this.uploadForm.get('filename').setValue(file);
    }
  }
  onSubmit(file:any) {
    const formData = new FormData();
    formData.append('document', file.filename);
    formData.append('file', file.path);
  console.log(formData);

      this.uploadDoc.uploadFile(formData).subscribe((document)=>{
        console.log(document);
        alert("document upload successfully");
      },
      (error) => {
        alert(error.error.message);
      });
    
    // return this.http.post<any>(this.baseUrl + '/document', formData).subscribe(
    //   (res: any) => {
    //     alert("document uploaded successfully");
    //     console.log(res);
    //   })

  }

  logout() {
    localStorage.clear();
    localStorage.removeItem('currentUser');
    const isLoggedin = false;
    this.router.navigate(['/login'])
      .then(() => {
        window.location.reload();
      });
  }
}
