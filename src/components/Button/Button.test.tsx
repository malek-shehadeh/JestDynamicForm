// // src/components/Button/Button.test.tsx
// import { render, screen, fireEvent } from '@testing-library/react';
// import { Button } from './Button';

// describe('Button', () => {
//   it('renders button with text', () => {
//     render(<Button>Click me</Button>);
//     expect(screen.getByRole('button')).toHaveTextContent('Click me');
//   });

//   it('applies primary variant by default', () => {
//     render(<Button>Click me</Button>);
//     expect(screen.getByRole('button')).toHaveClass('button--primary');
//   });

//   it('handles click events', () => {
//     const handleClick = jest.fn();
//     render(<Button onClick={handleClick}>Click me</Button>);
    
//     fireEvent.click(screen.getByRole('button'));
//     expect(handleClick).toHaveBeenCalledTimes(1);
//   });

//   it('can be disabled', () => {
//     render(<Button disabled>Click me</Button>);
//     expect(screen.getByRole('button')).toBeDisabled();
//   });
// });

// src/components/Button/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  test('renders button with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });

  test('applies primary variant by default', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toHaveClass('button--primary');
  });

  test('handles click events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('can be disabled', () => {
    render(<Button disabled>Click me</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});