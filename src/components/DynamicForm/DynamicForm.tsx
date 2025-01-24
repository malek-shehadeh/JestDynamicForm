
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
 const { 
   control, 
   handleSubmit,
   formState: { isValid, isDirty, errors }
 } = useForm<FormInputs>({
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
         <Button 
           type="submit" 
           className="dynamic-form__submit"
           disabled={!isValid || !isDirty || Object.keys(errors).length > 0}
         >
           Submit Form
         </Button>
       </div>
     </form>
   </div>
 );
};