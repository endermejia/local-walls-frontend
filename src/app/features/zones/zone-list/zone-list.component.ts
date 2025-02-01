import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { GlobalStoreService } from '../../../core/services/global-store.service';
import { StrapiService } from '../../../core/services/strapi.service';
import { Zone } from '../../../core/models/strapi-models';

@Component({
  selector: 'app-zone-list',
  templateUrl: './zone-list.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ZoneListComponent implements OnInit {
  protected globalStore = inject(GlobalStoreService);
  private strapiService = inject(StrapiService);
  private router = inject(Router);

  ngOnInit() {
    this.loadZones();
  }

  // Load zones from the Strapi API
  private loadZones() {
    this.strapiService.getZones().subscribe({
      next: (zones) => {
        this.globalStore.zones.set(zones as Zone[]);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  // Search handler
  onSearch(searchTerm: string) {
    this.globalStore.searchTerm.set(searchTerm);
  }

  // Zone selection
  onZoneSelect(zone: Zone) {
    this.router.navigate(['/zone-info', zone.id]);
  }
}
