import {AfterViewInit, Component} from '@angular/core';
import * as L from 'leaflet';
import 'leaflet.locatecontrol';
import {DatePipe, NgForOf} from "@angular/common";

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [
    DatePipe,
    NgForOf
  ],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements AfterViewInit {

  constructor() {
  }

  public locationList: { latlng: string, timestamp: Date }[] = [];

  SaveCurrent(): void {
    if (this.map) {
      this.map.locate();
      this.map.on('locationfound', (locationEvent) => {
        console.log(locationEvent);
        if (this.map) {
          const marker = L.marker(this.map.getCenter()).addTo(this.map);
          const latLngString = marker.getLatLng().toString();
          const timestamp = new Date();

          const newentry = {latlng: latLngString, timestamp};


          if (this.locationList.find(x => x.latlng == newentry.latlng) == undefined) {
            this.locationList.push(newentry);
          }


          this.latLngNew = latLngString;
          console.log(this.locationList);

        }
      })
    }


  }

  private map: L.Map | null = null;

  latLngNew: String = "";

  private initMap(): void {
    console.log("seas");


    const map = L.map('map', {
      center: [18, 46],
      zoom: 3,
      maxBounds: [[-90, -180], [90, 180]],
      minZoom: 3
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(map);

    var temp = map.locate({setView: true, maxZoom: 16});


    map.on('locationfound', function (locationEvent) {
      console.log(locationEvent)
      L.marker(locationEvent.latlng).addTo(map);
    })

    this.map = map;

  }

  ngAfterViewInit(): void {
    this.initMap();
  }

}
