import { Component, OnInit } from '@angular/core';
import { PetService } from 'src/app/services/pet.service';
import { Pet } from 'src/app/models/pet.model';
import { Owner } from 'src/app/models/owner.model';
import { OwnerService } from 'src/app/services/owner.service';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.css']
})
export class PetsComponent implements OnInit {
  pets: Pet[] = [];
  owners: Owner[] = [];
  selectedPet: Pet = { id:0,name: '', birthDate: '', species: '', owner_id: 0 };
  showPopup: boolean = false;
  isEditMode: boolean = false;

  constructor(private petService: PetService, private ownerService: OwnerService) {}

  ngOnInit(): void {
    this.loadPets();
    this.loadOwners();
  }

  loadPets() {
    this.petService.getPets().subscribe((data) => {
      this.pets = data;
    });
  }

  loadOwners() {
    this.ownerService.getOwners().subscribe((data) => {
      this.owners = data;
    });
  }

  openAddPopup() {
    this.selectedPet = {id:0, name: '', birthDate: '', species: '', owner_id: 0 };
    this.isEditMode = false;
    this.showPopup = true;
  }

  openEditPopup(pet: Pet) {
    this.selectedPet = { ...pet };
    this.isEditMode = true;
    this.showPopup = true;
  }

  savePet() {
    if (this.isEditMode) {
      this.petService.updatePet(this.selectedPet).subscribe(() => {
        this.loadPets();
        this.closePopup();
      });
    } else {
      this.petService.addPet(this.selectedPet).subscribe(() => {
        this.loadPets();
        this.closePopup();
      });
    }
  }

  deletePet(id: number) {
    if (confirm('Are you sure you want to delete this pet?')) {
      this.petService.deletePet(id).subscribe(() => {
        this.loadPets();
      });
    }
  }

  closePopup() {
    this.showPopup = false;
  }
  getOwnerName(ownerId: number): string {
    const owner = this.owners.find(o => o.id === ownerId);
    return owner ? owner.name : 'Unknown';
  }
  
}
