import { Component } from '@angular/core';
import { AdminheaderComponent } from "../adminheader/adminheader.component";
import { AdminsidebarComponent } from "../adminsidebar/adminsidebar.component";

@Component({
  selector: 'app-adminrequest',
  imports: [AdminheaderComponent, AdminsidebarComponent],
  templateUrl: './adminrequest.component.html',
  styleUrl: './adminrequest.component.css'
})
export class AdminrequestComponent {

}
