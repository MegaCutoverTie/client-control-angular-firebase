import { Component, EventEmitter, Output } from '@angular/core';
import { Client } from '../../model/client.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  @Output() addClientEvent = new EventEmitter<{ value: Client, valid: boolean }>();
  isOpen = false;
  client: Client = {
    name: '',
    lastname: '',
    email: '',
    balance: 0,
  };

  open() {
    this.isOpen = true;
  }

  close() {
    this.isOpen = false;
  }

  addClient(clientForm: NgForm) {
    const { value, valid } = clientForm;
    if (valid) {
      this.addClientEvent.emit({ value, valid });
      this.close();
    }
  }
}
