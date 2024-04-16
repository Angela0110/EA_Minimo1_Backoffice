import { RouterModule, Routes } from '@angular/router';
import { ActivityComponent } from './activity/activity.component';
import { UsersComponent } from './users/users.component';
import { NgModule } from '@angular/core';
import { LocationsComponent } from './locations/locations.component';

export const routes: Routes = [{
    path: 'activities',
    component: ActivityComponent
  },
  {
    path: 'users',
    component: UsersComponent
  },
  {
    path: 'locations',
    component: LocationsComponent
  },
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full'
  }
];

export class AppRoutingModule { };
