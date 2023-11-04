import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DividerComponent } from './components/divider/divider.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [DividerComponent],
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule],
  exports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    DividerComponent,
  ],
})
export class SharedModule {}
