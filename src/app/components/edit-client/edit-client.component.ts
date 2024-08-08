import { Component, OnInit, Output } from '@angular/core';
import { Client } from '../../model/client.model';
import { ClientService } from '../../services/client.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrl: './edit-client.component.css'
})
export class EditClientComponent implements OnInit {
  client: Client = {
    name: '',
    lastname: '',
    email: '',
    balance: 0,
  };

  id: string | undefined;

  constructor(private clientService: ClientService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(){
    this.id = this.route.snapshot.params['id'];
    this.clientService.getClient(this.id!).subscribe(client => {
      if(client !== null){
        this.client = client;
      }else {
        console.error('Client not found');
      }
    })
  }

  saveClient(form: any){
    if(form.valid){
      const updatedClient = { ...form.value, id: this.id };
      this.clientService.editClient(updatedClient);
      this.router.navigate(['/']);
    }
  }

  deleteClient(){
    this.clientService.deleteClient(this.client);
    this.router.navigate(['/']);
  }
}
