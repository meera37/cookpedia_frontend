import { Component } from '@angular/core';
import { AdminheaderComponent } from "../adminheader/adminheader.component";
import { AdminsidebarComponent } from "../adminsidebar/adminsidebar.component";
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-admindownloads',
  imports: [AdminheaderComponent, AdminsidebarComponent],
  templateUrl: './admindownloads.component.html',
  styleUrl: './admindownloads.component.css'
})
export class AdmindownloadsComponent {

alldownloads:any =[]

  constructor(private api:ApiService){}

ngOnInit(){
this.getAllDownloads()
}

  getAllDownloads(){
    this.api.getAllDownloadApi().subscribe({
      next:(res:any)=>{
        this.alldownloads = res
        console.log(this.alldownloads);
        
      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })
  }
}
