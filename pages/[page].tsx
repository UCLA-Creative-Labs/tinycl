import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import PageTemplate from '../components/PageTemplate';
import {pageQuery, PageProps, fetchContentful} from '../utils';

export default function Page(props: PageProps): JSX.Element {
  const {pageName, links, redirect} = props;
  const router = useRouter();

  if (redirect || typeof window !== 'undefined') {
    void router.push('/');
  }

  return (
    <PageTemplate pageName = {pageName} links = {links} redirect = {redirect} />
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
  const pageData = data?.pageCollection?.items.find(({pageName}) => pageName === page);
  return { props: {
    pageName: pageData?.pageName,
    links: pageData?.linksCollection?.items,
    redirect: !pageData,
  }};
};
