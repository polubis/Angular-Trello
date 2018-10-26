
import { Injectable } from '@angular/core';
import FormModel from '../models/form.model';

const patterns = {
    name: /^[A-Z][a-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]+$/i, 
    email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
};

const errorsNamingFunctions: {} = {
    minLength: (inputName, specifiedValue) => { return `Input ${inputName} should have more than ${specifiedValue} characters` },
    maxLength: (inputName, specifiedValue) => { return `Input ${inputName} should have less than ${specifiedValue} characters` },
    required: (inputName, specifiedValue) => { return `Input ${inputName} is required` },
    isCorrectFormat: (inputName, specifiedValue) => { return `Input ${inputName} have wrong format` }
};



@Injectable()
export class FormService {
    validationFunctions: {} = {
        minLength: (value, specifiedValue) => this.handleMinLength(value.length, specifiedValue),
        maxLength: (value, specifiedValue) => this.handleMaxLength(value.length, specifiedValue),
        required: (value, specifiedValue) => this.handleRequired(value),
        isCorrectFormat: (value, specifiedValue) => this.handleFormat(value, specifiedValue)
    };
    
    handleMinLength(valueLength: number, specifiedValue: number){
        return valueLength < specifiedValue;
    }

    handleMaxLength(valueLength: number, specifiedValue: number){
        return valueLength > specifiedValue;
    }

    handleRequired(value: any){
        return value === "";
    }

    handleFormat(value: any, specifiedValue: any){
        return !value.test(specifiedValue);
    }

    createErrorItems(settings: FormModel[]): any[]{
        return settings.map(setting => {
           const keys = Object.keys(setting.validationSettings);
            return { isAllErrorsResolved: null, contents: keys.map(key => {
                return { isError: null, content: errorsNamingFunctions[key](setting.label, setting.validationSettings[key]) }
            }) } 
        });
    }

    // isAllErrorsResolved, contents: { isError, contentOfError }
    validate(currentErrorObject: any, value: any, setting: any){
        const copiedObject = {...currentErrorObject};
        const keys = Object.keys(setting);
        const keysLength = keys.length;
        for(let i = 0; i < keysLength; i++){
            copiedObject.contents[i].isError = this.validationFunctions[keys[i]](value, setting[keys[i]]); 
        }
        copiedObject.isAllErrorsResolved = copiedObject.contents.findIndex(content => content.isError) === -1;
        console.log(copiedObject);
        return copiedObject;
    }
}