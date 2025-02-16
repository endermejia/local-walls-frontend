import { Injectable, signal, computed } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError, map } from 'rxjs';
import {
  Ascent,
  Bolter,
  Crag,
  Parking,
  Route,
  StrapiResponse,
  Topo,
  User,
  Zone,
} from '../models/strapi-models';

const STRAPI_HOST = 'http://localhost:1337';
const TOKEN_KEY = 'token';

@Injectable({
  providedIn: 'root',
})
export class StrapiService {
  token = signal<string | null>(localStorage.getItem(TOKEN_KEY));
  isAuthenticated = computed(() => !!this.token());

  constructor(private http: HttpClient) {}

  // Token management
  setToken(token: string): void {
    this.token.set(token);
    localStorage.setItem(TOKEN_KEY, token);
  }

  removeToken(): void {
    this.token.set(null);
    localStorage.removeItem(TOKEN_KEY);
  }

  // HTTP Methods
  private get<T>(endpoint: string): Observable<T> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      ...(this.token() ? { Authorization: `Bearer ${this.token()}` } : {}),
    });

    return this.http.get<T>(`${STRAPI_HOST}/api/${endpoint}`, { headers }).pipe(
      map((event) => event as T),
      catchError((error) => {
        console.error('Error:', error);
        return throwError(() => error);
      }),
    );
  }

  private post<T>(
    endpoint: string,
    body: unknown,
    dataBody = true,
  ): Observable<T> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      ...(dataBody && this.token()
        ? { Authorization: `Bearer ${this.token()}` }
        : {}),
    });

    const payload = body
      ? JSON.stringify(dataBody ? { data: body } : body)
      : undefined;

    return this.http
      .post<T>(`${STRAPI_HOST}/api/${endpoint}`, payload, { headers })
      .pipe(
        map((event) => event as T),
        catchError((error) => {
          console.error('Error:', error);
          return throwError(() => error);
        }),
      );
  }

  private put<T>(
    endpoint: string,
    body: unknown,
    dataBody = true,
  ): Observable<T> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      ...(this.token() ? { Authorization: `Bearer ${this.token()}` } : {}),
    });

    const payload = body
      ? JSON.stringify(dataBody ? { data: body } : body)
      : undefined;

    return this.http
      .put<T>(`${STRAPI_HOST}/api/${endpoint}`, payload, { headers })
      .pipe(
        map((event) => event as T),
        catchError((error) => {
          console.error('Error:', error);
          return throwError(() => error);
        }),
      );
  }

  private delete<T>(endpoint: string): Observable<T> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      ...(this.token() ? { Authorization: `Bearer ${this.token()}` } : {}),
    });

    return this.http
      .delete<T>(`${STRAPI_HOST}/api/${endpoint}`, { headers })
      .pipe(
        map((event) => event as T),
        catchError((error) => {
          console.error('Error:', error);
          return throwError(() => error);
        }),
      );
  }

  // Authentication
  login(
    identifier: string,
    password: string,
  ): Observable<{ jwt: string; user: User }> {
    return this.post('auth/local', { identifier, password }, false);
  }

  register(
    username: string,
    email: string,
    password: string,
  ): Observable<{ jwt: string; user: User }> {
    return this.post(
      'auth/local/register',
      { username, email, password },
      false,
    );
  }

  // Zones
  getZones(): Observable<StrapiResponse<Zone[]>> {
    return this.get('zones?populate[crags]=true');
  }

  getZoneById(zoneId: number): Observable<Zone> {
    return this.get(`zones/${zoneId}?populate[crags]=true`);
  }

  // Crags
  getCrags(): Observable<Crag[]> {
    return this.get('crags?populate[topos]=true&populate[parkings]=true');
  }

  getCragById(cragId: number): Observable<Crag> {
    return this.get(
      `crags/${cragId}?populate[topos]=true&populate[parkings]=true`,
    );
  }

  // Topos
  getTopos(): Observable<Topo[]> {
    return this.get('topos?populate[routeTopos][populate]=route');
  }

  getTopoById(topoId: number): Observable<Topo> {
    return this.get(`topos/${topoId}?populate[routeTopos][populate]=route`);
  }

  // Routes
  getRoutes(): Observable<Route[]> {
    return this.get('routes?populate[bolters]=true&populate[ascents]=true');
  }

  getRouteById(routeId: number): Observable<Route> {
    return this.get(
      `routes/${routeId}?populate[bolters]=true&populate[ascents]=true`,
    );
  }

  // Bolters
  getBolters(): Observable<Bolter[]> {
    return this.get('bolters');
  }

  getBolterById(bolterId: number): Observable<Bolter> {
    return this.get(`bolters/${bolterId}`);
  }

  // Ascents
  logAscent(ascentData: {
    route: number;
    grade: string;
    type: string;
    date: string;
  }): Observable<Ascent> {
    return this.post('ascents', ascentData);
  }

  getUserAscents(userId: number): Observable<Ascent> {
    return this.get(`users/${userId}?populate[ascents]=true`);
  }

  // Parkings
  getParkings(): Observable<Parking[]> {
    return this.get('parkings');
  }

  getParkingById(parkingId: number): Observable<Parking> {
    return this.get(`parkings/${parkingId}`);
  }
}
