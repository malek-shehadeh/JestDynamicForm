// // src/components/Input/Input.tsx
// import { forwardRef, type ChangeEvent, type ForwardedRef } from 'react';
// import './Input.scss';

// interface InputProps {
//   type?: 'text' | 'email' | 'password' | 'number';
//   label?: string;
//   placeholder?: string;
//   value: string | number;
//   onChange: (event: ChangeEvent<HTMLInputElement>) => void;
//   error?: string;
//   disabled?: boolean;
//   required?: boolean;
//   className?: string;
//   name: string;
// }

// export const Input = forwardRef((
//   {
//     type = 'text',
//     label,
//     placeholder,
//     value,
//     onChange,
//     error,
//     disabled = false,
//     required = false,
//     className = '',
//     name,
//   }: InputProps,
//   ref: ForwardedRef<HTMLInputElement>
// ) => {
//   const inputId = `input-${name}`;
//   const inputClasses = [
//     'input__field',
//     error && 'input__field--error',
//     className
//   ].filter(Boolean).join(' ');

//   return (
//     <div className="input">
//       {label && (
//         <label 
//           htmlFor={inputId}
//           className="input__label"
//         >
//           {label}
//           {required && <span className="input__required">*</span>}
//         </label>
//       )}
//       <div className="input__container">
//         <input
//           ref={ref}
//           id={inputId}
//           type={type}
//           name={name}
//           className={inputClasses}
//           placeholder={placeholder}
//           value={value}
//           onChange={onChange}
//           disabled={disabled}
//           required={required}
//           aria-invalid={error ? 'true' : 'false'}
//           aria-describedby={error ? `${inputId}-error` : undefined}
//         />
//       </div>
//       {error && (
//         <p 
//           className="input__error" 
//           id={`${inputId}-error`}
//           role="alert"
//         >
//           {error}
//         </p>
//       )}
//     </div>
//   );
// });

// Input.displayName = 'Input';


// src/components/Input/Input.tsx
import { forwardRef, type ChangeEvent, type ForwardedRef } from 'react';
import './Input.scss';

interface InputProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | string;
  label?: string;
  placeholder?: string;
  value: string | number;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  name: string;
}

export const Input = forwardRef((
  {
    type = 'text',
    label,
    placeholder,
    value,
    onChange,
    error,
    disabled = false,
    required = false,
    className = '',
    name,
  }: InputProps,
  ref: ForwardedRef<HTMLInputElement>
) => {
  const inputId = `input-${name}`;
  const inputClasses = [
    'input__field',
    error && 'input__field--error',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className="input">
      {label && (
        <label 
          htmlFor={inputId}
          className="input__label"
        >
          {label}
          {required && <span className="input__required">*</span>}
        </label>
      )}
      <div className="input__container">
        <input
          ref={ref}
          id={inputId}
          type={type}
          name={name}
          className={inputClasses}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${inputId}-error` : undefined}
        />
      </div>
      {error && (
        <p 
          className="input__error" 
          id={`${inputId}-error`}
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';