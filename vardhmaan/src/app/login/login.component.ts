import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Utils } from '../shared/utils';
import { UserInfoService } from '../user-info.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  constructor(private router: Router) { }


  ngOnInit(): void {
    this.loginForm = new FormGroup({
      token: new FormControl()
    });
    const token = sessionStorage.getItem('token');
    if (token && Utils.validateToken(token.split(''))) {
      this.router.navigateByUrl('/home');
    }
  }

  submitForm() {
    const token = this.loginForm.get('token')?.value;
    if (token) {
      const tokenArray = token.split('');
      if (this.validateToken(tokenArray)) {
        sessionStorage.setItem('fake', 'false');
        sessionStorage.setItem('token', token);
        this.router.navigateByUrl('/home');
      } else {
        alert('Please provide the correct token');
      }

    } else {
      alert('Please provide the token');
    }
  }
  validateToken(tokenArray: Array<string>): boolean {
    if (tokenArray && tokenArray.length > 6) {
      const val = `${tokenArray[2]}${tokenArray[3]}`;
      const obj = new Date();
      return Math.abs(+val - 4) === obj.getDate();
    }
    return false;
  }

}
