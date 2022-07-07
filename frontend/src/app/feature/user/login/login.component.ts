import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroupDirective, NgForm, UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { LoginService } from "./login.service";
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;
  returnUrl: string;
  loginForm: UntypedFormGroup;
  // userNameControl = new FormControl('', [Validators.required, Validators.email]);
  // passwordControl = new FormControl('', [Validators.required, Validators.nullValidator]);
  matcher = new MyErrorStateMatcher();

  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    // reset login status
    this.createForm();
    this.loginService.logout();

    // get return url from route parameters or default to "/"
    this.returnUrl = this.route.snapshot.queryParams[`returnUrl`] || "/";
  }

  createForm(): void {
    this.loginForm = this.formBuilder.group({
      userName: ["", Validators.email,],
      password: ["", Validators.required],
      rememberMe: [false]
    });
  }

  login(loginForm: UntypedFormGroup): void {
    if (loginForm.valid) {
      this.loading = true;
      this.loginService
        .login(
          loginForm.controls.userName.value,
          loginForm.controls.password.value
        )
        .subscribe(
          data => {
            this.loading = false;
            this.router.navigate([this.returnUrl]);
          },
          error => {
            this.toastrService.error(error);
            this.loading = false;
          }
        );
    } else {
      this.toastrService.error("Please enter valid credentails");
    }
  }
}

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

