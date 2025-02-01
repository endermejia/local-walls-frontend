import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, throwError } from 'rxjs';
import { StrapiService } from '../services/strapi.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const strapiService = inject(StrapiService);
  const snackBar = inject(MatSnackBar);

  return next(req).pipe(
    catchError((error) => {
      console.error('Error HTTP:', error);

      if (error.status === 401 || error.status === 403) {
        snackBar.open('Por favor, inicie sesión nuevamente.', 'Cerrar', {
          duration: 3000,
        });
        strapiService.removeToken();
        router.navigate(['/auth/login']);
      } else {
        snackBar.open(
          'Ocurrió un error. Por favor, inténtelo más tarde.',
          'Cerrar',
          {
            duration: 3000,
          },
        );
      }

      // Devuelve el error para manejarlo en los servicios si es necesario
      return throwError(() => error);
    }),
  );
};
