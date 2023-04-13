import Head from 'next/head';
import React from 'react';
import Footer from './Footer';
import TCLButton from './TCLButton';
import styles from '../styles/Page.module.scss';
import { Link, PageProps } from '../utils';

export default function Layout(props: PageProps): JSX.Element {
  const { links, pageName } = props;
  const postTitle = pageName === '' ? '' : ` | ${pageName}`;

  const aboutText =
    'We are a community of UCLA creatives who are just trying to make their world a little cooler.';

  return (
    <div>
      <div id={styles.background}>
        <Head>
          <title>tinycl{postTitle}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main id={styles.main}>
          <div id={styles.layout}>
            <div id={styles['logo-main']} />
            <p id={styles.atcl}>@creativelabsucla</p>
            <p id={styles['text-about']}>{aboutText}</p>
            {links &&
              links.map(({ displayName, url }: Link, i) => (
                <TCLButton key={i} onClick={() => window.open(url)}>
                  {displayName}
                </TCLButton>
              ))}
            <p />
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
