import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import { UserCredentials } from 'src/app/auth/interfaces/user-credentials';
import { AuthTokenStorageService } from 'src/app/auth/services/auth-token-storage.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { LoggedInUserStoreService } from 'src/app/auth/stores/logged-in-user-store.service';

@Component({
  selector: 'app-login',
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly authTokenStorageService = inject(AuthTokenStorageService);
  private readonly loggedInUserStoreService = inject(LoggedInUserStoreService);

  ngOnInit() {
    this.iniciarFormulario();
  }

  iniciarFormulario() {
    this.form = new FormGroup({
      user: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    const payload: UserCredentials = {
      user: this.form.value.user,
      password: this.form.value.password,
    };

    this.authService.login(payload)
    .pipe(
      tap((response) => this.authTokenStorageService.saveToken(response.token)),
      switchMap((response) => this.authService.getCurrentUser(response.token)),
      tap((user) => this.loggedInUserStoreService.setUser(user)),
    )
    .subscribe({
      next: (response) => {
        this.router.navigate(['']);
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.form.setErrors({
            wrongCredentials: true,
          });
        }
      },
    });
  }
}
