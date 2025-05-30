import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component'; // ajuste si l'emplacement est différent

import { authGuard } from './guards/auth.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { OwnerComponent } from './components/owner/owner.component';
import { PetsComponent } from './components/pets/pets.component';
import { VeterinaireComponent } from './components/veterinaire/veterinaire.component';
import { AppointmentService } from './services/appointment.service';
import { AppointmentComponent } from './components/appointment/appointment.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'owners', component: OwnerComponent, canActivate: [authGuard] },
  { path: 'pets', component: PetsComponent, canActivate: [authGuard] },
  { path: 'veterinaire', component: VeterinaireComponent, canActivate: [authGuard] },
  { path: 'appointement', component: AppointmentComponent, canActivate: [authGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
