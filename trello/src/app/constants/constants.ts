import FormModel from '../models/form.model';

const patterns = {
    name: /^[A-Z][a-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]+$/i,
    email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    username: /^[a-zA-Z0-9]+$/,
    number: /^[0-9]/,
    hex: /^#([0-9a-f]{6}|[0-9a-f]{3})$/i
};

export const projectPicturesBasePath = "http://localhost:60965/ProjectPictures/";
export const userPicturesBasePath = "http://localhost:60965/ProfilePictures/";


export const registerFormSettings: FormModel[] = [
    { label: "Email", placeholder: "type your email adress...", type: "email", mode: "input", initialValue: null,
        validationSettings: {
            minLength: 10, maxLength: 40, required: true, isCorrectFormat: patterns.email
        } ,listElements: []
    },
    { label: "Password", placeholder: "type your password...", type: "password", mode: "input", initialValue: null,
        validationSettings: {
            minLength: 7, maxLength: 25, required: true, shouldShowOneUppercase: 1, isContainsNumber: 1, isContainsSpecialChars: 1
        } ,listElements: []
    },
    { label: "Repeated password", placeholder: "type your password again...", type: "password", mode: "input",initialValue: null,
        validationSettings: {
            minLength: 7, maxLength: 25, required: true, shouldShowOneUppercase: 1, isContainsNumber: 1, isContainsSpecialChars: 1
        } ,listElements: []
    },
    { label: "Username", placeholder: "type your username...", type: "text", mode: "input",initialValue: null,
        validationSettings: {
            minLength: 5, maxLength: 25, required: true, isCorrectFormat: patterns.username
        } ,listElements: []
    },
    { label: "First name", placeholder: "type your firstname...", type: "text", mode: "input",initialValue: null,
        validationSettings: {
            minLength: 5, maxLength: 25, required: true, isCorrectFormat: patterns.name
        } ,listElements: []
    },
    { label: "Last name", placeholder: "type your lastname...", type: "text", mode: "input",initialValue: null,
        validationSettings: {
            minLength: 5, maxLength: 25, required: true, isCorrectFormat: patterns.name
        } ,listElements: []
    },
];

export const loginFormSettings: FormModel[] = [
    { label: "Username", placeholder: "type your username...", type: "text", mode: "input", initialValue: null,
        validationSettings: {
            minLength: 5, maxLength: 25, required: true
        },listElements: []
    },
    { label: "Password", placeholder: "type your password...", type: "password", mode: "input",initialValue: null,
        validationSettings: {
            minLength: 7, maxLength: 25, required: true, shouldShowOneUppercase: 1, isContainsNumber: 1, isContainsSpecialChars: 1
        },listElements: []
    },
];

export const addProjectFormSettings: FormModel[] = [
    { label: "Name", placeholder: "type your project name...", type: "input", mode: "input", initialValue: null,
        validationSettings: {
            minLength: 2, maxLength: 40, required: true
        },listElements: []
    },
    { label: "Description", placeholder: "type your project description...", type: "input", mode: "input",initialValue: null,
        validationSettings: {
            maxLength: 125
        } ,listElements: []
    },
    { label: "Color", placeholder: "type your background color in hex format (#fff323)...", type: "input", mode: "color-input",initialValue: null,
        validationSettings: {
            isCorrectFormat: patterns.hex
        } ,listElements: []
    },
    { label: "File", placeholder: "select your project image...", type: "file", mode: "single-file", initialValue: null,
      validationSettings: {

      } , listElements: []
    }
];

export const editProjectFormSettings: FormModel[] = [
    { label: "Name", placeholder: "type your project name...", type: "input", mode: "input", initialValue: null,
        validationSettings: {
            minLength: 2, maxLength: 40, required: true
        },listElements: []
    },
    { label: "Description", placeholder: "type your project description...", type: "input", mode: "input",initialValue: null,
        validationSettings: {
            maxLength: 125
        } ,listElements: []
    },
    { label: "Color", placeholder: "type your background color in hex format (#fff323)...", type: "input", mode: "color-input",initialValue: null,
        validationSettings: {
            isCorrectFormat: patterns.hex
        } ,listElements: []
    },
    { label: "File", placeholder: "select your project image...", type: "file", mode: "single-file", initialValue: null,
      validationSettings: {

      } , listElements: []
    }
];

export const addTaskFormSettings: FormModel[] = [
    { label: "Name", placeholder: "type your task name...", type: "input", mode: "input", initialValue: null,
    validationSettings: {
        minLength: 2, maxLength: 40, required: true
    }
    ,listElements: []
    },
    { label: "Description", placeholder: "type your task description...", type: "input", mode: "input",initialValue: null,
        validationSettings: {
            maxLength: 125
        } ,listElements: []
    }
];

export const labelFormSettings: FormModel[] = [
    { label: "Name", placeholder: "type your label name...", type: "input", mode: "input", initialValue: null,
        validationSettings: {
            minLength: 2, maxLength: 20, required: true
        }, listElements: []
    },
    { label: "Color", placeholder: "type your label color in hex format (#fff323)...", type: "input", mode: "color-input", initialValue: null,
        validationSettings: {
            isCorrectFormat: patterns.hex
        } ,listElements: []
    },
    { label: "Icon", placeholder: "choose your label icon...", type: "input", mode: "icon-picker", initialValue: null,
        validationSettings: {
            required: true
        } ,listElements: []
    }
];

export const findUserFormSettings: FormModel[] = [
    { label: "User", placeholder: "type for start searching users by firstname, lastname or nickname...", type: "input",
        mode: "type-ahead-with-existing-data", initialValue: null,
        validationSettings: {
            required: true, maxLength: 30
        } ,
        listElements: []
    }
];

export const addCommentFormSettings: FormModel[] = [
  { label: "Comment content", placeholder: "write comment content...", type: "input",
      mode: "textarea", initialValue: null,
      validationSettings: {
          required: true, maxLength: 400, minLength: 1
      } ,
      listElements: []
  }
];

export const editUserDataFormSettings: FormModel[] = [
  { label: "First Name", placeholder: "type your first name...", type: "input", mode: "input", initialValue: null,
  validationSettings: {
      minLength: 5, maxLength: 25, required: true, isCorrectFormat: patterns.name
  },listElements: []
  },
  { label: "Last Name", placeholder: "type your last name...", type: "input", mode: "input",initialValue: null,
    validationSettings: {
        minLength: 5, maxLength: 25, required: true, isCorrectFormat: patterns.name
    } ,listElements: []
  },
  { label: "Account Avatar", placeholder: "", type: "file", mode: "single-file",initialValue: null,
    validationSettings: {
    } ,listElements: []
  }
];

export const changePasswordFormSettings: FormModel[] = [
  { label: "Old password", placeholder: "type your password...", type: "password", mode: "input", initialValue: null,
    validationSettings: {
        minLength: 7, maxLength: 25, required: true, shouldShowOneUppercase: 1, isContainsNumber: 1, isContainsSpecialChars: 1
    } ,listElements: []
  },
  { label: "New password", placeholder: "type your new password...", type: "password", mode: "input", initialValue: null,
    validationSettings: {
        minLength: 7, maxLength: 25, required: true, shouldShowOneUppercase: 1, isContainsNumber: 1, isContainsSpecialChars: 1
    } ,listElements: []
  },
  { label: "New repeated password", placeholder: "repeat your new password...", type: "password", mode: "input", initialValue: null,
    validationSettings: {
        minLength: 7, maxLength: 25, required: true, shouldShowOneUppercase: 1, isContainsNumber: 1, isContainsSpecialChars: 1
    } ,listElements: []
  },
];
