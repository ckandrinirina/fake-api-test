import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { MaterialModule } from '../../core/material/material.module';
import { TemplatesModule } from "../../templates/templates.module";

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, AuthRoutingModule, MaterialModule, TemplatesModule],
})
export class AuthModule {}
