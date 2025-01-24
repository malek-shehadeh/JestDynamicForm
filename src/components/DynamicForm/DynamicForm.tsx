// // // src/components/DynamicForm/DynamicForm.tsx
// // import { useState, type ChangeEvent } from 'react';
// // import { Button } from '../Button/Button';
// // import { Input } from '../Input/Input';
// // import { Select } from '../Select/Select';
// // import { Checkbox } from '../Checkbox/Checkbox';
// // import './DynamicForm.scss';

// // export const DynamicForm = () => {
// //   const [formData, setFormData] = useState({
// //     name: '',
// //     email: '',
// //     country: '',
// //     subscribe: false
// //   });

// //   const countryOptions = [
// //     { value: 'us', label: 'United States' },
// //     { value: 'uk', label: 'United Kingdom' },
// //     { value: 'ca', label: 'Canada' }
// //   ];

// //   const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
// //     const { name, value } = e.target;
// //     setFormData(prev => ({
// //       ...prev,
// //       [name]: value
// //     }));
// //   };

// //   const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
// //     const { name, value } = e.target;
// //     setFormData(prev => ({
// //       ...prev,
// //       [name]: value
// //     }));
// //   };

// //   const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
// //     const { name, checked } = e.target;
// //     setFormData(prev => ({
// //       ...prev,
// //       [name]: checked
// //     }));
// //   };

// //   const handleSubmit = () => {
// //     console.log('Form submitted:', formData);
// //   };

// //   return (
// //     <div className="dynamic-form">
// //       <h1 className="dynamic-form__title">Dynamic Form Example</h1>
      
// //       <div className="dynamic-form__content">
// //         <Input
// //           label="Name"
// //           name="name"
// //           value={formData.name}
// //           onChange={handleInputChange}
// //           required
// //         />

// //         <Input
// //           type="email"
// //           label="Email"
// //           name="email"
// //           value={formData.email}
// //           onChange={handleInputChange}
// //           required
// //         />

// //         <Select
// //           label="Country"
// //           name="country"
// //           value={formData.country}
// //           onChange={handleSelectChange}
// //           options={countryOptions}
// //           placeholder="Select your country"
// //         />

// //         <Checkbox
// //           label="Subscribe to newsletter"
// //           name="subscribe"
// //           checked={formData.subscribe}
// //           onChange={handleCheckboxChange}
// //         />

// //         <Button 
// //           onClick={handleSubmit}
// //           type="submit"
// //           className="dynamic-form__submit"
// //         >
// //           Submit Form
// //         </Button>
// //       </div>
// //     </div>
// //   );
// // }

// // src/components/DynamicForm/DynamicForm.tsx
// import { useForm, Controller, SubmitHandler } from 'react-hook-form';
// import { Button } from '../Button/Button';
// import { Input } from '../Input/Input';
// import { Select } from '../Select/Select';
// import { Checkbox } from '../Checkbox/Checkbox';
// import './DynamicForm.scss';

// interface FormInputs {
//   name: string;
//   email: string;
//   country: string;
//   subscribe: boolean;
// }

// export const DynamicForm = () => {
//   const { 
//     control,
//     handleSubmit
//   } = useForm<FormInputs>({
//     defaultValues: {
//       name: '',
//       email: '',
//       country: '',
//       subscribe: false
//     },
//     mode: 'all'
//   });

//   const countryOptions = [
//     { value: 'us', label: 'United States' },
//     { value: 'uk', label: 'United Kingdom' },
//     { value: 'ca', label: 'Canada' }
//   ];

//   const onSubmit: SubmitHandler<FormInputs> = async (data) => {
//     setTimeout(() => {
//       console.log('Form submitted:', data);
//     }, 0);
//   };

//   return (
//     <div className="dynamic-form">
//       <h1 className="dynamic-form__title">Dynamic Form Example</h1>
      
//       <form onSubmit={handleSubmit(onSubmit)} className="dynamic-form__content" noValidate>
//         <Controller
//           name="name"
//           control={control}
//           rules={{ 
//             required: 'Name is required',
//             minLength: {
//               value: 2,
//               message: 'Name must be at least 2 characters'
//             }
//           }}
//           render={({ field, fieldState: { error } }) => (
//             <Input
//               label="Name"
//               {...field}
//               error={error?.message}
//             />
//           )}
//         />

//         <Controller
//           name="email"
//           control={control}
//           rules={{
//             required: 'Email is required',
//             pattern: {
//               value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//               message: 'Invalid email address'
//             }
//           }}
//           render={({ field, fieldState: { error } }) => (
//             <Input
//               type="email"
//               label="Email"
//               {...field}
//               error={error?.message}
//             />
//           )}
//         />

//         <Controller
//           name="country"
//           control={control}
//           rules={{
//             required: 'Please select a country'
//           }}
//           render={({ field, fieldState: { error } }) => (
//             <Select
//               label="Country"
//               options={countryOptions}
//               {...field}
//               error={error?.message}
//             />
//           )}
//         />

//         <Controller
//           name="subscribe"
//           control={control}
//           render={({ field: { value, onChange, ...fieldProps } }) => (
//             <Checkbox
//               label="Subscribe to newsletter"
//               checked={value}
//               onChange={(e) => onChange(e.target.checked)}
//               {...fieldProps}
//             />
//           )}
//         />

//         <div className="dynamic-form__footer">
//           <Button 
//             type="submit"
//             className="dynamic-form__submit"
//           >
//             Submit Form
//           </Button>
//         </div>
//       </form>
//     </div>
//   );
// };


// src/components/DynamicForm/DynamicForm.tsx
import { useForm, Controller } from 'react-hook-form';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import { Select } from '../Select/Select';
import { Checkbox } from '../Checkbox/Checkbox';
import { formConfig } from '../../config/formConfig';
import './DynamicForm.scss';

type FormInputs = {
  [key: string]: string | boolean;
};

export const DynamicForm = () => {
  const { control, handleSubmit } = useForm<FormInputs>({
    mode: 'all',
    defaultValues: Object.fromEntries(
      formConfig.fields.map(field => [
        field.name,
        field.type === 'checkbox' ? false : ''
      ])
    )
  });

  const onSubmit = (data: FormInputs) => {
    console.log('Form submitted:', data);
  };

  return (
    <div className="dynamic-form">
      <h1 className="dynamic-form__title">Dynamic Form Example</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="dynamic-form__content" noValidate>
        {formConfig.fields.map((field) => (
          <Controller
            key={field.name}
            name={field.name}
            control={control}
            rules={{
              required: field.required ? field.validation.errorMessage : false,
              ...(field.validation.regex && {
                pattern: {
                  value: new RegExp(field.validation.regex),
                  message: field.validation.errorMessage
                }
              })
            }}
            render={({ field: { value, onChange, ...fieldProps }, fieldState: { error } }) => {
              switch (field.type) {
                case 'select':
                  return (
                    <Select
                      label={field.label}
                      options={field.options || []}
                      value={value as string}
                      onChange={onChange}
                      error={error?.message}
                      {...fieldProps}
                    />
                  );
                case 'checkbox':
                  return (
                    <Checkbox
                      label={field.label}
                      checked={value as boolean}
                      onChange={(e) => onChange(e.target.checked)}
                      error={error?.message}
                      {...fieldProps}
                    />
                  );
                default:
                  return (
                    <Input
                      type={field.type}
                      label={field.label}
                      placeholder={field.placeholder}
                      value={value as string}
                      onChange={onChange}
                      error={error?.message}
                      {...fieldProps}
                    />
                  );
              }
            }}
          />
        ))}
        <div className="dynamic-form__footer">
          <Button type="submit" className="dynamic-form__submit">
            Submit Form
          </Button>
        </div>
      </form>
    </div>
  );
};