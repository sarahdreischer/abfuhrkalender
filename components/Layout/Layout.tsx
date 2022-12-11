import React, { ReactElement } from 'react';
import { AppBar } from '..';
import { pages } from '../../data/pages';
import cn from 'classnames';
import styles from './Layout.module.scss';

interface LayoutProps {
  children: ReactElement;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className='d-flex flex-column h-100 mh-md-100'>
      <AppBar pages={pages} />
      <div
        className={cn('flex-grow-1 mh-md-100 overflow-md-hidden', styles.main, styles.container)}
      >
        {children}
      </div>
    </div>
  );
}
