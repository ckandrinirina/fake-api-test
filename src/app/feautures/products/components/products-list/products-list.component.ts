import {
  Component,
  Input,
  AfterViewInit,
  ViewChild,
  OnInit,
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
export class ProductsListComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['id', 'title', 'price', 'actions'];
  dataSource!: MatTableDataSource<Product>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @Input() products: Product[] = [];

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.products);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  edit(product: Product) {}

  delete(product: Product) {}
}
