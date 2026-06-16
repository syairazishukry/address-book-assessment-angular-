import { Injectable } from '@angular/core';
import { AddressBook } from '../models/address-book.model';

@Injectable({
  providedIn: 'root'
})
export class AddressBookService {
  private contacts: AddressBook[] = [
    {
      id: 1,
      name: 'Abu bin Salman',
      email: 'Abu.@example.com',
      phone: '1234567890',
      street: 'Jalan Yahya',
      state: 'Johor',
      postcode: '10001',
      description: 'Friend from work'
    },
    {
      id: 2,
      name: 'Hisyamudinn',
      email: 'Hisyamudinn.@example.com',
      phone: '0987654321',
      street: 'Jalan Abu bakar',
      state: 'Selangor',
      postcode: '90210',
      description: 'Family member'
    }
  ];

  private stateList = [
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

  private nextId = 3;

  constructor() {}

  getContacts(): AddressBook[] {
    return this.contacts;
  }

  getStates(): string[] {
    return this.stateList;
  }

  addContact(contact: AddressBook): void {
    contact.id = this.nextId++;
    this.contacts = [...this.contacts, contact];
  }

  updateContact(updatedContact: AddressBook): void {
    const index = this.contacts.findIndex(c => c.id === updatedContact.id);
    if (index !== -1) {
      this.contacts[index] = { ...updatedContact };
      this.contacts = [...this.contacts];
    }
  }

  deleteContact(id: number): void {
    this.contacts = this.contacts.filter(c => c.id !== id);
  }
}
