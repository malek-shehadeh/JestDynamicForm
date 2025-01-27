
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button } from 'digitinary-ui';
import { FormInput, FormAlert } from '../index';
import { Select } from '../Select/Select';
import { formConfig } from '../../config/formConfig';
import { FormOutlined, SendOutlined, CheckCircleOutlined } from '@ant-design/icons';
import './DynamicForm.scss';

type FormInputs = {
  [key: string]: string | boolean | number;
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
      formConfig.fields.map((field) => [field.name, ''])
    ),
  });

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState<'success' | 'error'>('success');

  const onSubmit = (data: FormInputs) => {
    console.log('Form submitted:', data);
    setAlertMessage('Form submitted successfully!');
    setAlertSeverity('success');
    setShowAlert(true);
    reset();
    setTimeout(() => setShowAlert(false), 5000);
  };

  return (
    <div className="dynamic-form">
      <h1 className="dynamic-form__title" data-testid="form-title">
        <FormOutlined />
        Dynamic Form Example
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="dynamic-form__content" noValidate>
        {formConfig.fields.map((field, index) => (
          <div key={`${field.name}-${index}`}>
            <Controller
              name={field.name}
              control={control}
              rules={{
                required: field.required ? field.validation?.errorMessage : false,
                pattern: field.validation?.regex
                  ? {
                      value: new RegExp(field.validation.regex),
                      message: field.validation.errorMessage,
                    }
                  : undefined,
              }}
              render={({ field: { value, onChange }, fieldState: { error } }) => {
                if (field.type === 'select') {
                  return (
                    <Select
                      name={field.name}
                      label={field.label}
                      options={field.options || []}
                      value={value as string}
                      onChange={(e) => onChange(e.target.value)}
                      error={error?.message || ''}
                    />
                  );
                }
                return (
                  <FormInput
                    label={field.label}
                    value={value as string}
                    onChange={onChange}
                    errorMsg={error?.message}
                    helperText={field.helperText}
                    type={field.type === 'password' ? 'password' : 'text'}
                    placeholder={field.placeholder}
                    clearable={field.clearable}
                    size={field.size}
                  />
                );
              }}
            />
          </div>
        ))}

        <div className="dynamic-form__footer">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="medium"
            fullWidth
            disabled={!isValid || !isDirty || Object.keys(errors).length > 0}
            startIcon={<SendOutlined data-testid="submit-icon" />}
          >
            Submit Form
          </Button>
        </div>
      </form>

      {showAlert && (
        <FormAlert
          severity={alertSeverity}
          variant="default"
          icon={<CheckCircleOutlined data-testid="success-icon" />}
        >
          {alertMessage}
        </FormAlert>
      )}
    </div>
  );
};