import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { defineComponents, IgcRatingComponent } from 'igniteui-webcomponents';

@Component({
  selector: 'product-details',
  standalone: true,
  imports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsUiComponent implements OnInit {
  @Input() product!: Product;

  ngOnInit(): void {
    defineComponents(IgcRatingComponent);
  }
}
