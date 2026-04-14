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

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || '';

    this.auth.getEmployeeById(this.id).subscribe({
  next: (data) => {
    this.ngZone.run(() => {
      this.employee = {
        ...data,
        date_of_joining: data?.date_of_joining
          ? new Date(data.date_of_joining).toISOString().split('T')[0]
          : '',
        employee_photo_base64: ''
      };
      this.loading = false;
      this.error = '';
      this.cdr.detectChanges();
    });
  },
  error: (err) => {
    this.ngZone.run(() => {
      console.error(err);
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

  onSubmit(): void {
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
}