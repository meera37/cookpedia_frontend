import { Component } from '@angular/core';
import { AdminheaderComponent } from "../adminheader/adminheader.component";
import { AdminsidebarComponent } from "../adminsidebar/adminsidebar.component";
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-adminusers',
  imports: [AdminheaderComponent, AdminsidebarComponent],
  templateUrl: './adminusers.component.html',
  styleUrl: './adminusers.component.css'
})
export class AdminusersComponent {

  allusers:any = []

  

  constructor(private api:ApiService){}

  ngOnInit(){
    this.getAllUsers()
  }

  getAllUsers(){
    this.api.getAllUsersApi().subscribe({
      next:(res:any)=>{
        this.allusers = res.filter((item:any)=>item.role !='admin')
        console.log(this.allusers);
        
      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })
  }
}
