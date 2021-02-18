import Head from 'next/head';
import React from 'react';
import Navbar from './Navbar';

interface LayoutProps {
  content: JSX.Element;
}

export default function Layout(props: LayoutProps): JSX.Element {
  return (
    <div>
      <Head>
        <title>tinycl</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main>
        {props.content}
      </main>
    </div>
  );
}