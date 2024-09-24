import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule , RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements  OnDestroy {
  registerUnsubs!:Subscription
  showPassword: boolean = false;
  errorMSG!: string;
  isLogin: boolean = false;
  navbarHidden: boolean = false;
  constructor(private _AuthService: AuthService, private _router: Router) { }
  registerForm: FormGroup = new FormGroup(
    {
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{6}/)]),
    },
  );
  onSubmit(): void {
    this.isLogin = true;
    this.registerUnsubs= this._AuthService.postLoginAPI(this.registerForm.value).subscribe({
      next: (res) => {
        console.log(res);
        localStorage.setItem('userToken', res.token);
        this._AuthService.getToken()
        if (typeof localStorage !== 'undefined') {
          if (localStorage.getItem("navigateTo") !== null) {
            this._router.navigate([localStorage.getItem("navigateTo")]);
          } else {
            this._router.navigate(['\home'])
                      }
         }
        this.isLogin = false;

      },
      error: (err) => {
        this.errorMSG = err.error.message;
        this.isLogin = false;

      }
    })

  }
  ngOnDestroy(): void {
    this.registerUnsubs?.unsubscribe();
  }
  passEye() {
    this.showPassword = !this.showPassword;
  }
}
