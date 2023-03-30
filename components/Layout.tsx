import Head from 'next/head';
import React, { useState } from 'react';
import styles from '../styles/Page.module.scss';
import { Link, PageProps } from '../utils';
import Navbar from './Navbar';

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

  // (shlok) note to self: buttons should be at most 400px long, otherwise they shouold occupy the entire width woith
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        background:
          'linear-gradient(rgba(72, 150, 202, 0.2), rgba(237, 209, 71, 0.1))',
      }} // TODO: move this to the scss file
    >
      <Head>
        <title>tinycl{postTitle}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar pages={pages} pageName={pageName} />
      <main>
        <div id={styles.layout}>
          <div id={styles['logo-main']} />
          <div id={styles.frame}>
            {hover !== -1 ? (
              <iframe src={embedURL(props.links[hover].url)} />
            ) : (
              <p id={styles.fillerText}>
                Hover over the links on the right to get a preview!
              </p>
            )}
          </div>
          <div id={styles.container}>
            {links &&
              links.map(({ displayName, url }: Link, i) => (
                <a
                  onMouseEnter={() => setHover(i)}
                  onMouseLeave={() => setHover(-1)}
                  rel="noreferrer"
                  target="_blank"
                  href={url}
                  key={i}
                >
                  {displayName}
                </a>
              ))}
          </div>
        </div>
      </main>
    </div>
  );
}
