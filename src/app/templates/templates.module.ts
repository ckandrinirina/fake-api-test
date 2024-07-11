import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavItemComponent } from './components/nav-item/nav-item.component';
import { MaterialModule } from '../core/material/material.module';
import { Router, RouterModule } from '@angular/router';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [NavItemComponent, ToolbarComponent, FooterComponent],
  imports: [CommonModule, MaterialModule, RouterModule],
  exports: [NavItemComponent, ToolbarComponent, FooterComponent],
})
export class TemplatesModule {}
