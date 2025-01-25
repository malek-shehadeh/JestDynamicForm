import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from './Input';

describe('Input', () => {
  const defaultProps = {
    name: 'test-input',
    value: '',
    onChange: jest.fn(),
  };

  it('renders correctly with default props', () => {
    render(<Input {...defaultProps} />);
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'text');
    expect(input).not.toBeDisabled();
  });

  it('renders label when provided', () => {
    render(<Input {...defaultProps} label="Test Label" />);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('shows required indicator when required', () => {
    render(<Input {...defaultProps} label="Test Label" required />);
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('handles value changes', () => {
    const handleChange = jest.fn();
    render(<Input {...defaultProps} onChange={handleChange} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test value' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});