import * as React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import styles from "./LinkELement.module.css";

const LinkElement = ({to, text}) => {
  return (
    <span className={styles.marginRight}>
      <Link to={to}>{text}</Link>
    </span>
  );
};

LinkElement.Props = {
  to: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
};

export default LinkElement;