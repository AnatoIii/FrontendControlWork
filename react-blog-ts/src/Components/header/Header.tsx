import React from 'react';
import styles from './styles.module.scss';
import logo from '../../logo.svg';

const Header: React.FunctionComponent = () => {
  return (
    <div className={styles.header}>
      <img src={logo} />

      <h2>Main</h2>
    </div>
  );
}

export default Header;
