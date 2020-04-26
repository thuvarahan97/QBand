import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewEntryPageRoutingModule } from './new-entry-routing.module';

import { NewEntryPage } from './new-entry.page';

import { LongPressModule } from 'ionic-long-press';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewEntryPageRoutingModule,
    LongPressModule
  ],
  declarations: [NewEntryPage],
  exports: [NewEntryPage]
})
export class NewEntryPageModule {}
