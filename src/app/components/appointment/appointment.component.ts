// appointment.component.ts
import { Component, OnInit } from '@angular/core';
import { Appointment } from 'src/app/models/appointment.model';
import { AppointmentService } from 'src/app/services/appointment.service';
import { Vet } from 'src/app/models/veterinaire.model';
import { Pet } from 'src/app/models/pet.model';
import { PetService } from 'src/app/services/pet.service';
import { VetService } from 'src/app/services/veterinaire.service';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {
  appointments: Appointment[] = [];
  pets: Pet[] = [];
  vets: Vet[] = [];

  selectedAppointment: Appointment = this.emptyAppointment();
  showPopup: boolean = false;
  isEditMode: boolean = false;

  constructor(
    private appointmentService: AppointmentService,
    private petService: PetService,
    private vetService: VetService
  ) {}

  ngOnInit(): void {
    this.loadAppointments();
    this.petService.getPets().subscribe(data => this.pets = data);
    this.vetService.getAll().subscribe(data => this.vets = data);
  }

  loadAppointments() {
    this.appointmentService.getAll().subscribe(data => this.appointments = data);
  }

  openAddPopup() {
    this.isEditMode = false;
    this.selectedAppointment = this.emptyAppointment();
    this.showPopup = true;
  }

  openEditPopup(appointment: Appointment) {
    this.isEditMode = true;
    this.selectedAppointment = { ...appointment };
    this.showPopup = true;
  }

  closePopup() {
    this.showPopup = false;
  }

  saveAppointment() {
    if (this.isEditMode && this.selectedAppointment.id != null) {
      this.appointmentService.update(this.selectedAppointment).subscribe(() => {
        this.loadAppointments();
        this.closePopup();
      });
    } else {
      this.appointmentService.create(this.selectedAppointment).subscribe(() => {
        this.loadAppointments();
        this.closePopup();
      });
    }
  }

  deleteAppointment(id: number) {
    this.appointmentService.delete(id).subscribe(() => this.loadAppointments());
  }

  getPetName(petId: number): string {
    const pet = this.pets.find(p => p.id === petId);
    return pet ? pet.name : '';
  }

  getVetName(vetId: number): string {
    const vet = this.vets.find(v => v.id === vetId);
    return vet ? `${vet.firstName} ${vet.lastName}` : '';
  }

  private emptyAppointment(): Appointment {
    return { id: 0, petId: 0, vetId: 0, date: '', description: '' };
  }
}