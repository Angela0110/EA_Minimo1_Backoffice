import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LocationService } from '../services/location.service';
import { ReactiveFormsModule } from '@angular/forms';
import { NgIf, NgFor, UpperCasePipe} from '@angular/common';
import {FormsModule} from '@angular/forms';
import { Location } from '../models/location';
import { Activity } from '../models/activity';
import { ActivityDetailsComponent } from '../activity-details/activity-details.component';


@Component({
  selector: 'app-locations',
  standalone: true,
  imports: [FormsModule, NgIf, NgFor, UpperCasePipe, ReactiveFormsModule, ActivityDetailsComponent],
  templateUrl: './locations.component.html',
  styleUrl: './locations.component.css'
})
export class LocationsComponent {
  
  @Output() deselect = new EventEmitter<void>();
  @Output() activitySelected = new EventEmitter<boolean>();
  selectedActivity?: Activity;
  activityUpdated?: Activity;
  isActivitySelected: boolean = false;

  locations: Location[] = [];

  //activity: Activity;

  postLocationForm: FormGroup;

  showAddLocationForm: boolean = false;

  constructor( public locationService: LocationService, private formBuilder: FormBuilder){
    this.postLocationForm = this.formBuilder.group({
      address: this.formBuilder.group({
        street: ['', [Validators.required]],
        postalcode: ['', [Validators.required]],
        city: ['', [Validators.required]]
      }),
      activity: ['', [Validators.required]]
    });
  }

  async postLocation(): Promise<void>{
    if (this.postLocationForm.valid) {
            await this.locationService.postLocation(this.postLocationForm.value).subscribe((res: any) => {
              this.locations.push(res.location);
              this.postLocationForm.reset();
      });
    } else {
      console.error("El formulario no es válido. No se puede agregar la localización.");
    }
  } 

  ngOnInit(): void {
    this.locationService.getLocations().subscribe (locations =>{
      this.locations=locations;
    });
  }

  showAddLocation(state: boolean) {
    this.showAddLocationForm = state;
  }

  onSelect(activity: Activity): void {
    this.selectedActivity = activity;
    this.isActivitySelected = true;
    this.activitySelected.emit(true);
  }

  deselectActivity(): void {
    /* if (this.selectedActivity && this.activityUpdated) {
      const index = this.activities.findIndex(activity => activity._id === this.selectedActivity!._id);
      if (index !== -1) {
        this.activities[index] = this.activityUpdated;
      }
    } */
     
    this.selectedActivity = undefined;
    this.isActivitySelected = false;
    this.activitySelected.emit(false); 
  }

  onActivityUpdated(activity: Activity): void {
    this.activityUpdated = activity;
  }

  onDelete(location: Location): void {
    const location_id = location._id;
    this.locationService.deleteLocation(location_id!).subscribe(() => {

      const index = this.locations.findIndex(loc => loc._id === location_id);
      if (index !== -1) {
        this.locations.splice(index, 1);
      }
    }, error => {
      console.error("Error al eliminar la ubicación:", error);
    });    
  }

}
