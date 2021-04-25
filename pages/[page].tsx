import { GetStaticProps } from 'next';
import React from 'react';
import Layout from '../components/Layout';
import {pageQuery, PageProps, fetchContentful} from '../utils';

export default function Page({pageName, pages, links}: PageProps): JSX.Element {
  return (
    <Layout pageName={pageName} links={links} pages={pages} />
  );
}

export async function getStaticPaths() {
  const data = await fetchContentful(pageQuery);
  const paths = data?.pageCollection?.items.map(({pageName}) => ({
    params: {page: pageName},
  }));

  return {paths, fallback: false};
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const {page} = params;
  const data = await fetchContentful(pageQuery);
  const pages = data?.pageCollection?.items.map(({pageName}) => pageName);
  const pageData = data?.pageCollection?.items.find(({pageName}) => pageName === page);
  return { props: {
    pageName: pageData?.pageName,
    links: pageData?.linksCollection?.items,
    pages,
  }};
};
