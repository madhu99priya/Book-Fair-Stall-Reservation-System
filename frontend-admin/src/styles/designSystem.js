// Design System for Book Fair Admin
// Centralized styles for consistent UI across all pages

export const colors = {
  // Primary colors
  primary: {
    main: '#3b82f6',      // Blue
    dark: '#2563eb',
    light: '#60a5fa',
    bg: '#eff6ff'
  },
  
  // Semantic colors
  success: {
    main: '#10b981',      // Green
    dark: '#059669',
    light: '#34d399',
    bg: '#d1fae5'
  },
  
  error: {
    main: '#ef4444',      // Red
    dark: '#dc2626',
    light: '#f87171',
    bg: '#fee2e2'
  },
  
  warning: {
    main: '#f59e0b',      // Orange
    dark: '#d97706',
    light: '#fbbf24',
    bg: '#fef3c7'
  },
  
  info: {
    main: '#6366f1',      // Indigo
    dark: '#4f46e5',
    light: '#818cf8',
    bg: '#e0e7ff'
  },
  
  // Neutral colors
  neutral: {
    900: '#1e293b',
    800: '#334155',
    700: '#475569',
    600: '#64748b',
    500: '#94a3b8',
    400: '#cbd5e1',
    300: '#e2e8f0',
    200: '#f1f5f9',
    100: '#f8fafc',
    50: '#ffffff'
  }
};

export const spacing = {
  xs: '0.25rem',    // 4px
  sm: '0.5rem',     // 8px
  md: '0.75rem',    // 12px
  lg: '1rem',       // 16px
  xl: '1.5rem',     // 24px
  '2xl': '2rem',    // 32px
  '3xl': '3rem'     // 48px
};

export const borderRadius = {
  sm: '4px',
  md: '6px',
  lg: '8px',
  xl: '12px',
  full: '9999px'
};

export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
};

// Button Styles
export const buttonStyles = {
  base: {
    padding: `${spacing.sm} ${spacing.lg}`,
    border: 'none',
    borderRadius: borderRadius.md,
    fontSize: '0.875rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    fontFamily: 'inherit',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    outline: 'none'
  },
  
  primary: {
    background: colors.primary.main,
    color: colors.neutral[50],
    ':hover': {
      background: colors.primary.dark,
      transform: 'translateY(-1px)',
      boxShadow: shadows.md
    }
  },
  
  success: {
    background: colors.success.main,
    color: colors.neutral[50],
    ':hover': {
      background: colors.success.dark,
      transform: 'translateY(-1px)',
      boxShadow: shadows.md
    }
  },
  
  error: {
    background: colors.error.main,
    color: colors.neutral[50],
    ':hover': {
      background: colors.error.dark,
      transform: 'translateY(-1px)',
      boxShadow: shadows.md
    }
  },
  
  info: {
    background: colors.info.main,
    color: colors.neutral[50],
    ':hover': {
      background: colors.info.dark,
      transform: 'translateY(-1px)',
      boxShadow: shadows.md
    }
  },
  
  secondary: {
    background: colors.neutral[50],
    color: colors.neutral[700],
    border: `1px solid ${colors.neutral[300]}`,
    ':hover': {
      background: colors.neutral[100],
      borderColor: colors.neutral[400]
    }
  },
  
  disabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
    pointerEvents: 'none'
  }
};

// Input Styles
export const inputStyles = {
  base: {
    padding: `${spacing.sm} ${spacing.md}`,
    border: `1px solid ${colors.neutral[300]}`,
    borderRadius: borderRadius.md,
    fontSize: '0.875rem',
    fontFamily: 'inherit',
    outline: 'none',
    transition: 'all 0.2s ease',
    width: '100%',
    ':focus': {
      borderColor: colors.primary.main,
      boxShadow: `0 0 0 3px ${colors.primary.bg}`
    }
  },
  
  search: {
    minWidth: '300px',
    flex: 1
  },
  
  select: {
    minWidth: '150px',
    cursor: 'pointer'
  },
  
  error: {
    borderColor: colors.error.main,
    ':focus': {
      borderColor: colors.error.main,
      boxShadow: `0 0 0 3px ${colors.error.bg}`
    }
  }
};

// Card Styles
export const cardStyles = {
  base: {
    background: colors.neutral[50],
    padding: spacing.xl,
    borderRadius: borderRadius.lg,
    border: `1px solid ${colors.neutral[300]}`,
    boxShadow: shadows.sm
  },
  
  hover: {
    transition: 'all 0.2s ease',
    ':hover': {
      transform: 'translateY(-2px)',
      boxShadow: shadows.md
    }
  }
};

// Page Header Styles
export const pageHeaderStyles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xl
  },
  
  title: {
    margin: 0,
    fontSize: '1.875rem',
    fontWeight: '700',
    color: colors.neutral[900]
  }
};

// Filter Bar Styles
export const filterBarStyles = {
  container: {
    display: 'flex',
    gap: spacing.md,
    alignItems: 'center',
    marginBottom: spacing.lg,
    flexWrap: 'wrap'
  }
};

// Table Styles
export const tableStyles = {
  wrapper: {
    background: colors.neutral[50],
    borderRadius: borderRadius.lg,
    border: `1px solid ${colors.neutral[300]}`,
    overflow: 'hidden'
  },
  
  table: {
    width: '100%',
    borderCollapse: 'collapse'
  },
  
  th: {
    padding: spacing.md,
    textAlign: 'left',
    fontSize: '0.75rem',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    color: colors.neutral[600],
    background: colors.neutral[100],
    borderBottom: `1px solid ${colors.neutral[300]}`
  },
  
  td: {
    padding: spacing.md,
    fontSize: '0.875rem',
    color: colors.neutral[700],
    borderBottom: `1px solid ${colors.neutral[200]}`
  },
  
  row: {
    cursor: 'pointer',
    transition: 'background-color 0.15s ease',
    ':hover': {
      background: colors.neutral[100]
    }
  }
};

// Helper function to merge styles
export const mergeStyles = (...styles) => {
  return Object.assign({}, ...styles);
};

// Helper function to create button style
export const createButtonStyle = (variant = 'primary', disabled = false) => {
  const base = buttonStyles.base;
  const variantStyle = buttonStyles[variant] || buttonStyles.primary;
  const disabledStyle = disabled ? buttonStyles.disabled : {};
  
  return mergeStyles(base, variantStyle, disabledStyle);
};

// Helper function to create input style
export const createInputStyle = (type = 'base', error = false) => {
  const base = inputStyles.base;
  const typeStyle = inputStyles[type] || {};
  const errorStyle = error ? inputStyles.error : {};
  
  return mergeStyles(base, typeStyle, errorStyle);
};

export default {
  colors,
  spacing,
  borderRadius,
  shadows,
  buttonStyles,
  inputStyles,
  cardStyles,
  pageHeaderStyles,
  filterBarStyles,
  tableStyles,
  mergeStyles,
  createButtonStyle,
  createInputStyle
};
