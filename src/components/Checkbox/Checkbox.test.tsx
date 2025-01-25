
import { render, screen, fireEvent } from '@testing-library/react';
import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  const defaultProps = {
    name: 'test-checkbox',
    checked: false,
    onChange: jest.fn(),
  };

  it('renders correctly with default props', () => {
    render(<Checkbox {...defaultProps} />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
    expect(checkbox).not.toBeDisabled();
  });

  it('renders with label when provided', () => {
    render(<Checkbox {...defaultProps} label="Test Label" />);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('shows required indicator when required', () => {
    render(<Checkbox {...defaultProps} label="Test Label" required />);
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('handles change events', () => {
    const handleChange = jest.fn();
    render(<Checkbox {...defaultProps} onChange={handleChange} />);
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('can be disabled', () => {
    render(<Checkbox {...defaultProps} disabled />);
    expect(screen.getByRole('checkbox')).toBeDisabled();
  });

  it('displays error state correctly', () => {
    render(<Checkbox {...defaultProps} error="Required field" />);
    expect(screen.getByText('Required field')).toBeInTheDocument();
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveClass('checkbox__input--error');
  });

  it('reflects checked state', () => {
    const { rerender } = render(<Checkbox {...defaultProps} checked={false} />);
    expect(screen.getByRole('checkbox')).not.toBeChecked();

    rerender(<Checkbox {...defaultProps} checked={true} />);
    expect(screen.getByRole('checkbox')).toBeChecked();
  });
});