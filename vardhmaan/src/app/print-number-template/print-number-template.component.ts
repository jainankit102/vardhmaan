import { Component, Input, OnInit } from '@angular/core';
import { PrintTemplateMeta } from '../user';

@Component({
  selector: 'app-print-number-template',
  templateUrl: './print-number-template.component.html',
  styleUrls: ['./print-number-template.component.scss']
})
export class PrintNumberTemplateComponent implements OnInit {

 
  @Input() iconName = 'attractions';
  @Input() title = '';

  @Input() value: any;
  @Input() rawCalculcation: any;



  constructor() { }

  ngOnInit(): void {
  }

}
