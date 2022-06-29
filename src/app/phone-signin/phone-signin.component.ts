import { Component, OnInit } from '@angular/core';
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { RecaptchaVerifier, signInWithPhoneNumber, Auth, ConfirmationResult } from '@angular/fire/auth';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-phone-signin',
  templateUrl: './phone-signin.component.html',
  styleUrls: ['./phone-signin.component.scss']
})
export class PhoneSigninComponent implements OnInit {
    loading = false;
    avatarImg: string;
    windowRef: any;
    step = 0;
    separateDialCode = true;
    SearchCountryField = SearchCountryField;
    CountryISO = CountryISO;
    PhoneNumberFormat = PhoneNumberFormat;
    preferredCountries: CountryISO[] = [CountryISO.SaudiArabia, CountryISO.China];
    phoneForm = new FormGroup({
        phone: new FormControl(undefined, [Validators.required])
    });
    pinFormControl = new FormControl(undefined, [Validators.required, Validators.minLength(6)]);
    emailFormControl = new FormControl(undefined, [Validators.required, Validators.email]);
    nameFormControl = new FormControl(undefined, [Validators.required]);
    lastNameFormControl = new FormControl(undefined, [Validators.required]);
    user: any;
    confirmResult: ConfirmationResult;

  constructor(private auth: Auth, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
      this.windowRef = window;
      this.windowRef.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
          'size': 'invisible',
          'callback': (response) => console.log(response),
      }, this.auth);
  }

  async onCodeSend($event) {
      if (this.phoneForm.valid) {
          this.loading = true;
          signInWithPhoneNumber(
              this.auth,
              this.phoneForm.value.phone.e164Number,
              this.windowRef.recaptchaVerifier)
              .then((confirmResult: ConfirmationResult) => {
                  this.confirmResult = confirmResult;
                  this.loading = false;
                  this.step = 1;
              })
              .catch(e => console.log(e))
      }
  }

  async onConfirm() {
      if (this.pinFormControl.valid) {
          this.loading = true;
          this.confirmResult.confirm(this.pinFormControl.value)
              .then((result) => {
                  this.user = result.user;
                  this.loading = false;
                  this.step = 2;
                  console.log(this.user);
                  // localStorage.setItem('phone', '');
              })
              .catch((error) => {
                  console.log(error);
              })
      }
  }

  async addInfo() {
      if (this.emailFormControl.valid && this.nameFormControl.valid) {
          this.loading = true;
          localStorage.setItem('email', this.emailFormControl.value);
          localStorage.setItem('name', this.nameFormControl.value);
          localStorage.setItem('lastname', this.lastNameFormControl.value);
          localStorage.setItem('avatar', this.avatarImg === undefined ? '' : this.avatarImg);
          this.http.post(
              'https://db.anan-live.com/api.php',
              {
                  firstname: this.nameFormControl.value,
                  lastname: this.lastNameFormControl.value,
                  email: this.emailFormControl.value,
                  phone: this.phoneForm.value.phone.e164Number
              },
              {
                  headers: new HttpHeaders({
                          'Content-Type': 'application/json',
                          Accept: 'application/json',
                      'Access-Control-Allow-Origin': '*'
                  }
                      ),
              }
              ).pipe(filter(data => JSON.stringify(data) !== JSON.stringify({})))
              .subscribe((response) => {
                  this.loading = false;
                  this.router.navigateByUrl('home');
              });
      }
  }

  UploadAvatar($event: Event) {
      const targetElement = event.target as HTMLInputElement;
      const fileList = targetElement.files as FileList;
      Array.prototype.forEach.call(fileList, file => {
          if (file.type.includes('image')) {
              const reader = new FileReader();
              reader.onload = (e: any) => {
                  this.avatarImg = e.target['result'];
              };
              reader.readAsDataURL(file);
          } else {
              alert('You have to upload image file')
          }
      });
  }
}
