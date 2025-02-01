import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StrapiService } from './services/strapi.service';
import { GlobalStoreService } from './services/global-store.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [StrapiService, GlobalStoreService],
})
export class CoreModule {}
