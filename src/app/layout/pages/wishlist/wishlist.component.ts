import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../../../shared/services/wishlist/wishlist.service';
import { Cart } from '../../../shared/interfaces/cart';
import { WishList } from '../../../shared/interfaces/wishlist';
import { CartService } from '../../../shared/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { Products } from '../../../shared/interfaces/products';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit {
  wishlistData: WishList[] = [];
  isEmpty: boolean = true;
  myWishlist !: WishList;
  constructor(private _cartService: CartService, private _WishlistService: WishlistService,
    private _ToastrService: ToastrService) { }
  ngOnInit(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('currentPage', '/wishlist')
    }
    this._WishlistService.getLoggedWishlist().subscribe({
      next: (res) => {
        if (res.count == 0) {
          this.isEmpty = true;
        } else {
          this.isEmpty = false;
          console.log(res);
          this.wishlistData = res.data;
        }
      }
    })
  }

  AddProduct(pID: string) {
    return this._cartService.AddProductToCart(pID).subscribe({
      next: (res) => {
        this._cartService.cartItem.next(res.numOfCartItems)
        console.log("hhhh", res)
        this._ToastrService.success(res.message);
      },

    });
  }

  // removeItem(pID: string) {
  //   return this._wishlistService.removeWishlist(pID).subscribe({
  //     next: (res) => {
  //       this._wishlistService.getLoggedWishlist().subscribe({
  //         next: ({ d }) => {
  //           this.myWishlist= d.data;
  //         }
  //       })
  //       this._wishlistService.wishCount.next(res.data.length)
  //       console.log(res);

  //       this._ToastrService.success("Product removed from cart");
  //     },
  //   });
  // }



  removeWish(id: string, event: MouseEvent) {
    event.stopPropagation();
    this._WishlistService.removeWishlist(id).subscribe({
      next: (response) => {
        this._WishlistService.getLoggedWishlist().subscribe({
          next: ({ data }) => {
            if (data.length == 0) {
              this.isEmpty = true;
            } else {
              this.wishlistData = data;
              this.isEmpty = false;
            }
          },
        });

        this._ToastrService.success(
          'Product removed successfully from your wishlist'
        );

        this._WishlistService.wishCount.next(response.data.length);

        if (response.data.length == 0) {
          this.isEmpty = true;
        }
      },
    });
  }



}

