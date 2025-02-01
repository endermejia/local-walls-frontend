import { computed, Injectable, signal } from '@angular/core';
import { Zone } from '../models/strapi-models';

@Injectable({
  providedIn: 'root',
})
export class GlobalStoreService {
  zones = signal<Zone[]>([]);
  likedZones = signal<number[]>([]);
  searchTerm = signal<string>('');
  userLocation = signal<{ lat: number; lng: number } | null>(null);

  filteredZones = computed(() =>
    this.zones().filter((zone) =>
      zone.name.toLowerCase().includes(this.searchTerm().toLowerCase()),
    ),
  );
}
