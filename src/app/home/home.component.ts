import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { RouterLink } from '@angular/router';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private api:ApiService){}

  HomeRecipe:any = []

  //page load akumbo varan
  ngOnInit(){
    this.getAllHomeRecipes()
  }


  getAllHomeRecipes(){
this.api.homeRecipesApi().subscribe({
  next:(result:any)=>{
   // console.log(result);
   this.HomeRecipe = result
console.log(this.HomeRecipe);
    
  },
  error:(err:any)=>{
    console.log(err);
    
  }
})
  }

}
