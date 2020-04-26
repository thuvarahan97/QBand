import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { NewEntryPage } from '../new-entry/new-entry.page';
import { LongPressModule } from 'ionic-long-press';
import { NewEntryPageModule } from '../new-entry/new-entry.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    LongPressModule,
    NewEntryPageModule
  ],
  declarations: [HomePage],
  entryComponents: [NewEntryPage],
  providers: [NewEntryPage]
})
export class HomePageModule {}
