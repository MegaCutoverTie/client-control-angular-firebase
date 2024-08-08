import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PanelComponent } from './components/panel/panel.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ConfigComponent } from './components/config/config.component';
import { EditClientComponent } from './components/edit-client/edit-client.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthGuard } from './guardians/auth.guard';
import { ConfigGuard } from './guardians/config.guard';

const routes: Routes = [
  {path: '', component: PanelComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent, canActivate: [ConfigGuard]},
  {path: 'config', component: ConfigComponent, canActivate: [AuthGuard]},
  {path: 'client/edit/:id', component: EditClientComponent, canActivate: [AuthGuard]},
  {path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
