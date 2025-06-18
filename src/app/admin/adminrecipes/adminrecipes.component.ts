import { Component } from '@angular/core';
import { AdminheaderComponent } from "../adminheader/adminheader.component";
import { AdminsidebarComponent } from "../adminsidebar/adminsidebar.component";
import { IDropdownSettings, NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { ApiService } from '../../service/api.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SearchPipe } from '../../pipes/search.pipe';

@Component({
  selector: 'app-adminrecipes',
  imports: [AdminheaderComponent, AdminsidebarComponent, FormsModule, SearchPipe,   NgMultiSelectDropDownModule, ReactiveFormsModule],
  templateUrl: './adminrecipes.component.html',
  styleUrl: './adminrecipes.component.css'
})
export class AdminrecipesComponent {

  allRecipes:any = []
  searchKey:string = ""
  cuisineType:any=[]
//mealType:any=[]
dropdownSettings:IDropdownSettings = {};
dropdownList:any = [];
 selectedItems:any = [];

recipeForm:FormGroup
  constructor(private api:ApiService, private fb:FormBuilder){
    this.recipeForm = fb.group({
      recipeName:["",[Validators.required, Validators.pattern('[a-zA-Z]*')]],
      preTime:["",[Validators.required, Validators.pattern('[0-9]*')]],
      calories:["",[Validators.required, Validators.pattern('[0-9]*')]],
      serving:["",[Validators.required, Validators.pattern('[0-9]*')]],
      cookingTime:["",[Validators.required, Validators.pattern('[0-9]*')]],
      rating:["",[Validators.required, Validators.pattern('[0-9]*')]],
      modeofCooking:["",[Validators.required, Validators.pattern('[a-zA-Z]*')]],
      mealType:[[],[Validators.required]],
      cuisineType:["",[Validators.required]],
      ingredients:[[],[Validators.required]],
      instructions:[[],[Validators.required]],
      image:["",[Validators.required]],

    })

  }


  ngOnInit(){
this.getAllRecipes()

this.dropdownList = [
      { item_id: 1, item_text: 'Lunch' },
      { item_id: 2, item_text: 'Dinner' },
      { item_id: 3, item_text: 'Snack' },
      { item_id: 4, item_text: 'Dessert' },
      { item_id: 5, item_text: 'Side Dish' },
      { item_id: 6, item_text: 'Appetizer' },
      { item_id: 7, item_text: 'Snacks' },
      { item_id: 8, item_text: 'Breakfast' },
      { item_id: 9, item_text: 'Beverage' }

    ];

this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
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

// this.allRecipes.map((item:any)=>item.mealType).flat().forEach((item:any)=>{
// (!this.mealType.includes(item)) && this.mealType.push(item)
// })
  
console.log(this.cuisineType);
//console.log(this.mealType);
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }
}
