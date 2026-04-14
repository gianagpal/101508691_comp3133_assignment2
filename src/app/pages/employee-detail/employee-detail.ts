import { Component, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-employee-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './employee-detail.html'
})
export class EmployeeDetail implements OnInit {
  employee: any = null;
  error = '';
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') || '';

    this.auth.getEmployeeById(id).subscribe({
      next: (data) => {
        this.ngZone.run(() => {
          this.employee = data;
          this.loading = false;
          this.error = '';
          this.cdr.detectChanges();
        });
      },
      error: (err) => {
        this.ngZone.run(() => {
          console.error(err);
          this.error = 'Failed to load employee details';
          this.loading = false;
          this.cdr.detectChanges();
        });
      }
    });
  }
}