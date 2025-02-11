import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { TemplatesModule } from "../../templates/templates.module";
import { CoreModule } from '../../core/core.module';
import { LoaderComponent } from "../../shared/components/loader/loader.component";

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, AuthRoutingModule, CoreModule, TemplatesModule, LoaderComponent],
})
export class AuthModule {}
