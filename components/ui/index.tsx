'use client';

import React, {
  ReactNode,
  ButtonHTMLAttributes,
  HTMLAttributes,
  forwardRef,
  useState,
} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2, Check, AlertCircle, Info } from 'lucide-react';

// ============= BUTTON COMPONENT =============
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'ghost'
    | 'outline';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
  rounded?: boolean;
  gradient?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      rounded = false,
      gradient = false,
      className = '',
      disabled,
      onClick,
      type,
      ...restProps
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
      primary: gradient
        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 focus:ring-purple-500'
        : 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
      secondary:
        'bg-gray-200 text-gray-900 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 focus:ring-gray-500',
      success:
        'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500',
      danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
      warning:
        'bg-yellow-500 text-white hover:bg-yellow-600 focus:ring-yellow-500',
      ghost:
        'bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 focus:ring-gray-500',
      outline:
        'border-2 border-gray-300 dark:border-gray-600 bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 focus:ring-gray-500',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-sm gap-1.5',
      md: 'px-4 py-2 text-base gap-2',
      lg: 'px-6 py-3 text-lg gap-2.5',
      xl: 'px-8 py-4 text-xl gap-3',
    };

    const roundedStyles = rounded ? 'rounded-full' : 'rounded-xl';
    const widthStyles = fullWidth ? 'w-full' : '';

    return (
      <motion.button
        ref={ref}
        whileHover={!disabled && !isLoading ? { scale: 1.05 } : {}}
        whileTap={!disabled && !isLoading ? { scale: 0.95 } : {}}
        className={`
          ${baseStyles}
          ${variants[variant]}
          ${sizes[size]}
          ${roundedStyles}
          ${widthStyles}
          ${className}
        `}
        disabled={disabled || isLoading}
        onClick={onClick}
        type={type}
      >
        {isLoading ? <Loader2 className='animate-spin' /> : leftIcon}
        {children}
        {!isLoading && rightIcon}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

// ============= CARD COMPONENT =============
interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'bordered' | 'elevated' | 'gradient' | 'glass';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  hoverable?: boolean;
  clickable?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      children,
      variant = 'default',
      padding = 'md',
      hoverable = false,
      clickable = false,
      className = '',
      onClick,
      ...props
    },
    ref
  ) => {
    const baseStyles = 'rounded-2xl transition-all';

    const variants = {
      default: 'bg-white dark:bg-gray-800 shadow-lg',
      bordered:
        'bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700',
      elevated: 'bg-white dark:bg-gray-800 shadow-2xl',
      gradient:
        'bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20',
      glass: 'bg-white/10 backdrop-blur-md border border-white/20',
    };

    const paddings = {
      none: '',
      sm: 'p-3',
      md: 'p-6',
      lg: 'p-8',
      xl: 'p-12',
    };

    const interactiveStyles = clickable || onClick ? 'cursor-pointer' : '';
    const hoverStyles =
      hoverable || clickable || onClick
        ? 'hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]'
        : '';

    return (
      <motion.div
        ref={ref}
        className={`
          ${baseStyles}
          ${variants[variant]}
          ${paddings[padding]}
          ${interactiveStyles}
          ${hoverStyles}
          ${className}
        `}
        onClick={onClick}
        whileHover={hoverable || clickable || onClick ? { y: -4 } : {}}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = 'Card';

// ============= MODAL COMPONENT =============
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closeOnOverlayClick?: boolean;
  showCloseButton?: boolean;
  footer?: ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  closeOnOverlayClick = true,
  showCloseButton = true,
  footer,
}) => {
  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl',
    full: 'max-w-[95vw]',
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 bg-black/60 backdrop-blur-md z-50'
            onClick={closeOnOverlayClick ? onClose : undefined}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className={`fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full ${sizes[size]} max-h-[90vh] overflow-hidden`}
          >
            <Card variant='elevated' padding='none' className='overflow-hidden'>
              {/* Header */}
              {(title || showCloseButton) && (
                <div className='flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700'>
                  {title && (
                    <h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
                      {title}
                    </h2>
                  )}
                  {showCloseButton && (
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={onClose}
                      className='p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors'
                    >
                      <X className='w-6 h-6 text-gray-500 dark:text-gray-400' />
                    </motion.button>
                  )}
                </div>
              )}

              {/* Body */}
              <div className='p-6 overflow-y-auto max-h-[60vh]'>{children}</div>

              {/* Footer */}
              {footer && (
                <div className='p-6 border-t border-gray-200 dark:border-gray-700'>
                  {footer}
                </div>
              )}
            </Card>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// ============= BADGE COMPONENT =============
interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'purple';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  rounded?: boolean;
  pulse?: boolean;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      children,
      variant = 'default',
      size = 'md',
      rounded = false,
      pulse = false,
      className = '',
      ...props
    },
    ref
  ) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium';

    const variants = {
      default: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
      success:
        'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
      warning:
        'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
      danger: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
      info: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
      purple:
        'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
    };

    const sizes = {
      xs: 'px-1.5 py-0.5 text-[10px]',
      sm: 'px-2 py-1 text-xs',
      md: 'px-2.5 py-1.5 text-sm',
      lg: 'px-3 py-2 text-base',
    };

    const roundedStyles = rounded ? 'rounded-full' : 'rounded-lg';

    return (
      <span
        ref={ref}
        className={`
          ${baseStyles}
          ${variants[variant]}
          ${sizes[size]}
          ${roundedStyles}
          ${pulse ? 'animate-pulse' : ''}
          ${className}
        `}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

// ============= PROGRESS BAR COMPONENT =============
interface ProgressBarProps {
  value: number;
  max?: number;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'gradient';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showLabel?: boolean;
  animated?: boolean;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  variant = 'default',
  size = 'md',
  showLabel = false,
  animated = true,
  className = '',
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  const variants = {
    default: 'bg-blue-600',
    success: 'bg-green-600',
    warning: 'bg-yellow-500',
    danger: 'bg-red-600',
    gradient: 'bg-gradient-to-r from-blue-600 to-purple-600',
  };

  const sizes = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4',
    xl: 'h-6',
  };

  return (
    <div className={`relative ${className}`}>
      {showLabel && (
        <div className='flex justify-between mb-2 text-sm'>
          <span className='text-gray-600 dark:text-gray-400'>Progress</span>
          <span className='text-gray-900 dark:text-white font-semibold'>
            {Math.round(percentage)}%
          </span>
        </div>
      )}
      <div
        className={`bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden ${sizes[size]}`}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: animated ? 0.5 : 0 }}
          className={`h-full ${variants[variant]} relative`}
        >
          {animated && (
            <div className='absolute inset-0 bg-white/20 animate-pulse' />
          )}
        </motion.div>
      </div>
    </div>
  );
};

// ============= TOOLTIP COMPONENT =============
interface TooltipProps {
  content: string;
  children: ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = 'top',
}) => {
  const positions = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  const arrows = {
    top: 'top-full left-1/2 -translate-x-1/2 border-t-gray-900',
    bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-gray-900',
    left: 'left-full top-1/2 -translate-y-1/2 border-l-gray-900',
    right: 'right-full top-1/2 -translate-y-1/2 border-r-gray-900',
  };

  return (
    <div className='relative group inline-block'>
      {children}
      <div
        className={`
        absolute ${positions[position]} 
        opacity-0 invisible group-hover:opacity-100 group-hover:visible
        transition-all duration-200 pointer-events-none z-50
        whitespace-nowrap
      `}
      >
        <div className='bg-gray-900 dark:bg-gray-700 text-white text-sm px-3 py-2 rounded-lg'>
          {content}
        </div>
        <div
          className={`absolute ${arrows[position]} w-0 h-0 border-4 border-transparent`}
        />
      </div>
    </div>
  );
};

// ============= SKELETON LOADER COMPONENT =============
interface SkeletonProps {
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
  width?: string | number;
  height?: string | number;
  className?: string;
  count?: number;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'text',
  width,
  height,
  className = '',
  count = 1,
}) => {
  const variants = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-none',
    rounded: 'rounded-xl',
  };

  const baseHeight = {
    text: 'h-4',
    circular: 'h-12 w-12',
    rectangular: 'h-20',
    rounded: 'h-20',
  };

  const skeletons = Array.from({ length: count }, (_, i) => (
    <div
      key={i}
      className={`
        bg-gray-200 dark:bg-gray-700 animate-pulse
        ${variants[variant]}
        ${!height ? baseHeight[variant] : ''}
        ${className}
      `}
      style={{
        width: width || '100%',
        height: height || undefined,
      }}
    />
  ));

  return count > 1 ? (
    <div className='space-y-3'>{skeletons}</div>
  ) : (
    <>{skeletons[0]}</>
  );
};

// ============= ALERT COMPONENT =============
interface AlertProps {
  variant?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  children: ReactNode;
  onClose?: () => void;
  className?: string;
}

export const Alert: React.FC<AlertProps> = ({
  variant = 'info',
  title,
  children,
  onClose,
  className = '',
}) => {
  const variants = {
    info: {
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      border: 'border-blue-200 dark:border-blue-800',
      text: 'text-blue-900 dark:text-blue-100',
      icon: <Info className='w-5 h-5' />,
    },
    success: {
      bg: 'bg-green-50 dark:bg-green-900/20',
      border: 'border-green-200 dark:border-green-800',
      text: 'text-green-900 dark:text-green-100',
      icon: <Check className='w-5 h-5' />,
    },
    warning: {
      bg: 'bg-yellow-50 dark:bg-yellow-900/20',
      border: 'border-yellow-200 dark:border-yellow-800',
      text: 'text-yellow-900 dark:text-yellow-100',
      icon: <AlertCircle className='w-5 h-5' />,
    },
    error: {
      bg: 'bg-red-50 dark:bg-red-900/20',
      border: 'border-red-200 dark:border-red-800',
      text: 'text-red-900 dark:text-red-100',
      icon: <X className='w-5 h-5' />,
    },
  };

  const style = variants[variant];

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={`
        ${style.bg} ${style.border} ${style.text}
        border rounded-xl p-4 flex gap-3
        ${className}
      `}
    >
      <div className='flex-shrink-0'>{style.icon}</div>
      <div className='flex-1'>
        {title && <h4 className='font-semibold mb-1'>{title}</h4>}
        <div className='text-sm'>{children}</div>
      </div>
      {onClose && (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className='flex-shrink-0 p-1 hover:bg-black/10 dark:hover:bg-white/10 rounded-lg transition-colors'
        >
          <X className='w-4 h-4' />
        </motion.button>
      )}
    </motion.div>
  );
};

// ============= TABS COMPONENT =============
interface TabItem {
  id: string;
  label: string;
  content: ReactNode;
  icon?: ReactNode;
  disabled?: boolean;
}

interface TabsProps {
  items: TabItem[];
  defaultActive?: string;
  onChange?: (id: string) => void;
  variant?: 'default' | 'pills' | 'bordered';
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  items,
  defaultActive,
  onChange,
  variant = 'default',
  className = '',
}) => {
  const [activeTab, setActiveTab] = useState(defaultActive || items[0]?.id);

  const handleTabChange = (id: string) => {
    setActiveTab(id);
    onChange?.(id);
  };

  const variants = {
    default: {
      list: 'border-b border-gray-200 dark:border-gray-700',
      tab: 'pb-3 border-b-2 -mb-[2px]',
      active:
        'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400',
      inactive:
        'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white',
    },
    pills: {
      list: 'bg-gray-100 dark:bg-gray-800 p-1 rounded-xl',
      tab: 'px-4 py-2 rounded-lg',
      active: 'bg-white dark:bg-gray-700 shadow text-gray-900 dark:text-white',
      inactive:
        'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white',
    },
    bordered: {
      list: 'border-2 border-gray-200 dark:border-gray-700 rounded-xl p-1',
      tab: 'px-4 py-2 rounded-lg',
      active: 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white',
      inactive:
        'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800',
    },
  };

  const style = variants[variant];
  const activeItem = items.find(item => item.id === activeTab);

  return (
    <div className={className}>
      {/* Tab List */}
      <div className={`flex gap-4 ${style.list}`}>
        {items.map(item => (
          <motion.button
            key={item.id}
            whileHover={{ scale: item.disabled ? 1 : 1.05 }}
            whileTap={{ scale: item.disabled ? 1 : 0.95 }}
            onClick={() => !item.disabled && handleTabChange(item.id)}
            disabled={item.disabled}
            className={`
              flex items-center gap-2 font-medium transition-all
              ${style.tab}
              ${activeTab === item.id ? style.active : style.inactive}
              ${
                item.disabled
                  ? 'opacity-50 cursor-not-allowed'
                  : 'cursor-pointer'
              }
            `}
          >
            {item.icon}
            {item.label}
          </motion.button>
        ))}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode='wait'>
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className='mt-6'
        >
          {activeItem?.content}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
