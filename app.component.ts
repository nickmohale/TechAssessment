import { Component, ViewChild, ElementRef, NgZone, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { FormControl } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
import { PipeResolver } from '@angular/compiler';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit{
//5. adding component logic

title='app';
@ViewChild('search')
public searchElementRef: ElementRef;

public zoom:number;
public latitude: number;
public longitude:number;
public latlongs:any;
public searchControl: FormControl;

//6. adding consturctor for mapAPI Loader
constructor(private mapsAPILoader: MapsAPILoader, private ngZone:NgZone){


}

ngOnInit()
{
  this.zoom=8;
  this.latitude=18.5019442;
  this.latitude=-33.9127366;


  this.searchControl=new FormControl();
  this.setCurrentPosition();

  this.mapsAPILoader.load().then(()=>{

    //8. This code will only locate someone from S.A and restrict anyone from outside the country
const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {

  types: []

});
    autocomplete.addListener('Place_changed',()=>{
      this.ngZone.run(() =>{
        const place:google.maps.places.PlaceResult = autocomplete.getPlace();

        if (place.geometry==undefined||place.geometry==null){
          return;
        }

        const latlong ={
          latitude : place.geometry.location.lat(),
          longitude:place.geometry.location.lng()
        };

          this.latlongs.push(latlong);
          this.searchControl.reset();

      });

    });
});
}

//9. this function will set current location

private setCurrentPosition(){
  if ('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition((position)=>{
      this.latitude=position.coords.latitude;
      this.longitude=position.coords.longitude;
      this.zoom=8;
    
    });
  }
}
}
