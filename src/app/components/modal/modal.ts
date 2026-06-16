import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxFormModule, DxButtonModule, DxValidatorModule } from 'devextreme-angular';
import { DxFormComponent } from 'devextreme-angular/ui/form';
import { AddressBookService } from '../../services/address-book';
import { AddressBook } from '../../models/address-book.model';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, DxFormModule, DxButtonModule, DxValidatorModule],
  templateUrl: './modal.html',
  styleUrl: './modal.css',
})
export class Modal implements OnInit, OnChanges {
  @Input() contact: AddressBook | null = null;
  @Output() save = new EventEmitter<AddressBook>();
  @Output() cancel = new EventEmitter<void>();

  @ViewChild(DxFormComponent, { static: false }) form!: DxFormComponent;

  formData: Partial<AddressBook> = {};
  states: string[] = [];
  isEditMode = false;
  isNew = false;

  phonePattern: any = /^[^a-zA-Z]*$/;
  postcodePattern: any = /^[0-9]*$/;

  constructor(private addressBookService: AddressBookService) {}

  ngOnInit() {
    this.states = this.addressBookService.getStates();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['contact']) {
      if (this.contact) {
        this.formData = { ...this.contact };
        this.isNew = false;
        this.isEditMode = false;
      } else {
        this.formData = {};
        this.isNew = true;
        this.isEditMode = true;
      }
    }
  }

  onEditClick() {
    this.isEditMode = true;
  }

  onSaveClick() {
    const validationResult = this.form.instance.validate();
    if (validationResult.isValid) {
      this.save.emit(this.formData as AddressBook);
    }
  }

  onCancelClick() {
    this.cancel.emit();
  }

  get buttonText() {
    if (this.isNew) return 'Create';
    return 'Save';
  }
}
