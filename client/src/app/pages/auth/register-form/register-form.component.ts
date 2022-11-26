import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }
  isLoading = false;
  ngOnInit(): void {
  }

  onSubmit(form: NgForm){
    this.isLoading = true;
    this.authService.register(form.value.registerUserName.trim(), form.value.registerEmail.trim(), form.value.registerPassword).subscribe(
      resData => {
        this.isLoading = false;
        this.router.navigate(['/create-guide']);
      }, 
      error => {
        this.isLoading = false;
        console.log(error);
      }
    );
    form.reset();
  }

}
