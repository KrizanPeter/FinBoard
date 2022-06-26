import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }
  isLoading = false;

  ngOnInit(): void {
  }

  onSubmit(form: NgForm){
    this.isLoading = true;
    this.authService.login(form.value.email, form.value.password).subscribe(
      resData => {
        this.isLoading = false;
        this.router.navigate(['/account']);
      }, 
      error => {
        this.isLoading = false;
        console.log(error);
      }
    );

    form.reset();
  }

}
