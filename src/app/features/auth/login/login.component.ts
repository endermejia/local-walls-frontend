import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { StrapiService } from '../../../core/services/strapi.service';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    RouterLink,
    MatIcon,
  ],
  templateUrl: './login.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  loginForm: FormGroup;
  error: string | null = null;
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private strapiService: StrapiService,
    private router: Router,
  ) {
    this.loginForm = this.fb.group({
      identifier: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    const { identifier, password } = this.loginForm.value;

    this.strapiService.login(identifier, password).subscribe({
      next: (response) => {
        this.strapiService.setToken(response.jwt);
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error(err);
        this.error = 'Credenciales inválidas. Por favor, inténtelo de nuevo.';
      },
    });
  }
}
