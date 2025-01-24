

// src/components/DynamicForm/DynamicForm.test.tsx
import { describe, test, expect, jest } from '@jest/globals';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DynamicForm } from './DynamicForm';
import { formConfig } from '../../config/formConfig';

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
    agreeToTerms: true
  };

  test('submits form with valid data', async () => {
    const consoleSpy = jest.spyOn(console, 'log');
    render(<DynamicForm />);

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

    const submitButton = screen.getByRole('button', { name: /submit/i });
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('Form submitted:', expect.any(Object));
    });

    consoleSpy.mockRestore();
  });
});