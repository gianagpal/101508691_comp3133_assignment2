import { Component, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './employee-list.html'
})
export class EmployeeList implements OnInit {
  employees: any[] = [];
  error = '';
  loading = true;
  searchTerm = '';

  constructor(
    private auth: AuthService,
    private router: Router,
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    this.loading = true;
    this.error = '';

    this.auth.getAllEmployees().subscribe({
      next: (data) => {
        this.ngZone.run(() => {
          this.employees = data || [];
          this.loading = false;
          this.cdr.detectChanges();
        });
      },
      error: (err) => {
        this.ngZone.run(() => {
          console.error(err);
          this.error = 'Failed to load employees';
          this.loading = false;
          this.cdr.detectChanges();
        });
      }
    });
  }

  onSearch(): void {
    if (!this.searchTerm.trim()) {
      this.loadEmployees();
      return;
    }

    this.loading = true;
    this.error = '';

    this.auth.searchEmployees(this.searchTerm.trim()).subscribe({
      next: (data) => {
        this.ngZone.run(() => {
          this.employees = data || [];
          this.loading = false;
          this.cdr.detectChanges();
        });
      },
      error: (err) => {
        this.ngZone.run(() => {
          console.error(err);
          this.error = 'Search failed';
          this.loading = false;
          this.cdr.detectChanges();
        });
      }
    });
  }

  deleteEmployee(id: string): void {
    const confirmDelete = window.confirm('Are you sure you want to delete this employee?');
    if (!confirmDelete) return;

    this.auth.deleteEmployee(id).subscribe({
      next: (res) => {
        if (res.success) {
          this.loadEmployees();
        } else {
          this.error = res.message || 'Delete failed';
        }
      },
      error: (err) => {
        console.error(err);
        this.error = 'Delete failed';
      }
    });
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  resetSearch(): void {
  this.searchTerm = '';
  this.loadEmployees();
}
}