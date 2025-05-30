import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.css']
})
export class OwnerComponent implements OnInit {
  owners: any[] = [];
  selectedOwner: any = {};
  isModalOpen = false;
  isEditMode = false;

  private apiUrl = 'http://localhost:3000/owners';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getOwners();
  }

  getOwners(): void {
    this.http.get<any[]>(this.apiUrl).subscribe((data) => {
      this.owners = data;
    });
  }

  openAddModal(): void {
    this.selectedOwner = {};
    this.isEditMode = false;
    this.isModalOpen = true;
  }

  openEditModal(owner: any): void {
    this.selectedOwner = { ...owner };
    this.isEditMode = true;
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.selectedOwner = {};
  }

  submitForm(): void {
    if (this.isEditMode) {
      // Modifier
      this.http.put(`${this.apiUrl}/${this.selectedOwner.id}`, this.selectedOwner).subscribe(() => {
        this.getOwners();
        this.closeModal();
      });
    } else {
      // Ajouter
      this.http.post(this.apiUrl, this.selectedOwner).subscribe(() => {
        this.getOwners();
        this.closeModal();
      });
    }
  }

  deleteOwner(id: number): void {
    if (confirm('Voulez-vous vraiment supprimer ce propriétaire ?')) {
      this.http.delete(`${this.apiUrl}/${id}`).subscribe(() => {
        this.getOwners();
      });
    }
  }
}
