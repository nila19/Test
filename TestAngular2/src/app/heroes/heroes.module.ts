import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here

import { HeroesComponent } from './heroes.component';
import { DetailComponent } from '../detail/detail.component';

@NgModule({
  declarations: [
    HeroesComponent, DetailComponent
  ],
  imports: [
    BrowserModule, FormsModule
  ],
  providers: [],
  bootstrap: [HeroesComponent]
})
export class HeroesModule { }
