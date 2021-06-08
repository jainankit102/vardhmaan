import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserInfo } from '../user';
import { UserInfoService } from '../user-info.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  userInputForm!: FormGroup;

  @Output() submission = new EventEmitter<UserInfo>();
  @Output() reset = new EventEmitter<UserInfo>();

  constructor(private userInfoService: UserInfoService) { }

  ngOnInit(): void {
    this.userInputForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      middleName: new FormControl(''),
      lastName: new FormControl('', Validators.required),
      dateOfBirth: new FormControl('', Validators.required),
      age: new FormControl({ value: '', disable: true }),
      gender: new FormControl('', Validators.required),
    });
    this.userInputForm.get('dateOfBirth')?.valueChanges.subscribe((value) => {
      const calculatedAge = this.getAgeByDateObject(new Date(value));
      this.userInputForm.patchValue({
        age: calculatedAge
      })
    });
  }
  getAgeByDateObject(date: Date) {
    return Math.floor((new Date().getTime() - date.getTime()) / 3.15576e+10)
  }

  resetUserInfo(event: Event): void {
    if (this.userInputForm.dirty) {
      const isSafe = confirm(`Unsaved changes will be lost! would your like to proceed?`)
      if (isSafe) {

        this.reset.emit(this.userInputForm.value)
        this.userInputForm.reset();
      }

    }
  }

  submitUserInfo(event: Event): void {
    if (!this.userInputForm.invalid) {
      this.userInfoService.setUserInfo(this.userInputForm.value);
      this.submission.emit(this.userInputForm.value);
    } else {
      alert('Fill all the user info');
    }

  }

}
