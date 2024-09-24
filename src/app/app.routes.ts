import { Routes } from '@angular/router';
import { HomeComponent } from './layout/pages/home/home.component';
import { LoginComponent } from './layout/pages/login/login.component';
import { RegisterComponent } from './layout/pages/register/register.component';
import { ProductsComponent } from './layout/pages/products/products.component';
import { BrandsComponent } from './layout/pages/brands/brands.component';
import { CategoriesComponent } from './layout/pages/categories/categories.component';
import { CartComponent } from './layout/pages/cart/cart.component';
import { NotFoundComponent } from './layout/additions/not-found/not-found.component';
import { authGuard } from './shared/guards/auth.guard';
import { ForgetpasswordComponent } from './layout/additions/forgetpassword/forgetpassword.component';
import { ProductDetailsComponent } from './layout/additions/product-details/product-details.component';
import { CheckOutComponent } from './layout/additions/check-out/check-out.component';
import { WishlistComponent } from './layout/pages/wishlist/wishlist.component';

export const routes: Routes = [
  {
    path:"" , redirectTo:"login" , pathMatch:"full"
  },
  {
    path: "home", component: HomeComponent, canActivate: [authGuard], title : "home"

  },
  {
    path: "login", component: LoginComponent, title: "login"
  },
  {
    path: "register", component: RegisterComponent
  },
  {
    path: "product", component: ProductsComponent, canActivate: [authGuard], title: "product"
  },
  {
    path: "brands", component: BrandsComponent, canActivate: [authGuard], title: "brands"
  },
  {
    path: "categories", component: CategoriesComponent, canActivate: [authGuard], title: "category"
  },
  {
    path: "cart", component: CartComponent, canActivate: [authGuard], title: "cart"
  },
  {
    path: "wishlist", component: WishlistComponent, canActivate: [authGuard], title: "wishlist"
  },
  {
    path: "forgetPassword", component: ForgetpasswordComponent, title: "forgetPassword"
  },
  {
    path: "productDetails/:pId" , component: ProductDetailsComponent, canActivate: [authGuard], title:"productDetails"
  },
  {
    path: "CheckOut/:id", component: CheckOutComponent, canActivate: [authGuard], title:"CheckOut"
  },
  {
    path: "**", component: NotFoundComponent
  }
];
