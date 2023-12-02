import { ElementRef, Input, NgModule, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './about.component';
import { SharedModule } from '../shared/shared.module';
import * as THREE from 'three';

@NgModule({
  declarations: [AboutComponent],
  imports: [CommonModule, AboutRoutingModule, SharedModule],
})
export class AboutModule {

}
