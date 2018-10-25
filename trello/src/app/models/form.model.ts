export default class FormModel{
    constructor(public label: string, public placeholder: string, public type: string, public mode: string){
        this.label = label;
        this.placeholder = placeholder;
        this.type = type;
        this.mode = mode;
    }
}