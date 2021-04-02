import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import Layout from '../../components/Layout';
import styles from '../../styles/Page.module.scss';
import {linksQuery, fetchContentful} from '../../utils';

export default function LinkPage(): JSX.Element {
  const router = useRouter();

  if (typeof window !== 'undefined' && router.isFallback) {
    void router.push('/');
  }

  return (
    <Layout
      content={(
        <div id={styles.container}>
          <a href="/">go back to home</a>
        </div>
      )}
    />
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params, res}) => {
  const {link} = params;
  const data = await fetchContentful(linksQuery(link));
  const linkData = data?.linkCollection?.items;

  if(linkData.length){
    res.writeHead(301, {location: linkData[0].url} );
    res.end();
  }

  return {props: {}};
};