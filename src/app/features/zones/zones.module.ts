import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ZoneListComponent } from './zone-list/zone-list.component';
import { ZoneInfoComponent } from './zone-info/zone-info.component';

const routes: Routes = [
  { path: '', component: ZoneListComponent },
  { path: ':id', component: ZoneInfoComponent },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class ZonesModule {}
