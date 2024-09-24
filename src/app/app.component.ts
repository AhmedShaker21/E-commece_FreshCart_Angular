import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './layout/pages/home/home.component';
import { NavbarComponent } from "./layout/additions/navbar/navbar.component";
import { NotFoundComponent } from "./layout/additions/not-found/not-found.component";
import { FooterComponent } from './layout/additions/footer/footer.component';
import { NgxSpinner, NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeComponent, NavbarComponent, FooterComponent , NgxSpinnerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ecommerce';
  constructor(private spinner: NgxSpinnerService) { }


}
