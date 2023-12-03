import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss'],
})
export class LoginComponent {
  returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/'
  public authGroup: FormGroup = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private userService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  onSubmit() {
    const { email, password } = this.authGroup.value;
    this.userService.login(email, password).subscribe((_) => {
      this.router.navigateByUrl(this.returnUrl).then((_) => {
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/'
      });
    });
  }
}
