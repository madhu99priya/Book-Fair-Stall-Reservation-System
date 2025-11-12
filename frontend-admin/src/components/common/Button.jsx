import React from 'react';
import { createButtonStyle } from '../../styles/designSystem.js';

export default function Button({ 
  variant = 'primary', 
  children, 
  disabled = false,
  onClick,
  type = 'button',
  className = '',
  style = {},
  ...props 
}) {
  const buttonStyle = createButtonStyle(variant, disabled);
  
  const [isHovered, setIsHovered] = React.useState(false);
  
  const hoverStyle = !disabled && isHovered ? {
    transform: 'translateY(-1px)',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
  } : {};
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ ...buttonStyle, ...hoverStyle, ...style }}
      {...props}
    >
      {children}
    </button>
  );
}
