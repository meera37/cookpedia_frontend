import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { RecipeComponent } from './recipe/recipe.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { ViewRecipeComponent } from './view-recipe/view-recipe.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { SavedrecipesComponent } from './savedrecipes/savedrecipes.component';
import { ProfileComponent } from './profile/profile.component';
import { AdminhomeComponent } from './admin/adminhome/adminhome.component';
import { AdminrecipesComponent } from './admin/adminrecipes/adminrecipes.component';
import { AdmindownloadsComponent } from './admin/admindownloads/admindownloads.component';
import { AdminrequestComponent } from './admin/adminrequest/adminrequest.component';
import { AdminusersComponent } from './admin/adminusers/adminusers.component';

export const routes: Routes = [

    { path: '', component: HomeComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'all-recipes', component: RecipeComponent },
    { path: 'about', component: AboutComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'view/:id', component: ViewRecipeComponent },
    { path: 'saved-recipes', component: SavedrecipesComponent },
    { path: 'profile', component: ProfileComponent },
    
    { path: 'admin-home', component: AdminhomeComponent },
    { path: 'admin-recipe', component: AdminrecipesComponent },
    { path: 'admin-downloads', component: AdmindownloadsComponent },
    { path: 'admin-requests', component: AdminrequestComponent },
    { path: 'admin-users', component: AdminusersComponent },

    { path: '**', component: PagenotfoundComponent },

];
