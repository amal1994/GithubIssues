import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import {User} from '../_models/user';
let Users = [{username:"amal",password:"password"},{username:"doselect",password:"doselect"}];
let id=0;
export function fakeBackendFactory(backend: MockBackend, options: BaseRequestOptions) {
    // configure fake backend
    backend.connections.subscribe((connection: MockConnection) => {
        
        // wrap in timeout to simulate server api call
        setTimeout(() => {

            // fake authenticate api end point
            if (connection.request.url.endsWith('/api/authenticate') && connection.request.method === RequestMethod.Post) {
                // get parameters from post request
                let params = JSON.parse(connection.request.getBody());
                let doesUserExist=false;

                // check user credentials and return fake jwt token if valid
                Users.forEach(function(value,index){
                    var currentUser= value;
                     if (params.username === currentUser.username && params.password === currentUser.password){
                        doesUserExist=true;
                     }
                });
                if (doesUserExist) {
                    connection.mockRespond(new Response(
                        new ResponseOptions({ status: 200, body: { token: 'fake-jwt-token' } })
                    ));
                } else {
                    connection.mockRespond(new Response(
                        new ResponseOptions({ status: 200 })
                    ));
                }
            }
             // fake authenticate api end point
            if (connection.request.url.endsWith('/api/signup') && connection.request.method === RequestMethod.Post) {
                // get parameters from post request
                let params = JSON.parse(connection.request.getBody());
    
                let doesUserExist=false;

                Users.forEach(function(value,index){
                    var currentUser= value;
                    if(params.username === currentUser.username){
                        doesUserExist=true;
                    }
                });
                
                // check user credentials and return fake jwt token if valid
                if (doesUserExist) {
                    connection.mockRespond(new Response(
                        new ResponseOptions({ status: 200, body: { signUpStatus: false } })
                    ));
                } else {
                    let newUser = new User();
                    newUser.userId=id++;
                    newUser.username=params.username;
                    newUser.password=params.password;
                    Users.push(newUser);
                    
                    connection.mockRespond(new Response(
                        new ResponseOptions({ status: 200,body: { signUpStatus: true } })
                    ));
                }
            }

            // fake users api end point
            if (connection.request.url.endsWith('/api/users') && connection.request.method === RequestMethod.Get) {
                // check for fake auth token in header and return test users if valid, this security is implemented server side
                // in a real application
                if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    connection.mockRespond(new Response(
                        new ResponseOptions({ status: 200, body: Users })
                    ));
                } else {
                    // return 401 not authorised if token is null or invalid
                    connection.mockRespond(new Response(
                        new ResponseOptions({ status: 401 })
                    ));
                }
            }

        }, 500);

    });

    return new Http(backend, options);
}

export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: Http,
    useFactory: fakeBackendFactory,
    deps: [MockBackend, BaseRequestOptions]
};