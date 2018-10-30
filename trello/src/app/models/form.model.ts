export default class FormModel{
    constructor(public label: string, public placeholder: string, public type: string, public mode: string, public validationSettings: any,
        public initialValue: any = null){
    }
}