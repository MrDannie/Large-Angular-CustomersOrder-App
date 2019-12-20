import { Component, OnInit } from '@angular/core';

import { ICustomer } from '../shared/interfaces';
import { DataService } from '../core/services/data.service';
import { FilterService } from '../core/services/filter.service';

@Component({
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
title: string = "Customers"
customers: ICustomer[] = []
filteredCustomers: ICustomer[] = []
page: number = 1
pageSize: number = 10
totalRecord: number = 0;
displayMode: DisplayModeEnum;
displayModeEnum = DisplayModeEnum;
  constructor(private dataService: DataService,
              private filterService: FilterService) { }

  ngOnInit() {
    this.displayMode = DisplayModeEnum.Card;
    this.getCustomersPage(1)

  }

  pageChanged(page: number){
      this.getCustomersPage(page)
      
  }

  getCustomersPage(page: number){
    this.dataService.getCustomersPageOne((page - 1) * this.pageSize, this.pageSize * page)
        .subscribe(customers =>  {
          this.customers = this.filteredCustomers = customers.results
          this.totalRecord = customers.totalRecord
        }
     )}

performFilter( filterBy: string ){
  let item = this.customers
  this.filterFunction(filterBy, item);
  
}  

filterFunction(filterBy, customers){
  if( filterBy && customers){
    filterBy = filterBy.toLocaleLowerCase();
    this.filteredCustomers = this.filterService.filter(filterBy, customers)
  } else {
  this.filteredCustomers = this.customers;
  }
}

changeDisplayMode(mode: DisplayModeEnum) {
  this.displayMode = mode;
}

}

enum DisplayModeEnum {
  Card = 0,
  Grid = 1,
  Map = 2
}
