import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { ApiService } from '../service/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  imports: [HeaderComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  downloadRecipes: any[] = []
  uploadedImage: string = ""
  user:any={}
  uploadStatus:any=""


  constructor(private api: ApiService) { }

  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem("user") || "")
    if(this.user.profile){
      this.uploadedImage=this.user.profile
    }
    this.getAllDownloadedRecipes()
  }
  getAllDownloadedRecipes() {
    this.api.getallUserDownloadedRecipesApi().subscribe({
      next: (res: any) => {
        this.downloadRecipes = res
        console.log(this.downloadRecipes);

      },
      error: (err: any) => {
        console.log(err);

      }
    })
  }

  getFile(event: any) {
    console.log(event.target.files[0]);
    //FileReader class - to convert files into url
    //create an instance for the class
    let fr = new FileReader()

    fr.readAsDataURL(event.target.files[0]) //to read the file and convert into url

    fr.onload = (event: any) => {  // to get the url
      console.log(event.target.result);
      this.uploadedImage = event.target.result
      console.log(this.uploadedImage);
this.uploadStatus = event.target.result

    }
  }

  upload() {

    if(this.uploadStatus){
this.api.updateProfileApi({ "profileImage": this.uploadedImage }).subscribe({
      next: (res: any) => {
        console.log(res);
        sessionStorage.setItem("user", JSON.stringify(res))
        this.uploadStatus =""
        Swal.fire({
        title:'Aww',
        text:'Profile updated successfully',
        icon:'success'
      })
      },
      error: (err: any) => {
        console.log(err);
Swal.fire({
        title:'Oops',
        text:'Something went wrong ',
        icon:'error'
      })
      }
    })
    }
    else{
      Swal.fire({
        title:'Oops',
        text:'Please upload a profile image',
        icon:'info'
      })
    }


    
  }
}
