import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={`${styles.headerContent} container`}>
        <div className={styles.logo}>
          <NavLink to="/" className={styles.logoLink}>
            <span className={styles.logoLeft}>RENT </span>
            <span className={styles.logoRight}>CAR</span>
          </NavLink>
        </div>
        <nav className={styles.navigation}>
          <NavLink to="/" className={styles.link}>
            Home
          </NavLink>
          <NavLink to="/catalog" className={styles.link}>
            Catalog
          </NavLink>
          <NavLink to="/favorites" className={styles.link}>
            Favorites
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
