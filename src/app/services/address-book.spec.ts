import { Injectable } from '@angular/core';
import { AddressBook } from '../models/address-book.model';

@Injectable({
  providedIn: 'root'
})
export class AddressBookService {

  stateList = [
    'Johor',
    'Kedah',
    'Kelantan',
    'Melaka',
    'Negeri Sembilan',
    'Pahang',
    'Penang',
    'Perak',
    'Perlis',
    'Sabah',
    'Sarawak',
    'Selangor',
    'Terengganu'
  ];

  addressBookList: AddressBook[] = [];

}