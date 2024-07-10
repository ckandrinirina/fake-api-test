import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavItemComponent } from './components/nav-item/nav-item.component';
import { MaterialModule } from '../core/material/material.module';
import { Router, RouterModule } from '@angular/router';

@NgModule({
  declarations: [NavItemComponent],
  imports: [CommonModule, MaterialModule, RouterModule],
  exports: [NavItemComponent],
})
export class TemplatesModule {}
