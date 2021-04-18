import Link from 'next/link';
//import { useRouter } from 'next/router';
import React from 'react';

import styles from '../styles/Navbar.module.scss';

function Navbar(): JSX.Element {
  //const router = useRouter();
  //const { path } = router.query;
  const pages = [
    'Internal',
    'Resources',
    'Bloom',
  ];

  return (
    <nav id={styles.navbar}>
      <Link href='/'>
        <div id={styles['logo-container']}>
          <div id={styles.logo}/>
          <h1>Creative Labs</h1>
        </div>
      </Link>

      <div id={styles.navigation}>
        {pages.map((page, i) =>
          <Link href={page.toLowerCase()} key={i}>{page}</Link>,
        )}
      </div>
    </nav>
  );
}

export default Navbar;
