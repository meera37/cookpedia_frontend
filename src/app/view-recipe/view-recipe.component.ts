import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { ApiService } from '../service/api.service';
import Swal from 'sweetalert2';
import { jsPDF } from 'jspdf'
import { autoTable } from 'jspdf-autotable'

@Component({
  selector: 'app-view-recipe',
  imports: [RouterLink, HeaderComponent],
  templateUrl: './view-recipe.component.html',
  styleUrl: './view-recipe.component.css'
})
export class ViewRecipeComponent {

  recipesDetails: any = {}
  allRelatedRecipes: any[] = []

  constructor(private route: ActivatedRoute, private api: ApiService) { }
  //activateRoute class is used to access data from the path
  //property - params - returns-observable -subscribe-partial(+ and -ve case)and callback(+ve case) observable

  ngOnInit() {
    this.route.params.subscribe((res: any) => {
      //console.log(res);
      this.getViewRecipe(res.id)
    })
  }

  getViewRecipe(id: string) {
    this.api.viewRecipeApi(id).subscribe({
      next: (res: any) => {
        // console.log(res);
        this.recipesDetails = res
        console.log(this.recipesDetails);
        this.relatedRecipes(res.cuisine)

      },
      error: (err: any) => {
        console.log(err);

      }
    })
  }

  relatedRecipes(cuisine: string) {
    this.api.relatedRecipesApi(cuisine).subscribe({
      next: (res: any) => {
        //         if(res.length>0){
        // this.allRelatedRecipes = res.filter((item:any)=>item.name != this.recipesDetails.name)
        //         }
        //         else{
        //           this.allRelatedRecipes = []
        //         }
        this.allRelatedRecipes = res
        console.log(this.allRelatedRecipes);

      },
      error: (err: any) => {
        console.log(err);

      }
    })
  }

  addSaveRecipe() {
    this.api.addSaveRecipesApi(this.recipesDetails._id, this.recipesDetails).subscribe({
      next: (res: any) => {
        console.log(res);
        Swal.fire({
          title: 'Aww',
          text: 'Recipe saved successfully',
          icon: 'success'
        })

      },
      error: (err: any) => {
        console.log(err);
        if (err.status == 406) {
          Swal.fire({
            title: 'Oops',
            text: `${err.error}`,
            icon: 'error'
          })
        }
        else {
          Swal.fire({
            title: 'Oops',
            text: 'Something went wrong',
            icon: 'error'
          })
        }

      }
    })
  }


  addDownloadRecipe() {
this.generatePdf()
    this.api.addDownloadRecipesApi(this.recipesDetails._id, this.recipesDetails).subscribe({
      next: (res: any) => {
        console.log(res);
        Swal.fire({
          title: 'Aww',
          text: 'Recipe downloaded successfully',
          icon: 'success'
        })

      },
      error: (err: any) => {
        console.log(err);
        Swal.fire({
          title: 'Oops',
          text: 'Something went wrong',
          icon: 'error'
        })


      }
    })
  }


  generatePdf(){
//create instance of jspdf class
const pdf = new jsPDF()

pdf.setTextColor('blue') /*text color*/ 
pdf.setFontSize(25) /*to set font size */
pdf.text(this.recipesDetails.name, 15, 10)

pdf.setTextColor('green')
pdf.setFontSize(12)
pdf.text(`cuisine:${this.recipesDetails.cuisine}`,20,20)
pdf.text(`calories per Serving:${this.recipesDetails.caloriesPerServing}`,20,25)
pdf.text(`cooking time:${this.recipesDetails.cookTimeMinutes}`,20,30)
pdf.text(`Mode of cooking :${this.recipesDetails.difficulty}`,20,35)
pdf.text(`Preparation time:${this.recipesDetails.prepTimeMinutes}`,20,40) /* create text*/


const head = [['Ingredients', 'Instructions']]
const body = [[this.recipesDetails.ingredients , this.recipesDetails.instructions]]

autoTable(pdf, {head , body,startY:50})/*create table */

pdf.output('dataurlnewwindow')/*open in new tab */
pdf.save(`${this.recipesDetails.name}.pdf`) /* name of file*/
  }

}
