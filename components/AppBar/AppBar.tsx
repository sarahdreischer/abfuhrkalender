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
    const index = pages.findIndex((page) => page.route === router.asPath);
    setActivePageIndex(index);
  }, [router.asPath]);

  return (
    <nav className='navbar navbar-expand-lg bg-transparent'>
      <div className='container-fluid'>
        <a className='navbar-brand' href='#'>
          GBC
        </a>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarNav'
          aria-controls='navbarNav'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
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
