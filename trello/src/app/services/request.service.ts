import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { OperationsService } from './operations.service';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/observable/fromEvent';
@Injectable()
export class RequestService {
    constructor(private http: Http, private operationsService: OperationsService, private authService: AuthService,
        private router: Router){ }
    serverPath: string =  "http://localhost:60965/";
    
    requests = {
        login: { url: "Account/Login", needsAuth: false, requestKeys: ["login", "password"] } ,
        register: { url: "Account/Register", needsAuth: false, requestKeys: ["email", "password", "confirmPassword", "userName", "firstName", "lastName"] },
        projects: { url: "Project", needsAuth: true },
        addProject: { url: "Project/Add", needsAuth: true, requestKeys: ["Name", "Description", "Color"] },
        projectDetails: { url: "Project/Details/", needsAuth: true },
        closeProject: { url: "Project/Close/", needsAuth: true },
        editProject: { url: "Project/Edit/", needsAuth: true, requestKeys: ["Name", "Description", "Color"] },
        addPersonToProject: { url: "Project/AddPersonToProject", needsAuth: true },

        addTaskToProject: { url: "Task/Add/", needsAuth: true, requestKeys: ["Name", "Description", "Color"] },
        deleteTaskFromProject: { url: "Task/Delete/", needsAuth: true },
        editTaskInProject: { url: "Task/Edit/", needsAuth: true, requestKeys: ["Name", "Description", "Color"] },
        assignTaskToPerson: { url: "Task/", needsAuth: true }
    }

    prepareKeysForRequest(keys: string[], values: any[]){
        let model = {};
        keys.forEach(function(part, index){
            model[part] = values[index].value
        });
        return model;
    }

    executeRequest = (requestName: string, requestType: string, payload: any = {}, succOperationContent: string = "", params: string = "") => {
        return new Promise((resolve, reject) => {
            let modifiedPayload = {...payload};
            if(this.requests[requestName].requestKeys)
                modifiedPayload = this.prepareKeysForRequest(this.requests[requestName].requestKeys, payload);
            
            let requestPath: string = this.serverPath + this.requests[requestName].url;

            if(params !== "")
                requestPath += params;

            const reqReference = requestType !== "get" ? this.http[requestType](requestPath, modifiedPayload, { withCredentials: true }) : 
                this.http[requestType](requestPath,  { withCredentials: true });
            reqReference.subscribe(
                response => {
                    if(succOperationContent !== "")
                        this.operationsService.addOperation("success", succOperationContent, requestName);

                    resolve(this.parseResponse(response));
                },
                error => {
                    const parsedErrors = this.parseError(error);
                    for(let key in parsedErrors){
                        this.operationsService.addOperation("error", parsedErrors[key], requestName);
                    }
                    reject(parsedErrors);
                }
            )
        })
    }

    parseResponse(response){
        return response.json().object;
    }

    parseError = (error) => {
        if(error.status === 0){
            return ["No response from the server"];
        }
        if(error.status === 401){
            setTimeout(() => {
                this.authService.deleteCookie("auth");
                this.router.navigate(["/"]);
            }, 3000);

            return ["Your session end. We redirect you to home page. Log in again for using our service"];
        }
        if(error.status === 404){
            return ["Not found request parameters"];
        }
       
        if(error._body !== undefined && error._body !== ""){
            const parsedBody = JSON.parse(error._body);
            return parsedBody.errors;
        }

        return ["Ups, something went wrong"];
    }
}