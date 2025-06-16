import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { ApiService } from '../service/api.service';
import Swal from 'sweetalert2';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-savedrecipes',
  imports: [HeaderComponent,RouterLink],
  templateUrl: './savedrecipes.component.html',
  styleUrl: './savedrecipes.component.css'
})
export class SavedrecipesComponent {

  allSavedRecipes:any[]=[]

constructor(private api:ApiService , private router:Router){}

ngOnInit(){
  this.getAllSavedRecipes()
}

getAllSavedRecipes(){
  this.api.getallUserSavedRecipes().subscribe({
    next:(res:any)=>{
      this.allSavedRecipes = res
      console.log(this.allSavedRecipes);
      
    },
    error:(err:any)=>{
      console.log(err);
      
    }
  })
}

 viewRecipe(id:string){
    const token = sessionStorage.getItem("token")
    if(token){
      this.router.navigateByUrl(`/view/${id}`)
    }
    else{
Swal.fire({
  title:'Oops',
  text:'Please login',
  icon:'info'
})
this.router.navigateByUrl('/login')
    }
  }

  deleteSavedRecipes(id:string){
    this.api.deleteUserSavedRecipesApi(id).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.getAllSavedRecipes()
        
      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })
  }

}
