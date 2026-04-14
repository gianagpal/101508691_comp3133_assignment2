import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-employee-add',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './employee-add.html'
})
export class EmployeeAdd {
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
  success = '';

  constructor(private auth: AuthService, private router: Router) {}

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
    if (!this.employee.first_name.trim()) return 'First name is required.';
    if (!this.employee.last_name.trim()) return 'Last name is required.';
    if (!this.employee.email.trim()) return 'Email is required.';

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.employee.email)) return 'Please enter a valid email.';

    if (!['Male', 'Female', 'Other'].includes(this.employee.gender)) {
      return 'Please select a valid gender.';
    }

    if (!this.employee.designation.trim()) return 'Designation is required.';
    if (!this.employee.salary || Number(this.employee.salary) < 1000) {
      return 'Salary must be at least 1000.';
    }

    if (!this.employee.date_of_joining) return 'Date of joining is required.';
    if (!this.employee.department.trim()) return 'Department is required.';
    if (!this.employee.employee_photo_base64) return 'Profile picture is required.';

    return '';
  }

  onSubmit(): void {
    this.error = '';
    this.success = '';

    const validationError = this.validateEmployee();
    if (validationError) {
      this.error = validationError;
      return;
    }

    this.auth.addEmployee(this.employee).subscribe({
      next: (res) => {
        if (res.success) {
          this.success = 'Employee added successfully';
          this.router.navigate(['/employees']);
        } else {
          this.error = res.message || 'Add failed';
        }
      },
      error: (err) => {
        console.error(err);
        this.error = 'Add failed';
      }
    });
  }
}