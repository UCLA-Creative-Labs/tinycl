import { GetStaticProps } from 'next';
import React from 'react';
import PageTemplate from '../components/PageTemplate';
import {fetchContentful, PageProps} from '../utils';
import {pageQuery} from '../utils/index';

export default function Home(props: PageProps): JSX.Element {

  return (
    <PageTemplate pageName = "Creative Labs" links = {props.links} redirect = {props.redirect} />
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const data = await fetchContentful(pageQuery);
  const page = data.pageCollection.items.find(({pageName}) => pageName === 'home');
  return { props: {
    pageName: page?.pageName,
    links: page?.linksCollection?.items,
  }};
};
