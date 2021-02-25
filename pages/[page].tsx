import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import Layout from '../components/Layout';
import styles from '../styles/Page.module.scss';
import {Link, pageQuery, PageProps} from '../utils';

export default function Page(props: PageProps): JSX.Element {
  const {pageName, links, redirect} = props;
  const router = useRouter();

  if (typeof window !== 'undefined' && router.isFallback) {
    router.push('/');
  }

  return (
    <Layout
      content={(
        <div id={styles.container}>
          <h1>{pageName}</h1>
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

export async function getStaticPaths() {
  const res = await fetch(`https://graphql.contentful.com/content/v1/spaces/${process.env.SPACE_ID}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`,
    },
    body: JSON.stringify({query: pageQuery}),
  });
  const {data, error} = await res.json();
  const paths = data?.pageCollection?.items.map(({pageName}) => ({
    params: {page: pageName},
  }));

  return {paths, fallback: true};
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const {page} = params;
  const res = await fetch(`https://graphql.contentful.com/content/v1/spaces/${process.env.SPACE_ID}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`,
    },
    body: JSON.stringify({query: pageQuery}),
  });
  const {data, error} = await res.json();
  const pageData = data?.pageCollection?.items.find(({pageName}) => pageName === page);
  return { props: {
    pageName: pageData?.pageName,
    links: pageData?.linksCollection?.items,
    redirect: !pageData,
  }};
};
