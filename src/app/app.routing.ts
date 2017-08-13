import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/index';
import { SignupComponent} from './signup/signup.component';
import {CreateIssueComponent} from './create-issue/create-issue.component';
import {ShowIssueComponent} from './show-issue/show-issue.component';
import { HomeComponent } from './home/index';
import { AuthGuard } from './_guards/index';

const appRoutes: Routes = [
    //login route
    { path: 'login', component: LoginComponent },

    //signup route
    {path: 'signup', component: SignupComponent},

    //create issue route
    {path:'new-issue',component:CreateIssueComponent,canActivate: [AuthGuard]},

    //show single issue and it's timeline
    {path:'show-issue/:id',component:ShowIssueComponent,canActivate: [AuthGuard]},

    //show Issues route
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);