import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { error } from 'console';

@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.css']
})
export class TodayComponent implements OnInit {
  lat: any;
  lon: any;
  weather: any;
  locationDenied:boolean = true
  locationDeniedEnableCity = false;

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.getLocation();
  }

  getLocation() {
    if("geolocation" in navigator) {
      navigator.geolocation.watchPosition((success)=>{
        this.lat = success.coords.latitude;
        this.lon = success.coords.longitude;

        this.weatherService.getWeatherDatabyCoords(this.lat, this.lon).subscribe(data=>{
          this.weather = data;
        })
      },(error)=> {
        if(error.code == error.PERMISSION_DENIED){
          this.locationDenied = false;
          this.locationDeniedEnableCity = true
        }
      })
    }
  }

  getCity(city: string) {
    this.weatherService.getWeatherDataByCityName(city).subscribe((data:any)=>{
      this.weather = data;

      this.lat = data.coord.lat;
      this.lon = data.coord.lon;
    
    });
  }

}
