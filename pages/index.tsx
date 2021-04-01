import { GetStaticProps } from 'next';
import React from 'react';
import Layout from '../components/Layout';
import styles from '../styles/Page.module.scss';
import {fetchContentful, Link, PageProps} from '../utils';
import {pageQuery} from '../utils/index';

export default function Home(props: PageProps): JSX.Element {
  const {links} = props;

  return (
    <Layout
      content={(
        <div id={styles.container}>
          <h1>Creative Labs</h1>
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

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetchContentful(pageQuery);
  const {data} = await res.json();
  const page = data.pageCollection.items.find(({pageName}) => pageName === 'Home');
  return { props: {
    pageName: page?.pageName,
    links: page?.linksCollection?.items,
  }};
};