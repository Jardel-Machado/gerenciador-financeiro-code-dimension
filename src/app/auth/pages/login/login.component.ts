import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { UserCredentials } from 'src/app/auth/interfaces/user-credentials';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

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
      password: this.form.value.password
    }

    this.authService.login(payload).subscribe({
      next: (response) => {
        console.log('Login successful', response);
        this.router.navigate(['']);
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.form.setErrors({
            wrongCredentials: true
          });
        }
      }
    });
  }
}
