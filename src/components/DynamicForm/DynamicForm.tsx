

import { useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { Button, Alert } from 'digitinary-ui';
import { Input } from '../Input/Input';
import { Select } from '../Select/Select';
import { Checkbox } from '../Checkbox/Checkbox';
import { formConfig } from '../../config/formConfig';
import { 
  FormOutlined, 
  SendOutlined, 
  CheckCircleOutlined 
} from '@ant-design/icons';
import './DynamicForm.scss';

type FormInputs = {
 [key: string]: string | boolean;
};

export const DynamicForm = () => {
 const {
   control,
   handleSubmit,
   formState: { isValid, isDirty, errors },
   reset,
 } = useForm<FormInputs>({
   mode: 'all',
   defaultValues: Object.fromEntries(
     formConfig.fields.map((field) => [
       field.name,
       field.type === 'checkbox' ? false : '',
     ])
   ),
 });

 const [showAlert, setShowAlert] = useState(false);
 const [alertMessage, setAlertMessage] = useState('');
 const [alertSeverity, setAlertSeverity] = useState<'success' | 'error'>('success');

 const onSubmit: SubmitHandler<FormInputs> = (data) => {
   console.log('Form submitted:', data);

   setAlertMessage('Form submitted successfully!');
   setAlertSeverity('success');
   setShowAlert(true);

   reset();

   setTimeout(() => {
     setShowAlert(false);
   }, 5000);
 };

 return (
   <div className="dynamic-form">
     <h1 className="dynamic-form__title">
       <FormOutlined />
       Dynamic Form Example
     </h1>
     <form onSubmit={handleSubmit(onSubmit)} className="dynamic-form__content" noValidate>
       {formConfig.fields.map((field, index) => {
         const uniqueKey = `${field.name}-${field.type}-${index}`; // Ensure uniqueness with index
         return (
           <div key={uniqueKey}> {/* Key applied to the outermost element */}
             <Controller
               name={field.name}
               control={control}
               rules={{
                 required: field.required ? field.validation.errorMessage : false,
                 ...(field.validation.regex && {
                   pattern: {
                     value: new RegExp(field.validation.regex),
                     message: field.validation.errorMessage,
                   },
                 }),
               }}
               render={({ field: { value, onChange, ...fieldProps }, fieldState: { error } }) => {
                 switch (field.type) {
                   case 'select':
                     return (
                       <Select
                         key={uniqueKey} // Ensure Select has a key if it renders a list
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
                         key={uniqueKey} // Ensure Checkbox has a key if it renders a list
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
                         key={uniqueKey} // Ensure Input has a key if it renders a list
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
           </div>
         );
       })}

       <div className="dynamic-form__footer">
         <Button
           type="submit"
           variant="contained"
           color="primary"
           size="medium"
           fullWidth
           disabled={!isValid || !isDirty || Object.keys(errors).length > 0}
           loading={false}
           startIcon={<SendOutlined />}
         >
           Submit Form
         </Button>
       </div>
     </form>

     {showAlert && (
       <Alert 
         severity={alertSeverity} 
         variant="default"
         icon={<CheckCircleOutlined />}
       >
         {alertMessage}
       </Alert>
     )}
   </div>
 );
};