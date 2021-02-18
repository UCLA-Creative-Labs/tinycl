import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import styles from '../styles/Navbar.module.scss';

function Navbar(): JSX.Element {
  const router = useRouter();
  const { path } = router.query;
  const pages = [
    'Internal',
    'Resources',
    'Bloom',
  ];

  return (
    <nav id={styles.navbar}>
      <div className={!path && styles.hide}>
        <Link href='/'>
          <div id={styles.back} >
            <div id={styles.back_arrow}/> back to home
          </div>
        </Link>
      </div>

      <div id={styles.navigation}>
        {pages.map((page, i) =>
          <a href={page.toLowerCase()} key={i}>{page}</a>,
        )}
      </div>
    </nav>
  );
}

export default Navbar;
