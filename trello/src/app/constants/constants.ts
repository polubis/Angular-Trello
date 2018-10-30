import FormModel from '../models/form.model';

const patterns = {
    name: /^[A-Z][a-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]+$/i, 
    email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    username: /^[a-zA-Z0-9]+$/,
    number: /^[0-9]/,
    hex: /^#([0-9a-f]{6}|[0-9a-f]{3})$/i
};

export const registerFormSettings: FormModel[] = [
    { label: "Email", placeholder: "type your email adress...", type: "email", mode: "input", initialValue: null,
        validationSettings: {
            minLength: 10, maxLength: 40, required: true, isCorrectFormat: patterns.email
        } 
    },
    { label: "Password", placeholder: "type your password...", type: "password", mode: "input", initialValue: null,
        validationSettings: {
            minLength: 7, maxLength: 25, required: true, shouldShowOneUppercase: 1, isContainsNumber: 1, isContainsSpecialChars: 1
        } 
    },
    { label: "Repeated password", placeholder: "type your password again...", type: "password", mode: "input",initialValue: null,
        validationSettings: {
            minLength: 7, maxLength: 25, required: true, shouldShowOneUppercase: 1, isContainsNumber: 1, isContainsSpecialChars: 1
        } 
    },
    { label: "Username", placeholder: "type your username...", type: "text", mode: "input",initialValue: null,
        validationSettings: {
            minLength: 5, maxLength: 25, required: true, isCorrectFormat: patterns.username
        } 
    },
    { label: "First name", placeholder: "type your firstname...", type: "text", mode: "input",initialValue: null,
        validationSettings: {
            minLength: 5, maxLength: 25, required: true, isCorrectFormat: patterns.name
        } 
    },
    { label: "Last name", placeholder: "type your lastname...", type: "text", mode: "input",initialValue: null,
        validationSettings: {
            minLength: 5, maxLength: 25, required: true, isCorrectFormat: patterns.name
        } 
    },
];

export const loginFormSettings: FormModel[] = [ 
    { label: "Username", placeholder: "type your username...", type: "text", mode: "input", initialValue: null,
        validationSettings: {
            minLength: 5, maxLength: 25, required: true 
        }
    },
    { label: "Password", placeholder: "type your password...", type: "password", mode: "input",initialValue: null,
        validationSettings: {
            minLength: 7, maxLength: 25, required: true, shouldShowOneUppercase: 1, isContainsNumber: 1, isContainsSpecialChars: 1
        } 
    },
];

export const addProjectFormSettings: FormModel[] = [
    { label: "Name", placeholder: "type your project name...", type: "input", mode: "input", initialValue: null,
        validationSettings: {
            minLength: 2, maxLength: 40, required: true 
        }
    },
    { label: "Description", placeholder: "type your project description...", type: "input", mode: "input",initialValue: null,
        validationSettings: {
            maxLength: 125
        } 
    },
    { label: "Color", placeholder: "type your background color in hex format (#fff323)...", type: "input", mode: "input",initialValue: null,
        validationSettings: {
            isCorrectFormat: patterns.hex
        } 
    }
];
