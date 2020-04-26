import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { NewEntryPage } from '../new-entry/new-entry.page';
import { LongPressModule } from 'ionic-long-press';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    LongPressModule
  ],
  declarations: [HomePage, NewEntryPage],
  entryComponents: [NewEntryPage],
  providers: [NewEntryPage]
})
export class HomePageModule {}
