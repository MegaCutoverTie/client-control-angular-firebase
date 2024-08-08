import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  email: string | undefined;
  password: string | undefined;

  constructor(private router: Router, private loginService: LoginService){

  }

  ngOnInit(): void {
    this.loginService.getAuth().subscribe(auth => {
      if(auth){
        this.router.navigate(['/'])
      }
    })
  }

  login(){
    if(this.email && this.password){
      this.loginService.login(this.email, this.password)
      .then(res => {
        this.router.navigate(['/'])
      })
      .catch(error => {
        console.log(error.message)
      })
    }else{
      console.log('Email and password are required');
    }
  }
}
