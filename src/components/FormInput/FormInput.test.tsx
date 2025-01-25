import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FormInput } from './FormInput';

describe('FormInput', () => {
  const defaultProps = {
    label: 'Test Input',
    value: '',
    onChange: jest.fn(),
  };

  it('renders with required props', () => {
    render(<FormInput {...defaultProps} />);
    expect(screen.getByTestId('input-wrapper')).toBeInTheDocument();
    expect(screen.getByLabelText('Test Input')).toBeInTheDocument();
  });

  it('handles value changes', async () => {
    render(<FormInput {...defaultProps} />);
    const input = screen.getByTestId('input-Test Input');
    await userEvent.type(input, 'test');
    expect(defaultProps.onChange).toHaveBeenCalled();
  });

  it('displays error message', () => {
    render(<FormInput {...defaultProps} errorMsg="Error occurred" />);
    expect(screen.getByTestId('error-msg')).toHaveTextContent('Error occurred');
  });

  it('displays helper text', () => {
    render(<FormInput {...defaultProps} helperText="Helper text" />);
    expect(screen.getByTestId('helper-text')).toHaveTextContent('Helper text');
  });
});
