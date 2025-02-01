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
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    RouterLink,
    MatIcon,
  ],
  templateUrl: './register.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  registerForm: FormGroup;
  error: string | null = null;
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private strapiService: StrapiService,
    private router: Router,
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      return;
    }

    const { email, password } = this.registerForm.value;

    this.strapiService.register(email, email, password).subscribe({
      next: (register) => {
        console.log('RESPONSE:', register);
        this.strapiService.setToken(register.jwt);
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error(err);
        this.error = 'Error al registrarse. Por favor, inténtalo de nuevo.';
      },
    });
  }
}
