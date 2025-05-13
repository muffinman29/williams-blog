import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { first } from 'rxjs';
import { UserService } from '../services/user.service';
import { passwordMatchValidator } from '../validators/password-match-validator';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [HttpClientModule, CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  submitted = false;
  errorMessage = '';
  successMessage = '';

  constructor(
      private userService: UserService
    ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
          username: new FormControl('', [Validators.required]),
          password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$')]),
          confirmPassword: new FormControl('', [Validators.required,
                                                Validators.minLength(8),
                                                Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$')]),
          firstName: new FormControl('', [Validators.required]),
          lastName: new FormControl('', [Validators.required])
        }, { validators: passwordMatchValidator() });
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
      this.submitted = true;

      if (this.form.invalid) {
        this.errorMessage = 'Please fill in all required fields correctly.';
        console.error('Form is invalid:', this.form.errors);
        return;
      }

      this.loading = true;
      const user = {
        userId: 0,
        username: this.f['username'].value,
        password: this.f['password'].value,
        firstName: this.f['firstName'].value,
        lastName: this.f['lastName'].value
      };
      this.userService
        .register(user)
        .pipe(first())
        .subscribe({
          next: () => {
            this.loading = false;
          },
          error: (error) => {
            // this.error = error;
            this.errorMessage = error.error.message;
            console.error('Error registering user:', error);
            this.loading = false;
          },
          complete: () => {
            console.log('User registered successfully');
            // this.success = 'User registered successfully';
            this.successMessage = 'User registered successfully';
            this.form.reset();
            this.loading = false;
          }
        });
    }
}
