import { Component } from '@angular/core';
import { AdminheaderComponent } from "../adminheader/adminheader.component";
import { AdminsidebarComponent } from "../adminsidebar/adminsidebar.component";
import { IDropdownSettings, NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { ApiService } from '../../service/api.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SearchPipe } from '../../pipes/search.pipe';
import Swal from 'sweetalert2';

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
    this.recipeForm.value.mealType.push(item.item_text)
  }
  onSelectAll(items: any) {
    console.log(items);
    items.forEach((item:any)=>{
          this.recipeForm.value.mealType.push(item.item_text)

    })
  }

  onDeleteItem(items:any){
    console.log(items);
  this.recipeForm.value.mealType = this.recipeForm.value.mealType.filter((meal:any)=> meal != items.item_text)  
  }

  onDeleteItemAll(){
    this.recipeForm.value.mealType = []
  }

  addIngredient(data:any){
console.log(data.value);
this.recipeForm.value.ingredients.push(data.value)
data.value = ""
  }

  addInstruction(data:any){
console.log(data.value);
this.recipeForm.value.instructions.push(data.value)
data.value = ""
  }

   getFile(event: any) {
    console.log(event.target.files[0]);
    //FileReader class - to convert files into url
    //create an instance for the class
    let fr = new FileReader()

    fr.readAsDataURL(event.target.files[0]) //to read the file and convert into url

    fr.onload = (event: any) => {  // to get the url
     // console.log(event.target.result);
      this.recipeForm.value.image = event.target.result
      

    }
  }

  save(){
    console.log('inside save function');
    console.log(this.recipeForm.value);

    const {recipeName,preTime, calories, cookingTime, rating, modeofCooking, mealType, cuisineType, ingredients, instructions, image}= this.recipeForm.value

    if(!recipeName || !preTime || !calories || !cookingTime || !rating || !modeofCooking || mealType.length==0 || !cuisineType || ingredients.length == 0 || instructions.length == 0 ||!image){
      Swal.fire({
        title:'Oops',
        text:'Please fill the form completely',
        icon:'info'
      })
    }
    else{
this.api.addNewRecipeApi(this.recipeForm.value).subscribe({
  next:(res:any)=>{
    console.log(res);
    
  },
  error:(err:any)=>{
    console.log(err);
    
  }
})
    }
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

  deleteRecipe(id:any){
    this.api.deleteARecipeApi(id).subscribe({
        next:(res:any)=>{
    console.log(res);
    this.getAllRecipes()
  },
  error:(err:any)=>{
    console.log(err);
    
  }
    })
  }
}
