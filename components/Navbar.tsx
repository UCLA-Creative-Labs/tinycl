import Link from 'next/link';
import React from 'react';

import styles from '../styles/Navbar.module.scss';
import { capitalize } from '../utils';

interface NavbarProps {
  pageName: string;
  pages: string[];
}

function Navbar(props: NavbarProps): JSX.Element {
  const pages = props.pages.filter((p) => p !== 'home');
  const path = props.pageName;

  return (
    <nav id={styles.navbar}>
      <Link href='/'>
        <div id={styles['logo-container']}>
          <div id={styles.logo}/>
          <h1>Creative Labs</h1>
        </div>
      </Link>

      <div id={styles.navigation}>
        {pages?.map((page, i) =>
          <Link href={page} key={i}
            ><span id={path === page ? styles.viewing: ''}>{capitalize(page)}</span>
          </Link>,
        )}
      </div>
    </nav>
  );
}

export default Navbar;
