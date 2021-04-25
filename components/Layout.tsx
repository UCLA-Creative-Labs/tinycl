import Head from 'next/head';
import React, { useState } from 'react';
import styles from '../styles/Page.module.scss';
import {Link, PageProps} from '../utils';
import Navbar from './Navbar';

export default function Layout(props: PageProps): JSX.Element {
  const {links, pages, pageName} = props;
  const[hover, setHover] = useState(-1);
  function embedURL(stringUrl:string) : string{
    const url = new URL(stringUrl);
    if(url.hostname === 'www.youtube.com') {
      const queryPath = url.searchParams.get('v');
      const newURL = 'https://' + url.hostname + '/embed/' + queryPath;
      return newURL.toString();
    } return stringUrl;
  }

  return (
    <div style={{display: 'flex', justifyContent: 'center'}}>
      <Head>
        <title>tinycl | {pageName}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar pages={pages} pageName={pageName}/>
      <main>
        <div id={styles.layout}>
          <div id={styles.frame}>
            {hover !== -1
            ? <iframe src={embedURL(props.links[hover].url)}/>
            : <p id={styles.fillerText}>Hover over the links on the right to get a preview!</p>}
          </div>
          <div id={styles.container}>
              {links && links.map(({displayName, url}: Link, i) => (
                <a onMouseEnter={() => setHover(i)}
                  onMouseLeave={() => setHover(-1)}
                  rel="noreferrer" target='_blank' href={url} key={i}>{displayName}</a>
              ))}
          </div>
        </div>
      </main>
    </div>
  );
}