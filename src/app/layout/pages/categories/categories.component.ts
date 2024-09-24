import { Component } from '@angular/core';
import { CategoryService } from '../../../shared/services/category/category.service';
import { Category } from '../../../shared/interfaces/category';
import { RouterLink } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [RouterLink , NgIf , NgFor],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {
  categoryData: Category[] = []
  allCategoriesResponse: any[] = [];
  subCategory: any;
  constructor(private _categoryService:CategoryService) { }
  ngOnInit(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('currentPage', '/categories')
    }
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
  getSubCatDetails(subCatID: string, subCatName: string): void {
    this._categoryService.getSubCategory(subCatID).subscribe({
      next: (response) => {
        this.subCategory = response.data;
        this.subCategory.mainName = subCatName; // adding custom key:value to the subCategory object
      },
    });
  }
}
