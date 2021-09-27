import { Injectable } from '@angular/core';
import { FirebaseOperation } from '@angular/fire/database/interfaces';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private firebase: AngularFireDatabase) {}
  customerList!: AngularFireList<any>;

  form = new FormGroup({
    $key: new FormControl(null),
    fullName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email),
    mobile: new FormControl('', [Validators.required, Validators.minLength(8)]),
    location: new FormControl(''),
  });

  getCustomers() {
    this.customerList = this.firebase.list('customers');
    return this.customerList.snapshotChanges();
  }
  insertCustomer(customer: {
    fullName: any;
    email: any;
    mobile: any;
    location: any;
  }) {
    this.customerList.push({
      fullName: customer.fullName,
      email: customer.email,
      mobile: customer.mobile,
      location: customer.location,
    });
  }
  populateForm(customer: { [key: string]: any }) {
    this.form.setValue(customer);
  }
  updateCustomer(customer: {
    $key: FirebaseOperation;
    fullName: any;
    email: any;
    mobile: any;
    location: any;
  }) {
    this.customerList.update(customer.$key, {
      fullName: customer.fullName,
      email: customer.email,
      mobile: customer.mobile,
      location: customer.location,
    });
  }
  deleteCustomer($key: string){
    this.customerList.remove($key);

  }
}
