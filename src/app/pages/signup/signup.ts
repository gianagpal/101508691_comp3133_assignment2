import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './signup.html'
})
export class Signup {
  username = '';
  email = '';
  password = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  onSignup(): void {
    this.error = '';

    if (!this.username.trim()) {
      this.error = 'Username is required.';
      return;
    }

    if (!this.email.trim()) {
      this.error = 'Email is required.';
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      this.error = 'Please enter a valid email.';
      return;
    }

    if (!this.password.trim()) {
      this.error = 'Password is required.';
      return;
    }

    if (this.password.length < 6) {
      this.error = 'Password must be at least 6 characters.';
      return;
    }

    this.auth.signup(this.username, this.email, this.password).subscribe({
      next: (res) => {
        if (res.success) {
          this.auth.saveToken(res.token);
          this.router.navigate(['/employees']);
        } else {
          this.error = res.message || 'Signup failed';
        }
      },
      error: (err) => {
        console.error(err);
        this.error = 'Signup failed';
      }
    });
  }
}