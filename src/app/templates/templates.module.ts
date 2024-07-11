import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavItemComponent } from './components/nav-item/nav-item.component';
import { RouterModule } from '@angular/router';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { CoreModule } from '../core/core.module';

@NgModule({
  declarations: [NavItemComponent, ToolbarComponent, FooterComponent],
  imports: [CommonModule, CoreModule, RouterModule],
  exports: [NavItemComponent, ToolbarComponent, FooterComponent],
})
export class TemplatesModule {}
