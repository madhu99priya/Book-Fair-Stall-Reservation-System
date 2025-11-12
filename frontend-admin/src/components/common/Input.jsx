import React from 'react';
import { createInputStyle } from '../../styles/designSystem.js';

export default function Input({ 
  type = 'text',
  variant = 'base',
  error = false,
  placeholder = '',
  value,
  onChange,
  className = '',
  style = {},
  ...props 
}) {
  const inputStyle = createInputStyle(variant, error);
  
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={className}
      style={{ ...inputStyle, ...style }}
      {...props}
    />
  );
}

export function Select({ 
  variant = 'select',
  error = false,
  value,
  onChange,
  children,
  className = '',
  style = {},
  ...props 
}) {
  const selectStyle = createInputStyle(variant, error);
  
  return (
    <select
      value={value}
      onChange={onChange}
      className={className}
      style={{ ...selectStyle, ...style }}
      {...props}
    >
      {children}
    </select>
  );
}
