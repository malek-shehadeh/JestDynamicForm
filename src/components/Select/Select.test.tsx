
// src/components/Select/Select.test.tsx
// import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Select } from './Select';

describe('Select', () => {
  const defaultProps = {
    name: 'test-select',
    options: [
      { value: '1', label: 'Option 1' },
      { value: '2', label: 'Option 2' },
      { value: '3', label: 'Option 3' },
    ],
    value: '',
    onChange: jest.fn(),
  };

  it('renders correctly with default props', () => {
    render(<Select {...defaultProps} />);
    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
    expect(select).not.toBeDisabled();
  });

  it('renders all options', () => {
    render(<Select {...defaultProps} />);
    defaultProps.options.forEach(option => {
      expect(screen.getByText(option.label)).toBeInTheDocument();
    });
  });

  it('shows placeholder when provided', () => {
    render(<Select {...defaultProps} placeholder="Select an option" />);
    expect(screen.getByText('Select an option')).toBeInTheDocument();
  });

  it('handles value changes', () => {
    const handleChange = jest.fn();
    render(<Select {...defaultProps} onChange={handleChange} />);
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: '2' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('displays error state correctly', () => {
    render(<Select {...defaultProps} error="Required field" />);
    expect(screen.getByText('Required field')).toBeInTheDocument();
    const select = screen.getByRole('combobox');
    expect(select).toHaveClass('select__field--error');
  });

  it('can be disabled', () => {
    render(<Select {...defaultProps} disabled />);
    expect(screen.getByRole('combobox')).toBeDisabled();
  });
});