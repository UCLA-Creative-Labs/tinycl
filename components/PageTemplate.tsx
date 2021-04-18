import React, { useState } from 'react';
import styles from '../styles/Page.module.scss';
import {Link, PageProps} from '../utils';
import Layout from './Layout';

export default function PageTemplate(props: PageProps): JSX.Element {

  const {links} = props;
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
    <Layout
      content={(
        <div id={styles.layout}>
          <div id={styles.container}>
            <ul id={styles.listContainer}>
              {links && links.map(({displayName, url}: Link, i) => (
                <li id={styles.list} key={i}>
                  <a onMouseEnter={() => setHover(i)}
                    onMouseLeave={() => setHover(-1)}
                    rel="noreferrer" target='_blank' href={url} key={i}>{displayName}</a>
                </li>
              ))}
            </ul>
          </div>
          <div id={styles.frame}>
            {hover != -1 && (<iframe id={styles.frame} src={embedURL(props.links[hover].url)}></iframe>)}
            {hover == -1 && (<p id={styles.fillerText}>Hover over the links on the right to get a preview!</p>)}
          </div>
        </div>
      )}
    />
  );
}