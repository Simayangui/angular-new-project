import { Component, AfterViewInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { DashboardService } from '../../services/dashboard.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements AfterViewInit {
  constructor(private dashboardService: DashboardService,private authService: AuthService, private router: Router) {}
  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
    }
  }
  ngAfterViewInit(): void {
    this.loadAppointmentsByVet();
    this.loadPetsBySpecies();
    this.loadAppointmentsBySpecialty();
    this.loadOwnersByCity();
  }

  loadAppointmentsByVet() {
    this.dashboardService.getAppointmentsByVet().subscribe(data => {
      const labels = data.map(d => d.name);
      const values = data.map(d => d.count);
      console.log(labels,values)

      const ctx = document.getElementById('appointmentsChart') as HTMLCanvasElement;

      new Chart(ctx, {
        type: 'bar',
        data: {
          labels,
          datasets: [{
            label: 'Nombre de RDV par vétérinaire',
            data: values,
            backgroundColor: '#36A2EB',
            borderColor: '#fff',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: false },
            title: {
              display: true,
              text: 'RDV par vétérinaire'
            }
          },
          scales: {
            y: { beginAtZero: true }
          }
        }
      });
    });
  }

  loadPetsBySpecies() {
    this.dashboardService.getPetsBySpecies().subscribe(data => {
      const labels = data.map(d => d.species);
      const values = data.map(d => d.count);

      const ctx = document.getElementById('speciesChart') as HTMLCanvasElement;

      new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels,
          datasets: [{
            label: 'Animaux par espèce',
            data: values,
            backgroundColor: [
              '#FF6384', '#36A2EB', '#FFCE56',
              '#4BC0C0', '#9966FF', '#FF9F40'
            ],
            borderColor: '#fff',
            borderWidth: 2
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: true,
              position: 'bottom'
            },
            title: {
              display: true,
              text: 'Répartition des animaux par espèce'
            }
          }
        }
      });
    });
  }

  loadAppointmentsBySpecialty() {
    this.dashboardService.getAppointmentsBySpecialty().subscribe(data => {
      const labels = data.map(d => d.specialty);
      const values = data.map(d => d.count);

      const ctx = document.getElementById('specialtyChart') as HTMLCanvasElement;

      new Chart(ctx, {
        type: 'bar',
        data: {
          labels,
          datasets: [{
            label: 'RDV par spécialité',
            data: values,
            backgroundColor: '#FF9F40',
            borderColor: '#fff',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: false },
            title: {
              display: true,
              text: 'RDV par spécialité vétérinaire'
            }
          },
          scales: {
            y: { beginAtZero: true }
          }
        }
      });
    });
  }

  loadOwnersByCity() {
    this.dashboardService.getOwnersByCity().subscribe(data => {
      const labels = data.map(d => d.city);
      const values = data.map(d => d.count);

      const ctx = document.getElementById('cityChart') as HTMLCanvasElement;

      new Chart(ctx, {
        type: 'pie',
        data: {
          labels,
          datasets: [{
            label: 'Propriétaires par ville',
            data: values,
            backgroundColor: [
              '#36A2EB', '#FF6384', '#FFCE56',
              '#4BC0C0', '#9966FF', '#FF9F40'
            ],
            borderColor: '#fff',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: true,
              position: 'bottom'
            },
            title: {
              display: true,
              text: 'Nombre de propriétaires par ville'
            }
          }
        }
      });
    });
  }
}
