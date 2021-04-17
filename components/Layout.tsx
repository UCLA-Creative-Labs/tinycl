import Head from 'next/head';
import React from 'react';
import ReactDOM,{ render } from 'react-dom';
import Navbar from './Navbar';
import styles from '../styles/Layout.module.scss';

interface LayoutProps {
  content: JSX.Element;
}

var url = "https://forms.gle/dxnLTWLxB5eWF3dw6?embedded=true";
var cl = "https://www.creativelabsucla.com/"

class Hover extends React.Component<{}, {isHover: boolean}>{
  constructor(props) {
    super(props);
    this.handleMouseHover = this.handleMouseHover.bind(this);
    this.state = {
      isHover: false,
    };
  }

  handleMouseHover() {
    this.setState(this.toggleHover);
  }

  toggleHover(state) {
    return {
      isHover: !state.isHover,
  };
}

  render() {
    return (
      <div>
        <h1>Creative Labs</h1>
        
        <div className={styles.layout}>
        <ul className={styles.list}>
          <a className={styles.link} href="https://www.creativelabsucla.com/" onMouseEnter={this.handleMouseHover} onMouseLeave={this.handleMouseHover}>
            Creative Labs
          </a>
          <a className={styles.link} href="https://www.creativelabsucla.com/" onMouseEnter={this.handleMouseHover} onMouseLeave={this.handleMouseHover}>
            Creative Labs
          </a>
        </ul>
        {this.state.isHover && <iframe className={styles.frame} src={cl}></iframe>}
        {!this.state.isHover && <div className={styles.block}>
            <p className={styles.text}>Hover over link for preview!</p>
          </div>}
        </div>
      </div>
    );
  }
}

export default function Layout(props: LayoutProps): JSX.Element {
  
  return (
    <div>
      <Head>
        <title>tinycl</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <Hover></Hover>
      <main>
        {props.content}
      </main>
    </div>
  );
}