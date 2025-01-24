// src/components/Select/Select.tsx
import { forwardRef, type ChangeEvent, type ForwardedRef } from 'react';
import './Select.scss';

interface Option {
  value: string | number;
  label: string;
}

interface SelectProps {
  options: Option[];
  value: string | number;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  label?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  name: string;
  placeholder?: string;
}

export const Select = forwardRef((
  {
    options,
    value,
    onChange,
    label,
    error,
    disabled = false,
    required = false,
    className = '',
    name,
    placeholder
  }: SelectProps,
  ref: ForwardedRef<HTMLSelectElement>
) => {
  const selectId = `select-${name}`;
  const selectClasses = [
    'select__field',
    error && 'select__field--error',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className="select">
      {label && (
        <label 
          htmlFor={selectId}
          className="select__label"
        >
          {label}
          {required && <span className="select__required">*</span>}
        </label>
      )}
      <div className="select__container">
        <select
          ref={ref}
          id={selectId}
          name={name}
          className={selectClasses}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${selectId}-error` : undefined}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      {error && (
        <p 
          className="select__error" 
          id={`${selectId}-error`}
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
});

Select.displayName = 'Select';