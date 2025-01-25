
// src/jest/__mocks__/digitinary-ui.tsx
import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  variant?: string;
  color?: string;
  size?: string;
  fullWidth?: boolean;
  loading?: boolean;
  startIcon?: React.ReactNode;
}

interface InputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  errorMsg?: string;
  helperText?: string;
  type?: string;
  placeholder?: string;
  clearable?: boolean;
  fullWidth?: boolean;
}
interface FormAlertProps {
  severity: "success" | "error" | "info" | "warning";
  variant?: "default" | "filled" | "outlined";
  onClose?: boolean | (() => void); // Match the expected type
  action?: JSX.Element;
  icon?: JSX.Element | boolean;
  customStyle?: Record<string, string | number>;
  children: JSX.Element | string;
  id?: string;
  className?: string;
  dataId?: string;
}

export const Button = ({
  children,
  onClick,
  type = 'button',
  disabled = false,
  startIcon,
}: ButtonProps) => (
  <button 
    onClick={onClick}
    type={type}
    disabled={disabled}
    data-testid="button"
  >
    {startIcon && <span data-testid="button-icon">{startIcon}</span>}
    {children}
  </button>
);

export const Input = ({
  label,
  value,
  onChange,
  errorMsg,
  helperText,
  type = 'text',
  placeholder,
}: InputProps) => (
  <div data-testid="input-wrapper">
    <label htmlFor={`input-${label}`}>{label}</label>
    <input
      id={`input-${label}`}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      type={type}
      placeholder={placeholder}
      data-testid={`input-${label}`}
    />
    {errorMsg && <div data-testid="error-msg">{errorMsg}</div>}
    {helperText && <div data-testid="helper-text">{helperText}</div>}
  </div>
);


export const Alert = ({
  severity,
  children,
  onClose,
  icon,
  variant = 'default',
}: FormAlertProps) => (
  <div 
    role="alert" 
    data-testid="alert" 
    data-severity={severity}
    data-variant={variant}
  >
    {icon && typeof icon !== 'boolean' && <span data-testid="alert-icon">{icon}</span>}
    <div data-testid="alert-content">{children}</div>
    {onClose && typeof onClose === 'function' && (
      <button onClick={onClose} data-testid="alert-close">
        Close
      </button>
    )}
  </div>
);