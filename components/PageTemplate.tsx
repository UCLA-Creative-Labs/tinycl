import React from 'react';
import {Link, PageProps} from '../utils';
import Layout from './Layout';
import styles from '../styles/Page.module.scss';

export default function PageTemplate(props: PageProps): JSX.Element {
  const {pageName, links} = props;

  return (
    <Layout
      content={(
        <div id={styles.container}>
          <h1>{pageName}</h1>
          <ul>
            {links && links.map(({displayName, url}: Link, i) => (
              <li key={i}>
                <a rel="noreferrer" target='_blank' href={url} key={i}>{displayName}</a>
              </li>
            ))}
          </ul>
        </div>
      )}
    />
  );
}