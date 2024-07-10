import { Component } from '@angular/core';
import { MaterialModule } from '../../../core/material/material.module';
import { RouterModule } from '@angular/router';
import { TemplatesModule } from '../../../templates/templates.module';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [MaterialModule, RouterModule, TemplatesModule],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent {}
