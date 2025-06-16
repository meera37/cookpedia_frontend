import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../service/api.service';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../pipes/search.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-recipe',
  imports: [HeaderComponent,DatePipe, FormsModule, SearchPipe, NgxPaginationModule],
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.css'
})
export class RecipeComponent {

   p: number = 1;

time:any = new Date()
searchKey:string = ""

allRecipes:any=[]
cuisineType:any=[]
mealType:any=[]
dummyArray:any=[]

constructor(private api:ApiService , private router:Router){}


ngOnInit(){
  this.getAllRecipes()
}

  getAllRecipes(){
this.api.allRecipesApi().subscribe({
  next:(res:any)=>{
    //console.log(res);
    this.allRecipes = res
    this.dummyArray= res
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

  filterCuisine(item:any){
    console.log(item);

    this.allRecipes = this.dummyArray.filter((recipe:any)=>recipe.cuisine == item)
    
  }
  filterMealType(item:any){
    console.log(item);

    this.allRecipes= this.dummyArray.filter((recipe:any)=>recipe.mealType.includes(item))
    
  }

  nofilter(){
    this.allRecipes = this.dummyArray
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

 
}
