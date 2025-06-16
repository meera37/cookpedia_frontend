import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  isLoggin:boolean = false
  username:string = ""

  constructor(private router:Router ){}

  ngOnInit(){
    if(sessionStorage.getItem("token")){
this.isLoggin = true
this.username = JSON.parse(sessionStorage.getItem("user")||"").username
console.log(this.isLoggin);
console.log(this.username);

    }
  }

  logout(){
    sessionStorage.removeItem("token")
    sessionStorage.removeItem("user")
    this.router.navigateByUrl('/')
  }
}
