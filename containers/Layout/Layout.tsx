import React, { ReactElement } from 'react';
import { AppBar } from '../../components';
import { Page } from '../../types';
import cn from 'classnames';
import styles from './Layout.module.scss';

interface LayoutProps {
  children: ReactElement;
}

const pages: Page[] = [
  { route: '/', title: 'Home' },
  { route: '/appointments', title: 'Find Garbage Collectors' },
];

export function Layout({ children }: LayoutProps) {
  return (
    <div className='d-flex flex-column h-100'>
      <AppBar pages={pages} />
      <div className={cn('flex-grow-1', styles.main)}>{children}</div>
    </div>
  );
}
