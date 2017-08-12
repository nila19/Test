import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here

import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { DetailComponent } from './detail/detail.component'
import { HeroService } from './heroes/hero.service';

@NgModule({
  declarations: [
    AppComponent, HeroesComponent, DetailComponent
  ],
  imports: [
    BrowserModule, FormsModule
  ],
  providers: [HeroService],
  bootstrap: [AppComponent]
})
export class AppModule { }
