
//Get the links and filter to the corresponding link
// Redirect to the actual link

import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import Layout from '../../components/Layout';
import styles from '../../styles/Page.module.scss';
import {linksQuery} from '../../utils';

export default function LinkPage(): JSX.Element {
  const router = useRouter();

  if (typeof window !== 'undefined' && router.isFallback) {
    void router.push('/');
  }

  return (
    <Layout
      content={(
        <div id={styles.container}>
          go back to home
        </div>
      )}
    />
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params, res}) => {
  const {link} = params;
  const contentfulRes = await fetch(`https://graphql.contentful.com/content/v1/spaces/${process.env.SPACE_ID}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`,
    },
    body: JSON.stringify({query: linksQuery(link)}),
  });
  const {data} = await contentfulRes.json();
  const linkData = data?.linkCollection?.items;

  if(linkData.length)
  {
    res.writeHead(301, {location: linkData[0].url} );
    res.end();
  }

  return {props: {}};
};