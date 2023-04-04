import React from 'react';
// import '../styles/Footer.module.scss';
import styles from '../styles/Footer.module.scss';

function Footer(): JSX.Element {
  return (
    <div id={styles.footer}>
      <span id={styles['footer-tag']}>
        <p>
          Made with{' '}
          <span aria-label="heart" role="img">
            ❤️
          </span>{' '}
          by
        </p>
        <h3 className="logotype">CREATIVE LABS</h3>
      </span>
      <div id={styles['footer-nav']}>
        <nav>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.instagram.com/creativelabsucla/"
          >
            INSTAGRAM
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://discord.gg/vHenfGNTXJ"
          >
            DISCORD
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            href="mailto:uclacreatives@gmail.com"
          >
            EMAIL
          </a>
        </nav>
      </div>
    </div>
  );
}

export default Footer;
