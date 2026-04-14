import { Component, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-employee-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './employee-edit.html'
})
export class EmployeeEdit implements OnInit {
  id = '';
  username = '';
  employee: any = {
    first_name: '',
    last_name: '',
    email: '',
    gender: 'Male',
    designation: '',
    salary: null,
    date_of_joining: '',
    department: '',
    employee_photo_base64: ''
  };

  error = '';
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    private router: Router,
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef
  ) {}

  private formatDateForInput(value: any): string {
    if (!value) return '';

    const d = new Date(value);
    if (isNaN(d.getTime())) return '';

    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  ngOnInit(): void {
    this.username = this.auth.getUsername();
    this.id = this.route.snapshot.paramMap.get('id') || '';

    this.auth.getEmployeeById(this.id).subscribe({
      next: (data) => {
        this.ngZone.run(() => {
          console.log('EDIT EMPLOYEE DATA:', data);

          this.employee = {
            ...data,
            date_of_joining: this.formatDateForInput(data?.date_of_joining),
            employee_photo_base64: ''
          };

          this.loading = false;
          this.error = '';
          this.cdr.detectChanges();
        });
      },
      error: (err) => {
        this.ngZone.run(() => {
          console.error('EDIT LOAD ERROR:', err);
          this.error = 'Failed to load employee';
          this.loading = false;
          this.cdr.detectChanges();
        });
      }
    });
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      this.employee.employee_photo_base64 = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  validateEmployee(): string {
    if (!this.employee.first_name?.trim()) return 'First name is required.';
    if (!this.employee.last_name?.trim()) return 'Last name is required.';
    if (!this.employee.email?.trim()) return 'Email is required.';

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.employee.email)) return 'Please enter a valid email.';

    if (!['Male', 'Female', 'Other'].includes(this.employee.gender)) {
      return 'Please select a valid gender.';
    }

    if (!this.employee.designation?.trim()) return 'Designation is required.';
    if (!this.employee.salary || Number(this.employee.salary) < 1000) {
      return 'Salary must be at least 1000.';
    }

    if (!this.employee.date_of_joining) return 'Date of joining is required.';
    if (!this.employee.department?.trim()) return 'Department is required.';

    return '';
  }

  onSubmit(): void {
    this.error = '';

    const validationError = this.validateEmployee();
    if (validationError) {
      this.error = validationError;
      return;
    }

    const updateInput: any = {
      first_name: this.employee.first_name,
      last_name: this.employee.last_name,
      email: this.employee.email,
      gender: this.employee.gender,
      designation: this.employee.designation,
      salary: Number(this.employee.salary),
      date_of_joining: this.employee.date_of_joining,
      department: this.employee.department
    };

    if (this.employee.employee_photo_base64) {
      updateInput.employee_photo_base64 = this.employee.employee_photo_base64;
    }

    this.auth.updateEmployee(this.id, updateInput).subscribe({
      next: (res) => {
        if (res.success) {
          this.router.navigate(['/employees']);
        } else {
          this.error = res.message || 'Update failed';
        }
      },
      error: (err) => {
        console.error(err);
        this.error = 'Update failed';
      }
    });
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}