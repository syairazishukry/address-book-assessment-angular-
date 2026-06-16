import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxDataGridModule, DxButtonModule, DxPopupModule } from 'devextreme-angular';
import { AddressBookService } from '../../services/address-book';
import { AddressBook } from '../../models/address-book.model';
import { Modal } from '../modal/modal';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, DxDataGridModule, DxButtonModule, DxPopupModule, Modal],
  templateUrl: './list.html',
  styleUrl: './list.css',
})
export class List implements OnInit {
  contacts: AddressBook[] = [];
  isModalVisible = false;
  selectedContact: AddressBook | null = null;

  constructor(private addressBookService: AddressBookService) {}

  ngOnInit() {
    this.loadContacts();
  }

  loadContacts() {
    this.contacts = this.addressBookService.getContacts();
  }

  calculateAddress(rowData: AddressBook) {
    return `${rowData.street || ''}, ${rowData.state || ''} ${rowData.postcode || ''}`.replace(/^[,\s]+|[,\s]+$/g, '').replace(/,\s*,/g, ',');
  }

  onAddClick() {
    this.selectedContact = null;
    this.isModalVisible = true;
  }

  onRowClick(e: any) {
    this.selectedContact = { ...e.data };
    this.isModalVisible = true;
  }

  onDeleteClick(e: any, cellInfo: any) {
    e.event.stopPropagation();
    if (confirm('Are you sure you want to delete this contact?')) {
      this.addressBookService.deleteContact(cellInfo.data.id);
      this.loadContacts();
    }
  }

  onModalSave(contact: AddressBook) {
    if (contact.id) {
      this.addressBookService.updateContact(contact);
    } else {
      this.addressBookService.addContact(contact);
    }
    this.isModalVisible = false;
    this.loadContacts();
  }

  onModalCancel() {
    this.isModalVisible = false;
  }
}