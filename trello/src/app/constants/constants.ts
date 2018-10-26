import FormModel from '../models/form.model';

export const loginFormSettings: FormModel[] = [ 
    { label: "Username", placeholder: "type your username...", type: "text", mode: "input" },
    { label: "Password", placeholder: "type your password...", type: "password", mode: "input" },
];

export const registerFormSettings: FormModel[] = [
    { label: "Email", placeholder: "type your email adress...", type: "email", mode: "input" },
    { label: "Password", placeholder: "type your password...", type: "password", mode: "input" },
    { label: "Repeated password", placeholder: "type your password again...", type: "password", mode: "input" },
    { label: "First name", placeholder: "type your first name...", type: "text", mode: "input" },
    { label: "Last name", placeholder: "type your last name...", type: "text", mode: "input" },
];
