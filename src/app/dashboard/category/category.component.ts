import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CategoryService } from '../../service/category.service';
import { Data } from '../../helpers/enum';
import { MatIconModule } from '@angular/material/icon';
import { CustomToasterService } from '../../service/toaster.service';
import { LoaderService } from '../../service/loader.service';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  categoryForm!: UntypedFormGroup;
  submitted = false;
  errorMessage: string = '';
  isEditMode = false;
  selectedCategoryId: number | null = null;

  displayedColumns: string[] = [
    'id',
    'category_name',
    'category_description',
    'user_name',
    'action',
  ];
  dataSource = new MatTableDataSource<any>();

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly categoryService: CategoryService,
    private readonly toasterService: CustomToasterService,
    private readonly loaderService: LoaderService
  ) {}

  ngOnInit(): void {
    this.categoryForm = this.formBuilder.group({
      category_name: ['', [Validators.required]],
      category_description: [''],
    });

    this.fetchCategories();
  }

  fetchCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (response: Data) => {
        this.dataSource.data = response.data.data;
      },
      error: (error) => {
        console.error('Error fetching categories', error);
      },
    });
  }

  onSubmit() {
    this.submitted = true;
    this.errorMessage = '';

    if (this.categoryForm.invalid) {
      this.categoryForm.markAllAsTouched();
      return;
    }

    const { category_name, category_description } = this.categoryForm.value;

    if (this.isEditMode && this.selectedCategoryId) {
      this.categoryService
        .updateCategory(
          this.selectedCategoryId,
          category_name,
          category_description
        )
        .subscribe({
          next: () => {
            this.resetForm();
            this.fetchCategories();
          },
          error: (error) => {
            console.error('Error updating category', error);
          },
        });
    } else {
      this.categoryService
        .addCategory(category_name, category_description)
        .subscribe({
          next: () => {
            this.resetForm();
            this.fetchCategories();
          },
          error: (error) => {
            console.error('Error adding category', error);
          },
        });
    }
  }

  editCategory(category: any) {
    this.isEditMode = true;
    this.selectedCategoryId = category.id;

    this.categoryForm.patchValue({
      category_name: category.category_name,
      category_description: category.category_description,
    });
  }

  deleteCategory(categoryId: number) {
    this.categoryService.deleteCategory(categoryId).subscribe({
      next: (response: any) => {
        if (response.message) {
          this.toasterService.success(response.message, 5000);
          this.fetchCategories();
        }
      },
      error: (error) => {
        this.toasterService.success(error, 5000);
        console.error('Error deleting category', error);
      },
    });
  }

  resetForm() {
    this.categoryForm.reset();
    this.isEditMode = false;
    this.selectedCategoryId = null;
    this.submitted = false;
  }
}
