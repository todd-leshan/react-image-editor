import React from 'react';
import PropTypes from 'prop-types';

const Header = ({ title, subtitle, avatar }) => (
  <header>
    <div className="container--page-title">
      <h1 className="page-title">{title}</h1>
      <span className="page-subtitle">{subtitle}</span>
    </div>
    <div className="container--avatar">
      <img className="avatar" alt="candidate avatar" src={avatar} />
    </div>
  </header>
);

Header.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

export default Header;
