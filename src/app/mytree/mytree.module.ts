import { NgModule } from '@angular/core';
import { CdkTreeModule } from '@angular/cdk/tree';

import { MytreeComponent } from './mytree.component';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { MatIcon, MatIconModule } from '@angular/material';
import { MatIconBase } from '@angular/material/icon';

@NgModule({
  declarations: [
    MytreeComponent,
  ],
  imports: [
    CdkTreeModule,
    CommonModule,
    BrowserModule,
    MatIconModule,
  ],
  exports: [
    MytreeComponent
  ]
})
export class MytreeModule { }
