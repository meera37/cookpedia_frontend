import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  serverurl: string = 'http://localhost:4000'

  constructor(private http: HttpClient) { }

  //api to register
  registerApi(reqBody: any) {
    return this.http.post(`${this.serverurl}/user-register`, reqBody)
  }

  loginApi(reqBody: any) {
    return this.http.post(`${this.serverurl}/user-login`, reqBody)
  }

  //api to get all home recipes
  homeRecipesApi() {
    return this.http.get(`${this.serverurl}/home-recipes`)

  }

  //api to get all recipes
  allRecipesApi() {
    return this.http.get(`${this.serverurl}/all-recipes`)
  }

  appendToken() {
    //1.create instance for httpHeaders class
    let headers = new HttpHeaders()
    const token = sessionStorage.getItem("token")
    if (token) {
      headers = headers.append('Authorization', `Bearer ${token}`)
    }
    return { headers } //key value same
  }


  //api to view a recipe
  viewRecipeApi(id: string) {
    return this.http.get(`${this.serverurl}/view/${id}`, this.appendToken())
  }

  //api to view related recipes
  relatedRecipesApi(cuisine:any){
    return this.http.get(`${this.serverurl}/related-recipes?cuisine=${cuisine}`,this.appendToken())
  }

  //add save recipe
  addSaveRecipesApi(recipeId:string,reqBody:any){
    return this.http.post(`${this.serverurl}/save-recipe/${recipeId}`,reqBody, this.appendToken())
  }

  //add download recipe
  addDownloadRecipesApi(recipeId:string,reqBody:any){
    return this.http.post(`${this.serverurl}/download-recipe/${recipeId}`,reqBody, this.appendToken())
  }

  //api to get all saved user recipes
  getallUserSavedRecipes(){
        return this.http.get(`${this.serverurl}/saved-user-recipes`,this.appendToken())

  }

  //api to delete saved recipe
  deleteUserSavedRecipesApi(id:string){
    return this.http.delete(`${this.serverurl}/delete-saved-user-recipes/${id}`)
  }

  //api to get all downloaded user recipes
  getallUserDownloadedRecipesApi(){
        return this.http.get(`${this.serverurl}/downloaded-user-recipes`,this.appendToken())

  }
  //api to update the profile
  updateProfileApi(reqBody:any){
    return this.http.put(`${this.serverurl}/profile-update`,reqBody,this.appendToken())
  }

  //api to get all users
  getAllUsersApi(){
    return this.http.get(`${this.serverurl}/all-users`)
  }

   //api to get all downloads
  getAllDownloadApi(){
    return this.http.get(`${this.serverurl}/all-downloads`)
  }

  //api to add new recipe
  addNewRecipeApi(reqBody:any){
return this.http.post(`${this.serverurl}/add-recipe`,reqBody)
  }

  //api to delete a recipe
  deleteARecipeApi(id:any){
return this.http.delete(`${this.serverurl}/delete-recipe/${id}`)
  }

  //api to add testimonial
  addTestimonialApi(reqBody:any){
  return this.http.post(`${this.serverurl}/add-testimonial`,reqBody)
  }
}
