import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { UserService } from '../services/user.service';
import swal from 'sweetalert';
import { SnackbarService } from 'src/app/views/core/snackbar.service';
import { User } from '../model/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  User: any;
  errorMessage: any = null;
  loading = false;
  loginForm!: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder,
    private loginService: LoginService,
    private userService: UserService,
    private router: Router,
    private snackBar: SnackbarService,) {


  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }
  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }
  onSubmit(isResubmit: boolean = false) {
    this.submitted = true
    this.errorMessage = "Processing";
    this.loading = true;
    if (!this.loginForm.valid) {
      return;
    }

    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;
    // debugger;
    this.loginService.login(username, password).subscribe(response => {
      setTimeout(() => {
        this.userService.getUserDetail().subscribe(response => {
          localStorage.setItem('userDetails', JSON.stringify(response))
          this.errorMessage = "Success";
          this.loading = false;
          let content = 'LogIn Successfully'
          let action = 'close'
          this.snackBar.success(content, action)
          this.loginForm.reset();
          this.router.navigate(['/dashboard']);
        }, error => {
          this.handleError(error);
        });

      }, 1000);


    }, error => {
      this.handleError(error, () => {
        // The call back function is for relogin, if error accurs checks the isResubmit flag if true then the call back function will not excute.
        // it excutes for only when flag is false.
        if (!isResubmit) {
          this.onSubmit(isResubmit = true)
        }
      });
    }
    );
    // form.reset();

  }
  handleError(error: any, func?: any) {
    // debugger;
    if (error.error.error === "unauthorized" && error.error.error_description.startsWith("USER_LOGED_IN")) {
      let token = error.error.error_description.split("||")[1];

      swal({
        title: "Are you sure?",
        text: "Already Logged In, Do u want to logout previous login ?",
        // icon: "warning",
        buttons: [true, true],
        dangerMode: true,
        closeOnClickOutside: false,
        closeOnEsc: false
      })
        .then((willDelete) => {
          if (willDelete) {
            let dateToday = new Date();
            dateToday.setDate(dateToday.getDate() + 1);
            const user = new User(token, "", dateToday);
            this.loginService.user.next(user);
            this.loading = false;
            this.loginService.logout();
            swal("Re login has been succeed!", {
              icon: "success",
              closeOnClickOutside: false,
              closeOnEsc: false
            });
            func();
          } else {
            this.loading = false;
            swal("Already Logged In!", {
              closeOnClickOutside: false,
              closeOnEsc: false
            });
          }
        });

    }
    else if (error.error.error === "unauthorized") {
      this.errorMessage = "Invalid Username or Password";
      // let content=this.errorMessage
      // let action='close'
      this.loading = false;
      // this.errorMessage = error.error.errorMessages[0];
      let content = this.errorMessage;
      //  error.error.errorMessages[0]
      let action = 'close'
      this.snackBar.error(content, action)

    } else {
      this.errorMessage = "Error";
      this.loading = false;
      let content = error.statusText
      let action = 'close'
      this.snackBar.error(content, action)
    }
    this.loginService.logout();
  }

}