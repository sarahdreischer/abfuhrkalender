import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Page } from '../../types';
import cn from 'classnames';
import { useRouter } from 'next/router';

interface AppBarProps {
  pages: Page[];
}

export function AppBar({ pages }: AppBarProps) {
  const [activePageIndex, setActivePageIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const index = pages.findIndex((page) => page.route === router.pathname);
    setActivePageIndex(index);
  }, [router.asPath]);

  function onLogoClick() {
    router.push('/');
  }

  return (
    <nav className='navbar navbar-expand bg-transparent'>
      <div className='container-fluid'>
        <a className='navbar-brand text-primary' href='#' onClick={onLogoClick}>
          Abfuhrkalender
        </a>
        <button className='navbar-toggler' type='button' aria-label='Toggle navigation'>
          <span className='navbar-toggler-icon' />
        </button>
        <div className='collapse navbar-collapse justify-content-end'>
          <ul className='navbar-nav'>
            {pages.map(({ route, title }, index) => (
              <li className='nav-item' key={route}>
                <Link
                  className={cn('nav-link', index === activePageIndex && 'active')}
                  href={route}
                >
                  {title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
