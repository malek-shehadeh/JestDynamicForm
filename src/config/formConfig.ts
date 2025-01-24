// // src/config/formConfig.ts
// export interface FormFieldValidation {
//     regex?: string;
//     errorMessage: string;
//   }
  
//   export interface FormFieldOption {
//     value: string;
//     label: string;
//   }
  
//   export interface FormField {
//     type: 'text' | 'email' | 'password' | 'tel' | 'number' | 'select' | 'checkbox';
//     name: string;
//     label: string;
//     placeholder?: string;
//     required?: boolean;
//     options?: FormFieldOption[];
//     validation: FormFieldValidation;
//   }
  
//   export interface FormConfig {
//     fields: FormField[];
//   }
  
//   export const formConfig: FormConfig = {
//     fields: [
//       {
//         type: "text",
//         name: "fullName",
//         label: "Full Name",
//         placeholder: "Enter your full name",
//         required: true,
//         validation: {
//           regex: "^[A-Za-z ]{3,}$",
//           errorMessage: "Full Name must be at least 3 characters and contain only letters and spaces."
//         }
//       },
//       {
//         type: "email",
//         name: "email",
//         label: "Email Address",
//         placeholder: "Enter your email address",
//         required: true,
//         validation: {
//           regex: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
//           errorMessage: "Please enter a valid email address."
//         }
//       },
//       {
//         type: "password",
//         name: "password",
//         label: "Password",
//         placeholder: "Enter your password",
//         required: true,
//         validation: {
//           regex: "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$",
//           errorMessage: "Password must be at least 8 characters, include a letter, a number, and a special character."
//         }
//       },
//       {
//         type: "tel",
//         name: "phoneNumber",
//         label: "Phone Number",
//         placeholder: "Enter your phone number",
//         required: true,
//         validation: {
//           regex: "^[0-9]{10,}$",
//           errorMessage: "Phone Number must be at least 10 digits."
//         }
//       },
//       {
//         type: "number",
//         name: "age",
//         label: "Age",
//         placeholder: "Enter your age",
//         required: true,
//         validation: {
//           regex: "^[1-9][0-9]?$|^100$",
//           errorMessage: "Age must be between 1 and 100."
//         }
//       },
//       {
//         type: "select",
//         name: "country",
//         label: "Country",
//         options: [
//           { value: "us", label: "United States" },
//           { value: "ca", label: "Canada" },
//           { value: "uk", label: "United Kingdom" }
//         ],
//         required: true,
//         validation: {
//           errorMessage: "Please select a country."
//         }
//       },
//       {
//         type: "checkbox",
//         name: "agreeToTerms",
//         label: "I agree to the terms and conditions",
//         required: true,
//         validation: {
//           errorMessage: "You must agree to the terms and conditions."
//         }
//       }
//     ]
//   };


  //

  // src/config/formConfig.ts
  export interface FormFieldValidation {
    regex?: string;
    errorMessage: string;
  }
  
  export interface FormFieldOption {
    value: string;
    label: string;
  }
  
  export interface FormField {
    type: 'text' | 'email' | 'password' | 'tel' | 'number' | 'select' | 'checkbox';
    name: string;
    label: string;
    placeholder?: string;
    required?: boolean;
    options?: FormFieldOption[];
    validation: FormFieldValidation;
  }
  
  export interface FormConfig {
    fields: FormField[];
  }
export const formConfig = {
    fields: [
      {
        type: "text",
        name: "fullName",
        label: "Full Name",
        placeholder: "Enter your full name",
        required: true,
        validation: {
          regex: "^[A-Za-z ]{3,}$",
          errorMessage: "Full Name must be at least 3 characters and contain only letters and spaces."
        }
      },
      {
        type: "email",
        name: "email",
        label: "Email Address",
        placeholder: "Enter your email address",
        required: true,
        validation: {
          regex: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
          errorMessage: "Please enter a valid email address."
        }
      },
      {
        type: "password",
        name: "password",
        label: "Password",
        placeholder: "Enter your password",
        required: true,
        validation: {
          regex: "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d@$!%*?&]{8,}$",
          errorMessage: "Password must be at least 8 characters and include letters and numbers."
        }
      },
      {
        type: "tel",
        name: "phoneNumber",
        label: "Phone Number",
        placeholder: "Enter your phone number",
        required: true,
        validation: {
          regex: "^[0-9]{10}$",
          errorMessage: "Phone Number must be 10 digits."
        }
      },
      {
        type: "number",
        name: "age",
        label: "Age",
        placeholder: "Enter your age",
        required: true,
        validation: {
          regex: "^(?:1[0-9]{1}|[1-9][0-9]?)$",
          errorMessage: "Age must be between 1 and 99."
        }
      },
      {
        type: "select",
        name: "country",
        label: "Country",
        options: [
          { value: "us", label: "United States" },
          { value: "ca", label: "Canada" },
          { value: "uk", label: "United Kingdom" }
        ],
        required: true,
        validation: {
          errorMessage: "Please select a country."
        }
      },
      {
        type: "checkbox",
        name: "agreeToTerms",
        label: "I agree to the terms and conditions",
        required: true,
        validation: {
          errorMessage: "You must agree to the terms and conditions."
        }
      }
    ]
  };
  
  // Types export unchanged