import { Component, OnInit } from '@angular/core';
import { VetService } from '../../services/veterinaire.service';
import { Vet } from '../../models/veterinaire.model'; // adjust if needed

@Component({
  selector: 'app-veterinaire',
  templateUrl: './veterinaire.component.html',
  styleUrls: ['./veterinaire.component.css']
})
export class VeterinaireComponent implements OnInit {
  veterinarians: Vet[] = [];
  selectedVeterinaire: Partial<Vet> = {};
  showPopup: boolean = false;
  isEditMode: boolean = false;

  constructor(private vetService: VetService) {}

  ngOnInit(): void {
    this.loadVeterinaires();
  }

  loadVeterinaires() {
    this.vetService.getAll().subscribe(data => {
      this.veterinarians = data;
    });
  }

  openAddPopup() {
    this.selectedVeterinaire = {};
    this.isEditMode = false;
    this.showPopup = true;
  }

  openEditPopup(vet: Vet) {
    this.selectedVeterinaire = { ...vet };
    this.isEditMode = true;
    this.showPopup = true;
  }

  saveVeterinaire() {
    if (this.isEditMode && this.selectedVeterinaire.id != null) {
      this.vetService.update(this.selectedVeterinaire as Vet).subscribe(() => {
        this.loadVeterinaires();
        this.closePopup();
      });
    } else {
      this.vetService.create(this.selectedVeterinaire as Vet).subscribe(() => {
        this.loadVeterinaires();
        this.closePopup();
      });
    }
  }

  deleteVeterinaire(id: number) {
    if (confirm('Are you sure you want to delete this veterinarian?')) {
      this.vetService.delete(id).subscribe(() => {
        this.loadVeterinaires();
      });
    }
  }

  closePopup() {
    this.showPopup = false;
  }
}
