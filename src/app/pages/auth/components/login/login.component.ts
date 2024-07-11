import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService, LoginCredentials } from '../../services/auth.service';
import { SnackbarService } from '../../../../shared/services/snackbar.service';
import { finalize, takeUntil } from 'rxjs';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnDestroy {
  loginForm: FormGroup;
  passwordVisible = false;
  isSubmitting = false;
  private unsubscribe$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackbar: SnackbarService
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isSubmitting = true;
      this.authService
        .login(this.loginForm.value as LoginCredentials)
        .pipe(
          finalize(() => (this.isSubmitting = false)),
          takeUntil(this.unsubscribe$)
        )
        .subscribe({
          next: (response) => {
            this.authService.authenticate(response.token);
            this.snackbar.open('Vous êtes connecté');
          },
          error: (error) => {
            if (error.status === 401) {
              this.snackbar.open('Identifiants incorrects');
            } else {
              this.snackbar.open('Une erreur est survenue');
            }
          },
        });
    } else {
      this.snackbar.open('Le formulaire de connexion est invalide');
    }
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }
}
