import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../shared/services/product/product.service';
import { ActivatedRoute } from '@angular/router';
import { Products } from '../../../shared/interfaces/products';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../../shared/services/cart/cart.service';
import { WishlistService } from '../../../shared/services/wishlist/wishlist.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CarouselModule , CurrencyPipe],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {
  isLoading: boolean = false;
  myProduct!: Products;
  constructor(private _productService: ProductService, private _activateRoute: ActivatedRoute ,private _cartService: CartService, private _toastrService: ToastrService, private _WishlistService: WishlistService) { }
  ngOnInit(): void {
    this._activateRoute.paramMap.subscribe((res:any) => {
      console.log(res.params.pId)
      this._productService.getSpecificProduct(res.params.pId).subscribe({
        next: (res) => {
          this.myProduct = res.data;
          console.log(res.data)
        },
        error: (err) => {
          console.log(err)
        }
      })
    })
  }
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
    },
    nav: true
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
}
