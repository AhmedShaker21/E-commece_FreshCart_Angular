import { Component } from '@angular/core';
import { BrandsService } from '../../../shared/services/brands/brands.service';
import { Category } from '../../../shared/interfaces/category';
import { FlowbiteService } from '../../../shared/services/flowbite/flowbite.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent {
  brandsList!: Category[];
  constructor(private flowbiteService: FlowbiteService, private _brandsService: BrandsService) { }
  ngOnInit(): void {
    this.flowbiteService.loadFlowbite(flowbite => {
      flowbite
    });
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('currentPage', '/brands')
    }
    this._brandsService.getAllBrands().subscribe({
      next: (res) => {
        this.brandsList=res.data
        console.log(res);
      }
    })
  }
}
