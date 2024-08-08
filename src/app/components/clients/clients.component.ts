import { Component, OnInit, ViewChild } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Client } from '../../model/client.model';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  clients: Client[] | undefined;
  @ViewChild(ModalComponent) modal: ModalComponent | undefined;

  constructor(private clientService: ClientService) { }

  ngOnInit() {
    this.clientService.getClients().subscribe(
      clients => {
        this.clients = clients;
      },
      (error: any) => {
        console.error('Error fetching clients:', error);
      }
    );
  }

  getTotalBalance() {
    let totalBalance: number = 0;
    if (this.clients) {
      this.clients.forEach(client => {
        if (client.balance !== undefined) {
          totalBalance += client.balance;
        }
      });
    }
    return totalBalance;
  }

  openModal() {
    if (this.modal) {
      this.modal.open();
    }
  }

  onAddClient({ value, valid }: { value: Client; valid: boolean }) {
    if (valid) {
      this.clientService.addNewClient(value)
        .then(() => {
          console.log('Client added successfully');
        })
        .catch((error: any) => {
          console.error('Error adding client:', error);
        });
    }
  }
}
