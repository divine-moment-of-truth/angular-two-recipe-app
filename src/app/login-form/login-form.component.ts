import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  errorMsg: string = "";

  constructor(private router:Router) { }

  ngOnInit() {
  }

  loginUser(e){
    e.preventDefault();

    var username = e.target.elements[0].value;
    var password = e.target.elements[1].value;

    console.log(username)

    if(username == 'admin' && password == 'password'){
      this.router.navigate(['readRecipes']);
    }
    else{
      this.errorMsg = "Incorrect username or password";
      e.target.elements[0].value = "";
      e.target.elements[1].value = "";
    }
  }
}
