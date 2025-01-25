
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DynamicForm } from './DynamicForm';
import { formConfig } from '../../config/formConfig';

jest.mock('@ant-design/icons', () => ({
 SendOutlined: () => 'Send',
 CheckCircleOutlined: () => 'Check',
 FormOutlined: () => 'Form',
}));

describe('DynamicForm', () => {
  const validFormData = {
    fullName: 'John Doe',
    email: 'john@example.com',
    password: 'Password123',
    phoneNumber: '1234567890',
    age: '25',
    country: 'us',
  };

  const fillForm = async () => {
    for (const field of formConfig.fields) {
      if (field.type === 'select') {
        const select = screen.getByLabelText(field.label) as HTMLSelectElement;
        await userEvent.selectOptions(select, validFormData[field.name as keyof typeof validFormData]);
      } else {
        const input = screen.getByTestId(`input-${field.label}`) as HTMLInputElement;
        await userEvent.type(input, validFormData[field.name as keyof typeof validFormData].toString());
      }
    }
  };

  it('clears form after successful submission', async () => {
    render(<DynamicForm />);
    await fillForm();
    const submitButton = screen.getByRole('button', { name: /submit form/i });
    await userEvent.click(submitButton);
    
    await waitFor(() => {
      formConfig.fields.forEach(field => {
        if (field.type === 'select') {
          const select = screen.getByLabelText(field.label) as HTMLSelectElement;
          expect(select.value).toBe('us');
        } else {
          const input = screen.getByTestId(`input-${field.label}`) as HTMLInputElement;
          expect(input.value).toBe('');
        }
      });
    });
  });

  it('should hide alert after 5 seconds', async () => {
    // Prevent fake timers warning
    jest.useRealTimers();
    
    render(<DynamicForm />);
    await fillForm();
   
    const submitButton = screen.getByRole('button', { name: /submit form/i });
    await userEvent.click(submitButton);
   
    // Wait for alert to appear
    await waitFor(() => {
      expect(screen.getByTestId('alert')).toBeInTheDocument();
    });
   
    // Wait for alert to disappear
    await waitFor(() => {
      expect(screen.queryByTestId('alert')).not.toBeInTheDocument();
    }, { timeout: 6000 }); 
   }, 20000); });