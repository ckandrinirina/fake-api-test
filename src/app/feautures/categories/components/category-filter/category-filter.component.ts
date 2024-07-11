import { Component, EventEmitter, Output } from '@angular/core';
import { CoreModule } from '../../../../core/core.module';
import { CategoryStore } from '../../store/category.store';
import { LoaderComponent } from '../../../../shared/components/loader/loader.component';
import { CommonModule } from '@angular/common';
import { FormControl } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-category-filter',
  standalone: true,
  imports: [CoreModule, LoaderComponent, CommonModule],
  templateUrl: './category-filter.component.html',
  styleUrl: './category-filter.component.scss',
})
export class CategoryFilterComponent {
  selectedCategories = new FormControl('');

  @Output() onCategoryChange: EventEmitter<string[]> = new EventEmitter<
    string[]
  >();

  constructor(public categoryStore: CategoryStore) {}

  onCategoryChangeHandler(event: MatSelectChange) {
    this.onCategoryChange.emit(event.value);
  }
}
