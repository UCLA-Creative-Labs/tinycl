import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Layout from '../components/Layout';
import styles from '../styles/Page.module.scss';
import {capitalize, PageProps} from '../utils';

export default function Page(props: PageProps): JSX.Element {
  const [links] = useState(props.links);
  const router = useRouter();
  const { path } = router.query;

  return (
    <Layout
      content={(
        <div id={styles.container}>
          <h1>Creative Labs {typeof(path) === 'string' && `| ${capitalize(path)}`}</h1>
          {links && links.map((link, i) => (
            <a rel="noreferrer" target='_blank' href={link.link} key={i}>{link.path}</a>
          ))}
        </div>
      )}
    />
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context;
  const { path } = params;
  const res = await fetch('http://localhost:3000/api/links');
  const data = await res.json();
  const links = data?.links?.filter((link) => link.page === path) ?? null;
  return { props: { links } };
};
