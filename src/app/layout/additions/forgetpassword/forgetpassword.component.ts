import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth/auth.service';

@Component({
  selector: 'app-forgetpassword',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.scss'
})
export class ForgetpasswordComponent {
  step: number = 1;
  isLogin: boolean = false;
  constructor(private _AuthService: AuthService) { }
  emailForgetPass: FormGroup = new FormGroup(
    {
      email: new FormControl(null, [Validators.required, Validators.email]),
    },
  );
  codeForgetPass: FormGroup = new FormGroup(
    {
      resetCode: new FormControl(null, [Validators.required]),
    },
  );
  resetForgetPass: FormGroup = new FormGroup(
    {
      email: new FormControl(null, [Validators.required, Validators.email]),
      newPassword: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{6}/)]),
    },
  );
  sendEmail() {
    this.isLogin = true;
    this._AuthService.sendEmailAPI(this.emailForgetPass.value).subscribe({
      next: (res) => {
        console.log(res);
        this.step = 2;
        this.isLogin = false;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
  sendCode() {
    this.isLogin = true;

    this._AuthService.sendCodeAPI(this.codeForgetPass.value).subscribe({
      next: (res) => {
        this.isLogin = false;

        this.step = 3;
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  resetData() {
    this.isLogin = true;

    this._AuthService.resetDataAPI(this.resetForgetPass.value).subscribe({
      next: (res) => {
        this.isLogin = false;

        console.log(res);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

}
