import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { DataService } from 'src/app/core/services/data.service';
import { ICustomer, IState } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnInit {
  deleteMessageEnabled: boolean;

  customer: ICustomer =
    {
      id: 0,
      firstName: '',
      lastName: '',
      gender: '',
      address: '',
      city: '',
      state: {
        abbreviation: '',
        name: ''
      }
    };
     
  operationText: string = 'Insert';
  states: IState[];
  @ViewChild('customerForm', { static: true }) customerForm: NgForm;
  errorMessage: string;


  constructor(private route: ActivatedRoute,
              private dataService: DataService,
              private router: Router) { }

  ngOnInit() {
    this.route.parent.params.subscribe((params: Params) => {
      const id = +params['id'];
      if (id !== 0) {
        this.operationText = 'Update';
        this.getCustomer(id);
      }
    });
    this.dataService.getStates().subscribe((states: IState[]) => this.states = states);
  }


  getCustomer(id: number) {
    this.dataService.getCustomer(id).subscribe((customer: ICustomer) => {
      this.customer = customer;
    });
  }

  delete(event: Event){
    event.preventDefault();
    this.dataService.deleteCustomer(this.customer.id)
        .subscribe((status: boolean) => {
          if(status){
            this.router.navigate(['/customer'])
          } else {
            this.errorMessage = "Unable to delete customer"
          }
        })
  }

}
