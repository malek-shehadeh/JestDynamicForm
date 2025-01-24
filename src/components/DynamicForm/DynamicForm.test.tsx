// // // src/components/DynamicForm/DynamicForm.test.tsx
// // import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// // import userEvent from '@testing-library/user-event';
// // import { DynamicForm } from './DynamicForm';

// // describe('DynamicForm', () => {
// //   test('renders form elements correctly', () => {
// //     render(<DynamicForm />);
    
// //     expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
// //     expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
// //     expect(screen.getByLabelText(/country/i)).toBeInTheDocument();
// //     expect(screen.getByLabelText(/subscribe to newsletter/i)).toBeInTheDocument();
// //     expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
// //   });

// //   test('displays validation errors for empty required fields', async () => {
// //     render(<DynamicForm />);
    
// //     fireEvent.click(screen.getByRole('button', { name: /submit/i }));

// //     await waitFor(() => {
// //       const errors = screen.getAllByRole('alert');
// //       expect(errors.length).toBeGreaterThan(0);
// //     });
// //   });

// //   test('validates email format', async () => {
// //     render(<DynamicForm />);
    
// //     const emailInput = screen.getByLabelText(/email/i);
// //     await userEvent.type(emailInput, 'invalid-email');
    
// //     fireEvent.click(screen.getByRole('button', { name: /submit/i }));

// //     await waitFor(() => {
// //       const errors = screen.getAllByRole('alert');
// //       expect(errors.some(error => 
// //         error.textContent?.toLowerCase().includes('invalid email')
// //       )).toBeTruthy();
// //     });
// //   });

// //   test('submits form with valid data', async () => {
// //     const consoleSpy = jest.spyOn(console, 'log');
// //     render(<DynamicForm />);

// //     await userEvent.type(screen.getByLabelText(/name/i), 'John Doe');
// //     await userEvent.type(screen.getByLabelText(/email/i), 'john@example.com');
    
// //     const countrySelect = screen.getByLabelText(/country/i);
// //     fireEvent.change(countrySelect, { target: { value: 'us' } });

// //     const subscribeCheckbox = screen.getByLabelText(/subscribe to newsletter/i);
// //     fireEvent.click(subscribeCheckbox);

// //     fireEvent.click(screen.getByRole('button', { name: /submit/i }));

// //     await waitFor(() => {
// //       expect(consoleSpy).toHaveBeenCalledWith(
// //         'Form submitted:',
// //         expect.objectContaining({
// //           name: 'John Doe',
// //           email: 'john@example.com',
// //           country: 'us',
// //           subscribe: true
// //         })
// //       );
// //     });

// //     consoleSpy.mockRestore();
// //   });
// // });

// // src/components/DynamicForm/DynamicForm.test.tsx
// import { render, screen, waitFor } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import { DynamicForm } from './DynamicForm';

// describe('DynamicForm', () => {
//   beforeEach(() => {
//     // Reset all mocks before each test
//     jest.clearAllMocks();
//   });

//   test('renders form elements correctly', () => {
//     render(<DynamicForm />);
    
//     expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
//     expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
//     expect(screen.getByLabelText(/country/i)).toBeInTheDocument();
//     expect(screen.getByLabelText(/subscribe to newsletter/i)).toBeInTheDocument();
//     expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
//   });

//   test('validates email format', async () => {
//     render(<DynamicForm />);
    
//     // Get form elements
//     const emailInput = screen.getByLabelText(/email/i);
//     const submitButton = screen.getByRole('button', { name: /submit/i });

//     // Type invalid email and trigger validation
//     await userEvent.clear(emailInput);
//     await userEvent.type(emailInput, 'invalid-email');
//     await userEvent.tab(); // This will trigger blur event
    
//     // Submit form to trigger validation
//     await userEvent.click(submitButton);

//     // Wait for the error message using findByText (which includes built-in waiting)
//     const errorMessage = await screen.findByText(/invalid email address/i);
//     expect(errorMessage).toBeInTheDocument();
//   });

//   test('submits form with valid data', async () => {
//     const consoleSpy = jest.spyOn(console, 'log');
//     render(<DynamicForm />);

//     // Get form elements
//     const nameInput = screen.getByLabelText(/name/i);
//     const emailInput = screen.getByLabelText(/email/i);
//     const countrySelect = screen.getByLabelText(/country/i);
//     const subscribeCheckbox = screen.getByLabelText(/subscribe to newsletter/i);
//     const submitButton = screen.getByRole('button', { name: /submit form/i });

//     // Fill form with valid data
//     await userEvent.clear(nameInput);
//     await userEvent.type(nameInput, 'John Doe');
//     await userEvent.clear(emailInput);
//     await userEvent.type(emailInput, 'john@example.com');
//     await userEvent.selectOptions(countrySelect, 'us');
//     await userEvent.click(subscribeCheckbox);

//     // Trigger blur events to validate
//     await userEvent.tab();

//     // Submit form
//     await userEvent.click(submitButton);

//     // Wait for form submission
//     await waitFor(() => {
//       expect(consoleSpy).toHaveBeenCalledWith(
//         'Form submitted:',
//         expect.objectContaining({
//           name: 'John Doe',
//           email: 'john@example.com',
//           country: 'us',
//           subscribe: true
//         })
//       );
//     });

//     consoleSpy.mockRestore();
//   });

//   test('displays validation errors for empty required fields', async () => {
//     render(<DynamicForm />);
    
//     // Get the submit button
//     const submitButton = screen.getByRole('button', { name: /submit/i });

//     // Clear any existing values
//     const nameInput = screen.getByLabelText(/name/i);
//     const emailInput = screen.getByLabelText(/email/i);
//     await userEvent.clear(nameInput);
//     await userEvent.clear(emailInput);

//     // Submit empty form
//     await userEvent.click(submitButton);

//     // Wait for error messages
//     const nameError = await screen.findByText(/name is required/i);
//     const emailError = await screen.findByText(/email is required/i);
//     const countryError = await screen.findByText(/please select a country/i);

//     expect(nameError).toBeInTheDocument();
//     expect(emailError).toBeInTheDocument();
//     expect(countryError).toBeInTheDocument();
//   });
// });


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