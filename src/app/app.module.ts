import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RectangleComponent } from './components/rectangle/rectangle.component';
import { RectanglesContainerDirective } from './directives/rectangles-container.directive';

@NgModule({
  declarations: [
    AppComponent,
    RectangleComponent,
    RectanglesContainerDirective
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
