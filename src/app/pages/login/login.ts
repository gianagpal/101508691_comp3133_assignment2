import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './login.html'
})
export class Login {
  usernameOrEmail = '';
  password = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  onLogin(): void {
    this.error = '';

    this.auth.login(this.usernameOrEmail, this.password).subscribe({
      next: (res) => {
        if (res.success) {
          this.auth.saveToken(res.token);
          this.router.navigate(['/employees']);
        } else {
          this.error = res.message || 'Login failed';
        }
      },
      error: (err) => {
        console.error(err);
        this.error = 'Login failed';
      }
    });
  }
}