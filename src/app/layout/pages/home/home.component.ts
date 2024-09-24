import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../../../shared/services/product/product.service';
import { Products } from '../../../shared/interfaces/products';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../shared/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { CategoryService } from '../../../shared/services/category/category.service';
import { Category } from '../../../shared/interfaces/category';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { WishlistService } from '../../../shared/services/wishlist/wishlist.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CarouselModule , NgIf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit , OnDestroy {
  productList: Products[] = [];
  isLoading: boolean = false;
  getAllProducts !: Subscription;
  categoryData: Category[] = []
  addWishList: Set<string> = new Set();
  myWishListItems: string[] = [];
  constructor(private _productService: ProductService, private _WishlistService: WishlistService,private _cartService: CartService, private _toastrService: ToastrService , private _categoryService:CategoryService) { }
  ngOnInit(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('currentPage', '/home')
    }
    this.getAllProducts= this._productService.getAllProducts().subscribe({
      next: (res) => {
        console.log(res)
        this.productList= res.data

      },
      error: (err) => {
        console.log(err)
      }
    })
    this._categoryService.getAllCategories().subscribe({
      next: (res) => {
        this.categoryData = res.data
        console.log(this.categoryData)
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
        this._toastrService.success(response.message);
      },
    });
  }

  removeWish(
    id: string
  ): void {
    this._WishlistService.removeWishlist(id).subscribe({
      next: (response) => {
        this.myWishListItems = response.data
        this._toastrService.success(
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
  ngOnDestroy(): void {
    this.getAllProducts?.unsubscribe();
  }
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
  customOptionsCat: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplayHoverPause: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }


}
