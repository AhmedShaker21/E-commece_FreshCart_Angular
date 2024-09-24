import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  // Handle any errors here.
let toast :ToastrService = inject(ToastrService)
  return next(req).pipe(catchError((err) => {
    if (err.error.message !== "You are not logged in. Please login to get access") {
      toast.error(err.error.message)
    }
  return throwError(()=>err)
  }));
};
