import { ReactNode } from 'react';
import cn from 'classnames';

interface CardProps {
  children: ReactNode;
  title?: string;
  className?: string;
}

export function Card({ children, title, className }: CardProps) {
  return (
    <div className='card border-0 shadow-lg w-100 h-100 px-2'>
      {title && <div className='h5 px-3 pt-3 text-primary'>{title}</div>}
      <div className={cn('card-body mb-2', className)}>{children}</div>
    </div>
  );
}
