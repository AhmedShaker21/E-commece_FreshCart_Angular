import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FlowbiteService } from '../../../shared/services/flowbite/flowbite.service';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { CartService } from '../../../shared/services/cart/cart.service';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink , RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  cartCount!: number;
  isLogin:boolean = false;
  constructor(private flowbiteService: FlowbiteService, private _AuthService: AuthService, private _Router: Router, private _cartService:CartService) { }
  ngOnInit(): void {
    this._cartService.getLoggedCart().subscribe({
      next: (res) => {
        this._cartService.cartItem.next(res.numOfCartItems);
      },
      error: (error) => {
        console.error(error)
      }
    })
    this.flowbiteService.loadFlowbite(flowbite => {
      // Your custom code here
      console.log('Flowbite loaded', flowbite);
    });

    this._AuthService.userTokenData.subscribe(() => {
      if (this._AuthService.userTokenData.getValue() !== null) {
        console.log('login')
        this.isLogin = true;
      } else {
        console.log('logout')
        this.isLogin = false;
      }
    })
    this._cartService.cartItem.subscribe({
      next: (res) => {
        this.cartCount = res;
      }
    })
  }
  signOutLogic():void {
    localStorage.removeItem('userToken');
    this._AuthService.userTokenData.next(null);
    this._Router.navigate(['/login'])
  }
}
