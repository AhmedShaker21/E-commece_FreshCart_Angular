import { Component } from '@angular/core';
import { CartService } from '../../../shared/services/cart/cart.service';
import { Cart } from '../../../shared/interfaces/cart';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  myCart!: Cart
  constructor(private _cartService: CartService, private _toastrService:ToastrService){}
  ngOnInit(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('currentPage', '/cart')
    }
    this._cartService.getLoggedCart().subscribe({
      next: (res) => {
        console.log(res);
        this.myCart = res;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
  updateQuentity(pID:string,count:number) {
    return this._cartService.updateCartProduct(pID, count.toString()).subscribe({
      next: (res) => {
        console.log(res);
        this.myCart = res;
        this._toastrService.success("Cart updated successfully");
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
  removeItem(pID:string) {
    return this._cartService.removeSpecificCart(pID).subscribe({
      next: (res) => {
        this._cartService.cartItem.next(res.numOfCartItems)
        console.log(res);
        this.myCart = res;
        this._toastrService.success("Product removed from cart");
      },
    });
  }
  clearCart() {
    this._cartService.clearCart().subscribe({
      next: (res) => {
        console.log(res);
        this._cartService.cartItem.next(0)
        this.myCart.numOfCartItems = 0
        this.myCart = {} as Cart
        this._toastrService.success("Cart cleared successfully");
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
