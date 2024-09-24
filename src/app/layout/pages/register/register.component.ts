import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnDestroy {
  showPassword: boolean = false;
  registerUnsubs!:Subscription
  errorMSG!: string;
  isLogin: boolean = false;
  constructor(private _AuthService: AuthService, private _router: Router

  ){}
  registerForm: FormGroup = new FormGroup(
    {
      name : new FormControl(null , [Validators.required , Validators.minLength(3) , Validators.maxLength(20)]),
      email: new FormControl(null , [Validators.required ,Validators.email]),
      phone: new FormControl(null , [Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/)]),
      password: new FormControl(null , [Validators.required , Validators.pattern(/^[A-Z][a-z0-9]{6}/)]),
      rePassword: new FormControl(null, [Validators.required]),
    },
    this.passwordMatchValidator
  );
 passwordMatchValidator(form: any) {
   return form.get('password').value === form.get('rePassword').value
      ? null : {'passwordMatch': true};
}
  onSubmit(): void {
    this.isLogin = true;
   this.registerUnsubs= this._AuthService.postSignUpAPI(this.registerForm.value).subscribe({
      next: (res) => {
        console.log(res);
        this._router.navigate(['\login'])
        this.isLogin = false;
      },
      error: (err) => {
        this.errorMSG = err.error.message;
        console.log()
        this.isLogin = false;

      }
    })

  }

  passEye() {
    this.showPassword = !this.showPassword;

  }
  ngOnDestroy(): void {
    this.registerUnsubs?.unsubscribe();
  }
}
