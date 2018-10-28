import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { OperationsService } from './operations.service';

@Injectable()
export class RequestService {
    constructor(private http: Http, private operationsService: OperationsService){ }
    serverPath: string =  "http://localhost:60965/";

    requests = {
        login: { url: "Account/Login", needsAuth: false, requestKeys: ["login", "password"] } ,
        register: { url: "Account/Login", needsAuth: false } 
    }

    prepareKeysForRequest(keys: string[], values: any[]){
        let model = {};
        keys.forEach(function(part, index){
            model[part] = values[index].value
        });

        return model;
    }

    executeRequest(requestName: string, requestType: string, payload: any, succOperationContent: string = ""){
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
                    const parsedError = this.parseError(error);
                    this.operationsService.addOperation("error", parsedError);
                    reject(parsedError);
                }
            );

        })
    }

    parseResponse(response){
        return response;
    }

    parseError(error){
        if(error.response !== undefined){
            return error.response;
        }

        return "Ups, something went wrong";
    }
}