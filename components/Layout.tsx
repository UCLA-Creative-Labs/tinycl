import Head from 'next/head';
import React, { useState } from 'react';
import styles from '../styles/Page.module.scss';
import { Link, PageProps } from '../utils';
import Navbar from './Navbar';
import TCLButton from './TCLButton';

export default function Layout(props: PageProps): JSX.Element {
  const { links, pages, pageName } = props;
  const postTitle = pageName === '' ? '' : ` | ${pageName}`;

  const [hover, setHover] = useState(-1);
  function embedURL(stringUrl: string): string {
    const url = new URL(stringUrl);
    if (url.hostname === 'www.youtube.com') {
      const queryPath = url.searchParams.get('v');
      const newURL = 'https://' + url.hostname + '/embed/' + queryPath;
      return newURL.toString();
    }
    return stringUrl;
  }

  const aboutText =
    'We are a community of UCLA creatives who are just trying to make their world a little cooler.';

  return (
    <div id={styles.background}>
      <Head>
        <title>tinycl{postTitle}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div id={styles.layout}>
          <div id={styles['logo-main']} />
          <p id={styles.atcl}>@creativelabsucla</p>
          <p id={styles['text-about']}>{aboutText}</p>
          {/* TODO: retrieve from contentful */}
          <TCLButton>Website</TCLButton>
          <TCLButton>Zoom</TCLButton>
          <TCLButton>Internal Board Application</TCLButton>
          <TCLButton>Winter 2023 GM Slides</TCLButton>
        </div>
      </main>
    </div>
  );
}
