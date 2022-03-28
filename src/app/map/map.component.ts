import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  
  moveoLocation:google.maps.LatLngLiteral = { lat:32.06478200837587, lng:34.77182675541776}
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
    
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();
    this.map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
      mapId : 'df48bb85277d9b52',
      center: this.moveoLocation,
      zoom: 13,
    } as google.maps.MapOptions
    );
    directionsRenderer.setMap(this.map);
    this.init_marker = new google.maps.Marker({
      position : this.moveoLocation,
      map:this.map
    })
    this.markers.push(this.init_marker)
    this.autoComplete()

    const onChangeHandler = function () {
      calculateAndDisplayRoute(directionsService, directionsRenderer);
    };
   
    (document.getElementById("directionBtn") as HTMLElement).addEventListener(
      "click",
      onChangeHandler
    );
    function calculateAndDisplayRoute(
      directionsService: google.maps.DirectionsService,
      directionsRenderer: google.maps.DirectionsRenderer
    ) :void {
      const home= new google.maps.LatLng(32.1079047897289, 34.793777270760415)
      const work = new google.maps.LatLng(32.06478200837587, 34.77182675541776)
      
      
      var request = {
        origin: home,
        destination: work,
        travelMode: google.maps.TravelMode.DRIVING,
      };
      directionsService.route(request, function(result, status) {
        if (status == 'OK') {
          directionsRenderer.setDirections(result);
        }
      });
    }
  }
  
 

  autoComplete():void{
    
    
    this.autocomplete = new google.maps.places.Autocomplete(
      document.getElementById('autocomplete') as HTMLInputElement,
      {
        bounds:this.defaultBounds,
      types:['establishment'],
      componentRestrictions: { country: "IL" },
      fields: ["place_id", "geometry", "name"],
      strictBounds:false
      });
      
      const map = this.map

      this.autocomplete.bindTo("bounds", map);
     
       
       
      this.autocomplete.addListener("place_changed", () => {
          // Clear out the old markers.
      this.markers.forEach((marker) => {
        marker.setMap(null);
        });
      this.markers = [];
      // add new marker to markers list
      const marker = new google.maps.Marker({
        map,
        anchorPoint: new google.maps.Point(0, -29),
      });
      this.markers.push(marker)
        marker.setVisible(false);
    
        const place = this.autocomplete.getPlace();
    
        if (!place.geometry || !place.geometry.location) {
          // User entered the name of a Place that was not suggested and
          // pressed the Enter key, or the Place Details request failed.
          window.alert("No details available for input: '" + place.name + "'");
          return;
        }
    
        // If the place has a geometry, then present it on a map.
        if (place.geometry.viewport) {
          map.fitBounds(place.geometry.viewport);
        } else {
          map.setCenter(place.geometry.location);
          map.setZoom(17);
        }
    
        marker.setPosition(place.geometry.location);
        marker.setVisible(true);
    
     
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

}


}