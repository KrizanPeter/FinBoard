import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {

  constructor(private authService: AuthService) { }
  isLoading = false;
  ngOnInit(): void {
  }

  onSubmit(form: NgForm){
    this.isLoading = true;
    console.log(form.value)
    this.authService.register(form.value.nickName, form.value.email, form.value.password).subscribe(
      resData => {
        this.isLoading = false;
        console.log("Register response data");
        console.log(resData);
      }, 
      error => {
        this.isLoading = false;
        console.log(error);
      }
    );

    form.reset();
  }

}
