import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
  let spinner: NgxSpinnerService = inject(NgxSpinnerService)
  spinner.show();

  return next(req).pipe(finalize(() => spinner.hide()));;
};
