import { Component } from '@angular/core';

declare var L: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage {
  private mymap: any;
  private carIcon: any;
  private routeCoordinates: any[];
  private carMarker: any;
  public animationStarted: boolean = false; // To prevent multiple animations


  constructor() {
    this.routeCoordinates = [
      [50.4501, 30.5234], // Kyiv
      // ... other intermediate coordinates along the M05
      [50.329378, 30.400118], [50.260871, 30.334178], [50.207286, 30.241481], [50.154999, 30.228916],
      [46.482526, 30.7233095] // Odessa
    ];
    this.carIcon = L.icon({
      iconUrl: 'assets/icon/car.png',
      iconSize: [32, 32]
    });
  }
  startAnimation() {
    if (!this.animationStarted) {
      this.animationStarted = true;
      this.animateCar(0);
    }
  }
  ionViewDidEnter() {
    setTimeout(() => this.initMap(), 300);
  }
  
  initMap() {
    this.mymap = L.map('mapid', {
      center: [50.4501, 30.5234],
      zoom: 6,
      maxBounds: [
        [44.3866, 22.1372],
        [52.3795, 40.2286]
      ]
    });

    
  
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.mymap);

    this.carMarker = L.marker(this.routeCoordinates[0], {icon: this.carIcon}).addTo(this.mymap);
    
  }
  
  animateCar(index: number) {
    if (index < this.routeCoordinates.length - 1) {
      console.log(`Animating to index: ${index}`, this.routeCoordinates[index]);
      this.carMarker.setLatLng(this.routeCoordinates[index]);
      index++; // Move the index increment inside the timeout function
      setTimeout(() => {
        this.animateCar(index);
      }, 1000);
    }
  }
}
