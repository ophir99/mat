import { Component } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { MatSnackBar } from "@angular/material";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  url = "http://localhost:8900";
  title = "project-x";
  showLogin = true;
  signupForm;
  signinForm;
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private snack: MatSnackBar
  ) {
    this.createSignupForm();
    this.createSigninForm();
  }
  createSignupForm() {
    this.signupForm = this.fb.group({
      name: [],
      email: [],
      password: []
    });
  }
  createSigninForm() {
    this.signinForm = this.fb.group({
      name: [],
      password: []
    });
  }
  createUser() {
    console.log(this.signupForm.value);
    this.http.post(`${this.url}/createUser`, this.signupForm.value).subscribe(
      data => {
        console.log(data);
        this.snack.open("User created", "", { duration: 500 });
      },
      err => {
        console.log(err);
      },
      () => {}
    );
  }

  usersignIn() {
    this.http
      .post(`${this.url}/login`, this.signinForm.value)
      .subscribe(res => {
        console.log(res);
        this.snack.open("Logged in Successfully", "", { duration: 2000 });
        if (res.msg == "User not found") {
          this.snack.open("USer not found. Try creating your account", "", {
            duration: 3000
          });
        }
      });
  }
}
