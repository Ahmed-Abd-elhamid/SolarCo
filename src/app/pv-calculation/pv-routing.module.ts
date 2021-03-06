import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserInputComponent } from './user-input/user-input.component';
import { CalculateComponent } from './calculate/calculate.component';
import { PvSystemComponent } from './pv-system/pv-system.component';
import { AuthGuard } from '../shared/guards/auth.guard';
import { SystemsDetailsComponent } from './systems-details/systems-details.component';
// import { MapComponent } from './map/map.component';
const routes: Routes = [
  {
    path: 'pv-system/user-info',
    component: UserInputComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'pv-system/calculate',
    component: CalculateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'pv-system/details',
    component: SystemsDetailsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'pv-system/:id',
    component: PvSystemComponent,
    canActivate: [AuthGuard]
  },
  // {
  //   path: 'map',
  //   component: MapComponent,
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PvRoutingModule { }

  