import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  StrongPasswordRegx: RegExp = /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/;
  
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern(this.StrongPasswordRegx)])
  });

  onLogin(myForm: FormGroup) {
    if(myForm.get('email')?.invalid) {
      alert("Email invalid");
      return;
    }

    if(myForm.get('password')?.invalid) {
      alert("Password invalid");
      return;
    }

    const {email, password} = myForm.value;
    this.authService.login(email, password).subscribe({
      next: (res) => {
        const role = res.data?.adminRoleDto;
        if(res.data?.adminRoleDto.adminRoleName === "Super Admin") {
          this.authService.setLoggedIn(res.data.adminId.toString(), res.data.adminName);
          this.router.navigate(['/dashboard']);
        } else {
          alert('Login Failed');
        }
      }, error: (e) => {
        alert("Something went wrong");
      }
    })
  }

  // onLogin() {
  //   if(this.loginForm.invalid) {
  //     alert("Email or password invalid");
  //     return;
  //   }

  //   if(this.loginForm.value.email === "mbappe@topbank.id" && this.loginForm.value.password !== "SuperAdmin123" || this.loginForm.value.email === "toni@topbank.id" && this.loginForm.value.password !== "Admin123") {
  //     alert("Email or password unmatched");
  //     return;
  //   }

  //   if(this.loginForm.value.email !== "mbappe@topbank.id" && this.loginForm.value.password === "SuperAdmin123" || this.loginForm.value.email !== "toni@topbank.id" && this.loginForm.value.password === "Admin123") {
  //     alert("Email or password unmatched");
  //     return;
  //   }

  //   const {email, password} = this.loginForm.value;
  //   this.authService.login(email, password).subscribe(
  //     (res) => {
  //       const userData = res.data;
  //       // console.log(userData);
  //       if(userData.adminEmail === this.loginForm.value.email && userData.adminRoleDto.adminRoleName === "Super Admin") {
  //         this.authService.setLoggedIn(this.loginResponse.data!.adminId.toString(), this.loginResponse.data!.adminName);
  //         this.router.navigate(['/dashboard']);
  //       } else {
  //         alert('Login Failed');
  //       }

  //     }, err => {
  //       alert("Something wrong");
  //     }
  //   )
  // }
}

