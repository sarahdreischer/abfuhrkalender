import React, { ReactElement } from 'react';

interface CardProps {
  children: ReactElement;
}

export function Card({ children }: CardProps) {
  return (
    <div className='card border-0 shadow-lg w-100 h-100'>
      <div className='card-body'>{children}</div>
    </div>
  );
}
