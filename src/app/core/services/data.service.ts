import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError, filter } from 'rxjs/operators';

import { ICustomer, IPagedResults, IState } from 'src/app/shared/interfaces';

@Injectable()
export class DataService {
 baseUrl: string = '../assets/data/customers.json'
 stateUrl: string = '../assets/data/states.json'

 constructor(private http: HttpClient) { }

 getCustomersPageOne(page: number, pageSize: number): Observable<IPagedResults<ICustomer[]>> {
   return this.http.get<ICustomer[]>(this.baseUrl)
          .pipe(
           map( response => {
            this.calculateCustomersOrderTotal(response);
            const people = response.slice(page, pageSize)
            return  {
                  results: people,
                  totalRecord: response.length
            };
            
            
           }),
           catchError(this.handleError)
          )
 }

 getCustomer(id): Observable<ICustomer> {
     return this.http.get<ICustomer[]>(this.baseUrl)
          .pipe(
            map(response => {
              this.calculateCustomersOrderTotal(response);
              const result = response.filter(customer => customer.id === id)
              return result[0]
            }),
            catchError(this.handleError)
          )
       
 }

 getStates(): Observable<IState[]>{
   return this.http.get<IState[]>(this.stateUrl)
          .pipe(
            map(
              states => {
                return states
                }
            )
          )
 }

 deleteCustomer(id): Observable<boolean> {
      return this.http.get<ICustomer[]>(this.baseUrl)
              .pipe(
                map(
                  customers => {
                  const newCustomerList = this.deleteFunction(customers, id)
                  return newCustomerList
                  }
                ),
                catchError(this.handleError)
              )
}

 calculateCustomersOrderTotal(customers: ICustomer[]) {
  for (const customer of customers) {
      if (customer && customer.orders) {
          let total = 0;
          for (const order of customer.orders) {
              total += order.itemCost;
          }
          customer.orderTotal = total;
      }
  }
}

deleteFunction(customers, id): boolean {
      for(var i = 0; i <= customers.length; i++){
          if (customers[i].id === id){
            customers.splice(i, 1);
            console.log(customers)
            break
          }
      }

      return true
}

 private handleError(error: HttpErrorResponse) {
  console.error('server error:', error);
  if (error.error instanceof Error) {
      const errMessage = error.error.message;
      return Observable.throw(errMessage);
      // Use the following instead if using lite-server
      // return Observable.throw(err.text() || 'backend server error');
  }
  return Observable.throw(error || 'Node.js server error');
 }
}

