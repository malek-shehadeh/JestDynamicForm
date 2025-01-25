export interface FormFieldValidation {
  regex?: string;
  errorMessage: string;
}

export interface FormFieldOption {
  value: string;
  label: string;
}

export interface FormField {
  type: 'text' | 'password' | 'checkbox' | 'select'; 
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  options?: FormFieldOption[]; 
  validation: FormFieldValidation;
  helperText?: string; 
  clearable?: boolean; 
  size?: 'small' | 'medium' | 'large'; 
  fullWidth?: boolean; 
  defaultValue?: string; 
  optional?: boolean; 
}

export interface FormConfig {
  fields: FormField[];
}

export const formConfig: FormConfig = {
  fields: [
    {
      type: "text",
      name: "fullName",
      label: "Full Name",
      placeholder: "Enter your full name",
      required: true,
      validation: {
        regex: "^[A-Za-z ]{3,}$",
        errorMessage: "Full Name must be at least 3 characters and contain only letters and spaces.",
      },
      helperText: "Please enter your full name.",
      clearable: true,
      size: "medium",
      fullWidth: true,
    },
    {
      type: "text",
      name: "email",
      label: "Email Address",
      placeholder: "Enter your email address",
      required: true,
      validation: {
        regex: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
        errorMessage: "Please enter a valid email address.",
      },
      helperText: "We'll never share your email.",
      fullWidth: true,
      size: "medium",
    },
    {
      type: "password",
      name: "password",
      label: "Password",
      placeholder: "Enter your password",
      required: true,
      validation: {
        regex: "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d@$!%*?&]{8,}$",
        errorMessage: "Password must be at least 8 characters and include letters and numbers.",
      },
      helperText: "Use a strong password.",
      fullWidth: true,
      size: "medium",
    },
    {
      type: "text",
      name: "phoneNumber",
      label: "Phone Number",
      placeholder: "Enter your phone number",
      required: true,
      validation: {
        regex: "^[0-9]{10}$",
        errorMessage: "Phone Number must be 10 digits.",
      },
      helperText: "Enter your 10-digit phone number.",
      fullWidth: true,
      size: "medium",
    },
    {
      type: "text",
      name: "age",
      label: "Age",
      placeholder: "Enter your age",
      required: true,
      validation: {
        regex: "^(?:1[0-9]{1}|[1-9][0-9]?)$",
        errorMessage: "Age must be between 1 and 99.",
      },
      helperText: "Enter your age (1-99).",
      fullWidth: true,
      size: "medium",
    },
    {
      type: "select",
      name: "country",
      label: "Country",
      options: [
        { value: "us", label: "United States" },
        { value: "ca", label: "Canada" },
        { value: "uk", label: "United Kingdom" },
      ],
      required: true,
      validation: {
        errorMessage: "Please select a country.",
      },
      fullWidth: true,
      size: "medium",
    },

  ],
};

// {
//   type: "checkbox",
//   name: "agreeToTerms",
//   label: "I agree to the terms and conditions",
//   required: true,
//   validation: {
//     errorMessage: "You must agree to the terms and conditions.",
//   },
//   fullWidth: true,
// },