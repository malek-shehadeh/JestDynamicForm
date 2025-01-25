import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FormAlert } from './FormAlert';

describe('FormAlert', () => {
  it('renders with severity success', () => {
    render(<FormAlert severity="success">message</FormAlert>);
    const alert = screen.getByTestId('alert');
    expect(alert).toHaveAttribute('data-severity', 'success');
  });

  it('renders with severity error', () => {
    render(<FormAlert severity="error">message</FormAlert>);
    const alert = screen.getByTestId('alert');
    expect(alert).toHaveAttribute('data-severity', 'error');
  });

  it('calls onClose when close button clicked', async () => {
    const onClose = jest.fn();
    render(<FormAlert severity="success" onClose={onClose}>message</FormAlert>);
    await userEvent.click(screen.getByTestId('alert-close'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('renders the provided icon', () => {
    render(
      <FormAlert 
        severity="success" 
        icon={<span data-testid="custom-icon">★</span>}
      >
        message
      </FormAlert>
    );
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });

  it('renders with default variant', () => {
    render(<FormAlert severity="success">message</FormAlert>);
    expect(screen.getByTestId('alert')).toHaveAttribute('data-variant', 'default');
  });

  it('renders with custom variant', () => {
    render(<FormAlert severity="success" variant="outlined">message</FormAlert>);
    expect(screen.getByTestId('alert')).toHaveAttribute('data-variant', 'outlined');
  });

  it('renders children content', () => {
    render(<FormAlert severity="success"><div>custom content</div></FormAlert>);
    expect(screen.getByTestId('alert-content')).toHaveTextContent('custom content');
  });
});