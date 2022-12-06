import React, { ReactElement } from 'react';
import { AppBar } from '../../components';
import { Page } from '../../types';

interface LayoutProps {
  children: ReactElement;
}

const pages: Page[] = [
  { route: '/', title: 'Home' },
  { route: '/find', title: 'Find Garbage Collectors' },
];

export function Layout({ children }: LayoutProps) {
  return (
    <div className='d-flex flex-column h-100'>
      <AppBar pages={pages} />
      <div className='flex-grow-1'>{children}</div>
    </div>
  );
}
