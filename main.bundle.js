webpackJsonp([1],{

/***/ "../../../../../src async recursive":
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = "../../../../../src async recursive";

/***/ }),

/***/ "../../../../../src/app/_guards/auth.guard.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthGuard; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AuthGuard = (function () {
    function AuthGuard(router) {
        this.router = router;
    }
    AuthGuard.prototype.canActivate = function () {
        if (localStorage.getItem('currentUser')) {
            // logged in so return true
            return true;
        }
        // not logged in so redirect to login page
        this.router.navigate(['/login']);
        return false;
    };
    return AuthGuard;
}());
AuthGuard = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === "function" && _a || Object])
], AuthGuard);

var _a;
//# sourceMappingURL=auth.guard.js.map

/***/ }),

/***/ "../../../../../src/app/_guards/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__auth_guard__ = __webpack_require__("../../../../../src/app/_guards/auth.guard.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__auth_guard__["a"]; });

//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../../../../src/app/_helpers/fake-backend.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http_testing__ = __webpack_require__("../../../http/@angular/http/testing.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_user__ = __webpack_require__("../../../../../src/app/_models/user.ts");
/* unused harmony export fakeBackendFactory */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return fakeBackendProvider; });



var Users = [{ username: "amal", password: "password" }, { username: "doselect", password: "doselect" }];
var id = 0;
function fakeBackendFactory(backend, options) {
    // configure fake backend
    backend.connections.subscribe(function (connection) {
        // wrap in timeout to simulate server api call
        setTimeout(function () {
            // fake authenticate api end point
            if (connection.request.url.endsWith('/api/authenticate') && connection.request.method === __WEBPACK_IMPORTED_MODULE_0__angular_http__["e" /* RequestMethod */].Post) {
                // get parameters from post request
                var params_1 = JSON.parse(connection.request.getBody());
                var doesUserExist_1 = false;
                // check user credentials and return fake jwt token if valid
                Users.forEach(function (value, index) {
                    var currentUser = value;
                    if (params_1.username === currentUser.username && params_1.password === currentUser.password) {
                        doesUserExist_1 = true;
                    }
                });
                if (doesUserExist_1) {
                    connection.mockRespond(new __WEBPACK_IMPORTED_MODULE_0__angular_http__["f" /* Response */](new __WEBPACK_IMPORTED_MODULE_0__angular_http__["g" /* ResponseOptions */]({ status: 200, body: { token: 'fake-jwt-token' } })));
                }
                else {
                    connection.mockRespond(new __WEBPACK_IMPORTED_MODULE_0__angular_http__["f" /* Response */](new __WEBPACK_IMPORTED_MODULE_0__angular_http__["g" /* ResponseOptions */]({ status: 200 })));
                }
            }
            // fake authenticate api end point
            if (connection.request.url.endsWith('/api/signup') && connection.request.method === __WEBPACK_IMPORTED_MODULE_0__angular_http__["e" /* RequestMethod */].Post) {
                // get parameters from post request
                var params_2 = JSON.parse(connection.request.getBody());
                var doesUserExist_2 = false;
                Users.forEach(function (value, index) {
                    var currentUser = value;
                    if (params_2.username === currentUser.username) {
                        doesUserExist_2 = true;
                    }
                });
                // check user credentials and return fake jwt token if valid
                if (doesUserExist_2) {
                    connection.mockRespond(new __WEBPACK_IMPORTED_MODULE_0__angular_http__["f" /* Response */](new __WEBPACK_IMPORTED_MODULE_0__angular_http__["g" /* ResponseOptions */]({ status: 200, body: { signUpStatus: false } })));
                }
                else {
                    var newUser = new __WEBPACK_IMPORTED_MODULE_2__models_user__["a" /* User */]();
                    newUser.userId = id++;
                    newUser.username = params_2.username;
                    newUser.password = params_2.password;
                    Users.push(newUser);
                    connection.mockRespond(new __WEBPACK_IMPORTED_MODULE_0__angular_http__["f" /* Response */](new __WEBPACK_IMPORTED_MODULE_0__angular_http__["g" /* ResponseOptions */]({ status: 200, body: { signUpStatus: true } })));
                }
            }
            // fake users api end point
            if (connection.request.url.endsWith('/api/users') && connection.request.method === __WEBPACK_IMPORTED_MODULE_0__angular_http__["e" /* RequestMethod */].Get) {
                // check for fake auth token in header and return test users if valid, this security is implemented server side
                // in a real application
                if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    connection.mockRespond(new __WEBPACK_IMPORTED_MODULE_0__angular_http__["f" /* Response */](new __WEBPACK_IMPORTED_MODULE_0__angular_http__["g" /* ResponseOptions */]({ status: 200, body: Users })));
                }
                else {
                    // return 401 not authorised if token is null or invalid
                    connection.mockRespond(new __WEBPACK_IMPORTED_MODULE_0__angular_http__["f" /* Response */](new __WEBPACK_IMPORTED_MODULE_0__angular_http__["g" /* ResponseOptions */]({ status: 401 })));
                }
            }
        }, 500);
    });
    return new __WEBPACK_IMPORTED_MODULE_0__angular_http__["h" /* Http */](backend, options);
}
var fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: __WEBPACK_IMPORTED_MODULE_0__angular_http__["h" /* Http */],
    useFactory: fakeBackendFactory,
    deps: [__WEBPACK_IMPORTED_MODULE_1__angular_http_testing__["a" /* MockBackend */], __WEBPACK_IMPORTED_MODULE_0__angular_http__["b" /* BaseRequestOptions */]]
};
//# sourceMappingURL=fake-backend.js.map

/***/ }),

/***/ "../../../../../src/app/_helpers/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__fake_backend__ = __webpack_require__("../../../../../src/app/_helpers/fake-backend.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__fake_backend__["a"]; });

//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../../../../src/app/_models/user.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return User; });
var User = (function () {
    function User() {
    }
    return User;
}());

//# sourceMappingURL=user.js.map

/***/ }),

/***/ "../../../../../src/app/_services/authentication.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthenticationService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AuthenticationService = (function () {
    function AuthenticationService(http) {
        this.http = http;
        // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }
    AuthenticationService.prototype.login = function (username, password) {
        var _this = this;
        return this.http.post('/api/authenticate', JSON.stringify({ username: username, password: password }))
            .map(function (response) {
            // login successful if there's a jwt token in the response
            var token = response.json() && response.json().token;
            if (token) {
                // set token property
                _this.token = token;
                // store username and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));
                // return true to indicate successful login
                return true;
            }
            else {
                // return false to indicate failed login
                return false;
            }
        });
    };
    AuthenticationService.prototype.signup = function (username, password) {
        return this.http.post('/api/signup', JSON.stringify({ username: username, password: password }))
            .map(function (response) {
            // login successful if there's a jwt token in the response
            var result = response.json() && response.json().signUpStatus;
            if (result) {
                // return true to indicate successful signup
                return true;
            }
            else {
                // return false to indicate failed signup
                return false;
            }
        });
    };
    AuthenticationService.prototype.logout = function () {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('currentUser');
    };
    return AuthenticationService;
}());
AuthenticationService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["h" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["h" /* Http */]) === "function" && _a || Object])
], AuthenticationService);

var _a;
//# sourceMappingURL=authentication.service.js.map

/***/ }),

/***/ "../../../../../src/app/_services/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__authentication_service__ = __webpack_require__("../../../../../src/app/_services/authentication.service.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__authentication_service__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__user_service__ = __webpack_require__("../../../../../src/app/_services/user.service.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__user_service__["a"]; });


//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../../../../src/app/_services/user.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__index__ = __webpack_require__("../../../../../src/app/_services/index.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var UserService = (function () {
    function UserService(http, authenticationService) {
        this.http = http;
        this.authenticationService = authenticationService;
    }
    UserService.prototype.getUsers = function () {
        // add authorization header with jwt token
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["i" /* Headers */]({ 'Authorization': 'Bearer ' + this.authenticationService.token });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["j" /* RequestOptions */]({ headers: headers });
        // get users from api
        return this.http.get('/api/users', options)
            .map(function (response) { return response.json(); });
    };
    return UserService;
}());
UserService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["h" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["h" /* Http */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__index__["a" /* AuthenticationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__index__["a" /* AuthenticationService */]) === "function" && _b || Object])
], UserService);

var _a, _b;
//# sourceMappingURL=user.service.js.map

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<!-- main app container -->\n\n\n<router-outlet></router-outlet>\n        \n\n"

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = (function () {
    function AppComponent() {
    }
    return AppComponent;
}());
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-root',
        template: __webpack_require__("../../../../../src/app/app.component.html")
    })
], AppComponent);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__helpers_index__ = __webpack_require__("../../../../../src/app/_helpers/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_http_testing__ = __webpack_require__("../../../http/@angular/http/testing.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ng2_search_filter__ = __webpack_require__("../../../../ng2-search-filter/dist/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ng2_search_filter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_ng2_search_filter__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__app_routing__ = __webpack_require__("../../../../../src/app/app.routing.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__guards_index__ = __webpack_require__("../../../../../src/app/_guards/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__services_index__ = __webpack_require__("../../../../../src/app/_services/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__issues_service__ = __webpack_require__("../../../../../src/app/issues.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__login_index__ = __webpack_require__("../../../../../src/app/login/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__home_index__ = __webpack_require__("../../../../../src/app/home/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__signup_signup_component__ = __webpack_require__("../../../../../src/app/signup/signup.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__filter_section_filter_section_component__ = __webpack_require__("../../../../../src/app/filter-section/filter-section.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__issues_issues_component__ = __webpack_require__("../../../../../src/app/issues/issues.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__repo_info_repo_info_component__ = __webpack_require__("../../../../../src/app/repo-info/repo-info.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__create_issue_create_issue_component__ = __webpack_require__("../../../../../src/app/create-issue/create-issue.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__top_navbar_top_navbar_component__ = __webpack_require__("../../../../../src/app/top-navbar/top-navbar.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__show_issue_show_issue_component__ = __webpack_require__("../../../../../src/app/show-issue/show-issue.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pagination_pagination_component__ = __webpack_require__("../../../../../src/app/pagination/pagination.component.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




// used to create fake backend



















var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* ReactiveFormsModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_8__app_routing__["a" /* routing */],
            __WEBPACK_IMPORTED_MODULE_6_ng2_search_filter__["Ng2SearchPipeModule"]
        ],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_12__login_index__["a" /* LoginComponent */],
            __WEBPACK_IMPORTED_MODULE_13__home_index__["a" /* HomeComponent */],
            __WEBPACK_IMPORTED_MODULE_14__signup_signup_component__["a" /* SignupComponent */],
            __WEBPACK_IMPORTED_MODULE_15__filter_section_filter_section_component__["a" /* FilterSectionComponent */],
            __WEBPACK_IMPORTED_MODULE_16__issues_issues_component__["a" /* IssuesComponent */],
            __WEBPACK_IMPORTED_MODULE_17__repo_info_repo_info_component__["a" /* RepoInfoComponent */],
            __WEBPACK_IMPORTED_MODULE_18__create_issue_create_issue_component__["a" /* CreateIssueComponent */],
            __WEBPACK_IMPORTED_MODULE_19__top_navbar_top_navbar_component__["a" /* TopNavbarComponent */],
            __WEBPACK_IMPORTED_MODULE_20__show_issue_show_issue_component__["a" /* ShowIssueComponent */],
            __WEBPACK_IMPORTED_MODULE_21__pagination_pagination_component__["a" /* PaginationComponent */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_9__guards_index__["a" /* AuthGuard */],
            __WEBPACK_IMPORTED_MODULE_10__services_index__["a" /* AuthenticationService */],
            __WEBPACK_IMPORTED_MODULE_10__services_index__["b" /* UserService */],
            __WEBPACK_IMPORTED_MODULE_11__issues_service__["a" /* IssuesService */],
            // providers used to create fake backend
            __WEBPACK_IMPORTED_MODULE_4__helpers_index__["a" /* fakeBackendProvider */],
            __WEBPACK_IMPORTED_MODULE_5__angular_http_testing__["a" /* MockBackend */],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* BaseRequestOptions */]
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ "../../../../../src/app/app.routing.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__login_index__ = __webpack_require__("../../../../../src/app/login/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__signup_signup_component__ = __webpack_require__("../../../../../src/app/signup/signup.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__create_issue_create_issue_component__ = __webpack_require__("../../../../../src/app/create-issue/create-issue.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__show_issue_show_issue_component__ = __webpack_require__("../../../../../src/app/show-issue/show-issue.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__home_index__ = __webpack_require__("../../../../../src/app/home/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__guards_index__ = __webpack_require__("../../../../../src/app/_guards/index.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return routing; });







var appRoutes = [
    //login route
    { path: 'login', component: __WEBPACK_IMPORTED_MODULE_1__login_index__["a" /* LoginComponent */] },
    //signup route
    { path: 'signup', component: __WEBPACK_IMPORTED_MODULE_2__signup_signup_component__["a" /* SignupComponent */] },
    //create issue route
    { path: 'new-issue', component: __WEBPACK_IMPORTED_MODULE_3__create_issue_create_issue_component__["a" /* CreateIssueComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_6__guards_index__["a" /* AuthGuard */]] },
    //show single issue and it's timeline
    { path: 'show-issue/:id', component: __WEBPACK_IMPORTED_MODULE_4__show_issue_show_issue_component__["a" /* ShowIssueComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_6__guards_index__["a" /* AuthGuard */]] },
    //show Issues route
    { path: '', component: __WEBPACK_IMPORTED_MODULE_5__home_index__["a" /* HomeComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_6__guards_index__["a" /* AuthGuard */]] },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];
var routing = __WEBPACK_IMPORTED_MODULE_0__angular_router__["c" /* RouterModule */].forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map

/***/ }),

/***/ "../../../../../src/app/create-issue/create-issue.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".issuer-avatar{\n    display: inline-block;\n}\n\n.create-issue-container{\n    position: relative;\n    background-color: #fff;\n    border: 1px solid #d1d5da;\n    border-radius: 3px;\n}\n\n.create-issue-container:before{\n    position: absolute;\n    top: 11px;\n    right: 100%;\n    left: -16px;\n    display: block;\n    width: 0;\n    height: 0;\n    pointer-events: none;\n    content: \" \";\n    border-color: transparent;\n    border-style: solid solid outset;\n    border-width: 8px;\n    border-right-color: #d1d5da;\n}\n\n.create-issue-container:after{\n    position: absolute;\n    top: 11px;\n    right: 100%;\n    left: -16px;\n    display: block;\n    width: 0;\n    height: 0;\n    pointer-events: none;\n    content: \" \";\n    border-color: transparent;\n    border-style: solid solid outset;\n    border-width: 8px;\n    border-right-color: #d1d5da;\n}\n\n.create-issue-container::after{\n    margin-top: 1px;\n    margin-left: 2px;\n    border-width: 7px;\n    border-right-color: #fff;\n}\n\n.issue-title{\n    position: relative;\n    padding: 10px;\n    padding-bottom: 0;\n    word-wrap: break-word;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/create-issue/create-issue.component.html":
/***/ (function(module, exports) {

module.exports = "<app-top-navbar></app-top-navbar>\n\n<!--Repository Information-->\n\n<app-repo-info></app-repo-info>\n\n\n\n<div class=\"new-issue-form\">\n    <div class=\"container\">\n        <div class=\"row\">\n            <div class=\"col-sm-1 col-xs-2 noPadRight\">\n                <span class=\"issuer-avatar\">\n                    <span alt=\"@amal1994\" class=\"timeline-comment-avatar\"></span>\n                </span>\n                \n            </div>\n            <div class=\"col-sm-8 col-xs-10 noPadLeft\">\n                <div class=\"create-issue-container\">\n                    <form [formGroup]='issueForm' (ngSubmit)=\"onSubmit()\">\n                        <div class=\"issue-title\">\n                            <div class=\"form-group\">\n                            \n                                <input formControlName='issueTitle' type=\"text\" placeholder=\"Title\" class=\"form-control\">\n                            </div>\n                            <div class=\"form-group\">\n                                <textarea formControlName='issueContent' placeholder=\"Description of your issue\" name=\"\" id=\"\"  rows=\"10\" class=\"form-control\"></textarea>\n                            </div>\n                            \n                            <div class=\"form-group text-right\">\n                                <button [disabled]=\"!issueForm.valid\" class=\"btn btn-primary\">Submit Issue</button>\n                            </div>\n                        </div>\n                    </form>\n                </div>\n            </div>\n        </div>\n    </div>\n    \n</div>"

/***/ }),

/***/ "../../../../../src/app/create-issue/create-issue.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__issue__ = __webpack_require__("../../../../../src/app/issue.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__issues_service__ = __webpack_require__("../../../../../src/app/issues.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CreateIssueComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var CreateIssueComponent = (function () {
    function CreateIssueComponent(fb, issueService, _router) {
        this.fb = fb;
        this.issueService = issueService;
        this._router = _router;
        this.today = Date.now();
        this.createForm();
    }
    CreateIssueComponent.prototype.ngOnInit = function () {
        document.body.style.backgroundColor = "#fff";
        //get current logged in user from local storage
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    };
    //Model driven form for creating an issue with validation
    CreateIssueComponent.prototype.createForm = function () {
        this.issueForm = this.fb.group({
            issueTitle: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* Validators */].required],
            issueContent: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* Validators */].required],
            currentDate: ['']
        });
    };
    //function to create an isssue with it's timeline after user submits the create issue form
    CreateIssueComponent.prototype.onSubmit = function () {
        //Initialising issue object
        var newIssue = new __WEBPACK_IMPORTED_MODULE_3__issue__["c" /* Issue */]();
        //getting current date and time
        var currentDate = new Date().toDateString().substr(4, 15);
        var currentTime = new Date().toTimeString().substr(0, 5);
        //Setting issue values
        newIssue.author = this.currentUser.username;
        newIssue.id = this.issueService.getCurrentId();
        newIssue.id = newIssue.id + 1;
        this.issueService.updateId();
        newIssue.title = this.issueForm.controls['issueTitle'].value;
        //Initialising issue timeline,comments and logs
        newIssue.comments = [];
        newIssue.logs = [];
        newIssue.timeline = [];
        //Pushing the issue into issue list
        newIssue.createdDate = currentDate;
        newIssue.createdTime = currentTime;
        newIssue.status = 'open';
        this.issueService.addIssue(newIssue);
        //Pushing issue content as comment
        this.issueService.addComment(newIssue.id, this.currentUser.username, this.issueForm.controls['issueContent'].value, currentDate, currentTime);
        // ps-In the above scenario, we could subscribe to the services but
        //   since the flow is linear and we know that it's bound to happen,
        //   Hence handled it synchronously 
        //Navigating to Issue list Page after successfull entry
        this._router.navigate(['']);
    };
    return CreateIssueComponent;
}());
CreateIssueComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-create-issue',
        template: __webpack_require__("../../../../../src/app/create-issue/create-issue.component.html"),
        styles: [__webpack_require__("../../../../../src/app/create-issue/create-issue.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* FormBuilder */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* FormBuilder */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__issues_service__["a" /* IssuesService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__issues_service__["a" /* IssuesService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */]) === "function" && _c || Object])
], CreateIssueComponent);

var _a, _b, _c;
//# sourceMappingURL=create-issue.component.js.map

/***/ }),

/***/ "../../../../../src/app/filter-section/filter-section.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".filter-section{\n    margin-bottom: 20px;\n}\n.search-issues{\n    position: relative;\n}\n.search-issues input{\n    padding-left: 30px;\n    margin-left: -1px;\n}\n.search-icon{\n    position: absolute;\n    top: 9px;\n    left: 8px;\n    display: block;\n    fill: #c6cbd1;\n    text-align: center;\n    pointer-events: none;\n    z-index: 10;\n}\n\n.nav-links{\n    overflow: hidden;\n}\n\n.nav-links-item{\n    position: relative;\n    float: left;\n    padding: 6px 14px;\n    font-weight: 600;\n    line-height: 20px;\n    color: #586069;\n    border: 1px solid #e1e4e8;\n    cursor: pointer;\n    background: transparent;\n}\n\n.nav-links-item a{\n    color: #586069;\n    text-decoration: none;\n    cursor: pointer;\n}\n\n.nav-links-item+.nav-links-item{\n    margin-left: -1px;\n}\n\n.nav-links-item:hover,.nav-links-item:focus{\n    background: #f6f8fa;\n}\n\n.nav-links-item:first-child{\n    border-top-left-radius: 3px;\n    border-bottom-left-radius: 3px;\n}\n\n.nav-links-item:last-child{\n    border-top-right-radius: 3px;\n    border-bottom-right-radius: 3px;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/filter-section/filter-section.component.html":
/***/ (function(module, exports) {

module.exports = "<!--Contains the filter filter-section-->\n\n<div class=\"container\">\n  <div class=\"row filter-section\">\n    <div class=\"col-sm-12\">\n      <div class=\"row\">\n        <div class=\"col-sm-9\">\n          <div class=\"row\">\n            <div class=\"col-sm-7\">\n              <div class=\"input-group\">\n                <div class=\"input-group-btn\">\n                  <button type=\"button\" class=\"btn btn-default dropdown-toggle\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">Filters <span class=\"caret\"></span></button>\n                  <ul class=\"dropdown-menu\">\n                    <li><a href=\"#\">Action</a></li>\n                    <li><a href=\"#\">Another action</a></li>\n                    <li><a href=\"#\">Something else here</a></li>\n                    <li role=\"separator\" class=\"divider\"></li>\n                    <li><a href=\"#\">Separated link</a></li>\n                  </ul>\n                </div><!-- /btn-group -->\n                <div class=\"search-issues\">\n                  <svg aria-hidden=\"true\" class=\"search-icon\" height=\"16\" version=\"1.1\" viewBox=\"0 0 16 16\" width=\"16\"><path fill-rule=\"evenodd\" d=\"M15.7 13.3l-3.81-3.83A5.93 5.93 0 0 0 13 6c0-3.31-2.69-6-6-6S1 2.69 1 6s2.69 6 6 6c1.3 0 2.48-.41 3.47-1.11l3.83 3.81c.19.2.45.3.7.3.25 0 .52-.09.7-.3a.996.996 0 0 0 0-1.41v.01zM7 10.7c-2.59 0-4.7-2.11-4.7-4.7 0-2.59 2.11-4.7 4.7-4.7 2.59 0 4.7 2.11 4.7 4.7 0 2.59-2.11 4.7-4.7 4.7z\"></path></svg>\n                  <input #filter placeholder=\"Enter Keyword and press enter\"\n                  (change)=\"filterValue(filter.value)\" type=\"text\" \n                  class=\"form-control\" aria-label=\"...\">\n                  \n                </div>\n                \n              </div><!-- /input-group -->\n            </div>\n            <div class=\"col-sm-5\">\n              <ul class=\"nav-links\">\n                <li class=\"nav-links-item\">\n                  <a [routerLink]=\"['']\">\n                    Labels\n                  </a>\n                </li>\n                <li class=\"nav-links-item\">\n                  <a [routerLink]=\"['']\">\n                    Milestones\n                  </a>\n                </li>\n              </ul>\n            </div>\n          </div>\n        </div>\n        <div class=\"col-sm-3 text-right\">\n          <a [routerLink]=\"['/new-issue']\" class=\"btn btn-primary\">New Issue</a>\n        </div>\n      </div>\n      \n    </div><!-- /.col-sm-12-->\n  \n  </div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/filter-section/filter-section.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__issues_service__ = __webpack_require__("../../../../../src/app/issues.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FilterSectionComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var FilterSectionComponent = (function () {
    function FilterSectionComponent(issueService) {
        this.issueService = issueService;
        this.filterItem = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    FilterSectionComponent.prototype.ngOnInit = function () {
        this.items = this.issueService.getIssues();
    };
    //emitting filter value to be used by issues component
    FilterSectionComponent.prototype.filterValue = function (filterItem) {
        this.filterItem.emit(filterItem);
    };
    return FilterSectionComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])('filter-item'),
    __metadata("design:type", Object)
], FilterSectionComponent.prototype, "filterItem", void 0);
FilterSectionComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-filter-section',
        template: __webpack_require__("../../../../../src/app/filter-section/filter-section.component.html"),
        styles: [__webpack_require__("../../../../../src/app/filter-section/filter-section.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__issues_service__["a" /* IssuesService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__issues_service__["a" /* IssuesService */]) === "function" && _a || Object])
], FilterSectionComponent);

var _a;
//# sourceMappingURL=filter-section.component.js.map

/***/ }),

/***/ "../../../../../src/app/home/home.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/home/home.component.html":
/***/ (function(module, exports) {

module.exports = "<app-top-navbar></app-top-navbar>\n\n<!--Repository Information-->\n\n<app-repo-info></app-repo-info>\n\n<!--Filter Section -->\n<app-filter-section (filter-item)=\"filterIssues($event)\"></app-filter-section>\n\n<!--issues list is contained inside this-->\n<app-issues [issues]=\"pagedPosts\" [filterValue]=\"filterValue\"></app-issues>\n    \n<!--issue-list-pagination-->\n<app-pagination [items]=\"posts\"\t[pageSize]=\"pageSize\" (page-changed)=\"changePage($event)\"></app-pagination>"

/***/ }),

/***/ "../../../../../src/app/home/home.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_index__ = __webpack_require__("../../../../../src/app/_services/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__issues_service__ = __webpack_require__("../../../../../src/app/issues.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_underscore__ = __webpack_require__("../../../../underscore/underscore.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_underscore___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_underscore__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var HomeComponent = (function () {
    function HomeComponent(userService, issueService) {
        this.userService = userService;
        this.issueService = issueService;
        this.posts = [];
        this.pageSize = 5;
        this.pagedPosts = [];
        this.users = [];
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
    HomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        // get users from secure api end point
        this.userService.getUsers()
            .subscribe(function (users) {
            _this.users = users;
        });
    };
    HomeComponent.prototype.ngAfterContentInit = function () {
        this.posts = this.issueService.getIssues();
        this.pagedPosts = __WEBPACK_IMPORTED_MODULE_3_underscore__["take"](this.posts, this.pageSize);
    };
    //passing this value as input for issues component
    HomeComponent.prototype.filterIssues = function (filterValue) {
        this.filterValue = filterValue;
    };
    //Handle change page event for pagination
    HomeComponent.prototype.changePage = function (currentPage) {
        var startingIndex = ((currentPage - 1) * this.pageSize);
        this.pagedPosts = __WEBPACK_IMPORTED_MODULE_3_underscore__["take"](__WEBPACK_IMPORTED_MODULE_3_underscore__["rest"](this.posts, startingIndex), this.pageSize);
    };
    return HomeComponent;
}());
HomeComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        template: __webpack_require__("../../../../../src/app/home/home.component.html"),
        styles: [__webpack_require__("../../../../../src/app/home/home.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_index__["b" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_index__["b" /* UserService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__issues_service__["a" /* IssuesService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__issues_service__["a" /* IssuesService */]) === "function" && _b || Object])
], HomeComponent);

var _a, _b;
//# sourceMappingURL=home.component.js.map

/***/ }),

/***/ "../../../../../src/app/home/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__home_component__ = __webpack_require__("../../../../../src/app/home/home.component.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__home_component__["a"]; });

//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../../../../src/app/issue.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Comment; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Log; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return Issue; });
//model for issue,comment and issue logs(for tracking closing and reopening of issues)
var Comment = (function () {
    function Comment() {
    }
    return Comment;
}());

var Log = (function () {
    function Log() {
    }
    return Log;
}());

var Issue = (function () {
    function Issue() {
        this.timeline = [];
    }
    return Issue;
}());

//# sourceMappingURL=issue.js.map

/***/ }),

/***/ "../../../../../src/app/issues.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__issue__ = __webpack_require__("../../../../../src/app/issue.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IssuesService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var issues = [];
var id = 0;
var IssuesService = (function () {
    function IssuesService() {
    }
    //adding issue to issues list
    IssuesService.prototype.addIssue = function (issue) {
        issues.push(issue);
    };
    IssuesService.prototype.removeIssue = function (id) {
    };
    //adding comment to Comment List
    IssuesService.prototype.addComment = function (issueId, commentAuthor, commentContent, commentCreatedDate, commentCreatedTime) {
        var issue = issues.filter(function (x) { return x.id === issueId; })[0];
        var userComment = new __WEBPACK_IMPORTED_MODULE_2__issue__["a" /* Comment */]();
        userComment.commentAuthor = commentAuthor;
        userComment.commentContent = commentContent;
        userComment.commentCreatedDate = commentCreatedDate;
        userComment.commentCreatedTime = commentCreatedTime;
        issue.comments.push(userComment);
        this.addToIssueTimeline(issueId, userComment);
    };
    //getting issues list
    IssuesService.prototype.getIssues = function () {
        return issues;
    };
    //get current issue id
    IssuesService.prototype.getCurrentId = function () {
        return id;
    };
    IssuesService.prototype.updateId = function () {
        id++;
    };
    //get issue with specific id
    IssuesService.prototype.getIssueById = function (id) {
        return issues.filter(function (x) { return x.id === id; })[0];
    };
    //getting list of open issues
    IssuesService.prototype.getOpenIssues = function () {
        var openIssues = 0;
        issues.forEach(function (value, index) {
            if (value.status === 'open') {
                openIssues++;
            }
        });
        return openIssues;
    };
    //getting list of closed issues
    IssuesService.prototype.getClosedIssues = function () {
        var closedIssues = 0;
        issues.forEach(function (value, index) {
            if (value.status === 'closed') {
                closedIssues++;
            }
        });
        return closedIssues;
    };
    IssuesService.prototype.getTotalIssues = function () {
        return issues.length;
    };
    //get logs related to specific issue
    IssuesService.prototype.getIssueLogs = function (issueId) {
        var issue = issues.filter(function (x) { return x.id === issueId; })[0];
        if (issue != null)
            return issue.logs.length;
    };
    //closing issue on issue timeline
    IssuesService.prototype.closeIssue = function (issueId, logAuthor, logCreatedDate, logCreatedTime) {
        var issue = issues.filter(function (x) { return x.id === issueId; })[0];
        var log = new __WEBPACK_IMPORTED_MODULE_2__issue__["b" /* Log */]();
        issue.status = "closed";
        log.logStatus = "closed";
        log.logAuthor = logAuthor;
        log.logCreatedDate = logCreatedDate;
        log.logCreatedTime = logCreatedTime;
        issue.logs.push(log);
        this.addToIssueTimeline(issueId, log);
    };
    //reopening issue on issue timeline
    IssuesService.prototype.reopenIssue = function (issueId, logAuthor, logCreatedDate, logCreatedTime) {
        var issue = issues.filter(function (x) { return x.id === issueId; })[0];
        var log = new __WEBPACK_IMPORTED_MODULE_2__issue__["b" /* Log */]();
        issue.status = "open";
        log.logStatus = "open";
        log.logAuthor = logAuthor;
        log.logCreatedDate = logCreatedDate;
        log.logCreatedTime = logCreatedTime;
        issue.logs.push(log);
        this.addToIssueTimeline(issueId, log);
    };
    //adding timeline object to timeline of an issue 
    IssuesService.prototype.addToIssueTimeline = function (issueId, timelineItem) {
        var issue = issues.filter(function (x) { return x.id === issueId; })[0];
        issue.timeline.push(timelineItem);
    };
    return IssuesService;
}());
IssuesService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [])
], IssuesService);

//# sourceMappingURL=issues.service.js.map

/***/ }),

/***/ "../../../../../src/app/issues/issues.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".issues-list-header{\n    background-color: #f6f8fa;\n    border: 1px solid #e1e4e8;\n    border-radius: 3px 3px 0 0;\n}\n\n.issues-list-header-links{\n    padding-top:13px;\n    padding-bottom: 13px;\n    display: inline-block;\n    color:#586069;\n}\n\n.issues-list-header-links:first-child{\n    margin-left: 15px;\n}\n\n.issues-list-header-links.selected{\n    color: #24292e;\n    font-weight: 600;\n}\n\n.issues-list-container{\n    border:1px #e1e4e8 solid;\n    border-top:0;\n}\n.issue-status{\n    max-width: 60px;\n}\n.icon-holder{\n    padding-top: 8px;\n    padding-left: 15px;\n    display: inline-block;\n}\n.open-issue-icon{\n    fill: #28a745\n}\n.closed-issue-icon{\n    fill: #cb2431;\n}\n\n\n.issue-description{\n    padding-top:8px;\n    padding-bottom: 8px;\n}\n.issue-text{\n    display: inline-block;\n    color:#24292e;\n    font-size:16px;\n}\n\n.issue-text:hover{\n    color:#0366d6;\n}\n.small-text{\n    margin-top: 4px;\n    color:#586069;\n}\n\n/*No issue state styling*/\n\n.empty-state{\n    position: relative;\n    padding: 80px 40px;\n    text-align: center;\n    background-color: #fafbfc;\n    border: 1px solid #e1e4e8;\n    border-radius: 3px;\n    box-shadow: inset 0 0 10px rgba(27,31,35,0.05)\n}\n\n.empty-state-icon{\n    margin-bottom: 8px;\n}\n.empty-state-heading{\n    font-weight: 600;\n    margin:16px 0;\n}\n\n\n.empty-state-text a{\n    cursor: pointer;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/issues/issues.component.html":
/***/ (function(module, exports) {

module.exports = "<!--Container of the list of issues-->\n\n<div class=\"container\">\n  <div class=\"row\">\n    <div class=\"col-sm-12\">\n      <div *ngIf=\"listOfIssues.length ===0\" class=\"empty-state\">\n        <svg aria-hidden=\"true\" class=\"empty-state-icon grey-icon\" height=\"40\" version=\"1.1\" viewBox=\"0 0 14 16\" width=\"35\"><path fill-rule=\"evenodd\" d=\"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z\"></path></svg>\n        <h3 class=\"fs-20 empty-state-heading\">Welcome To Issues!</h3>\n        <p class=\"empty-state-text fs-16\">\n          Issues are used to track todos, bugs, feature requests, and more. As issues are created, they’ll appear here in a searchable and filterable list. To get started, you should\n          <a routerLink=\"/new-issue\">create an issue</a> \n        </p>\n      </div>\n      <div *ngIf=\"listOfIssues.length > 0\" class=\"issues-container\">\n        <div class=\"issues-list-header\">\n          <div class=\"row\">\n             <div class=\"col-sm-4\">\n                <div class=\"row\">\n                  <div class=\"col-md-4 col-sm-6 noPadRight\">\n                    <a href=\"\" class=\"issues-list-header-links selected\">\n                      <svg aria-hidden=\"true\" class=\"octicon octicon-issue-opened\" height=\"16\" version=\"1.1\" viewBox=\"0 0 14 16\" width=\"14\"><path fill-rule=\"evenodd\" d=\"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z\"></path></svg>\n                      {{listOfOpenIssues}} Open\n                    </a>\n                  </div>\n                  <div class=\"col-md-4 col-sm-6 noPadLeft\">\n                    <a *ngIf=\"listOfClosedIssues>0\" href=\"\" class=\"issues-list-header-links\">\n                      <svg aria-hidden=\"true\" class=\"octicon octicon-check\" height=\"16\" version=\"1.1\" viewBox=\"0 0 12 16\" width=\"12\"><path fill-rule=\"evenodd\" d=\"M12 5l-8 8-4-4 1.5-1.5L4 10l6.5-6.5z\"></path></svg>\n                      {{listOfClosedIssues}} Closed\n                    </a>\n                    \n        \n                  </div>\n                </div>\n              </div>\n              <div class=\"col-sm-8\">\n                \n              </div>\n            </div>\n         \n        </div>\n        <div class=\"row\">\n          <div class=\"col-sm-12\">\n            <div class=\"issues-list-container\">\n              <ul class=\"issues-list\">\n                \n                <li *ngFor = \"let issue of issues | filter:filterValue\"  class=\"issues-list-item\">\n                  \n                  <div class=\"row\">\n                    <div class=\"col-sm-1 col-xs-2 issue-status noPadRight\">\n                      <span class=\"icon-holder\">\n                        <svg *ngIf=\"issue.status==='open'\" aria-hidden=\"true\" class=\"open-issue-icon\" height=\"16\" version=\"1.1\" viewBox=\"0 0 14 16\" width=\"14\"><path fill-rule=\"evenodd\" d=\"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z\"></path></svg>\n                        <svg *ngIf=\"issue.status==='closed'\" aria-hidden=\"true\" class=\"closed-issue-icon\" height=\"16\" version=\"1.1\" viewBox=\"0 0 16 16\" width=\"16\"><path fill-rule=\"evenodd\" d=\"M7 10h2v2H7v-2zm2-6H7v5h2V4zm1.5 1.5l-1 1L12 9l4-4.5-1-1L12 7l-1.5-1.5zM8 13.7A5.71 5.71 0 0 1 2.3 8c0-3.14 2.56-5.7 5.7-5.7 1.83 0 3.45.88 4.5 2.2l.92-.92A6.947 6.947 0 0 0 8 1C4.14 1 1 4.14 1 8s3.14 7 7 7 7-3.14 7-7l-1.52 1.52c-.66 2.41-2.86 4.19-5.48 4.19v-.01z\"></path></svg>\n                      </span>\n                    </div>\n                    <div class=\"col-sm-11 col-xs-10 noPadLeft\">\n                      <div class=\"issue-description\">\n                        <a [routerLink]=\"['/show-issue', issue.id]\" class=\"issue-text dark-text\">\n                        {{issue.title}}\n                        </a>\n                        <div class=\"small-text\">\n                          #{{issue.id}} opened on {{issue.createdDate}} at {{issue.createdTime}} by {{issue.author}}\n                        </div>\n                      </div>\n                      \n                      \n                    </div>\n                    \n                  </div>\n                </li>\n              \n              </ul>\n            </div>\n          </div>\n        </div>\n        \n      </div>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/issues/issues.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__issues_service__ = __webpack_require__("../../../../../src/app/issues.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IssuesComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var IssuesComponent = (function () {
    function IssuesComponent(issuesService) {
        this.issuesService = issuesService;
    }
    IssuesComponent.prototype.ngOnInit = function () {
        document.body.style.backgroundColor = "#fff";
        this.listOfIssues = this.issuesService.getIssues();
        this.listOfOpenIssues = this.issuesService.getOpenIssues();
        this.listOfClosedIssues = this.issuesService.getClosedIssues();
    };
    return IssuesComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], IssuesComponent.prototype, "filterValue", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], IssuesComponent.prototype, "issues", void 0);
IssuesComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-issues',
        template: __webpack_require__("../../../../../src/app/issues/issues.component.html"),
        styles: [__webpack_require__("../../../../../src/app/issues/issues.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__issues_service__["a" /* IssuesService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__issues_service__["a" /* IssuesService */]) === "function" && _a || Object])
], IssuesComponent);

var _a;
//# sourceMappingURL=issues.component.js.map

/***/ }),

/***/ "../../../../../src/app/login/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__login_component__ = __webpack_require__("../../../../../src/app/login/login.component.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__login_component__["a"]; });

//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../../../../src/app/login/login.component.html":
/***/ (function(module, exports) {

module.exports = "\n<!--Login Form-->\n\n<div class=\"form-container\">\n    <div class=\"header\">\n        <a routerLink=\"/login\">\n            <svg aria-hidden=\"true\" class=\"octicon octicon-mark-github\" height=\"48\" version=\"1.1\" viewBox=\"0 0 16 16\" width=\"48\"><path fill-rule=\"evenodd\" d=\"M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z\"></path></svg>\n        </a>\n    </div>\n    <h2 class=\"form-header\">Sign in to GitHub</h2>\n    <div class=\"auth-form\">\n        <form name=\"form\" (ngSubmit)=\"f.form.valid && login()\" #f=\"ngForm\" novalidate>\n            <div class=\"form-group\" [ngClass]=\"{ 'has-error': f.submitted && !username.valid }\">\n                <label for=\"username\">Username or email address</label>\n                <input type=\"text\" class=\"form-control\" name=\"username\" [(ngModel)]=\"model.username\" #username=\"ngModel\" required />\n                <div *ngIf=\"f.submitted && !username.valid\" class=\"help-block\">Username is required</div>\n            </div>\n            <div class=\"form-group\" [ngClass]=\"{ 'has-error': f.submitted && !password.valid }\">\n                <label for=\"password\">Password</label>\n                <input type=\"password\" class=\"form-control\" name=\"password\" [(ngModel)]=\"model.password\" #password=\"ngModel\" required />\n                <div *ngIf=\"f.submitted && !password.valid\" class=\"help-block\">Password is required</div>\n            </div>\n            <div class=\"form-group\">\n                <button [disabled]=\"loading\" class=\"auth-btn btn btn-block btn-primary\">Login</button>\n                <img *ngIf=\"loading\" src=\"data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==\" />\n            </div>\n            <div *ngIf=\"error\" class=\"alert alert-danger\">{{error}}</div>\n        </form>\n    </div>\n    <div class=\"create-account\">\n        New to GitHub?\n        <a routerLink=\"/signup\">Create an account</a>.\n    </div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/login/login.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_index__ = __webpack_require__("../../../../../src/app/_services/index.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var LoginComponent = (function () {
    function LoginComponent(router, authenticationService) {
        this.router = router;
        this.authenticationService = authenticationService;
        this.model = {};
        this.loading = false;
        this.error = '';
    }
    LoginComponent.prototype.ngOnInit = function () {
        // reset login status
        this.authenticationService.logout();
        document.body.style.backgroundColor = "#f9f9f9";
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        //authenticating login
        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(function (result) {
            if (result === true) {
                _this.router.navigate(['/']);
            }
            else {
                _this.error = 'Username or password is incorrect';
                _this.loading = false;
            }
        });
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        template: __webpack_require__("../../../../../src/app/login/login.component.html")
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_index__["a" /* AuthenticationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_index__["a" /* AuthenticationService */]) === "function" && _b || Object])
], LoginComponent);

var _a, _b;
//# sourceMappingURL=login.component.js.map

/***/ }),

/***/ "../../../../../src/app/pagination/pagination.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/pagination/pagination.component.html":
/***/ (function(module, exports) {

module.exports = "<!--Pagination for Issues List-->\n\n<div class=\"container\">\n  <div class=\"row\">\n    <div class=\"col-md-12 text-center\">\n      <ul *ngIf=\"pagination\" class=\"pagination\">\n            <li [class.disabled]=\"currentPage==1\" (click)=\"previous()\"><a>&laquo;</a></li>\n            <li *ngFor=\"let page of pages\" (click)=\"changePage(page)\" [class.active]=\"currentPage==page\">    \n                <a>\n                    {{page}}\n                </a>\n            </li>\n            <li [class.disabled]=\"currentPage==pages.length\" (click)=\"next()\"><a>&raquo;</a></li>\n        </ul>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/pagination/pagination.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PaginationComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var PaginationComponent = (function () {
    function PaginationComponent() {
        this.items = [];
        //output for changing page on pagination
        this.pageChanged = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.pagination = false;
        this.currentPage = 1;
        this.pages = [];
    }
    PaginationComponent.prototype.ngOnInit = function () {
    };
    PaginationComponent.prototype.ngOnChanges = function () {
        if (this.items) {
            if (this.items.length > this.pageSize) {
                this.pages = [];
                this.pagination = true;
                for (var i = 1; i <= Math.ceil(this.items.length / this.pageSize); i++) {
                    this.pages.push(i);
                }
            }
            else {
                this.pagination = false;
            }
        }
    };
    //emitting page change event 
    PaginationComponent.prototype.changePage = function (page) {
        this.currentPage = page;
        this.pageChanged.emit(this.currentPage);
    };
    //next page logic
    PaginationComponent.prototype.next = function () {
        if (this.currentPage == this.pages.length) {
            return;
        }
        else {
            this.currentPage++;
            this.pageChanged.emit(this.currentPage);
        }
    };
    //previous page logic
    PaginationComponent.prototype.previous = function () {
        if (this.currentPage == 1) {
            return;
        }
        else {
            this.currentPage--;
            this.pageChanged.emit(this.currentPage);
        }
    };
    return PaginationComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], PaginationComponent.prototype, "items", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], PaginationComponent.prototype, "pageSize", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])('page-changed'),
    __metadata("design:type", Object)
], PaginationComponent.prototype, "pageChanged", void 0);
PaginationComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-pagination',
        template: __webpack_require__("../../../../../src/app/pagination/pagination.component.html"),
        styles: [__webpack_require__("../../../../../src/app/pagination/pagination.component.css")]
    })
], PaginationComponent);

//# sourceMappingURL=pagination.component.js.map

/***/ }),

/***/ "../../../../../src/app/repo-info/repo-info.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/*Repo Information*/\n.repo-info-header{\n    overflow: hidden;\n}\n.repo-info{\n    margin-left: -15px;\n    margin-right: -15px;\n    background-color: #fafbfc;\n    position: relative;\n    padding-top: 20px;\n    margin-bottom: 20px;\n    border-bottom: 1px solid #e1e4e8;\n}\n.repo{\n    font-size: 18px;\n    line-height: 26px;\n    color: #586069;\n    margin-top: 0;\n    margin-bottom:0;\n    position: relative;\n    padding-left: 18px;\n}\n.book-icon{\n    margin-top: 5px;\n    fill: #959da5;\n    position: absolute;\n    left:0;\n}\n.repo-info-icons{\n    vertical-align: text-bottom;\n}\n\n.repo-action-buttons{\n    overflow: hidden;\n}\n/*Navigation Styling*/\n.navigation-list{\n    overflow: hidden;\n    margin-bottom: 0;\n    margin-top:20px;\n}\n.navigation-item{\n    float: left;\n    padding: 7px 15px 8px;\n    color: #586069;\n    white-space: nowrap;\n    border: solid transparent;\n    border-width: 3px 1px 1px;\n    border-radius: 3px 3px 0 0;\n}\n.navigation-item.active{\n    color: #24292e;\n    background-color: #fff;\n    border-color: #e36209 #e1e4e8 transparent;\n}\n\n.navigation-item a{\n    color: #586069;\n    text-decoration: none;\n    cursor: pointer;\n}\n.navigation-item svg{\n    fill:rgba(27,31,35,0.3);\n    vertical-align: text-bottom;\n}\n.counter{\n    display: inline-block;\n    padding: 2px 5px;\n    font-size: 12px;\n    font-weight: 600;\n    line-height: 1;\n    color: #444d56;\n    background-color: rgba(27,31,35,0.08);\n    border-radius: 20px;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/repo-info/repo-info.component.html":
/***/ (function(module, exports) {

module.exports = "\n<!--Contains info related to repository - Issues tab is dynamic-->\n\n<div class=\"container-fluid\">\n    <div class=\"row\">\n        <div class=\"col-sm-12\">\n            <div class=\"repo-info\">\n\n                <div class=\"container\">\n                    <div class=\"repo-info-header\">\n                        <h1 class=\"repo pull-left \">\n                            <svg aria-hidden=\"true\" class=\"book-icon\" height=\"16\" version=\"1.1\" viewBox=\"0 0 12 16\" width=\"12\"><path fill-rule=\"evenodd\" d=\"M4 9H3V8h1v1zm0-3H3v1h1V6zm0-2H3v1h1V4zm0-2H3v1h1V2zm8-1v12c0 .55-.45 1-1 1H6v2l-1.5-1.5L3 16v-2H1c-.55 0-1-.45-1-1V1c0-.55.45-1 1-1h10c.55 0 1 .45 1 1zm-1 10H1v2h2v-1h3v1h5v-2zm0-10H2v9h9V1z\"></path></svg>\n                            <span class=\"author\" itemprop=\"author\"><a  class=\"url fn\" rel=\"author\">Dummy Repository</a>\n                            </span>\n                            </h1>\n                            <div class=\"repo-action-buttons\">\n                                <div class=\"btn-group pull-right\">\n                                    <button type=\"button\" class=\"btn btn-sm btn-defaultr\">\n                                        <span>\n                                            <svg aria-hidden=\"true\" class=\"repo-info-icons\" height=\"16\" version=\"1.1\" viewBox=\"0 0 10 16\" width=\"10\"><path fill-rule=\"evenodd\" d=\"M8 1a1.993 1.993 0 0 0-1 3.72V6L5 8 3 6V4.72A1.993 1.993 0 0 0 2 1a1.993 1.993 0 0 0-1 3.72V6.5l3 3v1.78A1.993 1.993 0 0 0 5 15a1.993 1.993 0 0 0 1-3.72V9.5l3-3V4.72A1.993 1.993 0 0 0 8 1zM2 4.2C1.34 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3 10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3-10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z\"></path></svg>                                \n                                            Fork\n                                            \n                                        </span>\n                                        \n                                    </button>\n                                    <button type=\"button\" class=\"btn btn-sm btn-default dropdown-toggle\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">\n                                        4,763\n                                        <span class=\"sr-only\">Toggle Dropdown</span>\n                                    </button>\n                    \n                                </div>\n\n                                <div class=\"btn-group pull-right\">\n                                    <button type=\"button\" class=\"btn btn-sm btn-defaultr\">\n                                        <span>\n                                            <svg aria-hidden=\"true\" class=\"repo-info-icons\" height=\"16\" version=\"1.1\" viewBox=\"0 0 14 16\" width=\"14\"><path fill-rule=\"evenodd\" d=\"M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74z\"></path></svg>\n                                            Star\n                                            \n                                        </span>\n                                        \n                                    </button>\n                                    <button type=\"button\" class=\"btn btn-sm btn-default dropdown-toggle\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">\n                                        4,763\n                                        <span class=\"sr-only\">Toggle Dropdown</span>\n                                    </button>\n                \n                                </div>\n\n                                <div class=\"btn-group pull-right\">\n                                    <button type=\"button\" class=\"btn btn-sm btn-defaultr\">\n                                        <span>\n                                            <svg aria-hidden=\"true\" class=\"repo-info-icons\" height=\"16\" version=\"1.1\" viewBox=\"0 0 16 16\" width=\"16\"><path fill-rule=\"evenodd\" d=\"M8.06 2C3 2 0 8 0 8s3 6 8.06 6C13 14 16 8 16 8s-3-6-7.94-6zM8 12c-2.2 0-4-1.78-4-4 0-2.2 1.8-4 4-4 2.22 0 4 1.8 4 4 0 2.22-1.78 4-4 4zm2-4c0 1.11-.89 2-2 2-1.11 0-2-.89-2-2 0-1.11.89-2 2-2 1.11 0 2 .89 2 2z\"></path></svg>\n                                            Watch\n                                            <span class=\"caret\"></span>\n                                        </span>\n                                        \n                                    </button>\n                                    <button type=\"button\" class=\"btn btn-sm btn-default dropdown-toggle\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">\n                                        4,763\n                                        <span class=\"sr-only\">Toggle Dropdown</span>\n                                    </button>\n                                </div>\n                            </div>\n                            \n\n                            \n                    \n        \n                    </div>\n\n                    <div class=\"row\">\n                        <div class=\"col-sm-12\">\n                            <nav class=\"navigation-items\">\n                                <ul class=\"navigation-list\">\n                                    <li class=\"navigation-item\">\n                                        <a>\n                                            <svg aria-hidden=\"true\" class=\"octicon octicon-code\" height=\"16\" version=\"1.1\" viewBox=\"0 0 14 16\" width=\"14\"><path fill-rule=\"evenodd\" d=\"M9.5 3L8 4.5 11.5 8 8 11.5 9.5 13 14 8 9.5 3zm-5 0L0 8l4.5 5L6 11.5 2.5 8 6 4.5 4.5 3z\"></path></svg>\n                                            Code\n                                        </a>\n                                        \n                                    </li>\n                                    <li class=\"navigation-item active\">\n                                        <a routerLink = \"/\">\n                                            <svg aria-hidden=\"true\" class=\"octicon octicon-issue-opened\" height=\"16\" version=\"1.1\" viewBox=\"0 0 14 16\" width=\"14\"><path fill-rule=\"evenodd\" d=\"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z\"></path></svg>\n                                            Issues\n                                            <span class=\"counter\">\n                                                {{totalIssues}}\n                                            </span>\n                                        </a>\n                                    </li>\n                                    <li class=\"navigation-item\">\n                                        <a>\n                                            <svg aria-hidden=\"true\" class=\"octicon octicon-git-pull-request\" height=\"16\" version=\"1.1\" viewBox=\"0 0 12 16\" width=\"12\"><path fill-rule=\"evenodd\" d=\"M11 11.28V5c-.03-.78-.34-1.47-.94-2.06C9.46 2.35 8.78 2.03 8 2H7V0L4 3l3 3V4h1c.27.02.48.11.69.31.21.2.3.42.31.69v6.28A1.993 1.993 0 0 0 10 15a1.993 1.993 0 0 0 1-3.72zm-1 2.92c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zM4 3c0-1.11-.89-2-2-2a1.993 1.993 0 0 0-1 3.72v6.56A1.993 1.993 0 0 0 2 15a1.993 1.993 0 0 0 1-3.72V4.72c.59-.34 1-.98 1-1.72zm-.8 10c0 .66-.55 1.2-1.2 1.2-.65 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2zM2 4.2C1.34 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z\"></path></svg>\n                                            Pull Requests\n                                        </a>\n                                    </li>\n                                    <li class=\"navigation-item\">\n                                        <a>\n                                            <svg aria-hidden=\"true\" class=\"octicon octicon-project\" height=\"16\" version=\"1.1\" viewBox=\"0 0 15 16\" width=\"15\"><path fill-rule=\"evenodd\" d=\"M10 12h3V2h-3v10zm-4-2h3V2H6v8zm-4 4h3V2H2v12zm-1 1h13V1H1v14zM14 0H1a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h13a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1z\"></path></svg>\n                                            Projects\n                                        </a>\n                                    </li>\n                                    <li class=\"navigation-item\">\n                                        <a>\n                                            <svg aria-hidden=\"true\" class=\"octicon octicon-book\" height=\"16\" version=\"1.1\" viewBox=\"0 0 16 16\" width=\"16\"><path fill-rule=\"evenodd\" d=\"M3 5h4v1H3V5zm0 3h4V7H3v1zm0 2h4V9H3v1zm11-5h-4v1h4V5zm0 2h-4v1h4V7zm0 2h-4v1h4V9zm2-6v9c0 .55-.45 1-1 1H9.5l-1 1-1-1H2c-.55 0-1-.45-1-1V3c0-.55.45-1 1-1h5.5l1 1 1-1H15c.55 0 1 .45 1 1zm-8 .5L7.5 3H2v9h6V3.5zm7-.5H9.5l-.5.5V12h6V3z\"></path></svg>\n                                            Wiki\n                                        </a>\n                                        \n                                    </li>\n                                </ul>\n                            </nav>\n                        </div>\n                    </div>\n                    \n                    \n                </div>\n\n            </div>\n\n            \n            \n        </div>\n    </div>\n\n</div>"

/***/ }),

/***/ "../../../../../src/app/repo-info/repo-info.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__issues_service__ = __webpack_require__("../../../../../src/app/issues.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RepoInfoComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var RepoInfoComponent = (function () {
    function RepoInfoComponent(issueService) {
        this.issueService = issueService;
    }
    RepoInfoComponent.prototype.ngOnInit = function () {
        //getting number of issues
        this.totalIssues = this.issueService.getTotalIssues();
    };
    return RepoInfoComponent;
}());
RepoInfoComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-repo-info',
        template: __webpack_require__("../../../../../src/app/repo-info/repo-info.component.html"),
        styles: [__webpack_require__("../../../../../src/app/repo-info/repo-info.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__issues_service__["a" /* IssuesService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__issues_service__["a" /* IssuesService */]) === "function" && _a || Object])
], RepoInfoComponent);

var _a;
//# sourceMappingURL=repo-info.component.js.map

/***/ }),

/***/ "../../../../../src/app/show-issue/show-issue.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n\n.show-issue-header{\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-pack: justify;\n        -ms-flex-pack: justify;\n            justify-content: space-between;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    \n}\n\n.show-issue-title{\n    font-size: 32px;\n}\n.issue-title{\n    font-weight: normal;\n}\n.avatar-holder{\n    max-width: 85px;\n}\n.issuer-avatar{\n    display: inline-block;\n}\n\n.issue-number{\n    font-weight: 300;\n    color: #a3aab1;\n    letter-spacing: -1px;\n}\n.issue-meta-data{\n    border-bottom:  1px solid #e6ebf1;\n    padding-bottom: 20px;\n    margin-top: 9px;\n    margin-bottom: 15px;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n}\n\n.issue-meta-data-info{\n    color: #586069;\n}\n\n.issue-meta-data .issue-status{\n    margin-right: 8px;\n}\n\n.issue-meta-data .author{\n    font-weight: 600;\n    color: #586069;\n}\n\n.issue-status{\n    font-size: 14px;\n}\n\n.issue-timeline-comment{\n    position: relative;\n    background-color: #fff;\n    border: 1px solid #d1d5da;\n    border-radius: 3px;\n    margin-bottom: 15px;\n}\n\n.issue-timeline-comment:before,.issue-timeline-comment:after{\n    position: absolute;\n    top: 11px;\n    right: 100%;\n    left: -16px;\n    display: block;\n    width: 0;\n    height: 0;\n    pointer-events: none;\n    content: \" \";\n    border-color: transparent;\n    border-style: solid solid outset;\n}\n\n.issue-timeline-comment:before{\n    border-width: 8px;\n    border-right-color: #d1d5da;\n}\n.issue-timeline-comment:after{\n    margin-top: 1px;\n    margin-left: 2px;\n    border-width: 7px;\n    border-right-color: #f6f8fa;\n}\n\n.issue-timeline-comment-header{\n    padding: 10px 15px;\n    color: #586069;\n    background-color: #f6f8fa;\n    border-bottom: 1px solid #d1d5da;\n    border-top-left-radius: 3px;\n    border-top-right-radius: 3px;\n\n}\n\n.issue-timeline-comment-header-text{\n    font-size:14px;\n}\n\n.issue-timeline-comment-text{\n    padding: 15px;\n    min-height: 200px;\n}\n\n/*Issues sidebar css*/\n\n.issue-sidebar-list-item{\n    padding: 10px 0;\n    border-bottom: 1px solid #e6ebf1;\n}\n.issue-sidebar-list-item-heading{\n    margin-bottom: 10px;\n    font-size: 12px;\n    line-height: 16px;\n    color: #586069;\n    font-weight: 600;\n}\n\n.issue-sidebar-list-item-text{\n    font-size: 12px;\n    color: #586069;\n}\n\n/* comment form */\n.new-comment-form{\n    border-top: 2px solid #e6ebf1;\n    padding-top: 15px;\n    margin-top:15px;\n    background: #fff;\n}\n\n\n.issue-comment{\n    padding: 8px 8px 0 8px;\n}\n\n.discuss-issues-container:before{\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    left: 94px;\n    z-index: -1;\n    display: block;\n    width: 2px;\n    content: \"\";\n    background-color: #e6ebf1;\n}\n\n.comment-logs-item{\n    position: relative;\n    margin: 15px 0 15px 79px;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n}\n.comment-logs-icon{\n    width: 32px;\n    height: 32px;\n    margin-top: -7px;\n    margin-left: -16px;\n    margin-right: 5px;\n    line-height: 28px;\n    color: #586069;\n    text-align: center;\n    background-color: #e6ebf1;\n    border: 2px solid #fff;\n    border-radius: 50%;\n}\n\n.comment-logs-icon.closed{\n    fill: #fff;\n    background-color: #cb2431\n}\n\n.comment-logs-icon.open{\n    fill: #fff;\n    background-color: #2cbe4e;\n}\n.comment-log-author{\n    font-weight: 600;\n    color: #586069;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/show-issue/show-issue.component.html":
/***/ (function(module, exports) {

module.exports = "<!--Top Black Navbar-->\n<app-top-navbar></app-top-navbar>\n\n<!--Repository Information-->\n<app-repo-info></app-repo-info>\n\n\n<!--Show Issues\n    ps- Can be refactored into smaller components but ran out of time for submission-->\n\n<div *ngIf=\"currentIssue\" class=\"container\"> \n    <div class=\"row\">\n        <div class=\"col-sm-12\">\n            <div class=\"show-issue\">\n                <div class=\"show-issue-header\">\n                    <div class=\"show-issue-title\">\n                        <span class=\"issue-title\">\n                            {{currentIssue?.title}}\n                        </span> \n                        <span class=\"issue-number\">\n                            #{{currentIssue?.id}}\n                        </span>\n                    </div>\n                    <a class=\"btn btn-sm btn-primary\" [routerLink]=\"['/new-issue']\" >New Issue</a>\n                </div>\n                <div class=\"issue-meta-data\">\n\n                    <button *ngIf=\"currentIssue.status === 'open'\" type=\"submit\" class=\"btn issue-status btn-sm btn-primary\"><svg aria-hidden=\"true\" class=\"btn-icon\" height=\"16\" version=\"1.1\" viewBox=\"0 0 14 16\" width=\"14\"><path fill-rule=\"evenodd\" d=\"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z\"></path></svg>\n                     Open</button>\n                     <button *ngIf=\"currentIssue.status === 'closed'\" class=\"btn issue-status btn-sm btn-danger\"><svg aria-hidden=\"true\" class=\"btn-icon\" height=\"16\" version=\"1.1\" viewBox=\"0 0 16 16\" width=\"16\"><path fill-rule=\"evenodd\" d=\"M7 10h2v2H7v-2zm2-6H7v5h2V4zm1.5 1.5l-1 1L12 9l4-4.5-1-1L12 7l-1.5-1.5zM8 13.7A5.71 5.71 0 0 1 2.3 8c0-3.14 2.56-5.7 5.7-5.7 1.83 0 3.45.88 4.5 2.2l.92-.92A6.947 6.947 0 0 0 8 1C4.14 1 1 4.14 1 8s3.14 7 7 7 7-3.14 7-7l-1.52 1.52c-.66 2.41-2.86 4.19-5.48 4.19v-.01z\"></path></svg>Closed</button>\n                    <div class=\"issue-meta-data-info\">\n                        <span class=\"author\">\n                            <!-- ? MARK - for handling null variable -->\n                            {{currentIssue?.author}}\n                        </span>\n                        <span>\n                            opened this issue on\n                        </span>\n                        <span class=\"issue-date\">\n                            {{currentIssue?.createdDate}}\n                        </span>\n                        <span class=\"issue-time\">\n                            at {{currentIssue?.createdTime}}\n                        </span> \n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n\n<div *ngIf=\"currentIssue\" class=\"show-issue-container\">\n    <div class=\"container\">\n        <div class=\"row\">\n            <div class=\"col-sm-9 discuss-issues-container\">\n                <div *ngFor=\"let timelineItem of currentIssue?.timeline\">\n                    <div *ngIf=\"IfInstanceOfComment(timelineItem)\" class=\"row\">\n                    <div  class=\"col-sm-2 col-xs-2 noPadRight avatar-holder\">\n                        <span class=\"issuer-avatar\">\n                            <span alt=\"@amal1994\" class=\"timeline-comment-avatar\"></span>\n                        </span>\n                    </div>\n                    <div class=\"col-sm-10 col-xs-10 noPadLeft\">\n                        <div class=\"issue-timeline-container\">\n                            <div class=\"issue-timeline-comment\">\n                                \n                                <div class=\"issue-timeline-comment-header\">\n                                    <span class=\"issue-timeline-comment-header-text\">{{timelineItem.commentAuthor}} commented on {{timelineItem.commentCreatedDate}} at {{timelineItem.commentCreatedTime}}</span>\n                                </div>\n                                \n                                <div class=\"issue-timeline-comment-text\">\n                                    {{timelineItem.commentContent}}\n                                </div> \n                            </div>\n                        </div>\n                    </div>\n                   \n                </div>\n                <ul  class=\"comment-logs\">\n                    <li *ngIf=\"!IfInstanceOfComment(timelineItem)\" class=\"comment-logs-item\">\n                        <span *ngIf=\"timelineItem.logStatus==='closed'\" class=\"comment-logs-icon closed\">\n                            <svg aria-hidden=\"true\" class=\"octicon octicon-circle-slash\" height=\"16\" version=\"1.1\" viewBox=\"0 0 14 16\" width=\"14\"><path fill-rule=\"evenodd\" d=\"M7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm0 1.3c1.3 0 2.5.44 3.47 1.17l-8 8A5.755 5.755 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zm0 11.41c-1.3 0-2.5-.44-3.47-1.17l8-8c.73.97 1.17 2.17 1.17 3.47 0 3.14-2.56 5.7-5.7 5.7z\"></path></svg>\n                        </span>\n                        <span *ngIf=\"timelineItem.logStatus==='open'\" class=\"comment-logs-icon open\">\n                            <svg aria-hidden=\"true\" class=\"octicon octicon-primitive-dot\" height=\"16\" version=\"1.1\" viewBox=\"0 0 8 16\" width=\"8\"><path fill-rule=\"evenodd\" d=\"M0 8c0-2.2 1.8-4 4-4s4 1.8 4 4-1.8 4-4 4-4-1.8-4-4z\"></path></svg>\n                        </span>\n                        <span class=\"comment-logs-description\">\n                            <span class=\"comment-log-author\">{{timelineItem.logAuthor}}</span>\n                            <span *ngIf=\"timelineItem.logStatus==='closed'\">closed</span>\n                            <span *ngIf=\"timelineItem.logStatus==='open'\">reopened</span> \n                            this issue on {{timelineItem.logCreatedDate}} at {{timelineItem.logCreatedTime}}\n                        </span>\n                    </li>\n                </ul>\n                </div>\n                \n\n                 \n                \n                <div class=\"new-comment-form\">\n                    <div class=\"row\">\n                        <div class=\"col-sm-2 col-xs-2 noPadRight avatar-holder\">\n                            <span class=\"issuer-avatar\">\n                                <img alt=\"@amal1994\" class=\"timeline-comment-avatar\" height=\"44\" src=\"https://avatars0.githubusercontent.com/u/6974242?v=4&amp;s=88\" width=\"44\">\n                            </span>\n                            \n                        </div>\n                        <div class=\"col-sm-10 col-xs-10 noPadLeft\">\n                            <div class=\"issue-timeline-container\">\n                                <div class=\"issue-timeline-comment\">\n                                \n                                <div class=\"issue-timeline-comment-header\">\n                                    <span class=\"issue-timeline-comment-header-text\">Comment on issue above</span>\n                                </div>\n                                \n                                <form [formGroup]='commentForm'>\n                                    <div class=\"issue-comment\">\n                                        \n                                        <div class=\"form-group\">\n                                            <textarea formControlName='issueComment' placeholder=\"Leave a comment\" name=\"\" id=\"\"  rows=\"10\" class=\"form-control\"></textarea>\n                                        </div>\n                                        \n                                        <div class=\"form-group text-right\">\n                                            <button (click)=\"closeIssue()\" \n                                            *ngIf=\"currentIssue.author === currentUser && currentIssue.status==='open'\" \n                                            class=\"btn btn-default\">Close Issue</button>\n                                            <button (click)=\"reopenIssue()\" \n                                            *ngIf=\"currentIssue.author === currentUser && currentIssue.status==='closed'\" \n                                            class=\"btn btn-default\">Reopen Issue</button>\n                                            <button (click)=\"pushComment()\" [disabled]=\"!commentForm.valid\" class=\"btn btn-primary\">Comment</button>\n                                        </div>\n                                    </div>\n                                </form>\n                            </div>\n                                \n                            </div>\n                        </div>\n                    </div>\n    \n                </div>\n                \n                \n            </div>\n        \n            \n            <div class=\"col-sm-3\">\n                <div class=\"issue-sidebar\">\n                    <ul class=\"issue-sidebar-list\">\n                        <li class=\"issue-sidebar-list-item\">\n                            <div class=\"issue-sidebar-list-item-heading\">\n                                Assignees\n                            </div>\n                            <div class=\"issue-sidebar-list-item-text\">\n                                No one assigned\n                            </div>\n                        </li>\n                        <li class=\"issue-sidebar-list-item\">\n                            <div class=\"issue-sidebar-list-item-heading\">\n                                Labels\n                            </div>\n                            <div class=\"issue-sidebar-list-item-text\">\n                                None yet\n                            </div>\n                        </li>\n                        <li class=\"issue-sidebar-list-item\">\n                            <div class=\"issue-sidebar-list-item-heading\">\n                                Projects\n                            </div>\n                            <div class=\"issue-sidebar-list-item-text\">\n                                None yet\n                            </div>\n                        </li>\n                        <li class=\"issue-sidebar-list-item\">\n                            <div class=\"issue-sidebar-list-item-heading\">\n                                Milestone\n                            </div>\n                            <div class=\"issue-sidebar-list-item-text\">\n                                No milestone\n                            </div>\n                        </li>\n                        \n                    </ul>\n                </div>\n            </div>\n        </div>\n    </div>\n    \n</div>\n\n\n\n"

/***/ }),

/***/ "../../../../../src/app/show-issue/show-issue.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__issues_service__ = __webpack_require__("../../../../../src/app/issues.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__issue__ = __webpack_require__("../../../../../src/app/issue.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ShowIssueComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ShowIssueComponent = (function () {
    function ShowIssueComponent(fb, _activatedRouter, issueService) {
        this.fb = fb;
        this._activatedRouter = _activatedRouter;
        this.issueService = issueService;
        this.currentIssue = new __WEBPACK_IMPORTED_MODULE_4__issue__["c" /* Issue */]();
        this.createForm();
    }
    ShowIssueComponent.prototype.ngOnInit = function () {
        var _this = this;
        document.body.style.backgroundColor = "#fff";
        this._activatedRouter.params.subscribe(function (params) {
            _this.currentIssueId = +params["id"];
            _this.currentIssue = _this.issueService.getIssueById(_this.currentIssueId);
        });
        this.currentUser = JSON.parse(localStorage.getItem('currentUser')).username;
    };
    //form logic for creating comment
    ShowIssueComponent.prototype.createForm = function () {
        this.commentForm = this.fb.group({
            issueComment: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* Validators */].required]
        });
    };
    //function to push comment to issue's comments 
    ShowIssueComponent.prototype.pushComment = function () {
        var commentCreatedDate = new Date().toDateString().substr(4, 15);
        var commentCreatedTime = new Date().toTimeString().substr(0, 5);
        var commentContent = this.commentForm.controls['issueComment'].value;
        this.issueService.addComment(this.currentIssueId, this.currentUser, commentContent, commentCreatedDate, commentCreatedTime);
        this.commentForm.reset();
    };
    //function to close issue on issue timeline
    ShowIssueComponent.prototype.closeIssue = function () {
        var logCreatedDate = new Date().toDateString().substr(4, 15);
        var logCreatedTime = new Date().toTimeString().substr(0, 5);
        this.issueService.closeIssue(this.currentIssueId, this.currentUser, logCreatedDate, logCreatedTime);
        this.commentForm.reset();
    };
    //function to reopen a closed issue on issue timeline
    ShowIssueComponent.prototype.reopenIssue = function () {
        var logCreatedDate = new Date().toDateString().substr(4, 15);
        var logCreatedTime = new Date().toTimeString().substr(0, 5);
        this.issueService.reopenIssue(this.currentIssueId, this.currentUser, logCreatedDate, logCreatedTime);
        this.currentIssueLogs = this.issueService.getIssueLogs(this.currentIssueId);
        this.commentForm.reset();
    };
    //checking if the inserted timeline object is a Comment or a Log
    ShowIssueComponent.prototype.IfInstanceOfComment = function (timelineItem) {
        if (timelineItem instanceof __WEBPACK_IMPORTED_MODULE_4__issue__["a" /* Comment */]) {
            return true;
        }
        else {
            return false;
        }
    };
    return ShowIssueComponent;
}());
ShowIssueComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-show-issue',
        template: __webpack_require__("../../../../../src/app/show-issue/show-issue.component.html"),
        styles: [__webpack_require__("../../../../../src/app/show-issue/show-issue.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* FormBuilder */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* FormBuilder */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* ActivatedRoute */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__issues_service__["a" /* IssuesService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__issues_service__["a" /* IssuesService */]) === "function" && _c || Object])
], ShowIssueComponent);

var _a, _b, _c;
//# sourceMappingURL=show-issue.component.js.map

/***/ }),

/***/ "../../../../../src/app/signup/signup.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/signup/signup.component.html":
/***/ (function(module, exports) {

module.exports = "\n<!--Signup Form-->\n\n<div class=\" form-container\">\n    <div class=\"header\">\n        <a routerLink=\"/login\">\n            <svg aria-hidden=\"true\" class=\"octicon octicon-mark-github\" height=\"48\" version=\"1.1\" viewBox=\"0 0 16 16\" width=\"48\"><path fill-rule=\"evenodd\" d=\"M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z\"></path></svg>\n        </a>\n    </div>\n    <h2 class=\"form-header\">Sign up for GitHub</h2>\n    <div class=\"auth-form\">\n        <form name=\"form\" (ngSubmit)=\"f.form.valid && signup()\" #f=\"ngForm\" novalidate>\n            <div class=\"form-group\" [ngClass]=\"{ 'has-error': f.submitted && !username.valid }\">\n                <label for=\"username\">Username or email address</label>\n                <input type=\"text\" class=\"form-control\" name=\"username\" [(ngModel)]=\"model.username\" #username=\"ngModel\" required />\n                <div *ngIf=\"f.submitted && !username.valid\" class=\"help-block\">Username is required</div>\n            </div>\n            <div class=\"form-group\" [ngClass]=\"{ 'has-error': f.submitted && !password.valid }\">\n                <label for=\"password\">Password</label>\n                <input type=\"password\" class=\"form-control\" name=\"password\" [(ngModel)]=\"model.password\" #password=\"ngModel\" required />\n                <div *ngIf=\"f.submitted && !password.valid\" class=\"help-block\">Password is required</div>\n            </div>\n            <div class=\"form-group\">\n                <button [disabled]=\"loading\" class=\"auth-btn btn btn-block btn-primary\">Signup</button>\n                <img *ngIf=\"loading\" src=\"data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==\" />\n            </div>\n            <div *ngIf=\"error\" class=\"alert alert-danger\">{{error}}</div>\n        </form>\n    </div>\n    <div class=\"create-account\">\n        Already have an account?\n        <a routerLink=\"/login\">Login</a>.\n    </div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/signup/signup.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_index__ = __webpack_require__("../../../../../src/app/_services/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignupComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var SignupComponent = (function () {
    function SignupComponent(router, authenticationService) {
        this.router = router;
        this.authenticationService = authenticationService;
        this.model = {};
        this.loading = false;
        this.error = '';
    }
    SignupComponent.prototype.ngOnInit = function () {
        // reset login status
        this.authenticationService.logout();
        document.body.style.backgroundColor = "#f9f9f9";
    };
    //signup authentication
    SignupComponent.prototype.signup = function () {
        var _this = this;
        this.loading = true;
        this.authenticationService.signup(this.model.username, this.model.password)
            .subscribe(function (result) {
            if (result === true) {
                _this.router.navigate(['/login']);
            }
            else {
                _this.error = 'User exists';
                _this.loading = false;
            }
        });
    };
    return SignupComponent;
}());
SignupComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-signup',
        template: __webpack_require__("../../../../../src/app/signup/signup.component.html"),
        styles: [__webpack_require__("../../../../../src/app/signup/signup.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__services_index__["a" /* AuthenticationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_index__["a" /* AuthenticationService */]) === "function" && _b || Object])
], SignupComponent);

var _a, _b;
//# sourceMappingURL=signup.component.js.map

/***/ }),

/***/ "../../../../../src/app/top-navbar/top-navbar.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".issues-header{\n    z-index: 1;\n    padding-top: 12px;\n    padding-bottom: 12px;\n    color: rgba(255,255,255,0.75);\n    background-color: #24292e;\n    height: 54px;\n}\n\n.logo-wrap{\n    color: #fff;\n   display: inline-block;\n}\n.small-logo{\n    width: 32px;\n    height: 32px;\n    fill:#fff;\n}\n.navbar-nav>li>a{\n    padding: 5px 0 0;\n}\n.avatar{\n    height: 20px;\n    width: 20px;\n}\n\n\n\n.nav .open>a, .nav .open>a:focus, .nav .open>a:hover{\n    background: transparent;\n    color:#fff;\n}\n.navbar-nav>li>.dropdown-menu{\n    margin-top: 8px;\n}\n.nav>li>a:focus, .nav>li>a:hover{\n    background: transparent;\n}\n.dropdown-toggle{\n    color:#fff;\n}\n.dropdown-menu:after{\n    position: absolute;\n    display: inline-block;\n    content: \"\";\n    border: 7px solid transparent;\n    border-bottom-color: #fff;\n    top: -14px;\n    right: 10px;\n    left: auto;\n}\n.dropdown-menu>li>a:hover{\n    background-color: #0366d6;\n    color:#fff;\n}\n\n.dropdown-menu>li>a.user-name:hover{\n    background: transparent;\n    color:#000;\n}\n\n\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/top-navbar/top-navbar.component.html":
/***/ (function(module, exports) {

module.exports = "\n<!--Contains top most black navbar-->\n\n<div class=\"issues-header\">\n    <div class=\"container\">\n        <a  class=\"logo-wrap\">\n            <svg aria-hidden=\"true\" class=\"small-logo\" height=\"48\" version=\"1.1\" viewBox=\"0 0 16 16\" width=\"48\"><path fill-rule=\"evenodd\" d=\"M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z\"></path></svg>\n        </a>\n        <ul class=\"nav navbar-nav navbar-right\"> \n            <li id=\"fat-menu\" class=\"dropdown\" (click)=\"toggleDropdown()\" [class.open]=\"isDropdownOpen\"> \n                <a class=\"dropdown-toggle\" id=\"drop3\" data-toggle=\"dropdown\" role=\"button\" aria-haspopup=\"true\" aria-expanded=\"true\"> \n                    <img src=\"https://avatars2.githubusercontent.com/u/6974242?v=4&s=40\" alt=\"avatar\" class=\"avatar\"> \n                    <span class=\"caret\"></span> </a> \n                <ul class=\"dropdown-menu\" aria-labelledby=\"drop3\"> \n                    <li><a class=\"user-name\">Signed in as <span class=\"dark-text\">{{currentUser.username}}</span></a></li> \n                    <li><a>Dummy Link 1</a></li> \n                    <li><a >Dummy Link 2</a></li> \n                    <li role=\"separator\" class=\"divider\"></li> \n                    <li><a [routerLink]=\"['/login']\">Sign Out</a></li> \n                </ul> \n            </li> \n        </ul>\n    </div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/top-navbar/top-navbar.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TopNavbarComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var TopNavbarComponent = (function () {
    function TopNavbarComponent() {
        this.users = [];
        //getting logged user from local storage with fake jwt token
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.isDropdownOpen = false;
    }
    TopNavbarComponent.prototype.ngOnInit = function () {
    };
    //function to toggle dropdown on click
    TopNavbarComponent.prototype.toggleDropdown = function () {
        this.isDropdownOpen = !this.isDropdownOpen;
    };
    return TopNavbarComponent;
}());
TopNavbarComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-top-navbar',
        template: __webpack_require__("../../../../../src/app/top-navbar/top-navbar.component.html"),
        styles: [__webpack_require__("../../../../../src/app/top-navbar/top-navbar.component.css")]
    }),
    __metadata("design:paramtypes", [])
], TopNavbarComponent);

//# sourceMappingURL=top-navbar.component.js.map

/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/@angular/platform-browser-dynamic.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["enableProdMode"])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map