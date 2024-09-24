import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CheckOutService } from '../../../shared/services/checkOut/check-out.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../../shared/services/cart/cart.service';

@Component({
  selector: 'app-check-out',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './check-out.component.html',
  styleUrl: './check-out.component.scss'
})
export class CheckOutComponent implements OnInit {
  constructor(private _checkOutService: CheckOutService, private _activatedRoute: ActivatedRoute, private _cartService :CartService) { }
  cardId!: string;
  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((res: any) => {
      this.cardId = res.params.id;
      console.log(this.cardId)
    });
  }
  checkOutForm: FormGroup = new FormGroup({
    details: new FormControl(null, [Validators.required, Validators.minLength(2)]),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
    city: new FormControl(null, [Validators.required]),
  })
  checkOutSubmit() {
    this._checkOutService.checkOut(this.cardId, this.checkOutForm.value).subscribe({
      next: (res) => {
        console.log(res.session.url)
        if (res.status === 'success') {
          window.open(res.session.url, '_self')
          this._cartService.cartItem.next(0)

        }
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

}
