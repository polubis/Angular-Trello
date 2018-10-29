import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { OperationsService } from './operations.service';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
@Injectable()
export class RequestService {
    constructor(private http: Http, private operationsService: OperationsService, private authService: AuthService,
        private router: Router){ }
        
    serverPath: string =  "http://localhost:60965/";

    requests = {
        login: { url: "Account/Login", needsAuth: false, requestKeys: ["login", "password"] } ,
        register: { url: "Account/Register", needsAuth: false, requestKeys: ["email", "password", "confirmPassword", "userName", "firstName", "lastName"] } 
    }

    prepareKeysForRequest(keys: string[], values: any[]){
        let model = {};
        keys.forEach(function(part, index){
            model[part] = values[index].value
        });

        return model;
    }

    executeRequest = (requestName: string, requestType: string, payload: any, succOperationContent: string = "") => {
        return new Promise((resolve, reject) => {
            let modifiedPayload = {...payload};
            if(this.requests[requestName].requestKeys)
                modifiedPayload = this.prepareKeysForRequest(this.requests[requestName].requestKeys, payload);
            
            this.http[requestType](this.serverPath + this.requests[requestName].url, modifiedPayload)
            .subscribe(
                response => {
                    if(succOperationContent !== "")
                        this.operationsService.addOperation("success", succOperationContent);

                    resolve(this.parseResponse(response));
                },
                error => {
                    const parsedErrors = this.parseError(error);
                    for(let key in parsedErrors){
                        this.operationsService.addOperation("error", parsedErrors[key]);
                    }
                    reject(parsedErrors);
                }
            )


        })
    }

    parseResponse(response){
        return response;
    }

    parseError = (error) => {     
        if(error._body !== undefined){
            const parsedBody = JSON.parse(error._body);
            if(error.status === 401){
                this.authService.deleteCookie("auth");
                this.router.navigate(["/"]);
            }
            return parsedBody.errors;
        }

        return ["Ups, something went wrong"];
    }
}