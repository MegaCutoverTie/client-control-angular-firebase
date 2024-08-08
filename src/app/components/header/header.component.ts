import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { ConfigService } from '../../services/config.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  isLoggedIn: boolean | undefined;
  loggedUser: string | undefined;
  allowRegister: boolean | undefined;

  constructor(private loginService: LoginService, private router: Router, private configService: ConfigService){
    
  }

  ngOnInit(){
    this.loginService.getAuth().subscribe(auth => {
      if(auth){
        this.isLoggedIn = true;
        this.loggedUser = auth.email || '';
      }else{
        this.isLoggedIn = false;
      }
    })

    this.configService.getConfig().subscribe(config => {
      this.allowRegister = config.allowRegister;
    })
  }

  logOut(){
    this.loginService.logout();
    this.isLoggedIn = false;
    this.router.navigate(['/login'])
  }
  

  @ViewChild('navbarCollapse', { static: false }) navbarCollapse: ElementRef | undefined;
  @ViewChild('dropdownMenu', { static: false }) dropdownMenu: ElementRef | undefined;

  toggleNavbar() {
    if (this.navbarCollapse) {
      const navbar = this.navbarCollapse.nativeElement;
      if (navbar.classList.contains('show')) {
        navbar.classList.remove('show');
      } else {
        navbar.classList.add('show');
      }
    }
  }

  toggleSubmenu() {
    const dropdown = this.dropdownMenu?.nativeElement;
    if (dropdown.classList.contains('show')) {
      dropdown.classList.remove('show');
    } else {
      dropdown.classList.add('show');
    }
  }
}
