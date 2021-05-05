import { GetStaticProps } from 'next';
import React from 'react';
import Layout from '../components/Layout';
import {fetchContentful, PageProps} from '../utils';
import {pageQuery} from '../utils/index';

export default function Home({pageName, links, pages}: PageProps): JSX.Element {

  return (
    <Layout pageName={pageName} links={links} pages={pages} />
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const data = await fetchContentful(pageQuery);
  const pages = data?.pageCollection?.items.map(({pageName}) => pageName);
  const page = data.pageCollection.items.find(({pageName}) => pageName === 'home');
  return {props: {
    pageName: '',
    links: page?.linksCollection?.items,
    pages,
  }};
};
