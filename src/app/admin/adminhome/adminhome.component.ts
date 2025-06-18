import { Component } from '@angular/core';
import { AdminsidebarComponent } from "../adminsidebar/adminsidebar.component";
import { AdminheaderComponent } from "../adminheader/adminheader.component";
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-adminhome',
  imports: [AdminsidebarComponent, AdminheaderComponent],
  templateUrl: './adminhome.component.html',
  styleUrl: './adminhome.component.css'
})
export class AdminhomeComponent {

  allusers:any =[]
  allrecipes:any=[]
  alldownloadsCount:any=0

constructor(private api:ApiService){}

ngOnInit(){
  this.getcount()
}

getcount(){
this.api.getAllUsersApi().subscribe({
  next:(res:any)=>{
  //  console.log(res);
  this.allusers = res.length -1 //or in html allrecipes.length(here all recipes = res)
  console.log(this.allusers);
  
    
  },
  error:(err:any)=>{
   console.log(err);
  
    
  }
})
this.api.allRecipesApi().subscribe({
  next:(res:any)=>{
   // console.log(res);
   this.allrecipes = res.length
    console.log(this.allrecipes);
    
  },
  error:(err:any)=>{
    console.log(err);
    
  }
})
this.api.getAllDownloadApi().subscribe({
  next:(res:any)=>{
   console.log(res);
  //  this.alldownloads = res.length
  //   console.log(this.alldownloads);
  let count = res.map((item:any)=>item.count).reduce((n1:any, n2:any)=>n1+n2) 
  this.alldownloadsCount = count 
  //console.log(count);
  
  },
  error:(err:any)=>{
    console.log(err);
    
  }
})
}

}
