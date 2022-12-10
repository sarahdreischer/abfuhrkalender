import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  title?: string;
}

export function Card({ children, title }: CardProps) {
  return (
    <div className='card border-0 shadow-lg w-100 h-100'>
      {title && <div className='h6 px-3 pt-3'>{title}</div>}
      <div className='card-body'>{children}</div>
    </div>
  );
}
