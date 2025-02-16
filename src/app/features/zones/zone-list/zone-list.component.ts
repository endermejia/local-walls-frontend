import {
  ChangeDetectionStrategy,
  Component,
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
    if (!this.globalStore.zones().length) {
      this.loadZones();
    }
  }

  private loadZones() {
    this.strapiService.getZones().subscribe({
      next: (zones) => {
        this.globalStore.zones.set(zones.data);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  onSearch(searchTerm: string) {
    this.globalStore.searchTerm.set(searchTerm);
  }

  onZoneSelect(zone: Zone) {
    this.router.navigate(['/zone-info', zone.id]);
  }
}
