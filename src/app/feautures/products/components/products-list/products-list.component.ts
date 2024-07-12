import {
  Component,
  Input,
  AfterViewInit,
  ViewChild,
  Output,
  EventEmitter,
} from '@angular/core';
import { Product } from '../../models/product.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CoreModule } from '../../../../core/core.module';
import { MatDialog } from '@angular/material/dialog';
import { ProductDeleteDialogComponent } from '../product-delete-dialog/product-delete-dialog.component';

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
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  @Output() deleteProduct = new EventEmitter<Product>();
  @Output() editProduct = new EventEmitter<Product>();

  constructor(private dialog: MatDialog) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  edit(product: Product) {
    this.editProduct.emit(product);
  }

  delete(product: Product) {
    this.dialog
      .open(ProductDeleteDialogComponent)
      .afterClosed()
      .subscribe((isDelete) => {
        if (isDelete) {
          this.deleteProduct.emit(product);
        }
      });
  }
}
