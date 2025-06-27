import { Component } from '@angular/core';
import { AdminheaderComponent } from "../adminheader/adminheader.component";
import { AdminsidebarComponent } from "../adminsidebar/adminsidebar.component";
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-adminrequest',
  imports: [AdminheaderComponent, AdminsidebarComponent],
  templateUrl: './adminrequest.component.html',
  styleUrl: './adminrequest.component.css'
})
export class AdminrequestComponent {

allTestimonial:any =[]
  constructor(private api:ApiService){}

ngOnInit(){
  this.getAllTestimonial()
}

  getAllTestimonial(){
    this.api.getAllTestimonialsApi().subscribe({
      next:(res:any)=>{
        this.allTestimonial = res
        console.log(this.allTestimonial);
        
      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })
  }

statusChange(id:any,status:string){
console.log(id,status);
this.api.updateTestimonialStatusApi(id,{status}).subscribe({
  next:(res:any)=>{
    console.log(res);
    this.getAllTestimonial()
    
  },
  error:(err:any)=>{
    console.log(err);
    
  }
})
}

}
