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

  onSubmit(): void {
    this.error = '';
    this.success = '';

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