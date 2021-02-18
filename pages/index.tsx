import { GetServerSideProps } from 'next';
import React, { useState } from 'react';
import Layout from '../components/Layout';
import styles from '../styles/Page.module.scss';

export default function Home(props): JSX.Element {
  const [links] = useState(props.links);

  return (
    <Layout 
      content={(
        <div id={styles.container}>
          <h1>Creative Labs</h1>
          <ul>
            {links && links.map((link, i) => (
              <li key={i}>
                <a target='_blank' href={link.link}>{link.path}</a>
              </li>
            ))}
          </ul>
        </div>
      )}
    />
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch('http://localhost:3000/api/links')
  const data = await res.json();
  const links = data?.links?.filter((link) => link.page === 'index') ?? null;
  return { props: { links } };
}
