import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  
  moveoLocation = { lat:32.06478200837587, lng:34.77182675541776}
  carmel_market = { lat:32.068837540763475, lng:34.76903626875532}
  center = this.moveoLocation
  map: google.maps.Map;
  init_marker: google.maps.Marker;
  markers: google.maps.Marker[]=[];
  autocomplete: google.maps.places.Autocomplete;
  defaultBounds = {
    north: this.center.lat + 0.1,
    south: this.center.lat - 0.1,
    east: this.center.lng + 0.1,
    west: this.center.lng - 0.1,
  };
  constructor() { }
 

  ngOnInit(): void {
    this.initMap()
  }
 
  initMap():void{
    this.map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
      center: this.moveoLocation,
      zoom: 13,
    });
    this.init_marker = new google.maps.Marker({
      position : this.moveoLocation,
      map:this.map
    })
    this.markers.push(this.init_marker)
    this.autoComplete()

    var searchBox = new google.maps.places.SearchBox(document.getElementById("autocomplete") as HTMLInputElement, {
      bounds: this.defaultBounds
    });

    
      searchBox.addListener("places_changed", () => {
      const places = searchBox.getPlaces();
    
      if (places.length == 0) {
        return;
      }
    
      // Clear out the old markers.
      this.markers.forEach((marker) => {
        marker.setMap(null);
      });
      this.markers = [];
    
      // For each place, get the icon, name and location.
      const bounds = new google.maps.LatLngBounds();
    
      places.forEach((place) => {
        if (!place.geometry || !place.geometry.location) {
          console.log("Returned place contains no geometry");
          return;
        }
    
        const icon = {
          url: place.icon as string,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25),
        };
    
        // Create a marker for each place.
        this.markers.push(
          new google.maps.Marker({
            map:this.map,
            icon,
            title: place.name,
            position: place.geometry.location,
          })
        );
    
        if (place.geometry.viewport) {
          // Only geocodes have viewport.
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });

      this.map.fitBounds(bounds);
    });
     
     
  }
  autoComplete():void{

    this.autocomplete = new google.maps.places.Autocomplete(
      document.getElementById('autocomplete') as HTMLInputElement,
      {
        bounds:this.defaultBounds,
      types:['establishment'],
      componentRestrictions: { country: "il" },
      fields: ["place_id", "geometry", "name"],
      strictBounds:false
      });
}


fillInAddress() {
  // Get the place details from the autocomplete object.
  const place = this.autocomplete.getPlace();
  let address1 = "";
  let postcode = "";

  // Get each component of the address from the place details,
  // and then fill-in the corresponding field on the form.
  // place.address_components are google.maps.GeocoderAddressComponent objects
  // which are documented at http://goo.gle/3l5i5Mr
  for (const component of place.address_components as google.maps.GeocoderAddressComponent[]) {
    // @ts-ignore remove once typings fixed
    const componentType = component.types[0];

    switch (componentType) {
      case "street_number": {
        address1 = `${component.long_name} ${address1}`;
        break;
      }

      case "route": {
        address1 += component.short_name;
        break;
      }

      case "postal_code": {
        postcode = `${component.long_name}${postcode}`;
        break;
      }

      case "postal_code_suffix": {
        postcode = `${postcode}-${component.long_name}`;
        break;
      }

      case "locality":
        (document.querySelector("#locality") as HTMLInputElement).value =
          component.long_name;
        break;

      case "administrative_area_level_1": {
        (document.querySelector("#state") as HTMLInputElement).value =
          component.short_name;
        break;
      }

      case "country":
        (document.querySelector("#country") as HTMLInputElement).value =
          component.long_name;
        break;
    }
  }

  // address1Field.value = address1;
  // postalField.value = postcode;

  // After filling the form with address components from the Autocomplete
  // prediction, set cursor focus on the second address line to encourage
  // entry of subpremise information such as apartment, unit, or floor number.
 // address2Field.focus();
}
}