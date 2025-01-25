import React from 'react';

export const Button = (props: {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}) => (
  <button 
    onClick={props.onClick}
    type={props.type}
    disabled={props.disabled}
  >
    {props.children}
  </button>
);