export default class FormModel{
    constructor(public label: string, public placeholder: string, public type: string, public mode: string, public validationSettings: any){
        this.label = label;
        this.placeholder = placeholder;
        this.type = type;
        this.mode = mode;
        this.validationSettings = validationSettings;
    }
}