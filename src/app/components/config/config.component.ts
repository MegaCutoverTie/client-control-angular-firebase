import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigService } from '../../services/config.service';
import { Configuration } from '../../model/config.model';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrl: './config.component.css'
})
export class ConfigComponent implements OnInit{
  allowRegister = false;

  constructor(private router: Router, private configService: ConfigService){

  }

  ngOnInit(){
    this.configService.getConfig().subscribe(
      (config: Configuration) => {
        this.allowRegister = config.allowRegister ?? false;
      }
    )
  }

  save(){
    let configuration = {allowRegister: this.allowRegister};
    this.configService.modConfig(configuration);
    this.router.navigate(['/'])
  }

}
