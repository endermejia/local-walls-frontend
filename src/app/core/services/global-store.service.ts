import { computed, Injectable, signal } from '@angular/core';
import { Crag, Topo, User, Zone } from '../models/strapi-models';

@Injectable({
  providedIn: 'root',
})
export class GlobalStoreService {
  // GLOBAL
  user = signal<User | null>(null);
  zones = signal<Zone[]>([]);
  crags = signal<Crag[]>([]);
  topos = signal<Topo[]>([]);

  // USER RELATED
  likedZones = signal<number[]>([]);
  likedCrags = signal<number[]>([]);
  likedTopos = signal<number[]>([]);
  likedRoutes = signal<number[]>([]);

  // APP
  searchTerm = signal<string>('');
  userLocation = signal<{ lat: number; lng: number } | null>(null);

  // COMPUTED
  filteredZones = computed(() =>
    this.zones().filter((zone) =>
      zone.name.toLowerCase().includes(this.searchTerm().toLowerCase()),
    ),
  );
}
