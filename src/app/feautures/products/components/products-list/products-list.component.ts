import {
  Component,
  Input,
  AfterViewInit,
  ViewChild,
} from '@angular/core';
import { Product } from '../../models/product.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CoreModule } from '../../../../core/core.module';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [CoreModule],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss',
})
export class ProductsListComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'id',
    'title',
    'price',
    'category',
    'image',
    'actions',
  ];
  dataSource!: MatTableDataSource<Product>;
  allProducts: Product[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @Input() set products(value: Product[]) {
    this.allProducts = value;
    this.dataSource = new MatTableDataSource(value);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  edit(product: Product) {}

  delete(product: Product) {}
}
