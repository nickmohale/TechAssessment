import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

//1. start by imorting angular google maps into the coding
import {AgmCoreModule} from '@agm/core';

//importing form controller from app.component.ts
import {FormsModule,ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations:[
    AppComponent
  ],

  imports:[
    BrowserModule,
    AgmCoreModule.forRoot({
      //2. adding the API that i have retrieved from google maps
      apiKey:'AIzaSyBgqNMGByH9LsShjAIskUwndtoFXMTnSNI',

      //3. adding libraries
      libraries:['places']
    })
  ],

  providers:[],
  bootstrap:[AppComponent]
})
export class AppModule{ }