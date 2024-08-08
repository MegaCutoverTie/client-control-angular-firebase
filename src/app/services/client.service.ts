import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "@angular/fire/compat/firestore";
import { Client } from "../model/client.model";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class ClientService {
    clientsCollection: AngularFirestoreCollection<Client>;
    clientDoc: AngularFirestoreDocument<Client> | undefined;
    clients: Observable<Client[]>  | undefined;
    client:  Observable<Client | null>  | undefined;

    constructor(private db: AngularFirestore){
        this.clientsCollection = db.collection('clients', ref => ref.orderBy('name', 'asc'));
    }

    getClients(): Observable<Client[]> {
        this.clients = this.clientsCollection.snapshotChanges().pipe(
            map(changes => {
                return changes.map(action => {
                    const data = action.payload.doc.data() as Client;
                    data.id = action.payload.doc.id;
                    return data;
                });
            })
        );
        return this.clients;
    }

    addNewClient(client: Client): Promise<void> {
        const id = this.db.createId();
        return this.clientsCollection.doc(id).set(client);
    }

    getClient(id: string){
        this.clientDoc = this.db.doc<Client>(`clients/${id}`);
        this.client = this.clientDoc.snapshotChanges().pipe(
            map(action => {
                if(action.payload.exists === false){
                    return null
                }else{
                    const data = action.payload.data() as Client;
                    data.id = action.payload.id;
                    return data;
                }
            })
        )
        return this.client;
    }

    editClient(client: Client){
        this.clientDoc = this.db.doc(`clients/${client.id}`);
        this.clientDoc.update(client);
    }

    deleteClient(client: Client){
        this.clientDoc = this.db.doc(`clients/${client.id}`);
        this.clientDoc.delete();
    }
}
