import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  userForm: FormGroup;
  hide = true;
  hideConfirmPassword = true;

  async ngOnInit(): Promise<void> {
    let result = await this.authService.asycUserAuthentication();

    if (result) {
      this.router.navigate(['/publications']);
    }
  }

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder
  ) {
    this.userForm = this.fb.group(
      {
        email: [
          '',
          [Validators.required, Validators.email, Validators.maxLength(100)],
        ],
        password: ['', [Validators.required, Validators.maxLength(60)]],
        confirmPassword: ['', [Validators.required, Validators.maxLength(60)]],
      },
      { validators: this.passwordMatchValidator }
    );
  }
  register(email: string, password: string, confirmPassword: string) {
    this.authService.register(email, password, confirmPassword);
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
      verticalPosition: 'top',
    });
  }
  toLogin() {
    this.router.navigate(['']);
  }

  onSubmit() {
    const emailControl = this.userForm.get('email');
    const passwordControl = this.userForm.get('password');
    const confirmPasswordControl = this.userForm.get('confirmPassword');

    if (
      emailControl &&
      passwordControl &&
      confirmPasswordControl &&
      this.userForm.valid
    ) {
      const email = emailControl.value;
      const password = passwordControl.value;
      const confirmPassword = confirmPasswordControl.value;

      this.register(email, password, confirmPassword);
    }
  }

  passwordMatchValidator(form: FormGroup) {
    const passwordControl = form.get('password');
    const confirmPasswordControl = form.get('confirmPassword');

    if (passwordControl && confirmPasswordControl) {
      const password = passwordControl.value;
      const confirmPassword = confirmPasswordControl.value;

      if (password !== confirmPassword) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }
    }

    return null;
  }

  getErrorMessage(controlName: string): string {
    const control = this.userForm.get(controlName);

    if (!control) {
      return ''; // Return an empty string if the control is null
    }

    if (control.hasError('required')) {
      return 'Field is required';
    }

    if (controlName === 'email' && control.hasError('email')) {
      return 'Invalid email';
    }

    if (
      controlName === 'confirmPassword' &&
      control.hasError('passwordMismatch')
    ) {
      return "Passwords don't match";
    }

    return '';
  }
}
