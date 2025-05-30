export interface Appointment {
  id: number;
  petId: number;
  vetId: number;
  date: string; // ISO format
  description: string;
}
