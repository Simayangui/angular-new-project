import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';
  error = '';

  constructor(private authService: AuthService, private router: Router) {}

  // Redirige vers dashboard si déjà connecté
  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/dashboard']);
    }
  }

  onSubmit() {
    this.authService.login(this.email, this.password).subscribe({
      next: (res) => {
        if (res.length > 0) {
          this.router.navigate(['/dashboard']);
        } else {
          this.error = 'Email ou mot de passe incorrect.';
        }
      },
      error: () => {
        this.error = 'Une erreur est survenue lors de la connexion.';
      }
    });
  }
}
