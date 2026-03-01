// src/components/ui/Button.tsx
import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  type?: 'button' | 'submit';
  className?: string;
}

export const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  onClick, 
  type = 'button',
  className = ''
}: ButtonProps) => {
  const baseStyles = 'font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    primary: 'bg-ocean-500 hover:bg-ocean-600 text-white focus:ring-ocean-500',
    secondary: 'bg-sand-400 hover:bg-sand-500 text-ocean-900 focus:ring-sand-400',
    outline: 'border-2 border-ocean-500 text-ocean-500 hover:bg-ocean-50 focus:ring-ocean-500'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </motion.button>
  );
};