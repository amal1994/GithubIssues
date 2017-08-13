import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { HttpModule } from '@angular/http';

// used to create fake backend
import { fakeBackendProvider } from './_helpers/index';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';

import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { AppComponent }  from './app.component';
import { routing }        from './app.routing';

import { AuthGuard } from './_guards/index';
import { AuthenticationService, UserService } from './_services/index';
import {IssuesService} from './issues.service';
import { LoginComponent } from './login/index';
import { HomeComponent } from './home/index';
import { SignupComponent } from './signup/signup.component';
import { FilterSectionComponent } from './filter-section/filter-section.component';
import { IssuesComponent } from './issues/issues.component';
import { RepoInfoComponent } from './repo-info/repo-info.component';
import { CreateIssueComponent } from './create-issue/create-issue.component';
import { TopNavbarComponent } from './top-navbar/top-navbar.component';
import { ShowIssueComponent } from './show-issue/show-issue.component';
import { PaginationComponent } from './pagination/pagination.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        routing,
        Ng2SearchPipeModule
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        HomeComponent,
        SignupComponent,
        FilterSectionComponent,
        IssuesComponent,
        RepoInfoComponent,
        CreateIssueComponent,
        TopNavbarComponent,
        ShowIssueComponent,
        PaginationComponent
    ],
    providers: [
        AuthGuard,
        AuthenticationService,
        UserService,
        IssuesService,
        // providers used to create fake backend
        fakeBackendProvider,
        MockBackend,
        BaseRequestOptions
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }