import { ThrowStmt } from '@angular/compiler';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { getLousGridMetaData, Utils } from '../shared/utils';
import { AllTypeOfNumbers, LousGridMeta, UserInfo } from '../user';
import { UserInfoService } from '../user-info.service';

@Component({
  selector: 'app-lo-shu-grid',
  templateUrl: './lo-shu-grid.component.html',
  styleUrls: ['./lo-shu-grid.component.scss']
})
export class LoShuGridComponent implements OnInit, OnDestroy {

  title = 'LO SHU GRID';

  lousGridData: Array<LousGridMeta> = [...getLousGridMetaData()]

  dateOfBirth = ''
  psychicNumber = 0;
  destinytNumber = 0;
  kuaNumber = 0;

  private subscription = new Subscription();

  constructor(private userInfoService: UserInfoService) { }


  ngOnInit(): void {
    this.subscription.add(this.userInfoService.getUserInfo().subscribe((userData: UserInfo) => {
      this.resetValue();
      this.calculateLousGridValue(userData);
    }));
    this.subscription.add(this.userInfoService.resetData.subscribe(data => {
      this.resetValue();
    }))
  }

  resetValue() {
    this.lousGridData = [...getLousGridMetaData()];
    this.dateOfBirth = '';
    this.psychicNumber = 0;
    this.destinytNumber = 0;
    this.kuaNumber = 0;

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  calculateLousGridValue(userData: UserInfo) {
    const dateObject: Date = new Date(userData.dateOfBirth);
    this.dateOfBirth = `${dateObject.getDate()}/${dateObject.getMonth() + 1}/${dateObject.getFullYear()}`;
    const fullDateAsString = `${dateObject.getDate()}${dateObject.getMonth() + 1}${dateObject.getFullYear()}`;
    for (let i = 1; i < 10; i++) {
      const getNumOccrace = Utils.getNumberOccuranceChar(fullDateAsString, String(i));
      if (getNumOccrace) {
        this.updateLousGrid(i, getNumOccrace);
      }
    }
    this.psychicNumber = Utils.getSumInSingleNumber(this.userInfoService.getNumberValueByNumName(AllTypeOfNumbers.PSYCHIC));
    this.destinytNumber = Utils.getSumInSingleNumber(this.userInfoService.getNumberValueByNumName(AllTypeOfNumbers.DESTINY_BY_DOB));
    this.kuaNumber = this.userInfoService.getNumberValueByNumName(AllTypeOfNumbers.KUA);
    this.updateLousGrid(this.psychicNumber, 1, true);
    this.updateLousGrid(this.destinytNumber, 1, true);
    this.updateLousGrid(this.kuaNumber, 1, true);

  }
  updateLousGrid(placeholder: number | undefined, value: number, isSpecialValue = false) {
    this.lousGridData.forEach(obj => {
      if (obj.placeholder === placeholder) {
        if (isSpecialValue) {
          obj.value = obj.value === 'X' ? '' : obj.value;
          obj.specialNumber = obj.specialNumber ? `${obj.specialNumber}${placeholder}` : placeholder;
        } else {
          obj.value = new Array(value).fill(placeholder).join('');
        }
      }
    });
  }


}
