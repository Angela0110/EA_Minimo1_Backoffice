import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Location } from '../models/location';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http:HttpClient) { }

  postLocation(newLocation: Location){
    return this.http.post<void>('http://127.0.0.1:3000/location/', newLocation);
  }

  getLocations() {
    return this.http.get<Location[]>('http://127.0.0.1:3000/location' );
  }

  deleteLocation(locationID: String) {
    return this.http.delete<void>('http://127.0.0.1:3000/location/' + locationID);
  }

}
