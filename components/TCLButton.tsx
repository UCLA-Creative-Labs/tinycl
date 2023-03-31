import React, { FC, MouseEvent } from 'react';
import styles from '../styles/Page.module.scss';

interface TCLButtonProps {
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

// TCL = TinyCL
const TCLButton: FC<TCLButtonProps> = ({ onClick, children }) => {
  return (
    <button id={styles['tinycl-button']} onClick={onClick}>
      {children}
    </button>
  );
};

export default TCLButton;
