


import { useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { Button, Alert, Input } from 'digitinary-ui';
import { Select } from '../Select/Select';
import { Checkbox } from '../Checkbox/Checkbox';
import { formConfig } from '../../config/formConfig';
import { FormOutlined, SendOutlined, CheckCircleOutlined } from '@ant-design/icons';
import './DynamicForm.scss';

type FormInputs = {
  [key: string]: string | boolean | number; // Allow string, boolean, or number values
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

  // Helper function to render Input fields
  const renderInput = (
    field: typeof formConfig.fields[number],
    value: string | number,
    onChange: (value: string | number) => void,
    error?: { message?: string }
  ) => (
    <Input
      type={field.type === 'password' ? 'password' : 'text'} 
      label={field.label}
      placeholder={field.placeholder}
      value={value}
      onChange={onChange}
      errorMsg={error?.message || ''} 
      helperText={field.helperText || ''} 
      clearable={field.clearable || false} 
      size={field.size || 'medium'} 
      fullWidth={field.fullWidth || false} 
    />
  );

  // Helper function to render Select fields
  const renderSelect = (
    field: typeof formConfig.fields[number],
    value: string,
    onChange: (value: string) => void,
    error?: { message?: string }
  ) => (
    <Select
      name={field.name} // Pass the name prop
      label={field.label}
      options={field.options || []}
      value={value}
      onChange={(e) => onChange(e.target.value)} // Handle ChangeEvent<HTMLSelectElement>
      error={error?.message || ''} // Ensure error is always a string
    />
  );

  // Helper function to render Checkbox fields
  const renderCheckbox = (
    field: typeof formConfig.fields[number],
    value: boolean,
    onChange: (value: boolean) => void,
    error?: { message?: string }
  ) => (
    <Checkbox
      name={field.name} // Pass the name prop
      label={field.label}
      checked={value}
      onChange={(e) => onChange(e.target.checked)} // Handle ChangeEvent<HTMLInputElement>
      error={error?.message || ''} // Ensure error is always a string
    />
  );

  return (
    <div className="dynamic-form">
      <h1 className="dynamic-form__title">
        <FormOutlined />
        Dynamic Form Example
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="dynamic-form__content" noValidate>
        {formConfig.fields.map((field, index) => {
          const uniqueKey = `${field.name}-${field.type}-${index}`;
          return (
            <div key={uniqueKey}>
              <Controller
                name={field.name}
                control={control}
                rules={{
                  required: field.required ? field.validation?.errorMessage : false,
                  ...(field.validation?.regex && {
                    pattern: {
                      value: new RegExp(field.validation.regex),
                      message: field.validation.errorMessage,
                    },
                  }),
                }}
                render={({ field: { value, onChange }, fieldState: { error } }) => {
                  switch (field.type) {
                    case 'select':
                      return renderSelect(field, value as string, onChange, error);
                    case 'checkbox':
                      return renderCheckbox(field, value as boolean, onChange, error);
                    case 'text':
                    case 'password':
                      return renderInput(field, value as string, (newValue: string | number) => onChange(newValue), error);
                    default:
                      console.error(`Unsupported field type: ${field.type}`);
                      return (
                        <div style={{ color: 'red' }}>
                          Unsupported field type: {field.type}
                        </div>
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