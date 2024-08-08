import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreDocument } from "@angular/fire/compat/firestore";
import { Configuration } from "../model/config.model";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()

export class ConfigService {
    docConfig: AngularFirestoreDocument<Configuration> | undefined;
    config: Observable<Configuration> | undefined;

    id = '1'

    constructor(private db: AngularFirestore){

    }

    getConfig(): Observable<Configuration>{
        this.docConfig = this.db.doc<Configuration>(`config/${this.id}`);
        this.config = this.docConfig.valueChanges().pipe(
            map(config => config || { allowRegister: false })
          );
        return this.config;
    }

    modConfig(config: Configuration){
        this.docConfig = this.db.doc<Configuration>(`config/${this.id}`);
        this.docConfig.update(config);
    }
}