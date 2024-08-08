import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientsComponent } from './components/clients/clients.component';
import { ConfigComponent } from './components/config/config.component';
import { EditClientComponent } from './components/edit-client/edit-client.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PanelComponent } from './components/panel/panel.component';
import { RegisterComponent } from './components/register/register.component';
import { environment } from '../environments/environment';
import { AngularFireModule} from '@angular/fire/compat';
import { AngularFirestoreModule, Settings} from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth'
import { FormsModule } from '@angular/forms';
import { ClientService } from './services/client.service';
import { ModalComponent } from './components/modal/modal.component';
import { LoginService } from './services/login.service';
import { AuthGuard } from './guardians/auth.guard';
import { ConfigService } from './services/config.service';
import { ConfigGuard } from './guardians/config.guard';

@NgModule({
  declarations: [
    AppComponent,
    ClientsComponent,
    ConfigComponent,
    EditClientComponent,
    FooterComponent,
    HeaderComponent,
    LoginComponent,
    NotFoundComponent,
    PanelComponent,
    RegisterComponent,
    ModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firestore, 'client-control'),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FormsModule,
  ],
  providers: [ClientService, LoginService, AuthGuard, ConfigService, ConfigGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
