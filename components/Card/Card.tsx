import { ReactNode } from 'react';
import cn from 'classnames';

interface CardProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
}

export function Card({ children, title, subtitle, className }: CardProps) {
  return (
    <div className='card border-0 shadow-lg w-100 h-100 px-2'>
      {title && <div className='h5 px-3 pt-3 text-primary'>{title}</div>}
      {subtitle && <div className='h6 px-3 pt-3 pb-2 text-primary'>{subtitle}</div>}
      <div className={cn('card-body mb-2', className)}>{children}</div>
    </div>
  );
}
