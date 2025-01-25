


import React from 'react';
import { describe, test, expect, jest } from '@jest/globals';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { DynamicForm } from './DynamicForm';
import { formConfig } from '../../config/formConfig';

// Comprehensive mocking of icons and components
jest.mock('@ant-design/icons', () => ({
  SendOutlined: () => 'Send',
  CheckCircleOutlined: () => 'Check',
  FormOutlined: () => 'Form',
}));

jest.mock('digitinary-ui', () => ({
  Button: ({ children, ...props }: {
    children: React.ReactNode;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    variant?: string;
    color?: string;
    size?: string;
    fullWidth?: boolean;
    loading?: boolean;
  }) => {
    const buttonText = React.isValidElement(children) 
      ? 'Submit Form'  // Default text if children is an element
      : children;
    return (
      <button {...props}>
        {buttonText}
      </button>
    );
  },
  Alert: (props: { severity: string; children: React.ReactNode }) => (
    <div data-testid="alert">{props.children}</div>
  ),
}));

interface FormData {
  [key: string]: string | boolean;
  fullName: string;
  email: string;
  password: string;
  phoneNumber: string;
  age: string;
  country: string;
  agreeToTerms: boolean;
}

describe('DynamicForm', () => {
  const validFormData: FormData = {
    fullName: 'John Doe',
    email: 'john@example.com',
    password: 'Password123',
    phoneNumber: '1234567890',
    age: '25',
    country: 'us',
    agreeToTerms: true,
  };

  const fillForm = async () => {
    for (const field of formConfig.fields) {
      const input = screen.getByLabelText(field.label, { exact: false });
      const fieldValue = validFormData[field.name];
      if (field.type === 'select') {
        await userEvent.selectOptions(input, fieldValue.toString());
      } else if (field.type === 'checkbox') {
        await userEvent.click(input);
      } else {
        await userEvent.type(input, fieldValue.toString());
      }
      await userEvent.tab();
    }
  };

  test('submits form with valid data and shows success alert', async () => {
    render(<DynamicForm />);
    await fillForm();
    const submitButton = screen.getByRole('button', { name: /submit form/i });
    await userEvent.click(submitButton);
    await waitFor(() => {
      expect(screen.getByTestId('alert')).toBeInTheDocument();
      expect(screen.getByText('Form submitted successfully!')).toBeInTheDocument();
    });
  });

  test('does not show alert if form is invalid', async () => {
    render(<DynamicForm />);
    const submitButton = screen.getByRole('button', { name: /submit form/i });
    await userEvent.click(submitButton);
    await waitFor(() => {
      expect(screen.queryByTestId('alert')).not.toBeInTheDocument();
    });
  });

  test('hides alert after 5 seconds', async () => {
    jest.useRealTimers();
    render(<DynamicForm />);
    await fillForm();
    const submitButton = screen.getByRole('button', { name: /submit form/i });
    await userEvent.click(submitButton);
    await waitFor(() => {
      expect(screen.getByTestId('alert')).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.queryByTestId('alert')).not.toBeInTheDocument();
    }, { timeout: 6000 });
  }, 10000);
});