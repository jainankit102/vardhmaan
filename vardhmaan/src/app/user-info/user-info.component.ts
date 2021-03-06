import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Utils } from '../shared/utils';
import { UserInfo } from '../user';
import { UserInfoService } from '../user-info.service';
import { DateAdapter } from '@angular/material/core';


@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  userInputForm!: FormGroup;

  @Output() submission = new EventEmitter<UserInfo>();
  @Output() reset = new EventEmitter<UserInfo>();

  constructor(private userInfoService: UserInfoService, private dateAdapter: DateAdapter<Date>) {
    this.dateAdapter.setLocale('en-IN');
  }

  ngOnInit(): void {
    this.userInputForm = new FormGroup({
      firstName: new FormControl('Ankit', Validators.required),
      middleName: new FormControl(''),
      lastName: new FormControl('Jain', Validators.required),
      dateOfBirth: new FormControl('', Validators.required),
      age: new FormControl(),
      gender: new FormControl('male', Validators.required),
    });
    this.userInputForm.get('dateOfBirth')?.valueChanges.subscribe((value) => {
      const calculatedAge = Utils.calculateAge(new Date(value));
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
        this.reset.emit(this.userInputForm.value);
        this.userInfoService.resetData.next();
        this.userInputForm.reset();
      }

    }
  }

  submitUserInfo(event: Event): void {
    if (!this.userInputForm.invalid) {
      this.submission.emit(this.userInputForm.value);
      this.userInfoService.setUserInfo(this.userInputForm.value);
    } else {
      alert('Fill all the user info');
    }

  }

}
