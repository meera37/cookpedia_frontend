import { Component } from '@angular/core';
import { AdminheaderComponent } from "../adminheader/adminheader.component";
import { AdminsidebarComponent } from "../adminsidebar/adminsidebar.component";
import { ApiService } from '../../service/api.service';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../pipes/search.pipe';

@Component({
  selector: 'app-adminrecipes',
  imports: [AdminheaderComponent, AdminsidebarComponent, FormsModule, SearchPipe],
  templateUrl: './adminrecipes.component.html',
  styleUrl: './adminrecipes.component.css'
})
export class AdminrecipesComponent {

  allRecipes:any = []
  searchKey:string = ""
  cuisineType:any=[]
mealType:any=[]


  constructor(private api:ApiService){}

  ngOnInit(){
this.getAllRecipes()
  }

  getAllRecipes(){
    this.api.allRecipesApi().subscribe({
      next:(res:any)=>{
        this.allRecipes = res
        console.log(this.allRecipes);
        this.allRecipes.forEach((item:any)=>{
  (!this.cuisineType.includes(item.cuisine)) && this.cuisineType.
   push(item.cuisine)
})

this.allRecipes.map((item:any)=>item.mealType).flat().forEach((item:any)=>{
(!this.mealType.includes(item)) && this.mealType.push(item)
})
  
console.log(this.cuisineType);
console.log(this.mealType);
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }
}
