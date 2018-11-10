/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { IssueHotelRoomService } from './IssueHotelRoom.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-issuehotelroom',
  templateUrl: './IssueHotelRoom.component.html',
  styleUrls: ['./IssueHotelRoom.component.css'],
  providers: [IssueHotelRoomService]
})
export class IssueHotelRoomComponent implements OnInit {

  myForm: FormGroup;

  private allTransactions;
  private Transaction;
  private currentId;
  private errorMessage;

  hotel = new FormControl('', Validators.required);
  numberOfPeople = new FormControl('', Validators.required);
  numberOfBeds = new FormControl('', Validators.required);
  roomType = new FormControl('', Validators.required);
  roomStatus = new FormControl('', Validators.required);
  dateString = new FormControl('', Validators.required);
  transactionId = new FormControl('', Validators.required);
  timestamp = new FormControl('', Validators.required);


  constructor(private serviceIssueHotelRoom: IssueHotelRoomService, fb: FormBuilder) {
    this.myForm = fb.group({
      hotel: this.hotel,
      numberOfPeople: this.numberOfPeople,
      numberOfBeds: this.numberOfBeds,
      roomType: this.roomType,
      roomStatus: this.roomStatus,
      dateString: this.dateString,
      transactionId: this.transactionId,
      timestamp: this.timestamp
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceIssueHotelRoom.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(transaction => {
        tempList.push(transaction);
      });
      this.allTransactions = tempList;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the transaction field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the transaction updateDialog.
   * @param {String} name - the name of the transaction field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified transaction field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addTransaction(form: any): Promise<any> {
    this.Transaction = {
      $class: 'org.booking.model.IssueHotelRoom',
      'hotel': this.hotel.value,
      'numberOfPeople': this.numberOfPeople.value,
      'numberOfBeds': this.numberOfBeds.value,
      'roomType': this.roomType.value,
      'roomStatus': this.roomStatus.value,
      'dateString': this.dateString.value,
      'transactionId': this.transactionId.value,
      'timestamp': this.timestamp.value
    };

    this.myForm.setValue({
      'hotel': null,
      'numberOfPeople': null,
      'numberOfBeds': null,
      'roomType': null,
      'roomStatus': null,
      'dateString': null,
      'transactionId': null,
      'timestamp': null
    });

    return this.serviceIssueHotelRoom.addTransaction(this.Transaction)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'hotel': null,
        'numberOfPeople': null,
        'numberOfBeds': null,
        'roomType': null,
        'roomStatus': null,
        'dateString': null,
        'transactionId': null,
        'timestamp': null
      });
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
        this.errorMessage = error;
      }
    });
  }

  updateTransaction(form: any): Promise<any> {
    this.Transaction = {
      $class: 'org.booking.model.IssueHotelRoom',
      'hotel': this.hotel.value,
      'numberOfPeople': this.numberOfPeople.value,
      'numberOfBeds': this.numberOfBeds.value,
      'roomType': this.roomType.value,
      'roomStatus': this.roomStatus.value,
      'dateString': this.dateString.value,
      'timestamp': this.timestamp.value
    };

    return this.serviceIssueHotelRoom.updateTransaction(form.get('transactionId').value, this.Transaction)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
      this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  deleteTransaction(): Promise<any> {

    return this.serviceIssueHotelRoom.deleteTransaction(this.currentId)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  setId(id: any): void {
    this.currentId = id;
  }

  getForm(id: any): Promise<any> {

    return this.serviceIssueHotelRoom.getTransaction(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'hotel': null,
        'numberOfPeople': null,
        'numberOfBeds': null,
        'roomType': null,
        'roomStatus': null,
        'dateString': null,
        'transactionId': null,
        'timestamp': null
      };

      if (result.hotel) {
        formObject.hotel = result.hotel;
      } else {
        formObject.hotel = null;
      }

      if (result.numberOfPeople) {
        formObject.numberOfPeople = result.numberOfPeople;
      } else {
        formObject.numberOfPeople = null;
      }

      if (result.numberOfBeds) {
        formObject.numberOfBeds = result.numberOfBeds;
      } else {
        formObject.numberOfBeds = null;
      }

      if (result.roomType) {
        formObject.roomType = result.roomType;
      } else {
        formObject.roomType = null;
      }

      if (result.roomStatus) {
        formObject.roomStatus = result.roomStatus;
      } else {
        formObject.roomStatus = null;
      }

      if (result.dateString) {
        formObject.dateString = result.dateString;
      } else {
        formObject.dateString = null;
      }

      if (result.transactionId) {
        formObject.transactionId = result.transactionId;
      } else {
        formObject.transactionId = null;
      }

      if (result.timestamp) {
        formObject.timestamp = result.timestamp;
      } else {
        formObject.timestamp = null;
      }

      this.myForm.setValue(formObject);

    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
      this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  resetForm(): void {
    this.myForm.setValue({
      'hotel': null,
      'numberOfPeople': null,
      'numberOfBeds': null,
      'roomType': null,
      'roomStatus': null,
      'dateString': null,
      'transactionId': null,
      'timestamp': null
    });
  }
}
