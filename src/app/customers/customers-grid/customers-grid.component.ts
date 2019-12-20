import { Component, OnInit, Input } from '@angular/core';
import { ICustomer } from 'src/app/shared/interfaces';

@Component({
  selector: 'customers-grid',
  templateUrl: './customers-grid.component.html',
  styleUrls: ['./customers-grid.component.css']
})
export class CustomersGridComponent implements OnInit {
@Input() customers: ICustomer[] = [];
  constructor() { }

  ngOnInit() {
  }

}
