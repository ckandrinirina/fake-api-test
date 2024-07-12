import { Component } from '@angular/core';
import { CoreModule } from '../../../../core/core.module';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-product-delete-dialog',
  standalone: true,
  imports: [CoreModule],
  templateUrl: './product-delete-dialog.component.html',
  styleUrl: './product-delete-dialog.component.scss',
})
export class ProductDeleteDialogComponent {
  constructor(private dialogRef: MatDialogRef<ProductDeleteDialogComponent>) {}

  confirm(status: boolean) {
    this.dialogRef.close(status);
  }
}
