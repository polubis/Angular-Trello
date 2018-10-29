
import { Injectable } from '@angular/core';
import FormModel from '../models/form.model';



const errorsNamingFunctions: {} = {
    minLength: (inputName, specifiedValue) => { return `Input ${inputName} should have more than ${specifiedValue} characters` },
    maxLength: (inputName, specifiedValue) => { return `Input ${inputName} should have less than ${specifiedValue} characters` },
    required: (inputName, specifiedValue) => { return `Input ${inputName} is required` },
    isCorrectFormat: (inputName, specifiedValue) => { return `Input ${inputName} have wrong format` },
    shouldShowOneUppercase: (inputName, specifiedValue) => { return `Input ${inputName} must have ${specifiedValue} upper case ${specifiedValue < 2 ? "letter" : "letters"}` },
    isContainsNumber: (inputName, specifiedValue) => { return `Input ${inputName} must have a ${specifiedValue} ${specifiedValue < 2 ? "number" : "numbers"}`},
    isContainsSpecialChars: (inputName, specifiedValue) => { return `Input ${inputName} must have a ${specifiedValue} ${specifiedValue < 2 ? "character" : "characters"}`},
    mustHaveLength: (inputName, specifiedValue) => { return `Input ${inputName} must have a ${specifiedValue} length `},
    isColor: (inputName, specifiedValue) => { return `Input ${inputName} have ${specifiedValue} color format`}
};



@Injectable()
export class FormService {
    validationFunctions: {} = {
        minLength: (value, specifiedValue) => this.handleMinLength(value.length, specifiedValue),
        maxLength: (value, specifiedValue) => this.handleMaxLength(value.length, specifiedValue),
        required: (value, specifiedValue) => this.handleRequired(value),
        isCorrectFormat: (value, specifiedValue) => this.handleFormat(value, specifiedValue),
        shouldShowOneUppercase: (value, specifiedValue) => this.handleUppercaseLetter(value, specifiedValue),
        isContainsNumber: (value, specifiedValue) => this.handleNumbers(value, specifiedValue),
        isContainsSpecialChars: (value, specifiedValue) => this.handleCharacters(value, specifiedValue),
        mustHaveLength: (value, specifiedValue) => this.handleLengthEqualTo(value.length, specifiedValue),
        isColor: (value, specifiedValue) => this.checkIsColorFormat(value, specifiedValue)
    };

    checkIsColorFormat(value: string, specifiedValue: string){
        if(specifiedValue === "hex"){
            if(value.charAt(0) !== '#')
                return true;
        }

        return false;
    }

    handleLengthEqualTo(valueLength: number, specifiedValue: number){
        return valueLength !== specifiedValue;
    }

    handleCharacters(value: any, specifiedValue: any){
        return value.length - this.handleSpecialCharactersLength(value, /^[a-zA-Z0-9]+$/) < specifiedValue;
    }

    handleSpecialCharactersLength(value: any, patern: RegExp){
        let countOfLetters = 0;
        for(let key in value){
            if(patern.test(value[key]))
                countOfLetters++;                
        }
        return countOfLetters;
    }

    handleUppercaseLetter(value: any, specifiedValue: any){
        return this.handleSpecialCharactersLength(value, /^[A-Z]/) < specifiedValue;
    }

    handleNumbers(value: any, specifiedValue: any){
        return this.handleSpecialCharactersLength(value, /^[0-9]/) < specifiedValue;
    }
    
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
        return !specifiedValue.test(value);
    }

    createFormItems(settings: FormModel[]): any[]{
        return settings.map(setting => {
           const keys = Object.keys(setting.validationSettings);
            return { value: "", isAllErrorsResolved: null, contents: keys.map(key => {
                return { isError: null, content: errorsNamingFunctions[key](setting.label, setting.validationSettings[key]) }
            }) } 
        });
    }

    validate(currentErrorObject: any, value: any, setting: any){
        const copiedObject = {...currentErrorObject};
        const keys = Object.keys(setting);
        const keysLength = keys.length;
        for(let i = 0; i < keysLength; i++){
            copiedObject.contents[i].isError = this.validationFunctions[keys[i]](value, setting[keys[i]]);
        }
        copiedObject.isAllErrorsResolved = copiedObject.contents.findIndex(content => content.isError) === -1;
        copiedObject.value = value;

        return copiedObject;
    }

    validateAll(formStateItems: any[], formSettings: any){
        return formStateItems.map((item, index) => {
            return this.validate(item, item.value, formSettings[index].validationSettings);
        });
    }

    
}