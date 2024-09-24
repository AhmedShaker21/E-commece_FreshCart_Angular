import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { ProductService } from '../../../shared/services/product/product.service';
import { Products } from '../../../shared/interfaces/products';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../shared/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { FilterPipe } from '../../../shared/pipes/filter.pipe';
import { FormsModule } from '@angular/forms';
import { WishlistService } from '../../../shared/services/wishlist/wishlist.service';
import { CurrencyPipe, NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CarouselModule, NgIf, RouterLink, FilterPipe, FormsModule, NgClass , CurrencyPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit, OnDestroy {
  addWishList: Set<string> = new Set();
  myWishListItems: string[] = [];
  textSearch: string = '';
  getAllProducts !: Subscription
  isLoading:boolean = false;
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplayHoverPause: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
    },
    nav: true
  }
  constructor(private _productService: ProductService, private _cartService: CartService, private _toastrService: ToastrService,  private _WishlistService: WishlistService,
    private _ToastrService: ToastrService) {}
  productList: Products[] = [];
  ngOnInit(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('currentPage', '/product')
    }
    this.getAllProducts= this._productService.getAllProducts().subscribe({
      next: (res) => {
        console.log(res.data);
        this.productList = res.data;
      },
      error: (err) => {
        console.error(err);
      }
    })
    this._WishlistService.getLoggedWishlist().subscribe({
      next: (response) => {
        this.myWishListItems = response.data.map((items: any) => items._id) // converting array of object to array of strings [id,id]
      }
    })
  }
  addWish(
    id: string
  ): void {
    this._WishlistService.AddProductToWishlist(id).subscribe({
      next: (response) => {
        console.log(response)
        this.myWishListItems = response.data
        this._WishlistService.wishCount.next(response.data.length);
        this._ToastrService.success(response.message);
      },
    });
  }
  removeWish(
    id: string
  ): void {
    this._WishlistService.removeWishlist(id).subscribe({
      next: (response) => {
        this.myWishListItems = response.data
        this._ToastrService.success(
          'Product removed successfully from your wishlist'
        );

        this._WishlistService.wishCount.next(response.data.length);


      },
    });
  }
  AddWishlist(pID: string) {
    this._WishlistService.AddProductToWishlist(pID).subscribe({
      next: (res) => {
        if (this.addWishList.has(pID)) {
          this.addWishList.delete(pID);
        } else {
          this.addWishList.add(pID);
        }
        console.log(res)
        this._toastrService.success(res.message);
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
  AddProduct(pID: string) {
    this.isLoading = true;
    return this._cartService.AddProductToCart(pID).subscribe({
      next: (res) => {
        console.log(res)
        this._toastrService.success(res.message);
        this.isLoading = false
        this._cartService.cartItem.next(res.numOfCartItems)
        console.log(res.numOfCartItems)
      },
      error: (err) => {
        console.log(err)
        this.isLoading = false;
      }
    })
  }
  ngOnDestroy(): void {
    this.getAllProducts?.unsubscribe();
  }
}
