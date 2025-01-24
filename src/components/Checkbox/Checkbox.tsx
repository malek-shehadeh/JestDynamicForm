// src/components/Checkbox/Checkbox.tsx
import { forwardRef, type ChangeEvent, type ForwardedRef } from 'react';
import './Checkbox.scss';

interface CheckboxProps {
  checked: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  name: string;
  error?: string;
}

export const Checkbox = forwardRef((
  {
    checked,
    onChange,
    label,
    disabled = false,
    required = false,
    className = '',
    name,
    error,
  }: CheckboxProps,
  ref: ForwardedRef<HTMLInputElement>
) => {
  const checkboxId = `checkbox-${name}`;
  const checkboxClasses = [
    'checkbox__input',
    error && 'checkbox__input--error',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className="checkbox">
      <div className="checkbox__container">
        <input
          ref={ref}
          type="checkbox"
          id={checkboxId}
          name={name}
          className={checkboxClasses}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          required={required}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${checkboxId}-error` : undefined}
        />
        {label && (
          <label 
            htmlFor={checkboxId}
            className="checkbox__label"
          >
            {label}
            {required && <span className="checkbox__required">*</span>}
          </label>
        )}
      </div>
      {error && (
        <p 
          className="checkbox__error" 
          id={`${checkboxId}-error`}
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
});

Checkbox.displayName = 'Checkbox';