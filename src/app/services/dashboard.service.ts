import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}
  getAppointmentsByVet() {
    return forkJoin({
      appointments: this.http.get<any[]>(`${this.baseUrl}/appointements`),
      vets: this.http.get<any[]>(`${this.baseUrl}/vets`)
    }).pipe(
      map(({ appointments, vets }) => {
        console.log('Appointments:', appointments);
        console.log('Vets:', vets);
  
        return vets.map(vet => {
          const vetAppointments = appointments.filter(app => app.vetId === vet.id);
          return {
            name: `${vet.firstName} ${vet.lastName}`,
            count: vetAppointments.length
          };
        });
      })
    );
  }
  
  getPetsBySpecies() {
    return this.http.get<any[]>(`${this.baseUrl}/pets`).pipe(
      map(pets => {
        const speciesMap: { [key: string]: number } = {};
        pets.forEach(pet => {
          const species = pet.species;
          speciesMap[species] = (speciesMap[species] || 0) + 1;
        });
        return Object.entries(speciesMap).map(([species, count]) => ({
          species,
          count
        }));
      })
    );
  }

  
  getAppointmentsBySpecialty() {
    return forkJoin({
      appointments: this.http.get<any[]>(`${this.baseUrl}/appointements`),
      vets: this.http.get<any[]>(`${this.baseUrl}/vets`)
    }).pipe(
      map(({ appointments, vets }) => {
        const specialtyMap: { [key: string]: number } = {};
        appointments.forEach(app => {
          const vet = vets.find(v => v.id === app.vetId);
          if (vet) {
            specialtyMap[vet.speciality] = (specialtyMap[vet.speciality] || 0) + 1;
          }
        });
        return Object.entries(specialtyMap).map(([specialty, count]) => ({ specialty, count }));
      })
    );
  }
  
  getOwnersByCity() {
    return this.http.get<any[]>(`${this.baseUrl}/owners`).pipe(
      map(owners => {
        const cityMap: { [key: string]: number } = {};
        owners.forEach(owner => {
          cityMap[owner.adresse] = (cityMap[owner.adresse] || 0) + 1;
        });
        return Object.entries(cityMap).map(([city, count]) => ({ city, count }));
      })
    );
  }
  
}
