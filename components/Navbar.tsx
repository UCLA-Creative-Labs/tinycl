import { useRouter } from 'next/router';
import React from 'react';

import styles from '../styles/Navbar.module.scss';

function Navbar(): JSX.Element {
  const router = useRouter();

  return (
    <nav>
      <div style={styles.navbar}>

      </div>
    </nav>

  );
}

export default Navbar;
