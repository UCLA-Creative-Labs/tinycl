import { GetStaticProps } from 'next';
import React from 'react';
import Layout from '../components/Layout';
import { fetchLinks, PageProps } from '../utils';

export default function Home({ pageName, links, pages }: PageProps): JSX.Element {
  return (
    <Layout pageName={pageName} links={links} pages={pages} />
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const links = await fetchLinks();
  return {
    props: {
      pageName: '',
      links,
      pages: [],
    },
  };
};
